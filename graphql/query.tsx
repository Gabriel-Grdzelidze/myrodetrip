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