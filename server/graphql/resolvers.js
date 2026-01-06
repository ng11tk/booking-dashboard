// graphql/resolvers.js

import Batch from "../modals/batch.js";
import Trek from "../modals/trek.js";
import Booking from "../modals/booking.js";

export const resolvers = {
  Query: {
    treks: () => Trek.find(),
    batches: async (_, { trekId }) => {
      const batches = await Batch.find({ trekId });
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Filter out batches whose start date has passed
      return batches.filter((batch) => {
        const batchDate = new Date(batch.startDate);
        batchDate.setHours(0, 0, 0, 0);
        return batchDate >= today;
      });
    },
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
      const booking = await Booking.findById(id);
      const oldStatus = booking.status;

      // Update the booking status
      booking.status = status;

      // Update batch booked seats based on status change
      const batch = await Batch.findById(booking.batchId);

      // If changing FROM CONFIRMED to something else, decrease booked seats
      if (oldStatus === "CONFIRMED" && status !== "CONFIRMED") {
        batch.bookedSeats = Math.max(0, batch.bookedSeats - 1);
        await booking.save();
      }

      // If changing TO CONFIRMED from something else, increase booked seats
      if (oldStatus !== "CONFIRMED") {
        if (status === "CONFIRMED") {
          if (batch.bookedSeats < batch.capacity) {
            batch.bookedSeats += 1;
            await booking.save();
          } else {
            // Cannot confirm booking if batch is full
            throw new Error("Cannot confirm booking: batch is full.");
          }
        } else {
          await booking.save();
        }
      }

      // Update batch status based on booked seats
      if (batch.bookedSeats >= batch.capacity) {
        batch.status = "FULL";
      } else if (batch.bookedSeats === 0) {
        batch.status = "OPEN";
      } else {
        batch.status = "OPEN";
      }

      await batch.save();

      return booking;
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
