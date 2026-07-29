from pydantic import BaseModel


class Report(BaseModel):
    agent_name: str

    task_id: int

    task_title: str

    actual_progress: int

    reported_progress: int

    status: str

    comments: str

    truthful: bool