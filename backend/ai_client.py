import json
import os
import re

import httpx


def model_name():
    return os.getenv("OLLAMA_MODEL", "granite3.3:2b")


def _base_url():
    return os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434").rstrip("/")


def _timeout():
    return float(os.getenv("OLLAMA_TIMEOUT", "180"))


async def generate(prompt, max_tokens=800, system=None):
    url = f"{_base_url()}/api/generate"
    payload = {
        "model": model_name(),
        "prompt": prompt,
        "stream": False,
        "options": {"num_predict": max_tokens},
    }
    if system:
        payload["system"] = system
    async with httpx.AsyncClient(timeout=_timeout()) as client:
        r = await client.post(url, json=payload)
        r.raise_for_status()
        return r.json().get("response", "")


async def generate_structured(prompt, max_tokens=1000):
    text = await generate(prompt, max_tokens=max_tokens)
    m = re.search(r"\{.*\}", text, re.DOTALL)
    if m:
        try:
            return json.loads(m.group())
        except json.JSONDecodeError:
            pass
    return None


async def generate_stream(prompt, max_tokens=800):
    url = f"{_base_url()}/api/generate"
    payload = {
        "model": model_name(),
        "prompt": prompt,
        "stream": True,
        "options": {"num_predict": max_tokens},
    }
    try:
        async with httpx.AsyncClient(timeout=_timeout()) as client:
            async with client.stream("POST", url, json=payload) as response:
                response.raise_for_status()
                async for line in response.aiter_lines():
                    if not line:
                        continue
                    data = json.loads(line)
                    chunk = data.get("response", "")
                    if chunk:
                        yield chunk
                    if data.get("done"):
                        break
    except Exception as e:
        print(f"AI stream error: {e}")
        yield "Sorry, I couldn't generate a response right now."
