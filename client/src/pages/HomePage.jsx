// src/pages/HomePage.jsx
import { useQuery } from "@apollo/client/react/index.js";
import { GET_TREKS } from "../graphql/queries.js";
import { useNavigate } from "react-router-dom";
import CreateBatch from "../components/createBatch.jsx";
import CreateTrek from "../components/createTrek.jsx";

function HomePage() {
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_TREKS);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Trek Dashboard</h1>

      <div style={{ marginBottom: "30px" }}>
        <h2>Create Trek</h2>
        <CreateTrek />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2>Create Batch</h2>
        <CreateBatch trekId="695b9343876e94a9e90d984a" />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2>Create Booking</h2>
        <button
          onClick={() => navigate("/booking?batchId=695b936c876e94a9e90d984d")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go to Booking Form
        </button>
      </div>

      <div>
        <h2>Treks</h2>
        {data?.treks?.map((trek) => (
          <div
            key={trek.id}
            style={{
              padding: "16px",
              marginBottom: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <h3>
              {trek.name} – {trek.location}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
