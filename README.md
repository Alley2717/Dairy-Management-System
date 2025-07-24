# Dairy Farm Management System

A modular, Spring Boot–based web application designed to streamline dairy farm operations. Features role-based access control, comprehensive cow and health management, milk production tracking, and more. Built using MVC architecture and implemented Factory and Prototype design patterns.

---

## Features

### 1. User and Role Management
- Secure registration and login for Admin, Farmer, Vet, and Worker roles.
- Role-based dashboards and permission-based access.
- Admin panel to manage users and assign roles.

### 2. Animal Information Management
- Add, update, delete, and clone cow records.
- Store data such as breed, age, health status, and identification.

### 3. Milk Production Tracking
- Daily milk yield entries per cow.
- Historical log view and date-range filtering.
- Trend analysis and exportable production data.

### 4. Vet & Health Records
- Vaccinations, health checkups, and treatment logs.
- Generate and schedule health tasks for staff.
- Automatically update animal health status based on records.

---

## 📦 Tech Stack

- **Backend:** Java 17, Spring Boot, Spring Security, Spring Data JPA
- **Database:** MySQL
- **Frontend:** HTML/CSS
- **Architecture:** MVC pattern with layered structure (controller, service, repository)
- **Design Patterns:** Factory Pattern for user creation; Prototype Pattern for animal cloning

---




