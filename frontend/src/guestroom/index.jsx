import React, { useState } from 'react';
import { Building2, Users, CalendarDays, Phone, BookOpen, MapPin } from 'lucide-react';
import RoomSelection from './RoomSelection';
import FormInput from './FormInput';
import EventTypeSelection from './EventTypeSelection';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    department: '',
    requestorName: '',
    empId: '',
    mobile: '',
    designation: '',
    purpose: '',
    date: '',
    guestCount: '',
    eventType: '',
    selectedRooms: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoomChange = (roomId) => {
    setFormData(prev => ({
      ...prev,
      selectedRooms: prev.selectedRooms.includes(roomId)
        ? prev.selectedRooms.filter(id => id !== roomId)
        : [...prev.selectedRooms, roomId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 py-6 px-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Building2 className="h-8 w-8" />
              Guest House Booking Form
            </h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                icon={<BookOpen />}
                label="Department/Centre"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Enter department name"
              />
              
              <FormInput
                icon={<Users />}
                label="Requestor Name"
                name="requestorName"
                value={formData.requestorName}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />

              <FormInput
                label="Employee ID"
                name="empId"
                value={formData.empId}
                onChange={handleInputChange}
                placeholder="Enter employee ID"
              />

              <FormInput
                icon={<Phone />}
                label="Mobile Number"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
              />

              <FormInput
                icon={<MapPin />}
                label="Designation & Department"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Enter designation"
                className="md:col-span-2"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                  placeholder="Enter purpose of booking"
                />
              </div>

              <FormInput
                icon={<CalendarDays />}
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
              />

              <FormInput
                icon={<Users />}
                label="Number of Guests"
                name="guestCount"
                type="number"
                min="1"
                value={formData.guestCount}
                onChange={handleInputChange}
                placeholder="Enter number of guests"
              />
            </div>

            <EventTypeSelection
              selectedType={formData.eventType}
              onTypeChange={(type) => setFormData(prev => ({ ...prev, eventType: type }))}
            />

            <RoomSelection
              selectedRooms={formData.selectedRooms}
              onRoomChange={handleRoomChange}
            />

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold"
              >
                Submit Booking Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;