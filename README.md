# GateKeeper: Auth-as-a-Service Platform

GateKeeper is a modern **Authentication-as-a-Service** platform built to simplify authentication, authorization and access management for modern applications.

It provides secure Google OAuth authentication, project-based role management, API key management, audit logging and centralized access control through a clean web dashboard.

---

## Getting Started

### Prerequisites

Before running GateKeeper, ensure you have the following installed:

- Java 21+
- Node.js 18+
- PostgreSQL
- Maven
- Git

---

### Clone the Repository

```bash
git clone https://github.com/yourusername/gatekeeper.git

cd gatekeeper
```

---

### Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a PostgreSQL database and update your application configuration with your database credentials.

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend will be available at:

```text
http://localhost:8081
```

---

### Frontend Setup

Open a new terminal.

```bash
cd frontend

npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

### Authentication

GateKeeper currently supports:

- Google OAuth 2.0 Login
- JWT Authentication

After logging in, authenticated users can:

- Create and manage projects
- Invite team members
- Assign project roles
- Generate API keys
- Monitor audit logs
- Access project analytics

---

### Project Structure

```
gatekeeper
│
├── backend
│   ├── auth
│   ├── audit
│   ├── apikey
│   ├── dashboard
│   ├── jwt
│   ├── project
│   ├── security
│   └── ...
│
├── frontend
│   ├── app
│   ├── components
│   ├── types
│   └── ...
│
└── README.md
```

---

### Running the Application

Start the backend first:

```bash
mvn spring-boot:run
```

Then start the frontend:

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:3000
```

You're now ready to use GateKeeper.

## Features

### Authentication

- Google OAuth 2.0 Login
- JWT Authentication
- Secure token validation
- Protected API routes

### Project Management

- Create and manage projects
- Project ownership
- Invite members by email
- Role Based Access Control (RBAC)

### Team Access

- Owner
- Admin
- Developer
- Viewer

Update member roles or remove members with a single click.

### API Key Management

- Create project API keys
- Delete compromised keys
- Track usage history
- View key inventory across projects

### Audit Logs

Track every important action including:

- Project creation
- Member additions
- Role updates
- API key creation
- API key deletion

Search, filter and analyze activity from one place.

### Dashboard

Centralized overview of:

- Total Projects
- API Keys
- Audit Events
- Recent Activity

---

##  Security Features

GateKeeper is built with security as a core design principle, providing multiple layers of authentication and authorization to protect user data and project resources.

- **Google OAuth 2.0 Authentication** for secure third-party sign in
- **JWT-based Authentication** for protecting REST API endpoints
- **Role-Based Access Control (RBAC)** with Owner, Admin, Developer and Viewer roles
- **Project-Level Authorization** ensuring users can only access projects they belong to
- **BCrypt Password Hashing** for securely storing user credentials
- **API Key Authentication** for authenticating client applications
- **Audit Logging** to track security-sensitive actions across the platform
- **Spring Security** integration for endpoint protection
- **Protected REST APIs** with authentication filters
- **Request Rate Limiting** to help mitigate abuse and excessive API usage

---

# Built With
- Spring Boot
- Spring Security
- OAuth 2.0
- JWT Authentication
- Maven
- Next.js
- React
- TypeScript
- Tailwind CSS
- PostgreSQL

---

