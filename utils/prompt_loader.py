from pathlib import Path


def load_prompt(filename: str) -> str:
    prompt_path = Path("prompts") / filename

    with open(prompt_path, "r") as f:
        return f.read()