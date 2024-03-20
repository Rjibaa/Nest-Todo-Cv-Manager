# Nest Todo & CV Manager

This repository contains the backend code for managing todos and CVs using NestJS framework. It includes modules for todo management, CV CRUD operations, and middleware for authentication simulation.

## Modules

### CommonModule

- A frequently used module providing common functionalities.
- Includes a function `uuid` for generating UUIDs.
- Contains modules and services for testing purposes.

### Todo Module

- Manages todo items in the application.
- Provides functionalities for adding, updating, and deleting todos.
- Includes API endpoints for retrieving todos and obtaining counts for each status.

### CV Module

- Implements CRUD operations for CVs.
- Includes functionalities for creating, reading, updating, and deleting CVs.
- Utilizes middleware for simulating an authentication process.

## Entity Setup

### TodoEntity

- Represents todo items in the database.
- Configured with TypeORM to manage fields such as `createdAt`, `updatedAt`, and `deletedAt`.
- Includes constraints and custom error messages for adding and updating todos.

### CV Entity

- Represents CVs in the application.
- Manages fields such as `name`, `title`, `description`, etc.
- Includes relationships and associations as needed.

## Middleware

- Implements middleware to simulate an authentication process.
- Checks for the existence of a `auth-user` header containing a JWT token.

## Standalone Application for Database Seeding

- Provides a standalone Nest application layer for seeding the database.
- Allows for easy initialization of the database with initial data.

## Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/Rjibaa/nest-todo-cv-manager.git.
   ```
2. Install dependencies:
   ```bash
   $ cd nest-todo-cv-manager
   $ npm install
   ``` 
3. Start the backend server:
   ```bash
   $ npm start
   ```
4. Seed the database:
   ```bash
   $ npm run seed
   ```
5. Access the API endpoints for managing todos and CVs as needed.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, feel free to open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to NestJS for providing a robust framework for building scalable applications.
- Special thanks to all contributors who helped in the development of this project.
