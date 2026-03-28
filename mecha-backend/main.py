from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.auth import router as auth_router
from api.vault import router as vault_router 
from api.extensions import router as extensions_router

app = FastAPI(title="Mecha Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modular Routers
app.include_router(auth_router)
app.include_router(vault_router) 
app.include_router(extensions_router)

@app.get("/")
async def root():
    return {"message": "Mecha Engine Online"}