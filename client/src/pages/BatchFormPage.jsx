// src/pages/BatchFormPage.jsx
import { useNavigate, useSearchParams } from "react-router-dom";
import CreateBatch from "../components/createBatch.jsx";

function BatchFormPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trekId = searchParams.get("trekId");

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Create New Batch
              </h1>
              <p className="text-gray-600">Schedule a new trek batch</p>
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
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <CreateBatch trekId={trekId || "695b9343876e94a9e90d984a"} />
        </div>
      </div>
    </div>
  );
}

export default BatchFormPage;
