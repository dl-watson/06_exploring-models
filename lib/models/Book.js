const pool = require("../utils/pool");

module.exports = class Book {
  id;
  title;
  author;

  constructor(row) {
    this.title = row.title;
    this.author = row.author;
  }

  // CREATE
  static async insert({ title, author }) {
    const { rows } = await pool.query(
      `
        INSERT INTO books (title, author)
        VALUES ($1, $2)
        RETURNING *
    `,
      [title, author]
    );

    return new Book(rows[0]);
  }

  // READ
  static async find() {
    const { rows } = await pool.query(
      `
        SELECT * FROM books
      `
    );

    return rows.map((row) => new Book(row));
  }

  static async findByID(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM books
        WHERE id=$1
      `,
      [id]
    );
    if (!rows[0]) throw new Error(`No book with id ${id}`);
    return new Book(rows[0]);
  }

  // UPDATE
  static async update(id, { title, author }) {
    const { rows } = await pool.query(
      `
        UPDATE books
        SET title=$1,
            author=$2
        WHERE id=$3
        RETURNING *
      `,
      [title, author, id]
    );

    return new Books(rows[0]);
  }
  // DELETE
  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM books 
        WHERE id=$1
        RETURNING *
      `,
      [id]
    );

    return new Book(rows[0]);
  }
};
