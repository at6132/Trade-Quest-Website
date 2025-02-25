from fastapi import FastAPI, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Signup
from pydantic import BaseModel, EmailStr
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn

app = FastAPI()

# Load templates for admin panel
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Model for validation
class SignupRequest(BaseModel):
    full_name: str
    email: EmailStr
    age: int

# Signup Endpoint
@app.post("/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    existing_user = db.query(Signup).filter_by(email=request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = Signup(full_name=request.full_name, email=request.email, age=request.age)
    db.add(new_user)
    db.commit()
    return {"message": "Signup successful!"}

# Admin Panel - View Signups
@app.get("/admin", response_class=HTMLResponse)
def admin_panel(request: Request, db: Session = Depends(get_db)):
    users = db.query(Signup).all()
    return templates.TemplateResponse("admin.html", {"request": request, "users": users})

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ Allow all origins (Frontend can access)
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all HTTP methods (POST, GET, OPTIONS)
    allow_headers=["*"],  # ✅ Allow all headers
)

# Pydantic Model for Contact Form Submission
class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

# Contact Form Submission Endpoint
@app.post("/contact")
def submit_contact(request: ContactRequest, db: Session = Depends(get_db)):
    new_submission = ContactSubmission(
        name=request.name,
        email=request.email,
        message=request.message
    )
    db.add(new_submission)
    db.commit()
    return {"message": "Thank you for reaching out! We will get back to you soon."}


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))  # Use Railway's assigned port or default to 8000
    uvicorn.run(app, host="0.0.0.0", port=port)
