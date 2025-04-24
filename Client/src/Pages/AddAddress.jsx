import React, { useState } from 'react';
import { assets } from '../assets/assets';

const InputField = ({ type, placeholder, name, handleChange, address, ...props }) => (
  <input
    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary transition-all duration-200"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    {...props}
  />
);

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitted Address:", address);
    alert("Address saved successfully!");
  };

  return (
    <div className="mt-16 pb-16 px-4 md:px-10 max-w-5xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-3xl font-bold text-gray-800">Shipping Address</p>
          <p className="text-sm text-gray-500">Please fill in the details below to proceed with your order.</p>
        </div>
        <div className="w-1/2 hidden sm:block ml-6">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-primary rounded-full w-1/3"></div>
          </div>
          <span className="text-sm text-primary font-medium">Step 1 of 3</span>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between items-center">
        {/* Form Card */}
        <div className="w-full md:w-2/3 bg-white shadow-md rounded-xl p-6">
          <form onSubmit={onSubmitHandler} className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" />
              <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" />
            </div>

            <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email Address" />
            <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="City" />
              <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="zipcode" type="text" placeholder="Zip Code" inputMode="numeric" pattern="[0-9]*" />
              <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country" />
            </div>

            <InputField handleChange={handleChange} address={address} name="phone" type="tel" placeholder="Phone Number" inputMode="numeric" pattern="[0-9]{10}" />

            <button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary/90 transition cursor-pointer rounded-lg uppercase tracking-wider">
              Save Address
            </button>
          </form>
        </div>

        {/* Image */}
        <img className="w-full md:w-[35%] mb-10 md:mb-0 md:ml-10" src={assets.add_address_iamge} alt="add-address" />
      </div>
    </div>
  );
};

export default AddAddress;
