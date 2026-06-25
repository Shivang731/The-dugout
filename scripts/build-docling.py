# Builds the RAG index from PDFs in data/pdfs/
# Uses PyMuPDF for text extraction (Docling's OCR pipeline overkill for text PDFs)
# Run once: python3 scripts/build-docling.py
import os
import json
import sys

PDF_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "pdfs")
DOCLING_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "docling")
CHUNKS_PATH = os.path.join(DOCLING_DIR, "chunks.json")
INDEX_PATH = os.path.join(DOCLING_DIR, "faiss.index")


def main():
    if not os.path.exists(PDF_DIR):
        os.makedirs(PDF_DIR, exist_ok=True)
        print(f"Created {PDF_DIR}. Place FIFA/UEFA coaching PDFs in this directory and rerun.")
        sys.exit(0)

    pdfs = [f for f in os.listdir(PDF_DIR) if f.lower().endswith(".pdf")]
    if not pdfs:
        print(f"No PDFs found in {PDF_DIR}.")
        print("Download FIFA TSG reports from digitalhub.fifa.com")
        print("Place them in data/pdfs/ and rerun this script.")
        sys.exit(0)

    print(f"Found {len(pdfs)} PDFs: {', '.join(pdfs)}")

    # Parse with PyMuPDF
    try:
        import fitz
    except ImportError:
        print("PyMuPDF not installed. Run: pip install PyMuPDF")
        sys.exit(1)

    all_chunks = []

    for pdf_name in pdfs:
        pdf_path = os.path.join(PDF_DIR, pdf_name)
        print(f"Parsing {pdf_name}...")
        try:
            doc = fitz.open(pdf_path)
            full_text = ""
            for page_num in range(doc.page_count):
                page = doc[page_num]
                page_text = page.get_text()
                if page_text.strip():
                    full_text += page_text + "\n\n"
            doc.close()

            paragraphs = [p.strip() for p in full_text.split("\n\n") if len(p.strip()) > 50]
            for i, para in enumerate(paragraphs):
                words = para.split()
                for j in range(0, len(words), 500):
                    chunk_words = words[j:j + 500]
                    all_chunks.append({
                        "text": " ".join(chunk_words),
                        "source": pdf_name,
                        "chunk_id": f"{pdf_name}#p{i}-{j}",
                    })
            print(f"  -> {len(paragraphs)} paragraphs, {len(all_chunks)} chunks extracted")
        except Exception as e:
            print(f"  Error parsing {pdf_name}: {e}")

    if not all_chunks:
        print("No chunks extracted. Check your PDFs.")
        sys.exit(1)

    print(f"Total chunks: {len(all_chunks)}")

    # Save chunks
    os.makedirs(DOCLING_DIR, exist_ok=True)
    with open(CHUNKS_PATH, "w") as f:
        json.dump(all_chunks, f)
    print(f"Saved chunks to {CHUNKS_PATH}")

    # Build FAISS index
    try:
        from sentence_transformers import SentenceTransformer
        import faiss
        import numpy as np
    except ImportError as e:
        print(f"Missing dependency: {e}")
        print("Run: pip install sentence-transformers faiss-cpu")
        sys.exit(1)

    print("Loading embedding model...")
    model = SentenceTransformer("all-MiniLM-L6-v2")

    print("Embedding chunks...")
    texts = [c["text"] for c in all_chunks]
    embeddings = model.encode(texts, normalize_embeddings=True, show_progress_bar=True)

    print("Building FAISS index...")
    dim = embeddings.shape[1]
    index = faiss.IndexFlatIP(dim)
    index.add(np.array(embeddings).astype("float32"))

    faiss.write_index(index, INDEX_PATH)
    print(f"Saved FAISS index to {INDEX_PATH} ({index.ntotal} vectors)")


if __name__ == "__main__":
    main()
