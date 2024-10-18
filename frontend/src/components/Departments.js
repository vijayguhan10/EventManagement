import React, { useState, useEffect } from "react";
import {
  FaCalendar,
  FaSearchLocation,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import SideBar from "./SideBar";
import "../Modal.css";
import axios from "axios";
import "../Calender.css";
import { toast, ToastContainer } from "react-toastify";
const today = new Date();

const products = [
  {
    name: "Computer and Communication Engineering",
    imageurl: "https://i.ibb.co/LNvgTTn/cce.jpg",
    date: today,
    count:0
  },
  {
    name: "Computer Science Engineering",
    imageurl: "https://i.ibb.co/pjx192W/cse.jpg",
    date: today
  },
  {
    name: "Artificial Intelligence and Data Science",
    imageurl: "https://i.ibb.co/K6WmSZS/aids.jpg",
    date: today
  },
  {
    name: "Electronics and Communication Engineering",
    imageurl: "https://i.ibb.co/48jZq57/ece.jpg",
    date: today,
  },
  {
    name: "Information Technology",
    imageurl: "https://i.ibb.co/6tYMCG2/it.jpg",
    date: today,
  },
  {
    name: "Mechanical Engineering",
    imageurl: "https://i.ibb.co/cC6vgS1/mech.png",
    date: today,
  },
  {
    name: "Artificial Intelligence and Machine Learning",
    imageurl: "https://i.ibb.co/bXswgkq/aiml.jpg",
    date: today,
  },
  {
    name: "Computer Science and Business Systems",
    imageurl: "https://i.ibb.co/BrP6Cc5/csbs.jpg",
    date: today,
  },
  {
    name: "Electrical and Electronics Engineering",
    imageurl: "https://i.ibb.co/s3MbZv2/eee.png",
    date: today,
  },
  {
    name: "Cybersecurity",
    imageurl: "https://i.ibb.co/s3MbZv2/eee.png",
    date: today,
  },
];
function Departments() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date("2024-10-14"));
  const [isEventListOpen, setIsEventListOpen] = useState(false);
  const token = localStorage.getItem("authToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  useEffect(() => {
    const getcount = async () => {
      try {
        // Fetch total department counts from the API
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/event/gettotalcounts`);
        const totalCountsDept = response.data.TotalCountsDept[0].totalCounts;

        console.log("Received Department Counts:", totalCountsDept);

        // Map over the products array to assign counts
        const updatedProducts = products.map(product => {
          const departmentName = product.name; // Normalize department name

          // Match the department name directly from totalCountsDept
          const count = totalCountsDept[departmentName] || 0; // Use count or default to 0

          return {
            ...product,
            count: count // Assign the count to the product
          };
        });
        console.log("1233333333333333333 : ",updatedProducts)
        setData(updatedProducts); // Update state with updated products array
      } catch (error) {
        console.error("Error fetching department counts: ", error);
      }
    };

    getcount(); // Invoke the function
  }, []); // Dependency array includes products to ensure updates when products change
  
  const closeEventModal = () => {
    setSelectedEvent(null); 
  };
  const handleOpenModal = async (event) => {
    try {
      console.log(event, "😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️");
      console.log(event, "event startdate");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/event/getdepartmentdata`,
        { department: event }
      );
      
      console.log("Response data: ", response.data);
      setIsEventListOpen(true);
  
      if (response.data && response.data.length > 0) {
        setEvents(response.data);
        console.log("😤😤", response.data); // Use response.data instead of events
      } else {
        setEvents([]); // Set an empty array to ensure the UI updates correctly
        console.log("No events found for this department.");
      }
    } catch (error) {
      console.error("Error fetching department events: ", error);
    }
  };
  
  

  const openEventModal = (event) => {
    setSelectedEvent(event); 
  };
  // const fetchEventsForDepartment = async (departmentName) => {
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/event/getalldata`, { departmentName });
  //     const filteredData = response.data.eventdata.filter((elem) => elem.status === "pending");
  //     setEvents(filteredData);
  //     console.log("Fetched events for department:", filteredData);
  //   } catch (error) {
  //     console.error("Failed to fetch department events:", error);
  //     toast.error("Failed to fetch department events.");
  //   }
  // };
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };
  const closeEventList = () => {
    setIsEventListOpen(false); // Close the event list
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const eventsForSelectedDate = events.filter(
    (event) =>
      new Date(event.date).toLocaleDateString() ===
      selectedDate.toLocaleDateString()
  );

  const filteredProducts = products.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  console.log("Filtered Products:❤️‍🔥❤️‍🔥❤️‍🔥", filteredProducts);
  
  
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       console.log("😪😍");
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/event/getalldata`
//       );
//       console.log(response.data.eventdata[0].departments,"👏👏👏👏👏👏😍😍")
//       // const filteredData = response.data.eventdata.filter(
//       //   (elem) => elem.status === "pending"
//       // );
//       setData(response.data.eventdata);
//       console.log("😒😒😒filtereddata",response.data.eventdata)
//       setEvents(response.data.eventdata);
      
