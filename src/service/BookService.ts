import { Book } from "@db/Sequelizer";

// Example usage:
export async function fetchBooks() {

  // Retrieve books
  // const Book: any = await getBook(); // Fetch books from the database
  return Book.findAll(); // Return all books
}

export async function fetchAddBook(title: string, author: string) {

  // Add a new book
  // return await addBook(title, author); // Fetch books from the database
  return Book.create({ title, author })
  // return Book.create({ title, author }); // Add new book to the database
}