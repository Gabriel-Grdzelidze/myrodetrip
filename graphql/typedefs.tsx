export const typeDefs = `#graphql
  type Trip {
    id: ID!
    TotalParticipants: Int!
    Destination: String!
    Menu: String!
    Cost: Int!
  }

  type Destination {
    id: ID!
    name: String!
    price: Int!
  }

  type Menu {
    id: ID!
    name: String!
    price: Int!
  }

  type User {
    id: ID!
    name: String!
    idNumber: String!
    email: String!
  }

  type Driver {
    id: ID!
    name: String!
    idNumber: String!
    email: String!
    phone: String!
  }

  type AuthPayload {
    token: String!
    role: String!
  }

  type Booking {
    id: ID!
    offerId: ID!
    userId: ID!
    userName: String!
    userEmail: String!
    status: String!
    createdAt: String!
    offer: DriverOffer
  }

  type DriverOffer {
    id: ID!
    driverId: ID!
    driverName: String!
    destinations: [String!]!
    seats: Int!
    price: Int!
    description: String!
    createdAt: String!
    bookings: [Booking]
  }

  type Query {
    getTrips: [Trip]
    getTrip(id: ID!): Trip
    getDestinations: [Destination]
    getMenus: [Menu]
    getUsers(search: String): [User!]!
    getDrivers(search: String): [Driver!]!
    getDriverOffers: [DriverOffer!]!
    getMyOffers(driverId: ID!): [DriverOffer!]!
    getMyBookings(userId: ID!): [Booking!]!
    getDriverRequests(driverId: ID!): [Booking!]!
  }

  type Mutation {
    createTrip(
      TotalParticipants: Int!
      Destination: String!
      Menu: String!
      Cost: Int!
    ): Trip

    updateTrip(
      id: ID!
      TotalParticipants: Int
      Destination: String
      Menu: String
      Cost: Int
    ): Trip

    deleteTrip(id: ID!): Trip

    addDestination(name: String!, price: Int!): Destination
    deleteDestination(id: ID!): Destination

    addMenu(name: String!, price: Int!): Menu
    deleteMenu(id: ID!): Menu

    signUpUser(name: String!, idNumber: String!, email: String!, password: String!): AuthPayload!
    signUpDriver(name: String!, idNumber: String!, email: String!, phone: String!, password: String!): AuthPayload!
    signInUser(email: String!, password: String!): AuthPayload!
    signInDriver(email: String!, password: String!): AuthPayload!

    deleteUser(id: ID!): User
    deleteDriver(id: ID!): Driver

    createDriverOffer(
      driverId: ID!
      destinations: [String!]!
      seats: Int!
      price: Int!
      description: String!
    ): DriverOffer!

    bookTrip(
      offerId: ID!
      userId: ID!
      userName: String!
      userEmail: String!
    ): Booking!

    deleteDriverOffer(id: ID!): DriverOffer
    updateDriverOffer(id: ID!, destinations: [String!], seats: Int, price: Int, description: String): DriverOffer

    confirmBooking(bookingId: ID!): Booking!
    declineBooking(bookingId: ID!): Booking!
  }
`;