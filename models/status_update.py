from pydantic import BaseModel


class StatusUpdate(BaseModel):

    reported_progress: int

    message: str

    confidence: float