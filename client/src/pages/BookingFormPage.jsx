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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Create New Booking
              </h1>
              <p className="text-gray-600">Register a new traveler</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
            >
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
          </div>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="batchId"
              className="block text-sm font-semibold text-gray-700"
            >
              Batch ID <span className="text-red-500">*</span>
            </label>
            <input
              id="batchId"
              type="text"
              value={batchId || ""}
              readOnly
              placeholder="Batch ID (from URL)"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="travelerName"
              className="block text-sm font-semibold text-gray-700"
            >
              Traveler Name <span className="text-red-500">*</span>
            </label>
            <input
              id="travelerName"
              type="text"
              placeholder="Enter traveler name"
              value={travelerName}
              onChange={(e) => setTravelerName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700"
            >
              Phone <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-red-800">Error</p>
                <p className="text-sm text-red-700">{error.message}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !batchId}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Creating Booking...
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Create Booking
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingFormPage;
