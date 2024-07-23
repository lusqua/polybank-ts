# How to Run the Vite-GraphQL Project

This guide explains how to set up and run the Vite-GraphQL project, which uses Vite, React, and Relay.

## Prerequisites

Make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Project Setup

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/lusqua/vite-graphql.git
cd vite-graphql
```

### 2. Install Dependencies

Install the project dependencies using npm or Yarn:

```bash
# Using npm
npm install

# Using Yarn
yarn install
```

### 3. Relay Configuration

Ensure your GraphQL server is running and properly configured. Adjust the GraphQL endpoint URL in the Relay configuration file (`src/RelayEnvironment.ts`) if necessary.

### 4. Run the Project

Run the project in development mode:

```bash
# Using npm
npm run dev

# Using Yarn
yarn dev
```

Open your browser and navigate to `http://localhost:5173` to see the application running.

## Available Scripts

- `dev`: Starts the development server.
- `build`: Builds the project for production.
- `serve`: Serves the built application for production.
- `lint`: Runs the linter to check for code formatting and style errors.

## Project Structure

An overview of the project structure:

```
vite-graphql/
├── public/                   # Public files
├── src/                      # Application source code
│   ├── components/           # React components
│   ├── routes/               # Route pages
│   ├── lib/                  # Util scripts
│   ├── index.css/            # Global CSS styles
│   ├── main.tsx              # Entry file
│   ├── RelayEnvironment.ts   # Relay environment and configuration
│   └── schema.graphql        # GraphQL schema
├── index.html                # Main HTML template
├── package.json              # npm configuration file
├── tsconfig.json             # ts configuration file
├── postcss.json              # postcss configuration file
├── components.json           # shadcn components configuration file
└── vite.config.ts            # Vite configuration
```

Feel free to open an issue if you encounter any problems or have any questions.
