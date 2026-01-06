// src/components/CreateTrek.jsx
import { useState } from "react";
import { useMutation } from "@apollo/client/react/index.js";
import { CREATE_TREK } from "../graphql/mutations.js";
import { GET_TREKS } from "../graphql/queries.js";

const CreateTrek = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [durationDays, setDurationDays] = useState("");

  const [createTrek] = useMutation(CREATE_TREK, {
    refetchQueries: [{ query: GET_TREKS }],
  });

  const submit = async (e) => {
    e.preventDefault();

    await createTrek({
      variables: {
        name,
        location,
        durationDays: Number(durationDays),
      },
    });

    setName("");
    setLocation("");
    setDurationDays("");
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Trek name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duration (days)"
        value={durationDays}
        onChange={(e) => setDurationDays(e.target.value)}
      />
      <button>Create Trek</button>
    </form>
  );
};

export default CreateTrek;
