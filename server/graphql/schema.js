// graphql/schema.js
export const typeDefs = `
  type Trek {
    id: ID!
    name: String!
    location: String!
    durationDays: Int!
  }

  type Batch {
    id: ID!
    trekId: ID!
    startDate: String!
    capacity: Int!
    bookedSeats: Int!
    status: String!
  }

  type Booking {
    id: ID!
    travelerName: String!
    batchId: ID!
    status: String!
    paymentStatus: String!
  }

  type Query {
    treks: [Trek]
    batches(trekId: ID!): [Batch]
    bookings(batchId: ID!): [Booking]
  }

  type Mutation {
    createBooking(travelerName: String!, batchId: ID!): Booking
    updateBookingStatus(id: ID!, status: String!): Booking
    
    createBatch(trekId: ID!, startDate: String!, capacity: Int!): Batch

    createTrek(name: String!, location: String!, durationDays: Int!): Trek
  }
`;
