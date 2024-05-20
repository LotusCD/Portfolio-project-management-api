### Project Manual: Setting Up and Running the Node.js Application with MongoDB

This manual provides a comprehensive guide for setting up and running a Node.js application with MongoDB. The application manages academic projects, including clients, project stages, project types, universities, and projects.

#### Table of Contents

1. **Project Overview**
2. **Project Structure**
3. **Prerequisites**
4. **Environment Configuration**
5. **Installing Dependencies**
6. **Running the Application**
7. **Database Initialization**
8. **API Usage**

### Project Overview

The application is designed to manage academic projects. It includes the following components:

- **Clientes**: Information about clients.
- **Etapas**: Stages of a project.
- **Proyectos**: Details of projects, linking clients, project types, universities, and stages.
- **TiposProyecto**: Different types of projects.
- **Universidades**: Information about universities.

### Project Structure

The project is organized as follows:

asesorias-academicas/
├── models/ # Mongoose models
├── routes/ # Express routes
├── .env # Environment variables
├── .gitignore # Git ignore file
├── initDatabase.js # Database initialization script
├── package.json # Project metadata and dependencies
├── server.js # Main server file
└── README.md # Project manual


### Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** and **npm**: For running the application and managing dependencies.
- **MongoDB**: For storing the application data.

### Environment Configuration

Create a `.env` file in the root directory to store environment variables. Add the following:

MONGO_URI=mongodb://localhost:27017/asesorias


### Installing Dependencies

Install the necessary dependencies by running:

```sh
npm install
```

### Running the Application
To start the application, use the following command:

```sh


node server.js
The server will start on port 3000 (or another port if specified in the .env file).

```

### Database Initialization
To initialize the database with sample data, run the initDatabase.js script. This will populate the database with initial data for clients, project stages, project types, universities, and projects.

```sh

node initDatabase.js
```

### API Usage
The API provides endpoints for managing clients, project stages, projects, project types, and universities. Below is a summary of the available endpoints and their usage:

Clients (Clientes)
GET /clientes: Retrieve a list of all clients.
POST /clientes: Create a new client.
PUT /clientes/:id: Update an existing client by ID.
DELETE /clientes/:id: Delete a client by ID.
Project Stages (Etapas)
GET /etapas: Retrieve a list of all project stages.
POST /etapas: Create a new project stage.
PUT /etapas/:id: Update an existing project stage by ID.
DELETE /etapas/:id: Delete a project stage by ID.
Projects (Proyectos)
GET /proyectos: Retrieve a list of all projects, including related client, project type, university, and stage information.
POST /proyectos: Create a new project.
PUT /proyectos/:id: Update an existing project by ID.
DELETE /proyectos/:id: Delete a project by ID.
Project Types (TiposProyecto)
GET /tiposProyecto: Retrieve a list of all project types.
POST /tiposProyecto: Create a new project type.
PUT /tiposProyecto/:id: Update an existing project type by ID.
DELETE /tiposProyecto/:id: Delete a project type by ID.
Universities (Universidades)
GET /universidades: Retrieve a list of all universities.
POST /universidades: Create a new university.
PUT /universidades/:id: Update an existing university by ID.
DELETE /universidades/:id: Delete a university by ID.
Testing the API
You can test the API using tools like Postman or curl. Below are examples of how to interact with the API using curl:

## API request examples:

Get clients

```sh

curl -X GET http://localhost:3000/clientes

```

Create a new client:

```sh

curl -X POST http://localhost:3000/clientes -H "Content-Type: application/json" -d '{"nombre": "Juan Perez", "email": "juan.perez@example.com"}'
```

Update a client:

```sh

curl -X PUT http://localhost:3000/clientes/{client_id} -H "Content-Type: application/json" -d '{"nombre": "Juan Perez", "email": "juan.perez@example.com"}'
```

Delete a client:

```sh

curl -X DELETE http://localhost:3000/clientes/{client_id}
```

Replace {client_id} with the actual ID of the client you want to update or delete.