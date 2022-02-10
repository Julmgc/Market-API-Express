import request from "supertest";
import { createConnection, getConnection } from "typeorm";
import { listProducts } from "../../services/Product/listProducts.services";
import { User } from "../../entities";
import app from "../../app";
let TOKEN = "";

describe("User Controller Tests", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();

    await connection.close();
  });

  it("Should create a new user", async () => {
    const userData = {
      email: "mail@mail.com",
      password: "12345",
      name: "Teste",
      isAdm: true,
    };

    const response = await request(app)
      .post("/api/user")
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty("uuid");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("isAdm");

    expect(response.body.name).toBe("Teste");
    expect(response.body.password).not.toBe("123");
  });

  it("Should return users token", async () => {
    const userData = {
      email: "mail@mail.com",
      password: "12345",
    };

    const response = await request(app)
      .post("/api/login")
      .send(userData)
      .expect(200);

    expect(response.body).toHaveProperty("token");

    expect(response.body.password).not.toBe("1234");
    TOKEN = response.body.token;
  });

  it("Should be able to return the products list", async () => {
    const products = await listProducts();

    expect(products).toHaveProperty("map");
  });
  it("Should send an email to the user", async () => {
    const userData = {
      email: "mail@mail.com",
    };

    const response = await request(app)
      .post("/api/email")
      .send(userData)
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200);

    expect(response.body).toMatch("Email was sent.");
  });

  it("Should send a code to the user", async () => {
    const userData = {
      email: "mail@mail.com",
    };

    const response = await request(app)
      .post("/api/recuperar")
      .send(userData)
      .expect(200);

    expect(response.body).toMatch(
      "An email with a code to recover your password was sent."
    );
  });

  it("Should change users password", async () => {
    const userData = {
      email: "assis@gmail.com",
      code: "d825067f-c9c7-4d97-81ca-d69eb2ee4aaf",
      password: "1234",
      confirmation: "1234",
    };

    const response = await request(app)
      .post("/api/alterar_senha")
      .send(userData)
      .expect(201);

    expect(response.body).toMatch("Your password was changed.");
  });
});
