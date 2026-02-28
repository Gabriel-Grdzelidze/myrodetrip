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