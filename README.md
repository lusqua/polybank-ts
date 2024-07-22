# How to Run the GraphQL Infra Project

This guide explains how to set up and run the GraphQL Infra project, which involves infrastructure setup for a GraphQL service.

## Prerequisites

Make sure you have the following tools installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)
- [Bash](https://www.gnu.org/software/bash/)

## Project Setup

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/lusqua/graphql-infra.git
cd graphql-infra
```

### 2. Initialize and Update Submodules

If the repository uses submodules, initialize and update them:

```bash
git submodule update --init --recursive
```

### 3. Add Local Hosts

To add local hosts entries, navigate to the `scripts` directory and run the `add_hosts.sh` script:

```bash
cd scripts
chmod +x setup-hosts.sh
./add_hosts.sh
```

The script will add the following entries to your `/etc/hosts` file:

```
127.0.0.1 api.polybank.localhost
127.0.0.1 app.polybank.localhost
```

### 4. Build and Run the Containers

Use Docker Compose to build and run the containers:

```bash
docker-compose up --build
```

This command will build the Docker images and start the services defined in the `docker-compose.yml` file.

### 5. Access the Application

Once the containers are running, you can access the application:

- **GraphQL Endpoint**: [http://api.polybank.localhost/graphql](http://api.polybank.localhost/graphql)
- **Application**: [http://app.polybank.localhost](http://app.polybank.localhost)

## Available Docker Commands

- **Start Containers**: `docker-compose up -d`
- **Stop Containers**: `docker-compose down`
- **Rebuild Containers**: `docker-compose up --build`
- **View Logs**: `docker-compose logs -f`
- **Execute Command in Container**: `docker-compose exec <service_name> <command>`

### Examples:

```bash
# Start the containers
docker-compose up -d

# Stop the containers
docker-compose down

# Rebuild the containers
docker-compose up --build -d

# View logs
docker-compose logs -f

# Execute a command in a container
docker-compose exec app bash
```

Feel free to open an issue if you encounter any problems or have any questions. Happy coding! 🚀
