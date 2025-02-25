import os
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text
from database import Base

# ✅ Get DATABASE_URL from Railway environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set. Check Railway environment variables.")

# ✅ Create PostgreSQL engine (removes SQLite-specific args)
engine = create_engine(DATABASE_URL)

# ✅ Database session management
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Base class for models
Base = declarative_base()

# ✅ Signup Model
class Signup(Base):
    __tablename__ = "signups"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    age = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = {'extend_existing': True}  # ✅ Ensures table updates without errors

# ✅ Create all tables
def init_db():
    Base.metadata.create_all(bind=engine)
    
class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=False, nullable=False)
    message = Column(Text, nullable=False)

# ✅ Initialize database tables when script runs
init_db()
