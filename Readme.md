Certainly! Here's a documentation that provides an overview of the available APIs, their routes, the expected request formats, and the response formats:

### **Student API (`studentRouter.js`)**

#### **POST `/login`**

- **Request Payload Format:**
  ```json
  {
    "email": "student@example.com",
    "password": "studentpassword"
  }
  ```
- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** Confirmation of the login with student details and a token.

#### **POST `/changepassword`**

- **Request Payload Format:**
  ```json
  {
    "currentPassword": "currentpassword",
    "newPassword": "newpassword"
  }
  ```
- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** Confirmation of the password change.

#### **GET `/studentdetails`**

- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** Student details including subject details.

### **Check Authentication API (`checkauthRouter.js`)**

#### **GET `/`**

- **Middleware:** `isauthenticated`
- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** Authentication or authorization confirmation.

### **Calendar API (`calanderRouter.js`)**

#### **POST `/create-academic-calendar`**

- **Request Payload Format:**
  ```json
  {
    "date": "2023-10-30",
    "day": "Monday",
    "holiday": "National Holiday"
  }
  ```
- **Response Format:**
  - **Status Code:** 201 Created
  - **Response Body:** Confirmation of the academic calendar entry creation.

#### **PUT `/updateholiday`**

- **Request Payload Format:**
  ```json
  {
    "date": "2023-12-25",
    "holiday": "Christmas Day"
  }
  ```
- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** Confirmation of the academic calendar holiday update.

#### **GET `/academiccalendar`**

- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** Academic calendar entries.

### **Admin API (`adminrouter.js`)**

#### **POST `/createsubject`**

- **Request Payload Format:**
  ```json
  {
    "subject_name": "Mathematics",
    "course_code": "MATH101",
    "branch": "Science",
    "section": "A",
    "batch": "2023",
    "count": 50,
    "teacher_id": "teacher123",
    "day": ["Monday", "Wednesday"]
  }
  ```
- **Response Format:**
  - **Status Code:** 201 Created
  - **Response Body:** Confirmation of the subject creation.

#### **POST `/updatesubject/:id`**

- **Request Payload Format:**
  ```json
  {
    "subject_name": "Updated Mathematics",
    "batch": "2024",
    "count": 60
  }
  ```
- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** Confirmation of the subject update.

#### **DELETE `/deletesubject/:id`**

- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** Confirmation of the subject deletion.

#### **POST `/createteacher`**

- **Request Payload Format:**
  ```json
  {
    "teacher_id": "teacher123",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone_no": "123-456-7890",
    "subjects": [
      { "subject_id": "subject123", "permission": "write" }
    ],
    "password": "teacherpassword"
  }
  ```
- **Response Format:**
  - **Status Code:** 201 Created
  - **Response Body:** Confirmation of the teacher creation.

#### **POST `/updateteacher/:id`**

- **Request Payload Format:**
  ```json
  {
    "name": "Updated John Doe",
    "email": "updatedjohndoe@example.com"
  }
  ```
- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** Confirmation of the teacher update.

#### **DELETE `/deleteteacher/:id`**

- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** Confirmation of the teacher deletion.

#### **POST `/createstudent`**

- **Request Payload Format:**
  ```json
  {
    "name": "Alice",
    "enrollment_no": "2023001",
    "scholar_no": "SCH2023",
    "email": "alice@example.com",
    "phone_no": "987-654-3210",
    "branch": "Science",
    "section": "A",
    "batch": "2023",
    "password": "studentpassword"
  }
  ```
- **Response Format:**
  - **Status Code:** 201 Created
  - **Response Body:** Confirmation of the student creation.

#### **PUT `/updatestudent/:id`**

- **Request Payload Format:**
  ```json
  {
    "name": "Updated Alice",
    "email": "updatedalice@example.com"
  }
  ```
- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** Confirmation of the student update.

#### **DELETE `/deletestudent/:id`**

- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** Confirmation of the student deletion.

#### **GET `/allsubjects`**

- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** List of all subjects.

#### **GET `/allstudents`**

- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** List of all students.

#### **GET `/allteachers`**

- **Response Format:**
  - **Status Code:** 200 OK
  - **Response Body:** List of all teachers.

This documentation outlines the routes, request payload formats, and expected response formats for each API in your system. Please note that the actual API implementation should match these specifications.