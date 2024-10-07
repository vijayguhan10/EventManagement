import React from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import data from "../data/db.json";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import welcome from "../assets/Welcome-bro 1 (1).png";
import CalendarComponent from "./CalenderComponent";
import SideBar from "./SideBar";

const Dashboard = () => {
  return (
    <div className="xl:overflow-y-hidden xl:overflow-hidden h-fit">
      <SideBar />

      <div className="flex flex-col xl:flex-row w-full">
        <div className="xl:ml-72 xl:w-[40%] w-full">
          {" "}
          <div className="  hidden xl:block flex-row justify-between items-center mb-3">
            <div className="relative mt-1">
              <input
                type="text"
                placeholder="Enter the event name"
                className="xl:w-full xl:h-14 xl:pl-10 xl:pr-16 border-[#7848F4] border rounded-md"
              />
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch />
              </div>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#7848F4] text-white px-4 py-1 rounded-sm">
                Search
              </button>
            </div>
          </div>
          <div className=" xl:hidden block w-full m-5">
            <div className=" ml-2">
              <CalendarComponent />
            </div>
            <div className="mr-8 ">
              <h1
                className="text-2xl pt-5 pl-5 pb-3 text-[#7848F4] font-Afacad font-bold"
                style={{ textShadow: "0 8px 8px #c2c0c0" }}
              >
                Event Data
              </h1>
              <div className="shadow-md shadow-[#00000036] rounded-lg p-4 border border-[#0000004a]">
                <div className="flex justify-between items-center mb-2">
                  <FaStar color="#7848F4" />
                  <h1 className="text-right text-lg mb-0 font-Afacad">
                    12:30PM - 3:00PM
                  </h1>
                </div>
                <div className="xl:flex xl: items-center ">
                  <img
                    className="w-[30%] shadow-black shadow-sm mr-4"
                    src="https://analyticsindiamag.com/wp-content/uploads/2024/06/Zoho-Logo-1300x618.jpg"
                    alt="zoho"
                  />
                  <div className="">
                    <p
                      className="text-xl font-bold font-Afacad"
                      style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }}
                    >
                      Zoho Preparation (Placements)
                    </p>
                    <p className="text-md text-gray-600">
                      Conducted by Placement Team
                    </p>
                    <h1>
                      <span className="text-[#7848F4] font-bold  font-Afacad">
                        Venue:
                      </span>{" "}
                      Fullstack lab
                    </h1>
                    <div className="flex xl:justify-between">
                      <h1 className="mt-4 font-Afacad">
                        <span className="font-bold text-md font-afacad text-[#7848F4]">
                          Start Date
                        </span>
                        : 12.10.2024
                      </h1>
                      <h1 className="mt-4 ml-2 font-Afacad">
                        <span className="font-bold text-md font-Afacad text-[#7848F4]">
                          End Date
                        </span>
                        : 15.10.2024
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" rounded-lg border-transparent bg-white">
            <div className="shadow-md shadow-[#00000036] m-5 rounded-xl border-transparent xl:h-36 h-48">
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <h1
                    className="pt-3 pl-11 xl:text-2xl text-xl font-Afacad text-[#7848F4]"
                    style={{ textShadow: "0 8px 8px #c2c0c0" }}
                  >
                    Welcome Back Vijay
                  </h1>
                  <p className="pt-3 pl-10 xl:pl-16 text-sm text-left xl:text-xl font-Afacad font-bold">
                    Sri Eshwar is the most preferred institution for high
                    ranking students. With industry-relevant curriculum
                  </p>
                  <button className="mt-3 xl:ml-40 ml-28 font-Afacad mb-20 bg-[#7a67ea] text-white w-20 h-7 flex items-center justify-center rounded-md">
                    Visit Me
                  </button>
                </div>
                <img
                  src={welcome}
                  className="xl:w-40 xl:h-40 w-28 h-28"
                  alt="welcome"
                />
              </div>
            </div>
          </div>
          <h1
            className=" text-2xl pl-5 text-violet-500 font-Afacad font-bold"
            style={{ textShadow: "0 8px 8px #c2c0c0" }}
          >
            Upcoming Events
          </h1>
          <div className="m-1">
            <Carousel
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showIndicators={true}
            >
              {Array(Math.ceil(data.length / (window.innerWidth < 640 ? 1 : 3))) // Slide one card for small screens
                .fill()
                .map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="xl:flex xl:justify-around w-full"
                  >
                    {data
                      .slice(
                        slideIndex * (window.innerWidth < 640 ? 1 : 3), // Change the slice logic based on screen size
                        slideIndex * (window.innerWidth < 640 ? 1 : 3) +
                          (window.innerWidth < 640 ? 1 : 3)
                      )
                      .map((event, index) => (
                        <div
                          key={index}
                          className={`shadow-lg rounded-md h-96 xl:h-60  flex flex-col xl:items-center xl:mx-2 xl:border border-[#00000068]  ${
                            // Use responsive classes to control the width
                            "xl:w-1/3 lg:w-1/3 " // Adjust width based on screen size
                          }`}
                        >
                          <img
                            src={event.image_url}
                            alt="img"
                            className="xl:max-w-52  rounded-3xl xl:rounded-xl xl:h-28 w-28 h-52 p-5 xl:p-2 "
                          />
                          <h1 className="pt-4 text-xl font-Afacad font-bold text-black text-center">
                            {event.eventname}
                          </h1>
                          <h1 className="pt-3 text-xl text-gray-400 font-Afacad text-center">
                            {event.eventstarttime} - {event.eventendtime}
                          </h1>
                        </div>
                      ))}
                  </div>
                ))}
            </Carousel>
          </div>
          <div className="m-5 hidden xl:block ">
            <h1
              className="text-xl xl:text-2xl pl-5 pb-3 text-[#7848F4] font-Afacad font-bold"
              style={{ textShadow: "0 8px 8px #c2c0c0" }}
            >
              Event Data
            </h1>
            <div className="shadow-xl shadow-[#00000036] rounded-lg p-4 border border-[#0000004a]">
              <div className="flex justify-between items-center">
                <FaStar color="#7848F4" />
                <h1 className="text-right text-lg mb-0 font-Afacad">
                  12:30PM - 3:00PM
                </h1>
              </div>
              <div className="xl:flex xl: items-center ">
                <img
                  className="w-[30%] shadow-black shadow-sm mr-4"
                  src="https://analyticsindiamag.com/wp-content/uploads/2024/06/Zoho-Logo-1300x618.jpg"
                  alt="zoho"
                />
                <div className="">
                  <p
                    className="text-xl font-bold font-Afacad"
                    style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }}
                  >
                    Zoho Preparation (Placements)
                  </p>
                  <p className="text-md text-gray-600">
                    Conducted by Placement Team
                  </p>
                  <h1>
                    <span className="text-[#7848F4] font-bold  font-Afacad">
                      Venue:
                    </span>{" "}
                    Fullstack lab
                  </h1>
                  <div className="flex xl:justify-between">
                    <h1 className="mt-4 font-Afacad">
                      <span className="font-bold text-md font-afacad text-[#7848F4]">
                        Start Date
                      </span>
                      : 12.10.2024
                    </h1>
                    <h1 className="mt-4 ml-2 font-Afacad">
                      <span className="font-bold text-md font-Afacad text-[#7848F4]">
                        End Date
                      </span>
                      : 15.10.2024
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" xl:block hidden w-full xl:w-[50%] ml-10 mt-4">
          <h1 className="text-xl font-bold font-Afacad flex items-center justify-center w-40 ml-[70%] mb-3 shadow-md shadow-[#00000013] rounded-lg text-[#7848F4]">
            IQAC
          </h1>
          <CalendarComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
