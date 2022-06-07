# Technical Challenge
The project aims to implement the requirements requested in the Nutcach - BackEnd Teste file. 
The technologies chosen were selected to facilitate and accelerate delivery.

## .NET 5 / ReactJS App
This app is a application using .NET 5 for a REST/JSON API server and React for a web client.


## Overview of Stack
- Server
  - .NET 5
  - SQL Server
  - Entity Framework Core w/ EF Migrations
  - JSON Web Token (JWT) authorization
  - React 17
  - Fetch API for REST requests

## Setup

1. Install the following:
   - [.NET 5](https://www.microsoft.com/net/core)
   - [Node.js >= v8](https://nodejs.org/en/download/)
2. Run `npm install && npm start`
3. Open browser and navigate to [http://localhost:3000](http://localhost:3000).

This app was developed and tested on Windows 10 but should run on Mac (for development) as well.

## Scripts

### `npm install`

When first cloning the repo or adding new dependencies, run this command.  This will:

- Install Node dependencies from package.json
- Install .NET Core dependencies from API/API.csproj (using dotnet restore)

### `npm start`

To start the app for development, run this command.  This will:

- Run `dotnet watch run` which will build the app (if changed), watch for changes and start the web server on http://localhost:5000
- Run Webpack dev middleware with HMR via [ASP.NET JavaScriptServices](https://github.com/aspnet/JavaScriptServices)

### `npm run migrate`

After making changes to Entity Framework models in `Domain/`, run this command to generate and run a migration on the database.  A timestamp will be used for the migration name.

## Visual Studio Code config

This project has [Visual Studio Code](https://code.visualstudio.com/) tasks and debugger launch config located in .vscode/.
