from fastapi import FastAPI
from APIRouter import api_router
from fastapi.middleware.cors import CORSMiddleware

import uvicorn

app = FastAPI()

app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://192.168.1.134'
    ],
    allow_credentials=True,
    allow_methods=["POST", "GET", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
)


def main():
    uvicorn.run(app="main:app", host="0.0.0.0", port=8000, reload=True)


if __name__ == "__main__":
    main()
