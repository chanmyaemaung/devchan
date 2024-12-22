# Chan Portfolio Backend

A secure, scalable, multilingual personal portfolio and blog application built with NestJS.

## Features

- ✅ **Secure Authentication & Authorization**
  - JWT-based authentication with access and refresh tokens
  - HTTP-only cookie-based token storage
  - Password hashing with Argon2
  - Role-based access control (Admin/User)
  - User session tracking (last login, IP, user agent)
- ✅ **Blog Management**
  - Multilingual support (English and Burmese)
  - SEO metadata management
  - Tag-based categorization
  - Featured image support
  - Draft/Published status management
  - Unique slug generation
  - Secure admin-only operations
- 💬 **Comment System** (In Progress)
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

### Implementation Progress

#### Completed Features

- ✅ Core Authentication System
- ✅ Blog Management System with Multilingual Support
- ✅ API Documentation with Swagger
- ✅ Database Schema and Migrations
- ✅ Path Aliases Configuration
- ✅ Comment System with HTTP-only Cookie Authentication

#### In Progress

- 🚧 Media Storage Integration

#### Upcoming Features

- 🔜 Project Portfolio Module
- 🔜 Redis Caching
- 🔜 Rate Limiting
- 🔜 Email Notifications
- 🔜 Bookmark System

### Blog Management

- CRUD operations for blog posts
- Multilingual support (English and Burmese)
- Rich text content with inline images
- SEO optimization
- Content organization with tags
- Image upload and management with Cloudinary
- Pagination support for blog listings
  - Customizable page size (1-50 items per page)
  - Page navigation with metadata
  - Sorting by creation/publication date

### Comment System

The comment system allows users to interact with blog posts through comments. Key features include:

- ✅ CRUD operations for comments
- ✅ Public access to view comments
- ✅ Authentication required for creating, updating, and deleting comments
- ✅ Comment ownership validation
- ✅ Pagination support for comment listings
- ✅ Transaction support for data consistency
- ✅ User-comment and blog-comment relationships
- ✅ HTTP-only cookie-based authentication

#### Comment Endpoints

- `GET /api/v1/comments/blog/:blogId` - Get all comments for a blog post (public)
- `GET /api/v1/comments/user/:userId` - Get all comments by a user (public)
- `POST /api/v1/comments` - Create a new comment (authenticated users only)
- `PATCH /api/v1/comments/:id` - Update a comment (comment owner only)
- `DELETE /api/v1/comments/:id` - Delete a comment (comment owner only)

Example usage with `curl`:

```bash
# Login and save cookies
curl -X POST "http://localhost:8000/api/v1/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"Admin@123"}' \
     -c cookies.txt

# Get comments for a blog post with pagination
curl -X GET "http://localhost:8000/api/v1/comments/blog/123e4567-e89b-12d3-a456-426614174000?page=1&limit=10"

# Create a new comment (authenticated)
curl -X POST "http://localhost:8000/api/v1/comments" \
     -H "Content-Type: application/json" \
     -b cookies.txt \
     -d '{
       "content": "This is a great article!",
       "blogId": "123e4567-e89b-12d3-a456-426614174000"
     }'

# Update a comment (comment owner only)
curl -X PATCH "http://localhost:8000/api/v1/comments/123e4567-e89b-12d3-a456-426614174000" \
     -H "Content-Type: application/json" \
     -b cookies.txt \
     -d '{
       "content": "This is an updated comment!"
     }'

# Delete a comment (comment owner only)
curl -X DELETE "http://localhost:8000/api/v1/comments/123e4567-e89b-12d3-a456-426614174000" \
     -b cookies.txt
```

#### Response Format

Comments are returned with the following structure:

```json
{
  "id": "uuid",
  "content": "string",
  "blogId": "uuid",
  "userId": "uuid",
  "isEdited": boolean,
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

For paginated responses:

```json
{
  "data": Comment[],
  "meta": {
    "total": number,
    "page": number,
    "lastPage": number,
    "hasNextPage": boolean,
    "hasPrevPage": boolean
  }
}
```

### Pagination Parameters

- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 10, max: 50)

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

### Blog Endpoints

- `GET /api/v1/blogs` - Get all published blog posts (public)
- `GET /api/v1/blogs/:identifier` - Get a blog post by ID or slug (public)
- `GET /api/v1/blogs/tags` - Get all unique tags (public)
- `POST /api/v1/blogs` - Create a new blog post (admin only)
- `PATCH /api/v1/blogs/:id` - Update a blog post (admin only)
- `DELETE /api/v1/blogs/:id` - Delete a blog post (admin only)

All blog endpoints support multilingual content (English and Burmese).

### Comment Endpoints

- `GET /api/v1/comments/blog/:blogId?page=1&limit=10` - Get comments for a blog post
- `GET /api/v1/comments/user/:userId?page=1&limit=10` - Get comments by a user
- `POST /api/v1/comments` - Create a new comment
- `PATCH /api/v1/comments/:id` - Update a comment
- `DELETE /api/v1/comments/:id` - Delete a comment

### Example Usage

```http
# Get published blog posts with pagination
GET /api/v1/blogs/published?page=1&limit=10

# Create a new blog post
POST /api/v1/blogs
{
  "title": {
    "en": "Sample Blog Post",
    "my": "နမူနာ ဘလော့ဂ် ပို့စ်"
  },
  "content": {
    "en": "Content in English",
    "my": "မြန်မာလို အကြောင်းအရာ",
    "images": [
      {
        "url": "https://example.com/image1.jpg",
        "caption": "Image Caption",
        "altText": "Alt Text"
      }
    ]
  },
  "excerpt": {
    "en": "Brief excerpt",
    "my": "အကျဉ်းချုပ်"
  },
  "slug": "sample-blog-post",
  "tags": ["sample", "test"],
  "featuredImage": "https://example.com/featured.jpg",
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

# Get comments for a blog post with pagination
GET /api/v1/comments/blog/123e4567-e89b-12d3-a456-426614174000?page=1&limit=10

# Add a comment to a blog post
POST /api/v1/comments
{
  "content": "This is a great article!",
  "blogId": "123e4567-e89b-12d3-a456-426614174000"
}
```

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

### Path Aliases

The project uses path aliases to simplify imports:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@core/*": ["src/core/*"],
      "@libs/*": ["src/libs/*"],
      "@domain/*": ["src/domain/*"],
      "@infra/*": ["src/infrastructure/*"],
      "@config/*": ["src/configs/*"]
    }
  }
}
```

This allows for cleaner imports:

```typescript
// Instead of
import { UserService } from '../../../domain/users/services/user.service';

// You can use
import { UserService } from '@domain/users/services/user.service';
```

### Migration History

The project uses TypeORM migrations to manage database schema changes:

```bash
# Initial Setup
1703116800000-CreateUsersTable.ts     # Create users table with authentication fields
1703116800001-SeedUsers.ts            # Seed initial admin and user accounts

# Blog Feature
1703150000000-CreateBlogsTable.ts     # Create blogs table with multilingual support
1703150000001-AddBlogContentImages.ts  # Add image support to blog content
1703150000002-CreateCommentsTable.ts   # Create comments table for blog posts
1703150000003-AddImageFieldsToBlog.ts  # Add featured image fields to blogs
```

To run migrations:

```bash
# Run migrations
pnpm migration:run

# Generate a new migration
pnpm migration:generate src/migrations/YourMigrationName

# Create an empty migration
pnpm migration:create src/migrations/YourMigrationName

# Revert the last migration
pnpm migration:revert
```
