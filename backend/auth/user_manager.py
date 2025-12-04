from fastapi import Depends, Request
from config.log_config import logger
from model.user import User, get_user_db
from settings import settings
from fastapi_users import BaseUserManager, IntegerIDMixin
from service.email_service import emailService

class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = settings.SECRET_KEY

    async def on_after_forgot_password(self, user: User, token: str, request: Request | None = None):
        emailService.send_message(user.email, token)

    async def on_after_register(self, user: User, request: Request):
        logger.info(f"User {user.id} has registered.")


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
