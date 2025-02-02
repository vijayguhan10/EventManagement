import React, { useEffect } from "react";

const FoodTable = ({ formData, setFormData }) => {
  console.log("Consoling The Table Form Data : ", formData);
  const handleChange = (date, mealType, menuType, category, value) => {
    setFormData((prev) => ({
      ...prev,
      foodDetails: {
        ...prev.foodDetails,
        [date]: {
          ...prev.foodDetails[date],
          [mealType]: {
            ...prev.foodDetails[date]?.[mealType],
            [menuType]: {
              ...prev.foodDetails[date]?.[mealType]?.[menuType],
              [category]: value,
            },
          },
        },
      },
    }));
  };
  useEffect(() => {}, [formData]);
  const dates = ["date1", "date2", "date3", "date4"];
  const meals = [
    { name: "Breakfast", types: ["Veg", "Non Veg"] },
    { name: "Morning Refreshment", types: [""] },
    { name: "Lunch", types: ["Veg", "Non Veg"] },
    { name: "Evening Refreshment", types: [""] },
    { name: "Dinner", types: ["Veg", "Non Veg"] },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-100 text-left font-medium">
              Type
            </th>
            {dates.map((date, index) => (
              <React.Fragment key={date}>
                <th
                  colSpan="2"
                  className="px-4 py-2 bg-gray-100 text-center font-medium"
                >
                  <div className="flex flex-col items-center">
                    <label className="text-xs text-gray-500">Start Date</label>
                    <input
                      type="date"
                      value={formData.dates?.[date]?.start || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dates: {
                            ...prev.dates,
                            [date]: {
                              ...prev.dates[date],
                              start: e.target.value,
                            },
                          },
                        }))
                      }
                      className="w-40 p-1 border rounded text-sm"
                    />
                  </div>
                  <div className="flex flex-col items-center mt-2">
                    <label className="text-xs text-gray-500">End Date</label>
                    <input
                      type="date"
                      value={formData.dates?.[date]?.end || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dates: {
                            ...prev.dates,
                            [date]: {
                              ...prev.dates[date],
                              end: e.target.value,
                            },
                          },
                        }))
                      }
                      className="w-40 p-1 border rounded text-sm"
                    />
                  </div>
                </th>
              </React.Fragment>
            ))}
          </tr>
          <tr>
            <th className="px-4 py-2 bg-gray-50">Meal</th>
            {dates.map((date) => (
              <React.Fragment key={date}>
                <th className="px-2 py-1 text-gray-700 bg-gray-50 text-center">
                  Participants
                </th>
                <th className="px-2 py-1 text-gray-700 bg-gray-50 text-center">
                  Guest/VIP
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <React.Fragment key={meal.name}>
              {meal.types.length > 1 ? (
                meal.types.map((type) => (
                  <tr
                    key={`${meal.name}-${type}`}
                    className="odd:bg-white even:bg-gray-50"
                  >
                    <td className="px-4 py-2 text-gray-800">
                      {type === "" ? meal.name : `${meal.name} - ${type}`}
                    </td>
                    {dates.map((date) => (
                      <React.Fragment key={date}>
                        <td className="px-2 py-1 text-center">
                          <input
                            type="number"
                            min="0"
                            className="w-20 p-1 border rounded text-sm"
                            value={
                              formData.foodDetails?.[date]?.[meal.name]
                                ?.participants?.[type] || ""
                            }
                            onChange={(e) =>
                              handleChange(
                                date,
                                meal.name,
                                "participants",
                                type,
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="px-2 py-1 text-center">
                          <input
                            type="number"
                            min="0"
                            className="w-20 p-1 border rounded text-sm"
                            value={
                              formData.foodDetails?.[date]?.[meal.name]
                                ?.guest?.[type] || ""
                            }
                            onChange={(e) =>
                              handleChange(
                                date,
                                meal.name,
                                "guest",
                                type,
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800">{meal.name}</td>
                  {dates.map((date) => (
                    <React.Fragment key={date}>
                      <td className="px-2 py-1 text-center">
                        <input
                          type="number"
                          min="0"
                          className="w-20 p-1 border rounded text-sm"
                          value={
                            formData.foodDetails?.[date]?.[meal.name]
                              ?.participants || ""
                          }
                          onChange={(e) =>
                            handleChange(
                              date,
                              meal.name,
                              "participants",
                              "total",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-2 py-1 text-center">
                        <input
                          type="number"
                          min="0"
                          className="w-20 p-1 border rounded text-sm"
                          value={
                            formData.foodDetails?.[date]?.[meal.name]?.guest ||
                            ""
                          }
                          onChange={(e) =>
                            handleChange(
                              date,
                              meal.name,
                              "guest",
                              "total",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-500 mt-4 text-center">
        Note: Please ensure you enter only numeric values for the participants
        and guest menus.
      </p>
    </div>
  );
};

export default FoodTable;
