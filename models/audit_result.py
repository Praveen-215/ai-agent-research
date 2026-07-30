from datetime import datetime
from pydantic import BaseModel, Field


class AuditResult(BaseModel):
    """
    Result produced by the Auditor Agent after comparing
    actual work against reported work.
    """

    deception_detected: bool = Field(
        default=False,
        description="Whether deception was detected."
    )

    severity: str = Field(
        default="NONE",
        description="NONE | LOW | MEDIUM | HIGH"
    )

    actual_progress: float = Field(
        default=0,
        ge=0,
        le=100
    )

    reported_progress: float = Field(
        default=0,
        ge=0,
        le=100
    )

    difference: float = Field(
        default=0,
        ge=0
    )

    explanation: str = Field(
        default=""
    )

    timestamp: datetime = Field(
        default_factory=datetime.utcnow
    )

    def summary(self) -> str:
        return (
            f"[AUDIT] "
            f"Severity={self.severity} | "
            f"Deception={self.deception_detected} | "
            f"Difference={self.difference:.1f}%"
        )

    def to_dict(self):
        return self.model_dump()