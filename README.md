# Chan Portfolio Backend

A secure, scalable, multilingual personal portfolio and blog application built with NestJS.

## Features

- 🔒 Secure Authentication & Authorization
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

6. **Start the Application**

   ```bash
   # Development
   pnpm start:dev

   # Production
   pnpm build
   pnpm start:prod
   ```

## Environment Variables

Key environment variables needed for the application:

```env
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=chan_portfolio
POSTGRES_PASSWORD=chan_portfolio_password
POSTGRES_DB=chan_portfolio_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Additional configurations for JWT, Cloudinary, and Email are required
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api/docs
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
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
