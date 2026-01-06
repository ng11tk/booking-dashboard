// src/components/CreateBatch.jsx
import { useState } from "react";
import { useMutation } from "@apollo/client/react/index.js";
import { CREATE_BATCH } from "../graphql/mutations.js";
import { GET_BATCHES } from "../graphql/queries.js";

const CreateBatch = ({ trekId, onSuccess }) => {
  const [startDate, setStartDate] = useState("");
  const [capacity, setCapacity] = useState("");

  const [createBatch, { loading }] = useMutation(CREATE_BATCH, {
    refetchQueries: [
      {
        query: GET_BATCHES,
        variables: { trekId },
      },
    ],
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!startDate || !capacity) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await createBatch({
        variables: {
          trekId,
          startDate,
          capacity: Number(capacity),
        },
      });

      alert("Batch created successfully!");
      setStartDate("");
      setCapacity("");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating batch:", error);
      alert("Failed to create batch");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="trek-id"
          className="block text-sm font-semibold text-gray-700"
        >
          Trek ID
        </label>
        <input
          id="trek-id"
          type="text"
          value={trekId}
          readOnly
          className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="start-date"
          className="block text-sm font-semibold text-gray-700"
        >
          Start Date <span className="text-red-500">*</span>
        </label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="capacity"
          className="block text-sm font-semibold text-gray-700"
        >
          Capacity <span className="text-red-500">*</span>
        </label>
        <input
          id="capacity"
          type="number"
          placeholder="e.g., 20"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
          min="1"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder:text-gray-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Creating Batch...
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
            Create Batch
          </>
        )}
      </button>
    </form>
  );
};

export default CreateBatch;
