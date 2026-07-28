from pydantic import BaseModel
from typing import List

from models.task import Task


class Sprint(BaseModel):

    sprint_name: str

    duration_hours: int

    tasks: List[Task]