import request from "supertest";
import app from "../server.js";

describe("GET /", () => {
  it("should respond with a JSON object containing 'Hello worldss'", async () => {
    const response = await request(app).get("/"); //this simulates a request equivalent to a client sending a request to the code, the response of it is stored in our response variable.
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ msg: "Hello World" });
  });

  it("should not be", async () => {
    const response = await request(app).get("/*");
    expect(response.statusCode).toBe(404);
  });
});
