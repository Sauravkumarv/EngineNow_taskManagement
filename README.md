# Task Manager

A simple and clean task management application built with React and Node.js.

## Features

- Create, edit, and delete tasks
- Mark tasks as completed or pending
- Filter tasks by status (All, Completed, Pending)
- Sort tasks by due date or priority
- Search tasks by name
- Responsive design

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB

## Installation

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd task-manager
```

2. Install dependencies for both frontend and backend
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install


3. Create `.env` file in backend folder

MONGO_URI=your_mongodb_connection_string
PORT=5000


4. Start the application

```bash
# Backend (from backend folder)
npm start

# Frontend (from frontend folder)
npm run dev


5. Open browser and go to `http://localhost:5173`

## Project Structure

```
task-manager/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   └── package.json
└── backend/
    ├── models/
    ├── routes/
    ├── controllers/
    └── package.json
```

## API Endpoints

- `GET /api/tasks/get` - Get all tasks
- `POST /api/tasks/create` - Create new task
- `PUT /api/tasks/update/:id` - Update task
- `PATCH /api/tasks/toggle/:id` - Toggle task status
- `DELETE /api/tasks/delete/:id` - Delete task

