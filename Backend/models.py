from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class Signup(Base):
    __tablename__ = "signups"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    age = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = {"extend_existing": True}  # ✅ Ensures table isn't redefined
