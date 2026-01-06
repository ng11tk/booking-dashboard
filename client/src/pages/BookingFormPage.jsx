// src/pages/BookingFormPage.jsx
import { useState } from "react";
import { useMutation } from "@apollo/client/react/index.js";
import { CREATE_BOOKING } from "../graphql/mutations.js";
import { GET_BOOKINGS } from "../graphql/queries.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../App.css";

const BookingFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batchId");

  const [travelerName, setTravelerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [createBooking, { loading, error }] = useMutation(CREATE_BOOKING, {
    refetchQueries: batchId
      ? [
          {
            query: GET_BOOKINGS,
            variables: { batchId },
          },
        ]
      : [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!travelerName || !batchId) {
      alert("Traveler name and batch ID are required");
      return;
    }

    try {
      await createBooking({
        variables: { travelerName, batchId },
      });

      alert("Booking created successfully!");
      setTravelerName("");
      setPhone("");
      setEmail("");
      navigate("/");
    } catch (err) {
      console.error("Error creating booking:", err);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Create New Booking</h1>
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            htmlFor="batchId"
            style={{ marginBottom: "8px", fontWeight: "bold" }}
          >
            Batch ID *
          </label>
          <input
            id="batchId"
            type="text"
            value={batchId || ""}
            readOnly
            placeholder="Batch ID (from URL)"
            style={{
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#e9e9e9",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            htmlFor="travelerName"
            style={{ marginBottom: "8px", fontWeight: "bold" }}
          >
            Traveler Name *
          </label>
          <input
            id="travelerName"
            type="text"
            placeholder="Enter traveler name"
            value={travelerName}
            onChange={(e) => setTravelerName(e.target.value)}
            required
            style={{
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            htmlFor="email"
            style={{ marginBottom: "8px", fontWeight: "bold" }}
          >
            Email (Optional)
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            htmlFor="phone"
            style={{ marginBottom: "8px", fontWeight: "bold" }}
          >
            Phone (Optional)
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        {error && (
          <div style={{ color: "red", fontSize: "14px" }}>
            Error: {error.message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !batchId}
          style={{
            padding: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: loading || !batchId ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading || !batchId ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating Booking..." : "Create Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingFormPage;
