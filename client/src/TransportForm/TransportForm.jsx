import React, { useState, useEffect } from "react";
import { FormHeader } from "./FormHeader";
import { BasicDetails } from "./BasicDetails";
import { EventDetails } from "./EventDetails";
import { TravelDetails } from "./TravelDetails";
import { DriverDetails } from "./DriverDetails";
import { FormFooter } from "./FormFooter";
import { toast, ToastContainer } from "react-toastify";
import EndForm from "../EndForm";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export function TransportForm({ TransportForm }) {
  console.log("transport Form : ", TransportForm);
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    basicDetails: { name: "" },
    eventDetails: { eventName: "" },
    travelDetails: { route: "" },
    driverDetails: { driverName: "" },
  });
  useEffect(() => {
    if (TransportForm && TransportForm.length > 0) {
      setEvents(TransportForm);
      setCurrentEvent(TransportForm[0]);
    }
  }, [TransportForm]);
  const handleAddEvent = () => {
    setEvents((prev) => [...prev, { ...currentEvent }]);

    console.log("Added event:", currentEvent);
  };

  const handleEditEvent = (index) => {
    setCurrentEvent(events[index]);
    setEvents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteEvent = (index) => {
    setEvents((prev) => prev.filter((_, i) => i !== index));
    toast.info("Event deleted.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (events.length === 0) {
      toast.warn("No events to submit.");
      return;
    }

    try {
      let response;
      console.log("Events to submit:", events);

      const eventIds = events
        .filter((event) => event._id)
        .map((event) => event._id);

      if (eventIds.length > 0) {
        // Update Multiple Events
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/transportform/`,
          { events } // Send full events array
        );
        toast.success("Events updated successfully!");
      } else {
        // Create New Events
        response = await axios.post(
          `${import.meta.env.VITE_API_URL}/transportform/`,
          { events }
        );

        if (response.status === 200 || response.status === 201) {
          let objectId = [];
          if (Array.isArray(response.data)) {
            response.data.forEach((elem) => {
              if (elem._id) objectId.push(elem._id);
            });
          }

          if (objectId.length > 0) {
            let transportForm =
              JSON.parse(localStorage.getItem("transportForm")) || [];
            transportForm = [...transportForm, ...objectId];
            localStorage.setItem(
              "transportForm",
              JSON.stringify(transportForm)
            );
          }

          toast.success("All events submitted successfully!");
        }
      }

      setEvents([]);
    } catch (error) {
      console.error("Error submitting events:", error);
      toast.error("Failed to submit events. Please try again.");
    }
  };

  return (
    <div className="xl:w-full bg-gray-50 py-8 px-4">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <FormHeader />
        <div className="p-6 space-y-6">
          <BasicDetails
            data={currentEvent.basicDetails} // Pass existing data
            setDetails={(data) =>
              setCurrentEvent((prev) => ({ ...prev, basicDetails: data }))
            }
          />
          <EventDetails
            data={currentEvent.eventDetails}
            setDetails={(data) =>
              setCurrentEvent((prev) => ({ ...prev, eventDetails: data }))
            }
          />
          <TravelDetails
            data={currentEvent.travelDetails}
            setDetails={(data) =>
              setCurrentEvent((prev) => ({ ...prev, travelDetails: data }))
            }
          />
          <DriverDetails
            data={currentEvent.driverDetails}
            setDetails={(data) =>
              setCurrentEvent((prev) => ({ ...prev, driverDetails: data }))
            }
          />
        </div>

        <div className="p-6">
          <button
            type="button"
            onClick={handleAddEvent}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          >
            Add Event
          </button>
        </div>
        <div className="p-6 space-y-4">
          {events.map((eventData, index) => (
            <div
              className="overflow-x-auto shadow-lg rounded-lg bg-white"
              key={index}
            >
              <div className="min-w-full table-auto">
                <div className="bg-gray-100 grid grid-cols-4 gap-4 py-2 px-4">
                  <div className="font-semibold text-gray-700">Category</div>
                  <div className="font-semibold text-gray-700">Field</div>
                  <div className="font-semibold text-gray-700">Value</div>
                  <div className="font-semibold text-gray-700">Actions</div>
                </div>

                <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b">
                  <div className="font-semibold">Basic Details</div>
                  <div>IQAC Number</div>
                  <div>{eventData.basicDetails.iqacNumber}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleEditEvent(index)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b">
                  <div></div>
                  <div>Requisition Date</div>
                  <div>{eventData.basicDetails.requisitionDate}</div>
                  <div></div>
                </div>
                <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b">
                  <div></div>
                  <div>Department Name</div>
                  <div>{eventData.basicDetails.departmentName}</div>
                  <div></div>
                </div>
                <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b">
                  <div></div>
                  <div>Requestor Name</div>
                  <div>{eventData.basicDetails.requestorName}</div>
                  <div></div>
                </div>

                <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b">
                  <div className="font-semibold">Event Details</div>
                  <div>Event Name</div>
                  <div>{eventData.eventDetails.eventName}</div>
                  <div></div>
                </div>

                <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b">
                  <div className="font-semibold">Travel Details</div>
                  <div>Pick-Up Date & Time</div>
                  <div>{eventData.travelDetails.pickUpDateTime}</div>
                  <div></div>
                </div>
                <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b">
                  <div className="font-semibold"></div>

                  <div>Pick-Up Date & Time</div>
                  <div>{eventData.travelDetails.dropDateTime}</div>
                  <div></div>
                </div>
                <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b">
                  <div className="font-semibold"></div>

                  <div>Travellers Pickup Location</div>
                  <div>{eventData.travelDetails.pickUpLocation}</div>
                  <div></div>
                </div>
                <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b">
                  <div className="font-semibold"></div>

                  <div>Travellers Drop Location</div>
                  <div>{eventData.travelDetails.dropLocation}</div>
                  <div></div>
                </div>

                <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b">
                  <div className="font-semibold">Driver Details</div>
                  <div>Driver Name</div>
                  <div>{eventData.driverDetails.name}</div>
                </div>
                <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b">
                  <div className="font-semibold"></div>
                  <div>Driver contact</div>
                  <div>{eventData.driverDetails.mobileNumber}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <FormFooter />
      </form>
    </div>
  );
}
