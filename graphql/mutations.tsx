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