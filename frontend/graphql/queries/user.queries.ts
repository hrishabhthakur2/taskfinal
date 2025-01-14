import { gql } from '@apollo/client';
import { UserFragment } from '../fragments/user.fragments';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

export const GET_USERS = gql`
  query GetUsers($page: Int, $limit: Int) {
    users(page: $page, limit: $limit) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
