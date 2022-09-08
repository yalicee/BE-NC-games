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
    expect(body.msg).toBe("Route Not Found");
  });
});

describe("GET /api/reviews/review_id", () => {
  it("should respond with a 200: returns with a review object", async () => {
    const reviewObj = {
      title: "Ultimate Werewolf",
      designer: "Akihisa Okui",
      owner: "bainesface",
      review_img_url:
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      review_body: "We couldn't find the werewolf!",
      review_id: 3,
      category: "social deduction",
      created_at: expect.any(String),
      votes: 5,
    };
    const { body } = await request(app).get("/api/reviews/3").expect(200);
    expect(body.review).toEqual(reviewObj);
  });
  it("should respond with a 404: return message with review not found", async () => {
    const { body } = await request(app).get("/api/reviews/123132");
    expect(body.msg).toBe("Review Not Found");
  });
  it("it should resond with a 400: return message with invalid id", async () => {
    const { body } = await request(app).get("/api/reviews/review1");
    expect(body.msg).toBe("Bad Request");
  });
});

describe("GET /api/users", () => {
  it("should respond with a 200: returns an array of users", async () => {
    const { body } = await request(app).get("/api/users").expect(200);
    expect(body.users).toBeInstanceOf(Array);
    expect(body.users).toHaveLength(4);
    body.users.forEach((user) => {
      expect(user).toHaveProperty("username", expect.any(String));
      expect(user).toHaveProperty("name", expect.any(String));
      expect(user).toHaveProperty("avatar_url", expect.any(String));
    });
  });
});
