"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBookMutation = exports.defaultQuery = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.defaultQuery = (0, apollo_server_express_1.gql) `
  {
    books {
      title
      author
    }
  }
`;
exports.addBookMutation = (0, apollo_server_express_1.gql) `
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      title
      author
    }
  }
`;
