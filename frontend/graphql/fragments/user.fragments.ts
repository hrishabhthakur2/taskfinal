import { gql } from '@apollo/client';

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    name
    email
    createdAt
    updatedAt
  }
`;