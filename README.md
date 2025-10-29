# Plagim - Luxury Swimming Pool Company Website

A modern web platform for Plagim swimming pool construction company, featuring Milano Design Week inspired clean aesthetics with bold typography and generous whitespace.

## Project Structure

```
plagim/
├── frontend/          # React 18 frontend application
├── backend/           # Node.js 24 backend API
├── docs/              # Project documentation
└── package.json       # Root workspace configuration
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js 24, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Cache**: Redis
- **Authentication**: Secure cookies (JWT if required)
- **Internationalization**: Hebrew & English
- **Analytics**: GA4/GTM (with consent)
- **Package Manager**: npm

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development servers:

   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:3045
   - Backend API: http://localhost:9045
   - Admin Panel: http://localhost:3045/admin

3. Build for production:
   ```bash
   npm run build
   ```

## Development Guidelines

- Follow ESLint and Prettier configurations
- Write tests for critical paths
- Use Conventional Commits
- Maintain OpenAPI documentation in `/backend/openapi.yaml`
- Ensure WCAG 2.1 AA accessibility compliance

## Security

- Never commit secrets or API keys
- Use environment variables for configuration
- Implement proper authentication and authorization
- Follow GDPR compliance for data handling

## License

MIT
