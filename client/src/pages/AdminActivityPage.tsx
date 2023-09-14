import React, { FC, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PopUpComponent from "../components/abstracts/PopUpComponent";
import { Activity } from "../types/Activity";

const AdminActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showPopUp, setShowPopUp] = useState(false); // State for POP UP visibility
  const [activityToDelete, setActivityToDelete] = useState<number | null>(null); // State to store the ID of the activity to delete

  useEffect(() => {
    fetch("/api/admin/activities")
      .then((res) => res.json())
      .then((json) => setActivities(json.activities))
      .catch((err) => console.log(err));
  }, []);

  const deleteActivity = async (id: number) => {
    try {
      await fetch(`/api/activities/${id}`, { method: "DELETE" });
      setActivities(activities.filter((act) => act.id !== id));
      setShowPopUp(false); // Close the  pop up after deletion
    } catch (err) {
      console.log(err);
    }
  };

  // Function to open the modal and set the activity to delete
  const openPopUp = (id: number) => {
    setActivityToDelete(id);
    setShowPopUp(true);
  };

  // Function to close the POP UP
  const closePopUp = () => {
    setActivityToDelete(null);
    setShowPopUp(false);
  };

  return (
    <div>
      <Header btnText={"Log Out"} />
      <div className="container mt-4">
        {activities ? (
          <div>
            <h3>All activities</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Activity Name</th>
                  <th>Activity ID</th>
                  <th>Created Date</th>
                  <th>Scheduled Time</th>
                  <th>Coach</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.title}</td>
                    <td>{activity.id}</td>
                    <td>{activity.created}</td>
                    <td>
                      {activity.day}, {activity.time}
                    </td>
                    <td>{activity.coach}</td>
                    <td>
                      <button className="btn btn-primary me-4">Edit</button>
                      <button className="btn btn-danger" onClick={() => openPopUp(activity.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <Footer />

      {showPopUp && (
        <PopUpComponent
          insertText="Are you sure you want to delete this activity?"
          onOkClick={() => deleteActivity(activityToDelete as number)}
          onCancelClick={closePopUp}
        />
      )}
    </div>
  );
};

export default AdminActivityPage;