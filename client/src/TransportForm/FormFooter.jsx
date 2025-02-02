import React from 'react';

export function FormFooter() {
  return (
    <div className="mt-8 border-t pt-6">
      {/* <div className="grid grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-sm font-medium text-gray-700">Signature of Faculty Member/Staff</p>
          <div className="mt-2 h-20 border rounded"></div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Recommended by Dean/HOD/Section Head</p>
          <div className="mt-2 h-20 border rounded"></div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Transport Incharge</p>
          <div className="mt-2 h-20 border rounded"></div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Clearance from Dean IQAC</p>
          <div className="mt-2 h-20 border rounded"></div>
        </div>
      </div> */}
      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}