import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CalenderComponent from "../components/CalenderComponent";
import { useState, useEffect } from "react";
import MyBookingsComponent from "../components/MyBookingsComponent";

const UserBookingPage = () => {
  const [showBookings, setShowBookings] = useState(false);
  const [userId, setUserId] = useState(null); // Store user information here

  //Simulate fetching user data from local storage or wherever it's stored
  useEffect(() => {
    const userData = localStorage.getItem("userId"); // Adjust this based on your data storage
    if (userData) {
      setUserId(JSON.parse(userData));
    }
  }, []);
 
  const handleBookingClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setShowBookings(!showBookings); // Toggle the showBookings state
  };
  return (
    <div>
      <Header btnText={"Log Out"} />
      <div style={{ height: "73vh"}}>
      <div className="container">
        <div className="my-3 btn btn-primary me-2" onClick={handleBookingClick}>
          My bookings
        </div>
        {showBookings && userId && <MyBookingsComponent userId={userId} closeClick={() => setShowBookings(false)}/>}
      </div>
      <CalenderComponent />
      </div>
      <Footer />
    </div>
  );
};

export default UserBookingPage;
