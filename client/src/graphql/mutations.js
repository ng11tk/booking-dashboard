// src/graphql/mutations.js
import { gql } from "@apollo/client";

export const CREATE_BOOKING = gql`
  mutation CreateBooking($travelerName: String!, $batchId: ID!) {
    createBooking(travelerName: $travelerName, batchId: $batchId) {
      id
      travelerName
      status
    }
  }
`;

export const CREATE_BATCH = gql`
  mutation CreateBatch($trekId: ID!, $startDate: String!, $capacity: Int!) {
    createBatch(trekId: $trekId, startDate: $startDate, capacity: $capacity) {
      id
      startDate
      capacity
      status
    }
  }
`;

export const CREATE_TREK = gql`
  mutation CreateTrek($name: String!, $location: String!, $durationDays: Int!) {
    createTrek(name: $name, location: $location, durationDays: $durationDays) {
      id
      name
    }
  }
`;

export const UPDATE_BOOKING_STATUS = gql`
  mutation UpdateBookingStatus($id: ID!, $status: String!) {
    updateBookingStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
