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

  let token = "";
  let userId = "";
  let productId = "";
  let cartId = "";
  let orderId = "";

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

    userId = response.body.uuid;

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
    token = response.body.token;
  });

  it("Should return an user profile", async () => {
    const response = await request(app)
      .get(`/api/user/${userId}`)

      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("createdOn");
    expect(response.body).toHaveProperty("updatedOn");
    expect(response.body.name).toBe("Teste");
  });

  it("Should return a list with all users", async () => {
    const response = await request(app)
      .get(`/api/user`)

      .set({ Authorization: `Bearer ${token}` });

    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: userId })])
    );

    expect(response.status).toBe(200);
  });

  it("Should create a new product", async () => {
    const userData = {
      name: "string",
      price: 10,
      description: "string",
    };

    const response = await request(app)
      .post("/api/product")
      .send(userData)
      .set({ Authorization: `Bearer ${token}` });

    productId = response.body.id;

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
  });

  it("Should return a specific product data", async () => {
    const response = await request(app)
      .get(`/api/product/${productId}`)

      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body.name).toBe("string");
  });

  it("Should put a product in the users cart", async () => {
    const userData = {
      productId: productId,
    };

    const response = await request(app)
      .post("/api/cart")
      .send(userData)
      .set({ Authorization: `Bearer ${token}` });

    cartId = response.body.cart.id;

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("cart");
    expect(response.body.total).toBe(10);
  });

  it("Should return a list with all carts", async () => {
    const response = await request(app)
      .get(`/api/cart`)

      .set({ Authorization: `Bearer ${token}` });

    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: cartId })])
    );

    expect(response.status).toBe(200);
  });

  it("Should return a specific cart data", async () => {
    const response = await request(app)
      .get(`/api/cart/${cartId}`)

      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("cart");
    expect(response.body.total).toBe(10);
    expect(response.body.cart.id).toBe(cartId);
  });

  it("Should create an order", async () => {
    const response = await request(app)
      .post("/api/buy")
      .set({ Authorization: `Bearer ${token}` });

    orderId = response.body.Order.id;

    await expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("Order");
    expect(response.body.Order.userId).toBe(userId);
    expect(response.body.total).toBe(10);
  });

  it("Should return a list with all orders", async () => {
    const response = await request(app)
      .get(`/api/buy`)

      .set({ Authorization: `Bearer ${token}` });

    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: orderId })])
    );

    expect(response.status).toBe(200);
  });

  it("Should return a specific order data", async () => {
    const response = await request(app)
      .get(`/api/buy/${orderId}`)

      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body.Order.id).toBe(orderId);
  });

  it("Should send a generic email", async () => {
    const userData = {
      text: "Hi! We would love to know your opinion about our store.",
      subject: "Customers opinion",
      email: "mail@mail.com",
    };

    const response = await request(app)
      .post(`/api/email`)
      .send(userData)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
    expect(response.body).toBe("Email was sent.");
  });

  it("Should send an email with a code to the user", async () => {
    const userData = {
      email: "mail@mail.com",
    };

    const response = await request(app).post(`/api/recuperar`).send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toBe(
      "An email with a code to recover your password was sent."
    );
  });
});
