### Project Manual: Setting Up and Running the Node.js Application with MongoDB

This manual provides a comprehensive guide for setting up and running a Node.js application with MongoDB. The application manages academic projects, including clients, project stages, project types, universities, and projects.

Clients is the most demanded application and App is the monolithic application

### Iu Digital - Tecnologías web



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

## How to build with docker

### Login to docker hub
```
docker login
```

### Use these commands for each app

#### Cliente
1. sudo docker build -t clienteasesorias:firstimage .

2. sudo docker run -d -p 3000:3000 clienteasesorias:firstimage

3. sudo docker tag 8d0f8abbb9a7 cesardp/asesorias-academicas:clienteasesorias-firstimage

4. sudo docker push cesardp/asesorias-academicas:clienteasesorias-firstimage

---

#### Monolithic
1. sudo docker build -t appasesorias:firstimage .
2. sudo docker run -d -p 3001:3001 appasesorias:firstimage
3. sudo docker tag 30bd1a5b2319 cesardp/asesorias-academicas:appasesorias-firstimage
4. sudo docker push cesardp/asesorias-academicas:clienteasesorias-firstimage

### Frequent issues
docker logout and login again