import { gql } from '@apollo/client';

export const CREATE_TRIP = gql`
  mutation CreateTrip($TotalParticipants: Int!, $Destination: String!, $Menu: String!, $Cost: Int!) {
    createTrip(TotalParticipants: $TotalParticipants, Destination: $Destination, Menu: $Menu, Cost: $Cost) {
      id TotalParticipants Destination Menu Cost
    }
  }
`;

export const ADD_DESTINATION = gql`
  mutation AddDestination($name: String!, $price: Int!) {
    addDestination(name: $name, price: $price) { id name price }
  }
`;

export const DELETE_DESTINATION = gql`
  mutation DeleteDestination($id: ID!) {
    deleteDestination(id: $id) { id }
  }
`;

export const ADD_MENU = gql`
  mutation AddMenu($name: String!, $price: Int!) {
    addMenu(name: $name, price: $price) { id name price }
  }
`;

export const DELETE_MENU = gql`
  mutation DeleteMenu($id: ID!) {
    deleteMenu(id: $id) { id }
  }
`;

export const SIGN_UP_USER = gql`
  mutation SignUpUser($name: String!, $idNumber: String!, $email: String!, $password: String!) {
    signUpUser(name: $name, idNumber: $idNumber, email: $email, password: $password) { token role }
  }
`;

export const SIGN_UP_DRIVER = gql`
  mutation SignUpDriver($name: String!, $idNumber: String!, $email: String!, $phone: String!, $password: String!) {
    signUpDriver(name: $name, idNumber: $idNumber, email: $email, phone: $phone, password: $password) { token role }
  }
`;

export const SIGN_IN_USER = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) { token role }
  }
`;

export const SIGN_IN_DRIVER = gql`
  mutation SignInDriver($email: String!, $password: String!) {
    signInDriver(email: $email, password: $password) { token role }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) { id }
  }
`;

export const DELETE_DRIVER = gql`
  mutation DeleteDriver($id: ID!) {
    deleteDriver(id: $id) { id }
  }
`;

export const CREATE_DRIVER_OFFER = gql`
  mutation CreateDriverOffer($driverId: ID!, $destinations: [String!]!, $seats: Int!, $price: Int!, $description: String!) {
    createDriverOffer(driverId: $driverId, destinations: $destinations, seats: $seats, price: $price, description: $description) {
      id destinations seats price description
    }
  }
`;

export const BOOK_TRIP = gql`
  mutation BookTrip($offerId: ID!, $userId: ID!, $userName: String!, $userEmail: String!) {
    bookTrip(offerId: $offerId, userId: $userId, userName: $userName, userEmail: $userEmail) {
      id userName userEmail status
    }
  }
`;

export const DELETE_DRIVER_OFFER = gql`
  mutation DeleteDriverOffer($id: ID!) {
    deleteDriverOffer(id: $id) { id }
  }
`;

export const UPDATE_DRIVER_OFFER = gql`
  mutation UpdateDriverOffer($id: ID!, $destinations: [String!], $seats: Int, $price: Int, $description: String) {
    updateDriverOffer(id: $id, destinations: $destinations, seats: $seats, price: $price, description: $description) {
      id destinations seats price description
    }
  }
`;

export const CONFIRM_BOOKING = gql`
  mutation ConfirmBooking($bookingId: ID!) {
    confirmBooking(bookingId: $bookingId) { id status }
  }
`;

export const DECLINE_BOOKING = gql`
  mutation DeclineBooking($bookingId: ID!) {
    declineBooking(bookingId: $bookingId) { id status }
  }
`;

export const GET_ADMINS = gql`
  query GetAdmins {
    getAdmins { id name email createdAt }
  }
`;

export const ADD_ADMIN = gql`
  mutation AddAdmin($name: String!, $email: String!, $password: String!) {
    addAdmin(name: $name, email: $email, password: $password) {
      success message
      admin { id name email createdAt }
    }
  }
`;

export const REMOVE_ADMIN = gql`
  mutation RemoveAdmin($email: String!) {
    removeAdmin(email: $email) { success message }
  }
`;