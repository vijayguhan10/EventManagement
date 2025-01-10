import React from "react";

const GuestHouseBooking = ({ guestroomData }) => {
  const date = new Date(guestroomData.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1
        className="main-heading"
        style={{
          textAlign: "left",
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Guest House Booking
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "2px solid black",
                padding: "11px",
                textAlign: "left",
                backgroundColor: "#E4E8EB",
              }}
            >
              Purpose
            </th>
            <th
              style={{
                border: "2px solid black",
                padding: "11px",
                textAlign: "left",
                backgroundColor: "#E4E8EB",
              }}
            >
              Date
            </th>
            <th
              style={{
                border: "2px solid black",
                padding: "11px",
                textAlign: "left",
                backgroundColor: "#E4E8EB",
              }}
            >
              No. of Guests
            </th>
            <th
              colSpan={
                Array.isArray(guestroomData.selectedRooms)
                  ? guestroomData.selectedRooms.length
                  : 0
              }
              style={{
                border: "2px solid black",
                padding: "11px",
                textAlign: "center",
                backgroundColor: "#E4E8EB",
              }}
            >
              Room Selection
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                border: "2px solid black",
                padding: "11px",
                textAlign: "left",
              }}
            >
              {guestroomData.purpose}
            </td>
            <td
              style={{
                border: "2px solid black",
                padding: "11px",
                textAlign: "left",
              }}
            >
              {formattedDate}
            </td>
            <td
              style={{
                border: "2px solid black",
                padding: "11px",
                textAlign: "left",
              }}
            >
              {guestroomData.guestCount}
            </td>
            {Array.isArray(guestroomData.selectedRooms) &&
              guestroomData.selectedRooms.map((data, index) => (
                <td
                  key={index}
                  style={{
                    border: "2px solid black",
                    padding: "11px",
                    textAlign: "left",
                  }}
                >
                  {data}
                </td>
              ))}
          </tr>
        </tbody>
      </table>

      <h3>Amenity Incharge:</h3>
      <br />
    </div>
  );
};

export default GuestHouseBooking;
