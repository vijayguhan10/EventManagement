import { useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import EndPopup from "../PopupModels/EndPopup";
import Forms from "../Components/Form";

const EventsCard = ({ Events, EventPopup }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDetailsClick = (event) => {
    setSelectedEvent(event);
    setIsPopupOpen(true);
    setIsEditMode(false); // Ensure it's not in edit mode when opening details
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsEditMode(true); // Enable edit mode
    setIsPopupOpen(false); // Close details popup if open
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedEvent(null);
    setIsEditMode(false); // Reset edit mode when closing
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 group"
          >
            <div className="relative">
              <img
                src={event.image}
                alt={event.eventName}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  event.status === "Upcoming"
                    ? "bg-blue-100 text-blue-600"
                    : event.status === "Ongoing"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {event.status}
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-purple-600">
                  {event.eventType}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <UsersIcon className="h-5 w-5" />
                  <span>{event.participants}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {event.eventName}
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                  <span>{event.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-gray-500" />
                  <span>{event.description}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-gray-500" />
                  <span>{event.eventVenue}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://source.unsplash.com/random/100x100/?logo"
                    alt="Organizer"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm text-gray-600">Organized by</p>
                    <p className="font-medium">{event.organizers[0]?.name}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(event)}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDetailsClick(event)}
                    className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isPopupOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <EndPopup event={EventPopup} onClose={closePopup} />
        </div>
      )}

      {isEditMode && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full  max-h-[90vh] overflow-y-auto">
            <Forms event={EventPopup} onClose={closePopup} />
          </div>
        </div>

      )}
    </div>
  );
};

export default EventsCard;
