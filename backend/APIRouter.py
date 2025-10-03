from fastapi import APIRouter
from auth.auth_router import auth_router
from controller.user_controller import user_router

api_router = APIRouter(prefix="/api")

api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(user_router, prefix="/users", tags=["users"])
