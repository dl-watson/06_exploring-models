const fs = require("fs");
const request = require("supertest");
const app = require("../app");
const pool = require("../utils/pool");

const Book = require("../models/Book");

describe("tests CRUD routes", () => {
  beforeEach(() => {
    return pool.query("START TRANSACTION");
  });

  afterEach(() => {
    return pool.query("ROLLBACK");
  });

  afterAll(() => {
    return pool.end();
  });

  it("posts a new book", async () => {
    const res = await request(app).post("/api/v1/books").send({
      title:
        "I Hope We Choose Love: A Trans Girl's Notes From the End of the World",
      author: "Kai Chen Thom",
    });

    expect(res.body).toEqual({
      title:
        "I Hope We Choose Love: A Trans Girl's Notes From the End of the World",
      author: "Kai Chen Thom",
    });
  });

  test("gets all books", async () => {
    const data = await request(app).get("/api/v1/books");

    expect(data.body).toEqual([
      {
        title: "Pleasure Activism",
        author: "adrienne maree brown",
      },
    ]);
  });

  test("gets a book by id", async () => {
    const data = await request(app).get("/api/v1/books/1");

    expect(data.body).toEqual({
      title: "Pleasure Activism",
      author: "adrienne maree brown",
    });
  });

  test("updates an existing book", async () => {
    const data = await request(app).put(`/api/v1/books/1`).send({
      title: "Emergent Strategy",
      author: "adrienne maree brown",
    });

    expect(data.body).toEqual({
      title: "Emergent Strategy",
      author: "adrienne maree brown",
    });
  });

  test("deletes a book by id", async () => {
    const data = await request(app).delete(`/api/v1/colors/1`);

    const books = await request(app).get("/api/v1/books/");
    expect(books.body).toEqual([
      {
        author: "adrienne maree brown",
        title: "Pleasure Activism",
      },
    ]);
  });
});
