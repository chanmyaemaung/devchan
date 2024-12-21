# Chan Portfolio Backend

A secure, scalable, multilingual personal portfolio and blog application built with NestJS.

## Features

- 🔒 **Secure Authentication & Authorization**
  - JWT-based authentication with access and refresh tokens
  - HTTP-only cookie-based token storage
  - Password hashing with Argon2
  - Role-based access control (Admin/User)
  - User session tracking (last login, IP, user agent)
- 📝 Blog Management with Multilingual Support
- 🖼️ Project Portfolio Showcase
- 💾 Cloudinary Integration for Media Storage
- 🔄 Redis Caching for Performance
- 🛡️ Rate Limiting for Security
- 📧 Email Notifications
- 💬 Comment System
- 🔖 Bookmark System
- 🌐 Multilingual Content Support

## Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- pnpm (Package Manager)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chan-portfolio-backend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration values.

4. **Start Docker Services**

   ```bash
   docker-compose up -d
   ```

   This will start PostgreSQL and Redis services.

5. **Run Database Migrations**

   ```bash
   pnpm migration:run
   ```

6. **Seed Initial Data**

   ```bash
   pnpm seed
   ```

   This will create default admin and user accounts:

   - Admin: admin@example.com / Admin@123
   - User: user@example.com / User@123

7. **Start the Application**

   ```bash
   # Development
   pnpm start:dev

   # Production
   pnpm build
   pnpm start:prod
   ```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:8000/api/docs
```

### Authentication Endpoints

- **POST /api/v1/auth/register**

  - Register a new user
  - Body: `{ "name": string, "email": string, "password": string }`

- **POST /api/v1/auth/login**

  - Login with credentials
  - Body: `{ "email": string, "password": string }`
  - Returns: Access token and sets HTTP-only cookies

- **GET /api/v1/auth/refresh**

  - Refresh access token
  - Requires: Valid refresh token cookie
  - Returns: New access token

- **POST /api/v1/auth/logout**
  - Logout user
  - Requires: Valid access token
  - Clears authentication cookies

## Environment Variables

Key environment variables needed for the application:

```env
# Application
NODE_ENV=development
PORT=8000
API_PREFIX=api/v1

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=chan_portfolio

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET=your-jwt-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=7d
```

## Docker Services

The project includes the following Docker services:

- **PostgreSQL**: Main database

  - Port: 5432 (configurable)
  - Data persistence through Docker volumes

- **Redis**: Caching and session management
  - Port: 6379 (configurable)
  - Data persistence through Docker volumes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
