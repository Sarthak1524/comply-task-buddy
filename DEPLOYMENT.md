# Deployment Guide

This project is now ready for deployment. Here are several deployment options:

## Quick Start (Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:8080

## Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run start
```

## Docker Deployment

### Option 1: Docker Compose (Recommended)

```bash
# Build and run with docker-compose
docker-compose up -d

# Stop the application
docker-compose down
```

### Option 2: Manual Docker Build

```bash
# Build the Docker image
docker build -t complyclear-app .

# Run the container
docker run -d -p 80:80 --name complyclear complyclear-app

# Stop the container
docker stop complyclear
docker rm complyclear
```

## Static Hosting (Netlify, Vercel, etc.)

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your static hosting provider
3. Configure redirects for SPA routing (see below)

### Netlify Redirects

Create a `_redirects` file in the `public/` directory:
```
/*    /index.html   200
```

### Vercel Configuration

The project includes proper configuration for Vercel deployment.

## Environment Variables

The project currently doesn't require environment variables, but if you add any:

1. Create a `.env` file in the root directory
2. Add your variables with the `VITE_` prefix
3. Access them in your code with `import.meta.env.VITE_YOUR_VARIABLE`

## Health Check

The application includes a health check endpoint at `/health` when deployed with Docker.

## Performance Optimizations

The build includes:
- Gzip compression
- Static asset caching
- Code splitting
- Tree shaking
- Bundle optimization

## Security Headers

The nginx configuration includes security headers:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy
- Content-Security-Policy

## Troubleshooting

### Build Issues
- Ensure Node.js version 16+ is installed
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

### Runtime Issues
- Check browser console for JavaScript errors
- Verify all assets are loading correctly
- Ensure proper routing configuration for SPA

### Docker Issues
- Ensure Docker and Docker Compose are installed
- Check container logs: `docker logs <container-name>`
- Verify port availability: `netstat -tulpn | grep :80`