//       console.log("👏👏👏",events)
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//       toast.error("Failed to fetch data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="xl:ml-72 overflow-x-hidden">
      <SideBar />
      <div className="xl:flex flex-row justify-between items-center mb-3">
        <div className="absolute top-3 xl:relative xl:ml-[66%] xl:mt-5 flex justify-center xl:justify-end">
          <h1 className="text-xl ml-72 xl:mr-20 font-bold font-Afacad w-28 h-8 flex justify-center items-center xl:mb-3 shadow-md shadow-[#00000013] rounded-lg text-[#7848F4]">
            IQAC
          </h1>
        </div>
      </div>

      <div className="xl:flex xl:flex-row justify-between">
        <h1 className="xl:text-3xl ml-5 text-xl text-nowrap mt-3 mb-3 font-Afacad font-bold bg-gradient-to-r from-purple-500 to-violet-900 text-transparent bg-clip-text">
          Departments
        </h1>
        <div className="xl:relative xl:w-96 mt-1 mr-16 ml-5">
          <input
            type="text"
            placeholder="Enter the event name"
            value={searchTerm}
            onChange={handleSearch}
            className="xl:w-full xl:h-14 w-96 pl-5 h-14 xl:pl-10 xl:pr-16 border-[#7848F4] border rounded-md"
          />
          <div className="xl:absolute xl:left-2 xl:top-14 -mt-7 transform -translate-y-1/2 text-gray-400">
            <FaSearch className="xl:block hidden" />
          </div>
          <button className="xl:absolute font-Afacad right-2 top-1/2 ml-72 transform -translate-y-1/2 bg-[#7848F4] text-white px-4 py-1 rounded-sm">
            Search
          </button>
        </div>
      </div>

      <div className="xl:grid xl:grid-cols-3 xl:gap-6 flex flex-col gap-5 m-4 xl:mt-5">
      {data.map((dept, index) => (
  <div
    key={index}
    className="w-96 h-full shadow-md shadow-[#0b0b0c67] rounded-lg relative pb-16" // Added padding bottom
  >
    <img
      className="w-96 h-40 rounded-lg"
      src={dept.imageurl}
      alt={dept.name}
    />

    <div className="ml-5 mt-3 flex flex-row gap-1">
      <FaCalendar size={20} className="mt-1" color="#46459d" />
      <h1 className="text-xl text-[#8b21e8] font-Afacad">
        {dept.name}
      </h1>
    </div>

    <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center">
      <button
        className="bg-violet-800 text-xl font-Afacad text-white font-bold rounded-md w-28"
        onClick={() => handleOpenModal(dept.name)}
      >
        View More
      </button>
      
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8b21e8] text-white">
        <span className="text-sm">{dept.count || 0}</span>
      </div>
    </div>
  </div>
))}


      </div>





 
     {/* Event List Modal */}
{isEventListOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-modal" onClick={closeEventList}>
        &times;
      </button>
      <h2 className="modal-date-title">
        Events for {selectedDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </h2>
      <ul className="event-list">
      {events.length > 0 ? (
  events.filter(event => event.status === "pending").length > 0 ? (
    events
      .filter(event => event.status === "pending") // Filter for pending events
      .map((event, index) => (
        <li
          key={index}
          className="event-item"
          onClick={() => openEventModal(event)}
        >
          <div className="event-row">
            <span className="event-name">{event.eventname}</span>
            <span className={`event-category ${event.typeofevent.toLowerCase()}`}>
              {event.typeofevent} {/* Use typeofevent instead of type */}
            </span>
            <span className={`event-icon ${event.typeofevent.toLowerCase()}`}>
              {event.typeofevent === "Technical" ? "📘" : "📕"}
            </span>
          </div>
          <hr className="event-divider" />
        </li>
      ))
  ) : (
    <p>No pending events available.</p>
  )
) : (
  <p>No events available.</p> // Message when no events at all
)}


      </ul>
    </div>
  </div>
)}

{/* Event Modal */}
{selectedEvent && (
  <div className="custom-modal-overlay">
    <div className="custom-modal-content">
      <button className="custom-close-modal" onClick={closeEventModal}>
        &times;
      </button>
      <img
        src={selectedEvent.imageurl}
        alt={selectedEvent.eventname}
        className="custom-modal-image"
      />
      <h2 className="custom-modal-title">{selectedEvent.eventname}</h2>
      <p className="custom-modal-description">
      <strong>Department:</strong> {selectedEvent.departments}
            <br />
              <strong>Start Time:</strong> {selectedEvent.eventstarttime}
              <br />
              <strong>End Time:</strong> {selectedEvent.eventendtime}
              <br />
              <strong>End End date:</strong> {selectedEvent.eventstartdate}
              <br />
              <strong>start Date:</strong> {selectedEvent.eventenddate}
              <br />
            
              <strong>Venue:</strong> {selectedEvent.venue}
              <br />
      </p>
      {/* <p className="modal-date">
        <strong>{selectedDate.toLocaleDateString()}</strong>
      </p> */}
    </div>
  </div>
)}
</div>
  )}



export default Departments;