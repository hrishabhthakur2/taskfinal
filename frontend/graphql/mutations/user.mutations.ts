import { gql } from '@apollo/client';
import { UserFragment } from '../fragments/user.fragments';

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
