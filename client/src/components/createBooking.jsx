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

    if (!travelerName) return;

    await createBooking({
      variables: { travelerName, batchId },
    });

    setTravelerName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Traveler name"
        value={travelerName}
        onChange={(e) => setTravelerName(e.target.value)}
      />
      <button disabled={loading}>
        {loading ? "Adding..." : "Add Booking"}
      </button>
    </form>
  );
};

export default CreateBooking;
