// useDashboard.js
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

const useDashboard = () => {
  const [completedEvents, setCompletedEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const [WholeData, SetWholeData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.post(
          "https://eventmanagement-2-mye7.onrender.com/event/gettodaydata"
        );

        const eventData = response.data;
        const eventsArray = Object.values(eventData);
        const today = dayjs();

        const completed = [];
        const current = [];
        const future = [];
        SetWholeData(eventsArray[1]);
        eventsArray[1].forEach((event) => {
          const eventStartDate = dayjs(event.eventstartdate, "DD/MM/YY");
          const eventEndDate = dayjs(event.eventenddate, "DD/MM/YY");
          if (event.status === "completed") {
            completed.push(event);
          } else if (
            eventStartDate.isBefore(today) ||
            (eventStartDate.isSame(today) &&
              eventEndDate.isAfter(today) &&
              event.status === "pending")
          ) {
            current.push(event);
          } else if (eventStartDate.isAfter(today)) {
            future.push(event);
          }
        });

        setCompletedEvents(completed);
        setCurrentEvents(current);
        setFutureEvents(future);
        SetLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        SetLoading(false);
      }
    };

    fetchEventData();
  }, []);

  return { completedEvents,WholeData, currentEvents, futureEvents, Loading };
};

export default useDashboard;
