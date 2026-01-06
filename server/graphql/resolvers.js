// graphql/resolvers.js

import Batch from "../modals/batch.js";
import Trek from "../modals/trek.js";
import Booking from "../modals/booking.js";

export const resolvers = {
  Query: {
    treks: () => Trek.find(),
    batches: (_, { trekId }) => Batch.find({ trekId }),
    bookings: (_, { batchId }) => Booking.find({ batchId }),
  },

  Mutation: {
    createBooking: async (_, { travelerName, batchId }) => {
      const batch = await Batch.findById(batchId);

      let status = "WAITLISTED";
      if (batch.bookedSeats < batch.capacity) {
        status = "CONFIRMED";
        batch.bookedSeats += 1;
        if (batch.bookedSeats === batch.capacity) {
          batch.status = "FULL";
        }
        await batch.save();
      }

      return Booking.create({
        travelerName,
        batchId,
        status,
      });
    },

    updateBookingStatus: async (_, { id, status }) => {
      return Booking.findByIdAndUpdate(id, { status }, { new: true });
    },

    createBatch: async (_, { trekId, startDate, capacity }) => {
      return Batch.create({
        trekId,
        startDate,
        capacity,
        bookedSeats: 0,
        status: "OPEN",
      });
    },

    createTrek: async (_, { name, location, durationDays }) => {
      return Trek.create({
        name,
        location,
        durationDays,
      });
    },
  },
};
