from fastapi import FastAPI, Path, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Optional, Dict
import uvicorn

app = FastAPI()

students: Dict[int, Dict[str, str]] = {
    1: {"name": "Saman", "age": 20, "course": "Python"},
    2: {"name": "Alex", "age": 22, "course": "JavaScript"},
    3: {"name": "Maria", "age": 20, "course": "Python"},
    4: {"name": "John", "age": 23, "course": "Java"},
}

class Student(BaseModel):
    name: str = Field(..., title="Name of the student", min_length=1)
    age: int = Field(..., title="Age of the student", ge=1)
    course: str = Field(..., title="Course enrolled by the student", min_length=1)

@app.get("/")
def index():
    return {"message": "Hello World"}

@app.get("/get-student/{student_id}")
def get_student(student_id: int = Path(..., description="The ID of the student you want to view")):
    student = students.get(student_id)
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@app.get("/students/")
def get_students(age: Optional[int] = Query(None, description="Filter students by age"),
                 course: Optional[str] = Query(None, description="Filter students by course")):
    filtered_students = []
    
    for student_id, student in students.items():
        if age is not None and student["age"] != age:
            continue
        if course is not None and student["course"] != course:
            continue
        filtered_students.append(student)
    
    return filtered_students

@app.get("/student-details/{student_id}")
def get_student_details(student_id: int = Path(..., description="The ID of the student you want to view"),
                        course: Optional[str] = Query(None, description="Filter by course")):
    student = students.get(student_id)
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    
    if course is not None and student["course"] != course:
        raise HTTPException(status_code=404, detail=f"Student with ID {student_id} is not enrolled in {course}")

    return student

@app.post("/add-student/", status_code=201)
def add_student(student: Student):
    # Check if student name already exists
    for existing_student in students.values():
        if existing_student["name"] == student.name:
            raise HTTPException(status_code=400, detail="Student with this name already exists")

    # Generate new student ID
    new_id = max(students.keys()) + 1
    students[new_id] = student.dict()

    return {"id": new_id, "student": students[new_id]}

@app.put("/update-student/{student_id}")
def update_student(student_id: int, updated_student: Student):
    if student_id not in students:
        raise HTTPException(status_code=404, detail="Student not found")

    # Check if the updated student name already exists for a different student ID
    for sid, existing_student in students.items():
        if sid != student_id and existing_student["name"] == updated_student.name:
            raise HTTPException(status_code=400, detail="Another student with this name already exists")

    students[student_id] = updated_student.dict()
    return {"id": student_id, "student": students[student_id]}

@app.delete("/delete-student/{student_id}", status_code=204)
def delete_student(student_id: int = Path(..., description="The ID of the student you want to delete")):
    if student_id not in students:
        raise HTTPException(status_code=404, detail="Student not found")

    del students[student_id]
    return {"message": "Student deleted successfully"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)