# RAG service — FAISS retrieval over Docling-parsed chunks (stub without built index)
import json
import os
import numpy as np

CHUNKS_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "docling", "chunks.json")
INDEX_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "docling", "faiss.index")

_chunks = []
_index = None
_embeddings_model = None


def _lazy_load():
    """Load chunks and FAISS index on first use, with graceful failure."""
    global _chunks, _index, _embeddings_model
    if _chunks:
        return

    # Load chunks
    if os.path.exists(CHUNKS_PATH):
        try:
            with open(CHUNKS_PATH, "r") as f:
                _chunks = json.load(f)
        except Exception as e:
            print(f"Failed to load chunks: {e}")
            _chunks = []
    else:
        print(f"Chunks not found at {CHUNKS_PATH}. Run scripts/build-docling.py first.")
        _chunks = []

    # Load FAISS index
    if os.path.exists(INDEX_PATH):
        try:
            import faiss
            _index = faiss.read_index(INDEX_PATH)
        except Exception as e:
            print(f"Failed to load FAISS index: {e}")
            _index = None
    else:
        print(f"FAISS index not found at {INDEX_PATH}. Run scripts/build-docling.py first.")

    # Load embedding model
    if _index is not None:
        try:
            from sentence_transformers import SentenceTransformer
            _embeddings_model = SentenceTransformer("all-MiniLM-L6-v2")
        except Exception as e:
            print(f"Failed to load embedding model: {e}")
            _embeddings_model = None


def retrieve(query: str, k: int = 5) -> list:
    """Retrieve top-k chunks from the FAISS index for the given query."""
    _lazy_load()
    if _index is None or _embeddings_model is None or not _chunks:
        return []

    try:
        query_vec = _embeddings_model.encode([query], normalize_embeddings=True)
        distances, indices = _index.search(np.array(query_vec).astype("float32"), k)
        results = []
        for idx in indices[0]:
            if idx < len(_chunks):
                results.append(_chunks[idx])
        return results
    except Exception as e:
        print(f"Retrieval error: {e}")
        return []
