const developmentEnv = {
  type: "postgres",

  host: process.env.PG_HOST,

  port: "5432",

  database: process.env.PG_DB,

  username: process.env.PG_USER,

  password: process.env.PG_PASSWORD,

  entities: ["./src/entities/**/*.ts"],

  migrations: ["./src/database/migrations/*.ts"],

  logging: false,

  synchronize: true,

  cli: {
    migrationsDir: "./src/database/migrations",
  },
};

const testEnv = {
  type: "sqlite",
  database: ":memory:",
  entities: ["./src/entities/**/*.ts"],
  synchronize: true,
};
// ALTERAR OS IFS QUANDO FIZER O DEPLOY, TEM QUE ACRESCENTAR A OPÇÃO DE ESTAR EM PRODUÇÃO

let exportModule = undefined;
if (process.env.NODE_ENV === "test") {
  exportModule = testEnv;
} else {
  exportModule = developmentEnv;
}

module.exports = exportModule;
