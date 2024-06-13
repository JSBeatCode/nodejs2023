// import { makeExecutableSchema } from 'graphql-tools'
// import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServer, gql } from 'apollo-server-express';
import _ from 'lodash'

export async function setGQL(app: any) {
    
    const typeDefs = gql`
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

        let books = [
            { title: 'The Awakening', author: 'Kate Chopin' },
            { title: 'City of Glass', author: 'Paul Auster' }
        ];
    
    const resolvers = {
        Query:{
            hello: () => 'Hello, World!',
            books: () => books
        },
        Mutation: {
            createUser: (parant: any, args: any)=>{
                return { id: Date.now().toString(), name: args.name}
            },
            addBook: (_: any, { title, author }: any) => {
                const newBook = { title, author };
                books.push(newBook);
                return newBook;
              }
        }
    }
    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers
    })
    // 서버 시작
    await gqlServer.start();
    
    gqlServer.applyMiddleware({ app })

    
}