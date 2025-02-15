import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import EventsCard from "./EventsCard";
import axios from "axios";

function PendingDashboard() {
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingEvents, setPendingEvents] = useState([]); // Ensure initial value is an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingEndforms = async () => {
      console.log("ENV:", import.meta.env.VITE_API_URL);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/endform/allpending`
        );

        const data = response.data;
        console.log("Pending endforms:", data);
        console.log("Pending endforms:", data);
        if (Array.isArray(data)) {
          setPendingEvents(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching pending endforms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingEndforms();
  }, []);

  // Ensure pendingEvents is an array before calling map
  const basicEvents = Array.isArray(pendingEvents)
    ? pendingEvents.map((event) => event.basicEvent)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Dashboard />
        <div className="flex gap-6 mb-6 border-b border-gray-200">
          {["All", "Upcoming", "Ongoing", "Completed"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 font-medium ${
                activeTab === tab.toLowerCase()
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading pending events...</p>
        ) : basicEvents.length > 0 ? (
          <EventsCard Events={basicEvents} EventPopup={pendingEvents} />
        ) : (
          <p>No pending events found.</p>
        )}
      </div>
    </div>
  );
}

export default PendingDashboard;
