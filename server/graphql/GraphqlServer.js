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
exports.setGQL = exports.gqlServer = exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const BookService_1 = require("@service/BookService");
function setGQL(app) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.typeDefs = (0, apollo_server_express_1.gql) `
        type Query {
            hello: String
            books: [Book]
        }

        type Mutation {
            addBook(title: String, author: String): Book
            createUser(name: String!): User
        }

        type Book {
            title: String
            author: String
        }

        type User {
            id: ID!
            name: String!
        }
        `;
        exports.resolvers = {
            Query: {
                hello: () => 'Hello, World!',
                books: () => __awaiter(this, void 0, void 0, function* () {
                    const books = yield (0, BookService_1.fetchBooks)();
                    return books;
                })
            },
            Mutation: {
                createUser: (parant, args) => {
                    return { id: Date.now().toString(), name: args.name };
                },
                addBook: (_1, _a) => __awaiter(this, [_1, _a], void 0, function* (_, { title, author }) {
                    try {
                        const book = yield (0, BookService_1.fetchAddBook)(title, author); // 데이터베이스에 새 책 추가
                        return book;
                    }
                    catch (error) {
                        console.error('Error adding book:', error);
                        return null;
                    }
                })
            }
        };
        exports.gqlServer = new apollo_server_express_1.ApolloServer({
            typeDefs: exports.typeDefs,
            resolvers: exports.resolvers
        });
        // 서버 시작
        yield exports.gqlServer.start();
        exports.gqlServer.applyMiddleware({ app });
    });
}
exports.setGQL = setGQL;
