from pydantic import BaseModel


class WorkDecision(BaseModel):
    actual_progress: int
    reasoning: str
    confidence: float