import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEventData } from "../redux/EventSlice";
import { Home, MessageCircle, Bus, Utensils, Bed, Flag } from "lucide-react";
import TermsandConditon from "./Terms&Conditons";
const Form = ({ event = {} }) => {
  const dispatch = useDispatch();
  const storedEvent = useSelector((state) => state.event.event);
  console.log("stored event : ", storedEvent);
  useEffect(() => {
    dispatch(setEventData(event));
  }, []);

  return (
    <div>
      <header className="sticky top-0 bg-white ml-20 text-gray-800 p-3 z-50">
        <div className="ml-0.5 mx-auto flex items-center justify-evenly px-4">
          <h1 className="text-lg font-semibold tracking-wide mr-[17%]">
            Event Form Navigator
          </h1>
          <nav className="ml-84">
            <ul className="flex space-x-6 text-sm">
              <li>
                <Link
                  to="/forms/basic"
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
                >
                  <Home size={16} />
                  <span>Basic Event</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/forms/communication"
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
                >
                  <MessageCircle size={16} />
                  <span>Communication</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/forms/transport"
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
                >
                  <Bus size={16} />
                  <span>Transport</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/forms/food"
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
                >
                  <Utensils size={16} />
                  <span>Food</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/forms/guest-room"
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
                >
                  <Bed size={16} />
                  <span>Guest Room</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/forms/end"
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
                >
                  <Flag size={16} />
                  <span>End Form</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="ml-20 text-sm">
        <Outlet />
      </div>
    </div>
  );
};

export default Form;
