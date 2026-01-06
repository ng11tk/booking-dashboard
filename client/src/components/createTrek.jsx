// src/components/CreateTrek.jsx
import { useState } from "react";
import { useMutation } from "@apollo/client/react/index.js";
import { CREATE_TREK } from "../graphql/mutations.js";
import { GET_TREKS } from "../graphql/queries.js";

const CreateTrek = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [durationDays, setDurationDays] = useState("");

  const [createTrek, { loading }] = useMutation(CREATE_TREK, {
    refetchQueries: [{ query: GET_TREKS }],
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !location || !durationDays) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await createTrek({
        variables: {
          name,
          location,
          durationDays: Number(durationDays),
        },
      });

      alert("Trek created successfully!");
      setName("");
      setLocation("");
      setDurationDays("");
    } catch (error) {
      console.error("Error creating trek:", error);
      alert("Failed to create trek");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="trek-name"
          className="block text-sm font-semibold text-gray-700"
        >
          Trek Name <span className="text-red-500">*</span>
        </label>
        <input
          id="trek-name"
          type="text"
          placeholder="e.g., Everest Base Camp"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="location"
          className="block text-sm font-semibold text-gray-700"
        >
          Location <span className="text-red-500">*</span>
        </label>
        <input
          id="location"
          type="text"
          placeholder="e.g., Nepal Himalayas"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="duration"
          className="block text-sm font-semibold text-gray-700"
        >
          Duration (days) <span className="text-red-500">*</span>
        </label>
        <input
          id="duration"
          type="number"
          placeholder="e.g., 14"
          value={durationDays}
          onChange={(e) => setDurationDays(e.target.value)}
          required
          min="1"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Creating Trek...
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
            Create Trek
          </>
        )}
      </button>
    </form>
  );
};

export default CreateTrek;
