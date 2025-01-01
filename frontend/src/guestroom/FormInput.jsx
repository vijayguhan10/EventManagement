import React from 'react';
const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  icon,
  className = '',
  min,
  value,
  onChange
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{icon}</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          min={min}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            icon ? 'pl-10' : 'pl-4'
          } py-2 border`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default FormInput;