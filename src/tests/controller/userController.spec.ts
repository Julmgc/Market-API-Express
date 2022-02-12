import request from "supertest";
import { createConnection, getConnection } from "typeorm";
import { listProducts } from "../../services/Product/listProducts.services";
import { User } from "../../entities";
import app from "../../app";

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
});
