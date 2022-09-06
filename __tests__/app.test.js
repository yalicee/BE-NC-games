const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index.js");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/categories", () => {
  it("should respond with a 200: returns with an array of categories", async () => {
    const { body } = await request(app).get("/api/categories").expect(200);
    expect(body.categories).toBeInstanceOf(Array);
    expect(body.categories).toHaveLength(4);
    body.categories.forEach((category) => {
      expect(category).toHaveProperty("slug");
      expect(category).toHaveProperty("description");
    });
  });
  it("should respond with a 404: categories not found", async () => {
    const { body } = await request(app).get("/api/batteries").expect(404);
    expect(body.message).toBe("path not found");
  });
});
