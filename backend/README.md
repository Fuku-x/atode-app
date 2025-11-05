# Atode Backend

Backend API for the Atode task management application, built with NestJS, TypeORM, and MySQL.

## 🚀 Features

- RESTful API endpoints
- TypeScript support
- Database integration with TypeORM
- Environment-based configuration
- Input validation using class-validator
- Unit and E2E testing setup

## 🛠️ Prerequisites

- Node.js (v18 or later)
- npm (v9 or later) or yarn
- MySQL (v8.0 or later)

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/atode-app.git
   cd atode-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Copy the example environment file and update the values:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database credentials and other configurations.

4. **Database setup**
   - Create a MySQL database
   - Update the database configuration in `.env`
   - Run database migrations (if any)

## 🏃‍♂️ Running the Application

### Development
```bash
# Start in development mode with hot-reload
npm run start:dev

# Start in debug mode
npm run start:debug
```

### Production
```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🧰 Development Tools

- **Linting**: `npm run lint`
- **Code Formatting**: `npm run format`
- **Debugging**: Use VS Code debug configuration or `npm run start:debug`

## 📦 Dependencies

- **@nestjs/common**: Core NestJS framework
- **typeorm**: ORM for database interactions
- **mysql2**: MySQL database driver
- **class-validator**: Validation decorators
- **class-transformer**: Object transformation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

Project Link: [https://github.com/your-username/atode-app](https://github.com/your-username/atode-app)
