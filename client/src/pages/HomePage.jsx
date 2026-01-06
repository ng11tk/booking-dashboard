// src/pages/HomePage.jsx
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react/index.js";
import { GET_TREKS, GET_BATCHES, GET_BOOKINGS } from "../graphql/queries.js";
import { UPDATE_BOOKING_STATUS } from "../graphql/mutations.js";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_TREKS);
  const [selectedTrek, setSelectedTrek] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [updateBookingStatus] = useMutation(UPDATE_BOOKING_STATUS, {
    refetchQueries: [
      { query: GET_BOOKINGS, variables: { batchId: selectedBatch?.id } },
      { query: GET_BATCHES, variables: { trekId: selectedTrek?.id } },
    ],
  });

  const { data: batchData, loading: batchLoading } = useQuery(GET_BATCHES, {
    variables: { trekId: selectedTrek?.id },
    skip: !selectedTrek,
  });

  const { data: bookingData, loading: bookingLoading } = useQuery(
    GET_BOOKINGS,
    {
      variables: { batchId: selectedBatch?.id },
      skip: !selectedBatch,
    }
  );

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus({
        variables: { id: bookingId, status: newStatus },
      });
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Trek Dashboard
            </h1>
            <svg
              className="w-12 h-12 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-lg">
            Manage your trekking adventures, batches, and bookings
          </p>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Trek Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Trek Details
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/trek")}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <svg
                    className="w-4 h-4"
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
                  New Trek
                </button>
                <button
                  onClick={() =>
                    selectedTrek && navigate(`/batch?trekId=${selectedTrek.id}`)
                  }
                  disabled={!selectedTrek}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <svg
                    className="w-4 h-4"
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
                  New Batch
                </button>
              </div>
            </div>

            {/* Trek List */}
            {data?.treks?.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-gray-500 font-medium">No treks available</p>
                <button
                  onClick={() => navigate("/trek")}
                  className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                >
                  Create your first trek
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {data?.treks?.map((trek) => (
                  <div
                    key={trek.id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <div
                      onClick={() =>
                        setSelectedTrek(
                          selectedTrek?.id === trek.id ? null : trek
                        )
                      }
                      className={`p-4 cursor-pointer transition-all ${
                        selectedTrek?.id === trek.id
                          ? "bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-500"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {trek.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {trek.location}
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            selectedTrek?.id === trek.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    {selectedTrek?.id === trek.id && (
                      <div className="p-4 bg-white border-t border-gray-200">
                        <h4 className="font-bold text-sm text-gray-700 mb-3 flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-cyan-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Batches
                        </h4>
                        {batchLoading ? (
                          <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-600 mx-auto"></div>
                          </div>
                        ) : batchData?.batches?.length === 0 ? (
                          <p className="text-sm text-gray-500 text-center py-2">
                            No batches available
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {batchData?.batches?.map((batch) => (
                              <div
                                key={batch.id}
                                onClick={() =>
                                  setSelectedBatch(
                                    selectedBatch?.id === batch.id
                                      ? null
                                      : batch
                                  )
                                }
                                className={`p-3 rounded-lg cursor-pointer transition-all ${
                                  selectedBatch?.id === batch.id
                                    ? "bg-cyan-100 border-2 border-cyan-500"
                                    : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">
                                      {new Date(
                                        typeof batch.startDate === "string" &&
                                        batch.startDate.includes("T")
                                          ? batch.startDate.split("T")[0] +
                                            "T12:00:00"
                                          : parseInt(batch.startDate)
                                      ).toLocaleDateString()}
                                    </p>
                                    <div className="flex gap-3 mt-1 text-xs">
                                      <span className="text-gray-600">
                                        Capacity: {batch.capacity}
                                      </span>
                                      <span className="text-cyan-600 font-semibold">
                                        Booked: {batch.bookedSeats}
                                      </span>
                                    </div>
                                  </div>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                      batch.status === "active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-700"
                                    }`}
                                  >
                                    {batch.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Booking Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Bookings</h2>
              </div>
              <button
                onClick={() =>
                  selectedBatch &&
                  navigate(`/booking?batchId=${selectedBatch.id}`)
                }
                disabled={!selectedBatch}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-4 h-4"
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
                New Booking
              </button>
            </div>

            {!selectedBatch ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <p className="text-gray-500 font-medium">
                  Select a batch to view bookings
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Choose a batch from the trek details
                </p>
              </div>
            ) : (
              <div>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600">Selected Batch</p>
                  <p className="font-bold text-gray-900">
                    {new Date(
                      typeof selectedBatch.startDate === "string" &&
                      selectedBatch.startDate.includes("T")
                        ? selectedBatch.startDate.split("T")[0] + "T12:00:00"
                        : parseInt(selectedBatch.startDate)
                    ).toLocaleDateString()}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-gray-600">
                      Capacity:{" "}
                      <span className="font-semibold">
                        {selectedBatch.capacity}
                      </span>
                    </span>
                    <span className="text-cyan-600">
                      Booked:{" "}
                      <span className="font-semibold">
                        {selectedBatch.bookedSeats}
                      </span>
                    </span>
                    <span className="text-green-600">
                      Available:{" "}
                      <span className="font-semibold">
                        {selectedBatch.capacity - selectedBatch.bookedSeats}
                      </span>
                    </span>
                  </div>
                </div>

                {bookingLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  </div>
                ) : bookingData?.bookings?.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg
                      className="w-12 h-12 text-gray-300 mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    <p className="text-gray-500 font-medium">No bookings yet</p>
                    <button
                      onClick={() =>
                        navigate(`/booking?batchId=${selectedBatch.id}`)
                      }
                      className="mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
                    >
                      Create first booking
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {bookingData?.bookings?.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                              {booking.travelerName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">
                                {booking.travelerName}
                              </p>
                              <p className="text-xs text-gray-600">
                                ID: {booking.id.slice(0, 8)}...
                              </p>
                            </div>
                          </div>
                          <select
                            value={booking.status}
                            onChange={(e) =>
                              handleStatusChange(booking.id, e.target.value)
                            }
                            className={`px-3 py-1 rounded-full text-xs font-semibold border-2 cursor-pointer transition-all ${
                              booking.status === "CONFIRMED"
                                ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                                : booking.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"
                                : booking.status === "WAITLISTED"
                                ? "bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200"
                                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                            }`}
                          >
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="PENDING">PENDING</option>
                            <option value="WAITLISTED">WAITLISTED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
