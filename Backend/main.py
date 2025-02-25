from fastapi import FastAPI, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base, Signup
from pydantic import BaseModel, EmailStr
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Load templates
templates = Jinja2Templates(directory="templates")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Contact Form Request Model
class ContactRequest(BaseModel):
    full_name: str
    email: EmailStr
    message: str

# Contact Form Endpoint (Saves messages to DB)
@app.post("/contact")
def submit_contact(request: ContactRequest, db: Session = Depends(get_db)):
    new_contact = Signup(full_name=request.full_name, email=request.email, message=request.message)
    db.add(new_contact)
    db.commit()
    return {"message": "Contact form submitted successfully!"}

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
