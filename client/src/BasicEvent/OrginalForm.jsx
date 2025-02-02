import { useState, useEffect } from "react";
import {
  departments,
  academicDepartment,
  professionalBodies,
  logos,
  eventType,
} from "./Static";
import EventTypePopup from "./EventPopup";
import OrganizersForm from "./Organizer";
import ResourcePersonsForm from "./ResourcePopup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index({ event1Basics }) {
  console.log("Event1Basics : ", event1Basics);
  const [SelectedDepartment, setSelectedDepartment] = useState(false);
  const [SelectedLogo, setSelectedLogo] = useState(false);
  const [ProfessionalBodies, setProfessionalBodies] = useState(false);
  const [AcademicDept, setAcademicDept] = useState(false);
  const [EventType, setEventType] = useState(false);
  const onclose = (closefield) => {
    console.log("onclose triggered");
    if (typeof closefield === "function") {
      closefield(!closefield);
    }
  };
  const [organizers, setOrganizers] = useState([
    { employeeId: "", name: "", designation: "", phone: "" },
  ]);
  const [resourcePersons, setResourcePersons] = useState([
    { name: "", affiliation: "" },
  ]);
  const [formData, setFormData] = useState({
    iqacNumber: "",
    departments: [],
    academicdepartment: [],
    professional: [],
    eventName: "",
    eventType: "",
    eventVenue: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    year: "",
    categories: [],
    resourcePersons: 0,
    logos: [],
    description: "",
    societies: "",
  });
  useEffect(() => {
    if (event1Basics) {
      setFormData({
        iqacNumber: event1Basics.iqacNumber || "",
        departments: event1Basics.departments || [],
        academicdepartment: event1Basics.academicdepartment || [],
        professional: event1Basics.professional || [],
        eventName: event1Basics.eventName || "",
        eventType: event1Basics.eventType || "",
        eventVenue: event1Basics.eventVenue || "",
        startDate: event1Basics.startDate || "",
        endDate: event1Basics.endDate || "",
        startTime: event1Basics.startTime || "",
        endTime: event1Basics.endTime || "",
        year: event1Basics.year || "",
        categories: event1Basics.categories || [],
        resourcePersons: event1Basics.resourcePersons || [],
        logos: event1Basics.logos || [],
        description: event1Basics.description || "",
        societies: event1Basics.societies || "",
      });

      setOrganizers(event1Basics.organizers || []);
      setResourcePersons(event1Basics.resourcePersons || []);
    }
  }, [event1Basics]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToPost = {
        ...formData,
        organizers,
        resourcePersons,
      };

      console.log("Data to be posted:", dataToPost);

      const isUpdating = event1Basics._id;
      let response;
      console.log("updating the ID field : ", isUpdating);
      if (isUpdating) {
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/event/${isUpdating}`,
          dataToPost
        );

        if (response.status === 200) {
          toast.success("Event updated successfully!");
        } else {
          toast.error("Failed to update event. Please try again.");
        }
      } else {
        localStorage.setItem("common_data", JSON.stringify(dataToPost));

        response = await axios.post(
          `${import.meta.env.VITE_API_URL}/event/create`,
          dataToPost
        );

        if (response.status === 200) {
          const eventformId = response.data.event._id;
          const iqacNumber = formData.iqacNumber;

          localStorage.setItem(
            "basicEvent",
            JSON.stringify({ _id: eventformId })
          );
          localStorage.setItem(
            "iqacno",
            JSON.stringify({ iqacNumber: iqacNumber })
          );

          toast.success("Event created successfully!");
        } else {
          toast.error("Failed to create event. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit data. Please try again.");
    }
  };

  const handleDepartmentChange = (dept) => {
    setFormData((prev) => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept],
    }));
  };
  const handleAcademicDepartmentChange = (dept) => {
    setFormData((prev) => ({
      ...prev,
      academicdepartment: prev.academicdepartment.includes(dept)
        ? prev.academicdepartment.filter((d) => d !== dept)
        : [...prev.academicdepartment, dept],
    }));
  };
  const handelProfessionalBodeis = (data) => {
    setFormData((prev) => ({
      ...prev,
      professional: prev.professional.includes(data)
        ? prev.professional.filter((d) => d !== data)
        : [...prev.professional, data],
    }));
  };

  const handleLogoChange = (logo) => {
    setFormData((prev) => ({
      ...prev,
      logos: prev.logos.includes(logo)
        ? prev.logos.filter((l) => l !== logo)
        : [...prev.logos, logo],
    }));
  };
  const HandelEventtype = (logo) => {
    setFormData((prev) => ({
      ...prev,
      eventType: prev.eventType.includes(logo)
        ? prev.eventType.filter((l) => l !== logo)
        : [...prev.eventType, logo],
    }));
  };
  const handleCategoryChange = (category) => {
    setFormData((prevData) => {
      const updatedCategories = prevData.categories.includes(category)
        ? prevData.categories.filter((cat) => cat !== category)
        : [...prevData.categories, category];

      return { ...prevData, categories: updatedCategories };
    });
  };

  const handleEventTypeChange = (eventType) => {
    setFormData((prev) => ({
      ...prev,
      eventType: eventType,
    }));
  };

  return (
    <div className="w-full bg-gray-50 py-8 px-4">
      <div className=" mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-8">
          Request to Organize Event
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="space-y-6 grid grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              IGAC Number
            </label>
            <input
              type="text"
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
              value={formData.iqacNumber || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, iqacNumber: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select the Department Specification
            </label>
            <input
              onClick={() => setSelectedDepartment(true)}
              type="text"
              value={formData.departments || ""}
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
            />
            {SelectedDepartment && (
              <div className=" gap-2">
                <EventTypePopup
                  ClosingProperty={setSelectedDepartment}
                  data={departments}
                  HandelChange={handleDepartmentChange}
                  onclose={onclose}
                />
              </div>
            )}
          </div>
          <div>
            <label
              onClick={() => setAcademicDept(true)}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select the Academic Department Specification
            </label>
            <input
              onClick={() => setAcademicDept(true)}
              type="text"
              value={formData.academicdepartment || ""}
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
            />
            {AcademicDept && (
              <div className=" gap-2">
                <EventTypePopup
                  ClosingProperty={setAcademicDept}
                  data={academicDepartment}
                  HandelChange={handleAcademicDepartmentChange}
                  onclose={onclose}
                />
              </div>
            )}
          </div>

          <OrganizersForm
            organizers={organizers}
            setOrganizers={setOrganizers}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name of the Event
            </label>
            <input
              type="text"
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
              value={formData.eventName || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  eventName: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select the Event Type
            </label>
            <input
              onClick={() => setEventType(true)}
              type="text"
              value={formData.eventType || ""}
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
            />
            {EventType && (
              <div className=" w-[250%]">
                <EventTypePopup
                  ClosingProperty={setEventType}
                  data={eventType}
                  HandelChange={handleEventTypeChange}
                  onclose={onclose}
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Venue
            </label>
            <input
              type="text"
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
              value={formData.eventVenue || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  eventVenue: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
              value={formData.startDate || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
              value={formData.endDate || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, endDate: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              type="time"
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
              value={formData.startTime || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  startTime: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="time"
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
              value={formData.endTime || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  endTime: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <div className="space-y-2">
              {" "}
              {/* Add vertical spacing between rows */}
              {[
                ["Students", "Staff", "Faculty"],
                ["School Students", "Alumni", "Outside Participants"],
                ["Industry"],
              ].map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-4">
                  {" "}
                  {/* Add horizontal spacing */}
                  {row.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={
                          formData.categories?.includes(category) || false
                        } // Safe access with fallback
                        onChange={() => handleCategoryChange(category)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select the Logo Specification
            </label>
            <input
              onClick={() => setSelectedLogo(true)}
              type="text"
              value={formData.logos || ""}
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
            />
            {SelectedLogo && (
              <div className=" gap-2">
                <EventTypePopup
                  ClosingProperty={setSelectedLogo}
                  data={logos}
                  HandelChange={handleLogoChange}
                  onclose={onclose}
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select the Professional Bodies
            </label>
            <input
              onClick={() => setProfessionalBodies(true)}
              type="text"
              value={formData.professional || ""}
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
            />
            {ProfessionalBodies && (
              <div className=" gap-2">
                <EventTypePopup
                  ClosingProperty={setProfessionalBodies}
                  data={professionalBodies}
                  HandelChange={handelProfessionalBodeis}
                  onclose={onclose}
                />
              </div>
            )}
          </div>
          <ResourcePersonsForm
            resourcePersons={resourcePersons}
            setResourcePersons={setResourcePersons}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="2"
              className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <div className=" justify-end">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save the data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Index;
