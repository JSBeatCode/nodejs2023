"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAddBook = exports.fetchBooks = void 0;
const Sequelizer_1 = require("@db/Sequelizer");
// Example usage:
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        // Retrieve books
        // const Book: any = await getBook(); // Fetch books from the database
        return Sequelizer_1.Book.findAll(); // Return all books
    });
}
exports.fetchBooks = fetchBooks;
function fetchAddBook(title, author) {
    return __awaiter(this, void 0, void 0, function* () {
        // Add a new book
        // return await addBook(title, author); // Fetch books from the database
        return Sequelizer_1.Book.create({ title, author });
        // return Book.create({ title, author }); // Add new book to the database
    });
}
exports.fetchAddBook = fetchAddBook;
