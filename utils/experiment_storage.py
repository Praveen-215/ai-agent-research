import json
import os
from datetime import datetime


def save_experiment(result):

    os.makedirs("results", exist_ok=True)

    filename = (
        f"results/experiment_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    )

    with open(filename, "w") as file:
        json.dump(
            result.model_dump(),
            file,
            indent=4
        )

    return filename