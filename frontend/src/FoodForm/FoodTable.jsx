import React from 'react';

const FoodTable = ({ formData, setFormData }) => {
  const handleChange = (date, mealType, menuType, category, value) => {
    setFormData(prev => ({
      ...prev,
      foodDetails: {
        ...prev.foodDetails,
        [date]: {
          ...prev.foodDetails[date],
          [mealType]: {
            ...prev.foodDetails[date]?.[mealType],
            [menuType]: {
              ...prev.foodDetails[date]?.[mealType]?.[menuType],
              [category]: value
            }
          }
        }
      }
    }));
  };

  const dates = ['date1', 'date2', 'date3', 'date4'];
  const meals = [
    { name: 'Breakfast', types: ['Veg', 'Non Veg'] },
    { name: 'Morning Refreshment', types: [''] },
    { name: 'Lunch', types: ['Veg', 'Non Veg'] },
    { name: 'Evening Refreshment', types: [''] },
    { name: 'Dinner', types: ['Veg', 'Non Veg'] }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2">Type</th>
            {dates.map((date, index) => (
              <React.Fragment key={date}>
                <th colSpan="2" className="px-4 py-2">
                  <input
                    type="date"
                    value={formData.dates?.[date] || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      dates: { ...prev.dates, [date]: e.target.value }
                    }))}
                    className="w-full text-sm"
                  />
                </th>
              </React.Fragment>
            ))}
          </tr>
          <tr>
            <th></th>
            {dates.map(date => (
              <React.Fragment key={date}>
                <th className="px-2 py-1 text-sm">Participants Menu</th>
                <th className="px-2 py-1 text-sm">Guest/VIP Menu</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <React.Fragment key={meal.name}>
              {meal.types.length > 1 ? (
                meal.types.map((type) => (
                  <tr key={`${meal.name}-${type}`}>
                    <td className="px-4 py-2">{type === '' ? meal.name : `${meal.name} - ${type}`}</td>
                    {dates.map((date) => (
                      <React.Fragment key={date}>
                        <td className="px-2 py-1">
                          <input
                            type="number"
                            min="0"
                            className="w-full border rounded px-2 py-1"
                            value={formData.foodDetails?.[date]?.[meal.name]?.participants?.[type] || ''}
                            onChange={(e) => handleChange(date, meal.name, 'participants', type, e.target.value)}
                          />
                        </td>
                        <td className="px-2 py-1">
                          <input
                            type="number"
                            min="0"
                            className="w-full border rounded px-2 py-1"
                            value={formData.foodDetails?.[date]?.[meal.name]?.guest?.[type] || ''}
                            onChange={(e) => handleChange(date, meal.name, 'guest', type, e.target.value)}
                          />
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2">{meal.name}</td>
                  {dates.map((date) => (
                    <React.Fragment key={date}>
                      <td className="px-2 py-1">
                        <input
                          type="number"
                          min="0"
                          className="w-full border rounded px-2 py-1"
                          value={formData.foodDetails?.[date]?.[meal.name]?.participants || ''}
                          onChange={(e) => handleChange(date, meal.name, 'participants', 'total', e.target.value)}
                        />
                      </td>
                      <td className="px-2 py-1">
                        <input
                          type="number"
                          min="0"
                          className="w-full border rounded px-2 py-1"
                          value={formData.foodDetails?.[date]?.[meal.name]?.guest || ''}
                          onChange={(e) => handleChange(date, meal.name, 'guest', 'total', e.target.value)}
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
      <p className="text-sm text-gray-600 mt-2">Note: Please put only Numbers in the above table</p>
    </div>
  );
};

export default FoodTable;