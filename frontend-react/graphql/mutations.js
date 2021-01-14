import { gql } from '@apollo/client';

export default {
  AUTHENTICATE_USER: gql`
    mutation AuthenticateUser($email: String!, $password: String!) {
    	authenticateUser(email: $email, password: $password) {
        email
        token
      }
    }
  `,
  CREATE_USER: gql`
    mutation CreateUser($email: String!, $password: String!) {
    	createUser(email: $email, password: $password) {
        email
        token
      }
    }
  `,
}
