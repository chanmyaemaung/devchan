# Chan Portfolio Backend

A secure, scalable, multilingual personal portfolio and blog application built with NestJS.

## Features

- 🔒 **Secure Authentication & Authorization**
  - JWT-based authentication with access and refresh tokens
  - HTTP-only cookie-based token storage
  - Password hashing with Argon2
  - Role-based access control (Admin/User)
  - User session tracking (last login, IP, user agent)
- 📝 **Blog Management**
  - Multilingual support (English and Burmese)
  - SEO metadata management
  - Tag-based categorization
  - Featured image support
  - Draft/Published status management
  - Unique slug generation
  - Secure admin-only operations
- 💬 **Comment System**
  - User authentication for commenting
  - Edit/Delete own comments
  - Comment history tracking
  - User-comment relationship
  - Blog-comment relationship
- 🖼️ Project Portfolio Showcase
- 💾 Cloudinary Integration for Media Storage
- 🔄 Redis Caching for Performance
- 🛡️ Rate Limiting for Security
- 📧 Email Notifications
- 💬 Bookmark System
- 🌐 Multilingual Content Support

### Blog Management

The blog module provides a complete set of features for managing multilingual blog posts:

#### Blog Endpoints

- `POST /api/v1/blogs` - Create a new blog post (Admin only)
- `GET /api/v1/blogs` - Get all blog posts
- `GET /api/v1/blogs/published` - Get published blog posts
- `GET /api/v1/blogs/tags` - Get blog posts by tags
- `GET /api/v1/blogs/:id` - Get a specific blog post by ID
- `GET /api/v1/blogs/slug/:slug` - Get a specific blog post by slug
- `PATCH /api/v1/blogs/:id` - Update a blog post (Admin only)
- `DELETE /api/v1/blogs/:id` - Delete a blog post (Admin only)

### Comment System

The comment system allows users to interact with blog posts through comments:

#### Comment Endpoints

- `POST /api/v1/comments` - Create a new comment (Authenticated)
- `GET /api/v1/comments/blog/:blogId` - Get all comments for a blog post
- `GET /api/v1/comments/user/:userId` - Get all comments by a user
- `GET /api/v1/comments/:id` - Get a specific comment
- `PATCH /api/v1/comments/:id` - Update own comment (Authenticated)
- `DELETE /api/v1/comments/:id` - Delete own comment (Authenticated)

#### Example Usage

```http
# Create a new blog post
POST /api/v1/blogs
{
  "title": {
    "en": "Sample Blog Post",
    "my": "နမူနာ ဘလော့ဂ် ပို့စ်"
  },
  "content": {
    "en": "Content in English",
    "my": "မြန်မာလို အကြောင်းအရာ"
  },
  "excerpt": {
    "en": "Brief excerpt",
    "my": "အကျဉ်းချုပ်"
  },
  "slug": "sample-blog-post",
  "tags": ["sample", "test"],
  "seoMetadata": {
    "title": {
      "en": "SEO Title",
      "my": "SEO ခေါင်းစဉ်"
    },
    "description": {
      "en": "SEO Description",
      "my": "SEO ဖော်ပြချက်"
    },
    "keywords": ["keyword1", "keyword2"]
  }
}

# Add a comment to a blog post
POST /api/v1/comments
{
  "content": "This is a great article!",
  "blogId": "blog-uuid-here"
}
```

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
