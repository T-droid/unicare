# unicare backend service - RESTful APIs using Node.js,Typescript, Express, and drizzle.


- Node
- Typescript
- Express
- Drizzle (Postgres)



## Quick start

Install the dependencies:

```sh
npm install
```

Set the environment variables:

```sh
cp .env.example .env

```
## Getting started

```sh
npm install

npm run build-ts

npm start

```

## For development

```sh
npm install

npm run dev

```

## Sample .ENV
```sh
# ------ Node Environment : development / staging / stable / production
NODE_ENV=development

# ------ App Environment : local / staging / live
APP_ENV=local
PORT=3001

DB_HOST=localhost
DB_NAME=name
DB_PORT=3306
DB_TYPE=postgres
DB_USER=username
DB_PASSWORD=password

JWT_EXPIRY_HOUR=168
JWT_SECRET=220bb3bea2a4d37a4a30a1bb654f59378ea0dba8db1134ad1f1e06c320d3beb2

MAIL_SERVICE=test
MAIL_HOST=test
MAIL_USER=test
MAIL_PASS=test
MAIL_FROM=email@gmail.com
MAIL_PORT=2525
```




## Commands


```bash
# run in development
npm run dev

# run in production
npm run start

#  lint files
npm run lint

#  format files
npm run format

```
## Project Structure

```
dist\               # js files
src\
        |--config\              # Environment variables and configuration related things
        |--controllers\         # Route controllers
        |--helpers\             # Helper function files
        |--db\                          # Database connection
          |--migrations\  # Database migrations
          |--seeders\             # Database seeders
    |--middlewares\             # Custom express middlewares
    |--model\           #  models
    |--routes\          # Routes
    |--services\        # Service
    |--utils\           # Utility classes and functions
    |--validations\     # Request data validation schemas
    |--app.ts\          # Express app
    |--server.ts\       # App entry point
```

**User routes**: <br>
`GET api/v1/user` - get user info <br>

## Inspirations
- [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate)
- [microsoft/typescript-node-starter](https://github.com/microsoft/TypeScript-Node-Starter)
