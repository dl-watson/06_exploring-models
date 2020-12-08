const fs = require("fs");
const request = require("supertest");
const app = require("../app");
const pool = require("../utils/pool");

const Book = require("./models/Book");

describe("tests CRUD routes", () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync("./sql/setup.sql", "utf-8"));
  });

  afterAll(() => {
    return pool.end();
  });

  it("posts a new book", () => {});

  it("gets all books", () => {});

  it("gets a book by id", () => {});

  it("updates an existing book", () => {});

  it("deletes a book by id", () => {});
});
