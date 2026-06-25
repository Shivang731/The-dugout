import json
import os

CACHE_DIR = os.path.join(os.path.dirname(__file__), "..", ".dugout_cache")


def _ensure_dir():
    os.makedirs(CACHE_DIR, exist_ok=True)


def _path(name):
    _ensure_dir()
    return os.path.join(CACHE_DIR, f"{name}.json")


def get(name, key):
    try:
        data = json.load(open(_path(name)))
        return data.get(key)
    except (FileNotFoundError, json.JSONDecodeError):
        return None


def put(name, key, value):
    try:
        data = json.load(open(_path(name)))
    except (FileNotFoundError, json.JSONDecodeError):
        data = {}
    data[key] = value
    with open(_path(name), "w") as f:
        json.dump(data, f)


def clear(name=None):
    if name:
        p = _path(name)
        if os.path.exists(p):
            os.remove(p)
    else:
        import shutil
        if os.path.exists(CACHE_DIR):
            shutil.rmtree(CACHE_DIR)
