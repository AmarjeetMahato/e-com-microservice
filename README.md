# 🛒 E-Commerce Microservices
A production-ready microservices architecture for managing Categories, Products, and Product Items with Redis caching and Docker support.


## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [API Routes](#-api-routes)
- [Setup & Installation](#-setup--installation)
- [Environment Variables](#-environment-variables)
- [Running with Docker](#-running-with-docker)
- [CI/CD](#-cicd)
- [Future Improvements](#-future-improvements)


## ✨ Features
- Category, Product & ProductItem microservices
- Redis caching for blazing-fast responses
- PostgreSQL database with pgAdmin support
- NGINX as API Gateway
- Dockerized setup for easy deployment
- TypeScript + Express backend


## ⚡ Tech Stack
- **Backend:** Express.js + TypeScript
- **Database:** PostgreSQL + pgAdmin
- **Cache:** Redis
- **Containerization:** Docker, Docker Compose
- **Reverse Proxy:** NGINX
- **Validation:** JOI + Middleware
- **Dependency Injection:** tsyringe
- **CI/CD:** GitHub Actions (ready to plug in)

## 🏗️ Architecture
- Category Service → Redis (cache) → PostgreSQL
- Product Service → Category Service + PostgreSQL
- Product Item Service → Product Service
- NGINX → Acts as API Gateway

![Architecture Diagram](docs/architecture.png)



## 📡 API Routes
### Category Service (`/api/v1/category`)
- POST `/create`
- GET `/get-category/:id`
- GET `/get-all-category`
- PATCH `/:id/update`
- DELETE `/:id/delete`

### Product Service (`/api/v1/product`)
- POST `/create`
- GET `/fetchAll`
- GET `/:id`
- PATCH `/:id/update`
- DELETE `/:id/delete`
- Product Item Endpoints (`/api/v1/productItem`)

## ⚙️ Setup & Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/ecom-microservices.git
   cd ecom-microservices

cd category-service && npm install
cd product-service && npm install

docker-compose up --build


---

### 8. **# Environment Variables**
```md
## 🔑 Environment Variables
Create `.env` files inside each service:

### category-service/.env

## 🔮 Future Improvements
- Add User & Auth service
- Payment microservice
- Event-driven communication with Kafka
- gRPC support for inter-service calls




