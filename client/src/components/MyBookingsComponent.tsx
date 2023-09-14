import React, { useState, useEffect } from "react";
import { Activity } from "../types/Activity";
import PopUpComponent from "../components/abstracts/PopUpComponent";

type MyBookingsProps = {
  userId: number;
  closeClick: () => void; // Receive the user's ID as a prop
};

const MyBookingsComponent: React.FC<MyBookingsProps> = ({
  userId,
  closeClick,
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [activityIdToDelete, setActivityIdToDelete] = useState<number | null>(
    null
  );

  useEffect(() => {
    // Fetch user bookings based on the provided userId
    fetch(`/api/user/${userId}/bookings`)
      .then((res) => res.json())
      .then((json) => {
        setActivities(json.activities);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  console.log(activities);

  const openPopUp = (id: number) => {
    setActivityIdToDelete(id);
    setShowPopUp(true);
  };

  const closePopUp = () => {
    setActivityIdToDelete(null);
    setShowPopUp(false);
  };

  const deleteBooking = async (activityIdToDelete: number) => {
    try {
      await fetch(`/api/user/${userId}/bookings/${activityIdToDelete}`, {
        method: "DELETE",
      });
      setActivities((prevActivities) =>
        prevActivities.filter((act) => act.id !== activityIdToDelete)
      );
      setShowPopUp(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog modal-content modal-body">
        <h2>My Bookings</h2>
        {activities.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <ul
            className="list-group"
            style={{
              listStyle: "none",
              fontSize: "0.9em",
              display: "flex",
              flexDirection: "column",
            }}>
            {activities.map((activity) => (
              <li
                key={activity.id}
                className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{activity.title}</strong>
                  <br />
                  {activity.day} {activity.time}, Coach: {activity.coach}
                </div>
                <button
                  onClick={() => openPopUp(activity.id)}
                  className="btn btn-danger btn-sm"
                  style={{ margin: ".4em" }}>
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}

        {showPopUp && (
          <PopUpComponent
            insertText="Are you sure you want to cancel this booking?"
            onOkClick={() => deleteBooking(activityIdToDelete as number)}
            onCancelClick={closePopUp}
          />
        )}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={closeClick}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsComponent;
