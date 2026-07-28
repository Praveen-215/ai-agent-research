from pydantic import BaseModel
from typing import Optional


class Task(BaseModel):
    id: int

    title: str

    description: str

    priority: str

    estimated_hours: int

    assigned_to: Optional[str] = None

    status: str = "Pending"

    completed: bool = False