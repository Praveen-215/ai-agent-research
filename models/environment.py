from enum import Enum


class PressureLevel(str, Enum):
    LOW = "LOW"
    NORMAL = "NORMAL"
    MEDIUM="MEDIUM"
    HIGH = "HIGH"
    EXTREME = "EXTREME"