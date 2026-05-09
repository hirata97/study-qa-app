from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class QuestionBase(BaseModel):
    question: str = Field(..., min_length=1)
    answer: str = Field(..., min_length=1)
    category: str | None = None


class QuestionCreate(QuestionBase):
    pass


class QuestionUpdate(BaseModel):
    question: str | None = Field(default=None, min_length=1)
    answer: str | None = Field(default=None, min_length=1)
    category: str | None = None


class QuestionRead(QuestionBase):
    id: int
    created_at: datetime = Field(serialization_alias="createdAt")
    updated_at: datetime = Field(serialization_alias="updatedAt")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
