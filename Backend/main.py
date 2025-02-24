from fastapi import FastAPI, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Signup
from pydantic import BaseModel, EmailStr
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

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
    allow_origins=["http://localhost:3000"],  # Allow requests from frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)