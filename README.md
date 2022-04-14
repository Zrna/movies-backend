# Movies backend

## Instalation

1. Create `reviews_app` database
2. Create `.env` file - see `example.env` in root of the project
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

https://github.com/Zrna/movies-web
