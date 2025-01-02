import React from 'react';

const AmenitiesForm = () => {
  return (
    <div>
      <h1 className="main-heading">Amenities Form</h1>
      <table>
        <thead>
          <tr>
            <th rowspan="2" style={{ textAlign: 'center' }}>Type</th>
            <th colspan="2">mm/dd/yyyy</th>
            <th colspan="2">mm/dd/yyyy</th>
            <th colspan="2">mm/dd/yyyy</th>
            <th colspan="2">mm/dd/yyyy</th>
          </tr>
          <tr>
            <th>Participants Menu</th>
            <th>Guest/VIP Menu</th>
            <th>Participants Menu</th>
            <th>Guest/VIP Menu</th>
            <th>Participants Menu</th>
            <th>Guest/VIP Menu</th>
            <th>Participants Menu</th>
            <th>Guest/VIP Menu</th>
          </tr>
        </thead>
        <tbody>
          {/* Populate with data */}
          <tr>
            <td>Breakfast - Veg</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td>3</td>
            <td>1</td>
            <td>4</td>
            <td>1</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AmenitiesForm;



