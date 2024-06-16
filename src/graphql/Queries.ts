import { gql } from 'apollo-server-express';

export const defaultQuery = gql`
  {
    books {
      title
      author
    }
  }
`;

export const addBookMutation = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      title
      author
    }
  }
`;