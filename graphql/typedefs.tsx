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

  type Query {
    getTrips: [Trip]
    getTrip(id: ID!): Trip
    getDestinations: [Destination]
    getMenus: [Menu]
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
  }
`;