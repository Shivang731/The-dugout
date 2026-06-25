# POST /api/library — RAG-powered coaching Q&A using Docling chunks
from fastapi import APIRouter
from pydantic import BaseModel
from backend.ai_client import generate
from backend.rag_service import retrieve

router = APIRouter()


class LibraryRequest(BaseModel):
    question: str


LIBRARY_PROMPT = """You are a football coaching expert. Answer this question
using ONLY the context below from official FIFA/UEFA documents.

CONTEXT:
{context}

QUESTION: {question}

Give a clear, plain-English answer under 200 words.
End with: Source: [document name]"""


@router.post("/api/library")
async def coaching_library(req: LibraryRequest):
    """Answer a coaching question using RAG-retrieved document chunks."""
    try:
        chunks = retrieve(req.question, k=5)
        context = "\n\n".join(c.get("text", "") for c in chunks)

        if not context:
            return {
                "answer": "The coaching library hasn't been built yet. Run `python3 scripts/build-docling.py` to parse your PDFs and build the FAISS index.",
                "sources": [],
            }

        prompt = LIBRARY_PROMPT.format(context=context, question=req.question)
        answer = await generate(prompt, max_tokens=300)

        return {
            "answer": answer,
            "sources": [c.get("source", "Unknown") for c in chunks[:3]],
        }
    except Exception as e:
        print(f"Library error: {e}")
        return {"error": str(e)}
