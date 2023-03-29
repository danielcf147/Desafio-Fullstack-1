import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedUser,
  mockedUserLogin,
  mockedUser2,
  mockedUser3,
  mockedUserLogin3,
  mockedUser4,
} from "../mocks";

describe("/user", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /user -  Must be able to create a user", async () => {
    const response = await request(app).post("/user").send(mockedUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("phoneNumber");
    expect(response.body.name).toEqual("Joana");
    expect(response.body.email).toEqual("joana@mail.com");
    expect(response.body.phoneNumber).toEqual(999999999);
    expect(response.status).toBe(201);
  });

  test("POST /user -  should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/user").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /login -  should be able to login with the user", async () => {
    const response = await request(app)
      .post("/user/login")
      .send(mockedUserLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /user -  Must be able to create a user", async () => {
    const createUserResponse = await request(app)
      .post("/user")
      .send(mockedUser2);

    const userLoginResponse = await request(app)
      .post("/user/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post(`/contact/${createUserResponse.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body.message).toHaveProperty("id");
    expect(response.body.message).toHaveProperty("name");
    expect(response.body.message).toHaveProperty("email");
    expect(response.body.message).toHaveProperty("createdAt");
    expect(response.body.message).toHaveProperty("phoneNumber");
    expect(response.body.message.name).toEqual("Joao");
    expect(response.body.message.email).toEqual("joao@mail.com");
    expect(response.body.message.phoneNumber).toEqual(999999999);
    expect(response.status).toBe(201);
  });

  test("GET /user -  Must be able to list users", async () => {
    const createUserResponse = await request(app)
      .post("/user")
      .send(mockedUser3);
    const createUserResponse2 = await request(app)
      .post("/user")
      .send(mockedUser4);

    const userLoginResponse = await request(app)
      .post("/user/login")
      .send(mockedUserLogin3);

    const contactResponse = await request(app)
      .post(`/contact/${createUserResponse2.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app).get(
      `/user/${createUserResponse.body.id}`
    );

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("email");
    expect(response.body[0]).toHaveProperty("createdAt");
    expect(response.body[0]).toHaveProperty("phoneNumber");
    expect(response.body[0].name).toEqual("Luffy");
    expect(response.body[0].email).toEqual("luffy@mail.com");
    expect(response.body[0].phoneNumber).toEqual(999999999);
    expect(response.status).toBe(200);
  });
});
