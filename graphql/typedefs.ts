export const typeDefs = `#graphql
  type Trip {
    id: ID!
    TotalParticipants: Int!
    Destination: String!
    Menu: String!
    Cost: Int!
  }

  type Query {
    getTrips: [Trip]
    getTrip(id: ID!): Trip
  }

  type Mutation {
    createTrip(
      TotalParticipants: Int!,
      Destination: String!,
      Menu: String!,
      Cost: Int!
    ): Trip

    updateTrip(
      id: ID!,
      TotalParticipants: Int,
      Destination: String,
      Menu: String,
      Cost: Int
    ): Trip

    deleteTrip(id: ID!): Trip
  }
`;