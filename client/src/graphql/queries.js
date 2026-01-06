// src/graphql/queries.js
import { gql } from "@apollo/client";

export const GET_TREKS = gql`
  query {
    treks {
      id
      name
      location
    }
  }
`;

export const GET_BATCHES = gql`
  query ($trekId: ID!) {
    batches(trekId: $trekId) {
      id
      startDate
      capacity
      bookedSeats
      status
    }
  }
`;

export const GET_BOOKINGS = gql`
  query ($batchId: ID!) {
    bookings(batchId: $batchId) {
      id
      travelerName
      status
    }
  }
`;
