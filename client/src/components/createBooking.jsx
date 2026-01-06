// src/components/CreateBooking.jsx
import { useState } from "react";
import { useMutation } from "@apollo/client/react/index.js";
import { CREATE_BOOKING } from "../graphql/mutations.js";
import { GET_BOOKINGS } from "../graphql/queries.js";

const CreateBooking = ({ batchId }) => {
  const [travelerName, setTravelerName] = useState("");

  const [createBooking, { loading }] = useMutation(CREATE_BOOKING, {
    refetchQueries: [
      {
        query: GET_BOOKINGS,
        variables: { batchId },
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!travelerName) {
      alert("Please enter traveler name");
      return;
    }

    try {
      await createBooking({
        variables: { travelerName, batchId },
      });

      setTravelerName("");
      alert("Booking added successfully!");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to add booking");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="traveler-name"
          className="block text-sm font-semibold text-gray-700"
        >
          Traveler Name <span className="text-red-500">*</span>
        </label>
        <input
          id="traveler-name"
          type="text"
          placeholder="Enter traveler name"
          value={travelerName}
          onChange={(e) => setTravelerName(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Adding...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Booking
          </>
        )}
      </button>
    </form>
  );
};

export default CreateBooking;
