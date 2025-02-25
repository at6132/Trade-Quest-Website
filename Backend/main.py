from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base, Signup
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# CORS Middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Model for Signup Request
class SignupRequest(BaseModel):
    full_name: str
    email: EmailStr

# Pydantic Model for Contact Request
class ContactRequest(BaseModel):
    full_name: str
    email: EmailStr
    message: str

# ✅ Signup Endpoint
@app.post("/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    existing_user = db.query(Signup).filter(Signup.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered.")

    new_user = Signup(full_name=request.full_name, email=request.email)
    db.add(new_user)
    db.commit()
    return {"message": "Signup successful!"}

# ✅ Contact Form Endpoint
@app.post("/contact")
def submit_contact(request: ContactRequest, db: Session = Depends(get_db)):
    new_contact = Signup(full_name=request.full_name, email=request.email, message=request.message)
    db.add(new_contact)
    db.commit()
    return {"message": "Contact form submitted successfully!"}
