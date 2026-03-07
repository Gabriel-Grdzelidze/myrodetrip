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

export const GET_USERS = gql`
  query GetUsers($search: String) {
    getUsers(search: $search) {
      id
      name
      idNumber
      email
    }
  }
`;

export const GET_DRIVERS = gql`
  query GetDrivers($search: String) {
    getDrivers(search: $search) {
      id
      name
      idNumber
      email
      phone
    }
  }
`;

export const GET_DRIVER_OFFERS = gql`
  query GetDriverOffers {
    getDriverOffers {
      id
      driverId
      driverName
      destinations
      seats
      price
      description
      createdAt
    }
  }
`;

export const GET_MY_OFFERS = gql`
  query GetMyOffers($driverId: ID!) {
    getMyOffers(driverId: $driverId) {
      id
      destinations
      seats
      price
      description
      createdAt
      bookings {
        id
        userName
        userEmail
        status
        createdAt
      }
    }
  }
`;

export const GET_MY_BOOKINGS = gql`
  query GetMyBookings($userId: ID!) {
    getMyBookings(userId: $userId) {
      id
      userName
      userEmail
      status
      createdAt
      offer {
        id
        destinations
        seats
        price
        description
        driverName
      }
    }
  }
`;

export const GET_DRIVER_REQUESTS = gql`
  query GetDriverRequests($driverId: ID!) {
    getDriverRequests(driverId: $driverId) {
      id
      userName
      userEmail
      status
      createdAt
      offer {
        id
        destinations
        seats
        price
        description
      }
    }
  }
`;

export const GET_ADMINS = gql`
  query GetAdmins {
    getAdmins {
      id
      name
      email
      createdAt
    }
  }
`;