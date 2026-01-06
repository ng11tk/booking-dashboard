// src/pages/BatchFormPage.jsx
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react/index.js";
import { GET_BATCHES, GET_TREKS } from "../graphql/queries.js";
import CreateBatch from "../components/createBatch.jsx";

function BatchFormPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trekId = searchParams.get("trekId");

  const { data: trekData } = useQuery(GET_TREKS);
  const { data, loading, refetch } = useQuery(GET_BATCHES, {
    variables: { trekId },
    skip: !trekId,
  });

  const currentTrek = trekData?.treks?.find((trek) => trek.id === trekId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Batch Management
              </h1>
              <p className="text-gray-600">
                {currentTrek
                  ? `Create and view batches for ${currentTrek.name}`
                  : "Create and view trek batches"}
              </p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-cyan-600"
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
              Create New Batch
            </h2>
            <CreateBatch trekId={trekId} onSuccess={() => refetch()} />
          </div>

          {/* Batch Details List */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-blue-600"
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
              Existing Batches
            </h2>

            {!trekId ? (
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500 font-medium">Select a trek first</p>
                <p className="text-sm text-gray-400 mt-2">
                  Choose a trek in the form to view its batches
                </p>
              </div>
            ) : loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-cyan-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading batches...</p>
              </div>
            ) : data?.batches?.length === 0 ? (
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500 font-medium">No batches yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Create the first batch for this trek
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {data?.batches?.map((batch) => (
                  <div
                    key={batch.id}
                    className="p-5 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg text-gray-900">
                        {new Date(
                          typeof batch.startDate === "string" &&
                          batch.startDate.includes("T")
                            ? batch.startDate.split("T")[0] + "T12:00:00"
                            : parseInt(batch.startDate)
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          batch.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {batch.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Capacity</p>
                        <p className="text-lg font-bold text-gray-900">
                          {batch.capacity}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Booked</p>
                        <p className="text-lg font-bold text-cyan-600">
                          {batch.bookedSeats}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Available</p>
                        <p className="text-lg font-bold text-green-600">
                          {batch.capacity - batch.bookedSeats}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-cyan-300">
                      <p className="text-xs text-gray-600">Batch ID:</p>
                      <p className="text-xs font-mono text-gray-900 break-all">
                        {batch.id}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BatchFormPage;
