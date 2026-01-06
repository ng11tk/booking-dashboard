// src/components/CreateBatch.jsx
import { useState } from "react";
import { useMutation } from "@apollo/client/react/index.js";
import { CREATE_BATCH } from "../graphql/mutations.js";
import { GET_BATCHES } from "../graphql/queries.js";

const CreateBatch = ({ trekId }) => {
  const [startDate, setStartDate] = useState("");
  const [capacity, setCapacity] = useState("");

  const [createBatch] = useMutation(CREATE_BATCH, {
    refetchQueries: [
      {
        query: GET_BATCHES,
        variables: { trekId },
      },
    ],
  });

  const submit = async (e) => {
    e.preventDefault();

    await createBatch({
      variables: {
        trekId,
        startDate,
        capacity: Number(capacity),
      },
    });

    setStartDate("");
    setCapacity("");
  };

  return (
    <form onSubmit={submit}>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />
      <button>Create Batch</button>
    </form>
  );
};

export default CreateBatch;
