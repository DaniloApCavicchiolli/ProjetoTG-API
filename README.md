# ProjetoTg-API


## Getting Startted
Follow this instructions to get a copy of this project in your local env to develop.

###  Tools
To run the project you will need:
- [NodeJS](https://nodejs.org/en/download/)
- [mariadb](https://mariadb.org/) or [mysql](https://www.mysql.com/)

### Installing Dependencies
Clone this repo:
```sh
git clone https://github.com/DaniloApCavicchiolli/ProjetoTg-API.git
cd ProjetoTg-API
```

You can use npm to this task, but it is recommended to use [Yarn](https://yarnpkg.com/). To install it:
```sh
npm install -g yarn
```

Then, install projects dependencies:
```
yarn
```

### Database
You need to be running [mariadb](https://mariadb.org/) or [mysql](https://www.mysql.com/) locally

To create the database:
```
npx sequelize-cli db:create
```
Running Migrations:
```
npx sequelize-cli db:migrate
```

If you want to create a migration
```
npx sequelize-cli migration:generate --name nome-migration
```