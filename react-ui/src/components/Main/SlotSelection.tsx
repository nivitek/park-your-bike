import { useEffect, useState } from "react";

const initialSlots = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  booked: false,
}));

export default function SlotBooking() {
  const [slots, setSlots] = useState(initialSlots);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    vehiclenumber: "",
  });
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/users/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUserDetails({
            name: data.name,
            email: data.email,
            phone: data.phone,
            vehiclenumber: data.vehiclenumber,
          });
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/bookings`
        );
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
          setSlots(
            initialSlots.map((slot) => ({
              ...slot,
              booked: data.some((booking: any) => booking.slot === slot.id),
            }))
          );
        } else {
          console.error("Error fetching bookings1:");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
    fetchUserData();
  }, []);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [bookings, setBookings] = useState<
    { slot: number; dates: string[]; user: string }[]
  >([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSlotSelect = (id: number) => {
    if (!slots.find((slot) => slot.id === id)?.booked) {
      setSelectedSlot(id);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const isUserAlreadyBooked = (date: string) => {
    return bookings.some(
      (booking) =>
        booking.user === userDetails.phone && booking.dates.includes(date)
    );
  };

  const handleBooking = async () => {
    if (!userDetails.phone || !userDetails.name) {
      alert("Please enter your name and phone number before booking.");
      return;
    }

    if (!selectedSlot || selectedDates.length === 0) {
      alert("Please select a slot and at least one date.");
      return;
    }

    // Check if user is already booked for any of the selected dates
    if (selectedDates.some(isUserAlreadyBooked)) {
      alert("You can only book one slot per day.");
      return;
    }

    const newBooking = {
      slot: selectedSlot,
      dates: selectedDates,
      user: userDetails.phone, // Storing phone as user identifier
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBooking),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }

      setBookings([...bookings, newBooking]);
      setSlots(
        slots.map((slot) =>
          slot.id === selectedSlot ? { ...slot, booked: true } : slot
        )
      );

      setSelectedSlot(null);
      setSelectedDates([]);
      alert("Booking confirmed!");
    } catch (error: any) {
      console.error("Error booking slot:", error);
      alert(error.message || "An error occurred while booking.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* <h1 className="text-2xl font-bold mb-4">Bike Parking Slot Booking</h1> */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={userDetails.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
        />
        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-semibold">Phone</label>
        <input
          type="text"
          name="phone"
          value={userDetails.phone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
        />
        <label className="block mb-2 font-semibold">Bike Number Plate</label>
        <input
          type="text"
          name="vehiclenumber"
          value={userDetails.vehiclenumber}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
        />
        <div>
          <h2 className="text-lg font-semibold">Select Dates</h2>
          <input
            type="date"
            onChange={handleDateChange}
            className="mt-2 p-2 border rounded w-full"
          />
          <p className="mt-2 text-gray-500">
            Selected Dates: {selectedDates.join(", ")}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 bg-white p-6 rounded-lg shadow-lg mt-6">
        {slots.map((slot) => (
          <button
            key={slot.id}
            className={`w-12 h-12 rounded-md flex items-center justify-center text-white font-bold cursor-pointer transition-all
              ${
                slot.booked
                  ? "bg-gray-400 cursor-not-allowed"
                  : selectedSlot === slot.id
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
            onClick={() => handleSlotSelect(slot.id)}
            disabled={slot.booked}
          >
            {slot.id}
          </button>
        ))}
      </div>
      <button
        onClick={handleBooking}
        className="w-full p-2 mt-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Book Slot
      </button>
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-80 text-center">
        <h2 className="text-lg font-semibold">Bookings</h2>
        {bookings.length > 0 ? (
          <ul className="mt-2">
            {bookings.map((booking, index) => (
              <li key={index} className="text-gray-700">
                Slot {booking.slot} ({booking.user}): {booking.dates.join(", ")}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No bookings yet</p>
        )}
      </div>
    </div>
  );
}
