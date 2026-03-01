import { gql } from '@apollo/client';

export const CREATE_TRIP = gql`
  mutation CreateTrip(
    $TotalParticipants: Int!, 
    $Destination: String!, 
    $Menu: String!, 
    $Cost: Int!
  ) {
    createTrip(
      TotalParticipants: $TotalParticipants, 
      Destination: $Destination, 
      Menu: $Menu, 
      Cost: $Cost
    ) {
      id
      TotalParticipants
      Destination
      Menu
      Cost
    }
  }
`;

export const ADD_DESTINATION = gql`
  mutation AddDestination($name: String!, $price: Int!) {
    addDestination(name: $name, price: $price) {
      id
      name
      price
    }
  }
`;

export const DELETE_DESTINATION = gql`
  mutation DeleteDestination($id: ID!) {
    deleteDestination(id: $id) {
      id
    }
  }
`;

export const ADD_MENU = gql`
  mutation AddMenu($name: String!, $price: Int!) {
    addMenu(name: $name, price: $price) {
      id
      name
      price
    }
  }
`;

export const DELETE_MENU = gql`
  mutation DeleteMenu($id: ID!) {
    deleteMenu(id: $id) {
      id
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation SignUpUser($name: String!, $idNumber: String!, $email: String!, $password: String!) {
    signUpUser(name: $name, idNumber: $idNumber, email: $email, password: $password) {
      token
      role
    }
  }
`;

export const SIGN_UP_DRIVER = gql`
  mutation SignUpDriver($name: String!, $idNumber: String!, $email: String!, $phone: String!, $password: String!) {
    signUpDriver(name: $name, idNumber: $idNumber, email: $email, phone: $phone, password: $password) {
      token
      role
    }
  }
`;

export const SIGN_IN_USER = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
      role
    }
  }
`;

export const SIGN_IN_DRIVER = gql`
  mutation SignInDriver($email: String!, $password: String!) {
    signInDriver(email: $email, password: $password) {
      token
      role
    }
  }
`;