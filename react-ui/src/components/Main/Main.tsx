import React from "react";
import SlotSelection from "./SlotSelection";
import "./Main.css";

const BookingForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 p-6 border border-gray-300 rounded-lg"
    >
      <h1 className="text-2xl font-bold text-center mb-6">
        Bike Parking Slot Booking
      </h1>
      {/* <UserDetailsForm /> */}
      <SlotSelection />
    </form>
  );
};

export default BookingForm;
