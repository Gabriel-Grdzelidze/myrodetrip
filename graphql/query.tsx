import { gql } from '@apollo/client';

export const GET_TRIPS = gql`
  query GetTrips {
    getTrips {
      id
      TotalParticipants
      Destination
      Menu
      Cost
    }
  }
`;

export const GET_TRIP = gql`
  query GetTrip($id: ID!) {
    getTrip(id: $id) {
      id
      TotalParticipants
      Destination
      Menu
      Cost
    }
  }
`;

export const GET_DESTINATIONS = gql`
  query GetDestinations {
    getDestinations {
      id
      name
      price
    }
  }
`;

export const GET_MENUS = gql`
  query GetMenus {
    getMenus {
      id
      name
      price
    }
  }
`;