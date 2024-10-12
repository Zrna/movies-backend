# Reviews backend

## Instalation

1. Create `moovier_app` database
2. Create `.env` file - see `.env.example` in root of the project
   - insert your database credentials in `.env` file
3. Run `npm install` to install necessary npm packages
4. Run `npm run migration:run` to run db migrations
5. Run `npm start` to start the project

## Migrations

To create new migration run:

```
npm run migration:generate *table_name*
```

The created migration will appear in the `migrations` folder.

## Swagger

Swagger is running on [http://localhost:5001/api-docs](http://localhost:5001/api-docs)

# Frontend part

After installing the backend part go and install the [frontend part](https://github.com/Zrna/reviews-web) of the application for full experience.

https://github.com/Zrna/reviews-web
