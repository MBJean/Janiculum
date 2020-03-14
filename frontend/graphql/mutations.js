import gql from 'graphql-tag'

export default {
  AUTHENTICATE_USER: gql`
    mutation AuthenticateUser($email: String!, $password: String!) {
    	authenticateUser(email: $email, password: $password) {
        id
        email
      }
    }
  `,
  CREATE_USER: gql`
    mutation CreateUser($email: String!, $password: String!) {
    	createUser(email: $email, password: $password) {
        email
      }
    }
  `,
}
