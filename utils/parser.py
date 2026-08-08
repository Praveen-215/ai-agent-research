import json
import re


def parse_json_response(response):

    if not response:
        return {}


    try:

        json_text = response.strip()


        # Remove markdown code blocks

        json_text = (
            json_text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )


        return json.loads(json_text)


    except json.JSONDecodeError:


        print(
            "\n⚠ JSON parsing failed. Attempting recovery..."
        )


        # Extract JSON object

        match = re.search(
            r"\{.*\}",
            response,
            re.DOTALL
        )


        if not match:

            return {}


        json_text = match.group()


        try:

            return json.loads(
                json_text
            )


        except json.JSONDecodeError:


            # Last recovery attempt:
            # escape control characters

            json_text = (
                json_text
                .replace("\n", "\\n")
                .replace("\t", "\\t")
                .replace("\r", "\\r")
            )


            try:

                return json.loads(
                    json_text
                )


            except Exception:

                return {}