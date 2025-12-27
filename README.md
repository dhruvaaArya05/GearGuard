# 🛠️ GearGuard – The Ultimate Maintenance Tracker

GearGuard is a full-stack web application built for the **Odoo Hackathon** to manage equipment maintenance requests using a Kanban-style workflow. It helps managers, technicians, and users collaborate efficiently to track issues and ensure equipment health.

---

## 🚀 Features

### 👥 Authentication & Roles
- Secure Login & Signup
- Role-based access:
  - **User** – Raise maintenance requests
  - **Technician** – Assign and resolve requests
  - **Manager** – Manage equipment & oversee operations
- Password validation with strength rules
- Hashed passwords using bcrypt

### 🧾 Maintenance Requests (Kanban)
- Create maintenance requests
- Drag & drop between stages:
  - **New → In Progress → Done → Scrap**
- Auto-assign on drag or “Assign to me”
- Shows technician name instead of ID
- Real-time status updates

### 🏭 Equipment Management
- Add equipment (Manager only)
- View equipment list
- Equipment marked **Scrapped** when a request moves to Scrap
- Prevent new requests for scrapped equipment

### 🧠 Smart Logic
- No auto assignment on request creation
- Scrap stage marks equipment as unusable
- Role-based UI controls

### 🎨 UI/UX
- Clean Kanban board
- Odoo-inspired layout
- Status indicators & alerts
- Responsive design

---


🧪 Demo Flow
Signup/Login

Manager adds equipment

User creates maintenance request

Technician assigns and works on request

Drag to Scrap → equipment marked unusable

View updates across system

-----

## 🧑‍💻 Tech Stack

**Frontend**
- React
- Fetch API
- CSS

**Backend**
- Node.js
- Express.js

**Database**
- MySQL

- ---

## 📁 Project Structure

root/
│
├── backend/
│ ├── routes/
│ │ ├── auth.js
│ │ ├── requests.js
│ │ └── equipment.js
│ ├── models/
│ │ └── db.js
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── services/api.js
│ │ └── App.js
│ └── ...
│
└── README.md

## Database Schema
users (
  id PK,
  name,
  avatar_url,
  role ENUM('manager','technician','user')
);

teams (
  id PK,
  name
);

team_members (
  id PK,
  team_id FK,
  user_id FK
);

equipment (
  id PK,
  name,
  serial_no,
  department,
  owner_name,
  purchase_date,
  warranty_upto,
  location,
  team_id FK,
  default_technician_id FK,
  is_scrapped BOOLEAN DEFAULT false
);

requests (
  id PK,
  subject,
  type ENUM('corrective','preventive'),
  equipment_id FK,
  team_id FK,
  assigned_to FK,
  scheduled_date DATE,
  duration_hours INT,
  status ENUM('New','In Progress','Repaired','Scrap'),
  created_at
);

## ✅ What This Gives You

✔ Clear normalized schema  
✔ Foreign keys for integrity  
✔ Business logic supported (Scrap → unusable)  
✔ Ready for judging/demo  
✔ Easy setup for anyone cloning repo 


---

## ⚙️ Setup Instructions

### 🔹 Prerequisites
- Node.js
- MySQL
- Git

---

### 🔹 Backend Setup

cd gearguard-backend
npm install
node app.js

## Frontend Setup
cd gearguard-frontend
cd gearGuard
npm install
npm run dev



## 🤝 Team
- Dhruva Arya - Full Stack Developer

