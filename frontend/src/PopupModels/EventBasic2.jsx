import React from 'react';

const EventBasic2 = () => {
  return (
    <div>
      <h1 className="main-heading">Event Basic 2</h1>
      <table>
        <thead>
          <tr>
            <th>Organizers</th>
            <th>Year</th>
            <th>Categories</th>
            <th>Professional Societies and Bodies Involved</th>
            <th>Resource Persons</th>
            <th>Logo</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table className="nested-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Phone No.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1234</td>
                    <td>manish</td>
                    <td>captain</td>
                    <td>1236547890</td>
                  </tr>
                  <tr>
                    <td>12345</td>
                    <td>prakash</td>
                    <td>leader</td>
                    <td>7894561230</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>2024</td>
            <td>Students</td>
            <td>IGEN</td>
            <td>
              <table className="nested-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Affiliation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>prakash</td>
                    <td>affiliation</td>
                  </tr>
                  <tr>
                    <td>mani</td>
                    <td>affiliation</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>IGEN</td>
            <td>description</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default EventBasic2;
