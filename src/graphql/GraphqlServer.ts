import { ApolloServer, ExpressContext, gql } from 'apollo-server-express';
import _ from 'lodash'
import { fetchBooks, fetchAddBook } from '@service/BookService';
export let typeDefs: any;
export let resolvers: any;
export let gqlServer: ApolloServer<ExpressContext>;

export async function setGQL(app: any) {
    
    typeDefs = gql`
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
    
    resolvers = {
        Query:{
            hello: () => 'Hello, World!',
            books: async () => {
                const books = await fetchBooks();
                return books;
            }
        },
        Mutation: {
            createUser: (parant: any, args: any)=>{
                return { id: Date.now().toString(), name: args.name}
            },
            addBook: async (_: any, { title, author }: any) => {
                try {
                  const book = await fetchAddBook(title, author); // 데이터베이스에 새 책 추가
                  return book;
                } catch (error) {
                  console.error('Error adding book:', error);
                  return null;
                }
            }
        }
    }
    gqlServer = new ApolloServer({
        typeDefs,
        resolvers
    })
    // 서버 시작
    await gqlServer.start();
    
    gqlServer.applyMiddleware({ app })

    
}