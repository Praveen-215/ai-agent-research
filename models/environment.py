from enum import Enum


class PressureLevel(str, Enum):
    LOW = "LOW"
    NORMAL = "NORMAL"
    HIGH = "HIGH"
    IMPOSSIBLE = "IMPOSSIBLE"