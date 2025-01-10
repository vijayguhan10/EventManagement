import React from "react";

const AmenitiesForm = ({ amenitiesData }) => {
  console.log("Amenities form data: ", amenitiesData);
  const { dates = [] } = amenitiesData || {};

  console.log("dates", dates);

  const foodDetails = dates.map((food) => food?.foodDetails || {});

  console.log("All Food Details:", foodDetails);

  // Extract unique meal types (Breakfast, Lunch, etc.)
  const mealTypes = foodDetails.reduce((acc, details) => {
    Object.keys(details).forEach((meal) => {
      if (!acc.includes(meal)) acc.push(meal);
    });
    return acc;
  }, []);

  return (
    <div>
      <h1 className="main-heading">Amenities Form</h1>
      <table>
        <thead>
          <tr>
            <th rowSpan="2" style={{ textAlign: "center" }}>
              Type
            </th>
            {dates.length > 0 ? (
              dates.map((date, idx) => (
                <th colSpan="4" key={idx}>
                  {new Date(date.date.start).toLocaleDateString()} -{" "}
                  {new Date(date.date.end).toLocaleDateString()}{" "}
                  {/* Display both start and end dates */}
                </th>
              ))
            ) : (
              <th colSpan="4">No Dates Available</th>
            )}
          </tr>
          <tr>
            {dates.length > 0 ? (
              dates.map((_, idx) => (
                <React.Fragment key={idx}>
                  <th>Participants Veg</th>
                  <th>Participants NonVeg</th>
                  <th>Guest/VIP Veg</th>
                  <th>Guest/VIP NonVeg</th>
                </React.Fragment>
              ))
            ) : (
              <>
                <th>Participants Veg</th>
                <th>Participants NonVeg</th>
                <th>Guest/VIP Veg</th>
                <th>Guest/VIP NonVeg</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {mealTypes.length > 0 ? (
            mealTypes.map((mealType) => (
              <tr key={mealType}>
                <td>{mealType}</td>
                {dates.length > 0 ? (
                  dates.map((date, idx) => {
                    const dateFoodDetails = foodDetails[idx]?.[mealType] || {};
                    return (
                      <React.Fragment key={idx}>
                        <td>{dateFoodDetails.participants?.Veg || "0"}</td>
                        <td>{dateFoodDetails.participants?.NonVeg || "0"}</td>
                        <td>{dateFoodDetails.guest?.Veg || "0"}</td>
                        <td>{dateFoodDetails.guest?.NonVeg || "0"}</td>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <td colSpan={4}>No Meal Data Available</td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={dates.length * 4 + 1}>No Food Details Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AmenitiesForm;
