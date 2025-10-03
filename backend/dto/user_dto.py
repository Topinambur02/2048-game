from typing import Optional
from fastapi_users import schemas


class UserDTO(schemas.BaseUser[int]):
    username: str
    bestScore: int
    audio_volume: int


class CreateUserDTO(schemas.BaseUserCreate):
    username: str
    bestScore: int
    audio_volume: int


class UpdateUserDTO(schemas.BaseUserUpdate):
    username: Optional[str] = None
    bestScore: Optional[int] = None
    audio_volume: Optional[int] = None
