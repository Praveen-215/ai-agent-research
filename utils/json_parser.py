import json


def parse_json_response(response: str):
    """
    Convert LLM JSON response into Python object.
    """

    try:
        return json.loads(response)

    except json.JSONDecodeError:
        print("Failed to parse JSON")
        print(response)
        return None