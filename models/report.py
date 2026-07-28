from pydantic import BaseModel


class Report(BaseModel):

    agent_name: str

    task_id: int

    reported_status: str

    progress_percent: int

    comments: str