#!/usr/bin/env python3
"""Start script for The Dugout — run this, then open http://localhost:8000"""
import uvicorn

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000)
