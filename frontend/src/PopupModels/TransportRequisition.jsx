import React from 'react';

const TransportRequisition = ({transportData}) => {
  return (
    <div>
      <h1 className="main-heading">Transport Requisition Form</h1>
      <table>
        <thead>
          <tr>
            <th>Event Requisitor Name</th>
            <th>Details of the Traveller</th>
            <th>Pick up Date & Time</th>
            <th>Pick up Location</th>
            <th>Drop Date & Time</th>
            <th>Drop Location</th>
            <th>No.of Passengers</th>
            <th>Type of Vehicle</th>
            <th>Special Requirements</th>
            <th>Driver Information</th>
          </tr>
        </thead>
        <tbody>
          {/* Populate with data */}
          <tr>
            <td>name</td>
            <td>Detail</td>
            <td>Date</td>
            <td>location</td>
            <td>date</td>
            <td>location</td>
            <td>no of pass</td>
            <td>vehicle</td>
            <td>requir</td>
            <td>
              <table className="nested-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile No.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>manish</td>
                    <td>1236547890</td>
                  </tr>
                  <tr>
                    <td>prakash</td>
                    <td>7894561230</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default TransportRequisition;
