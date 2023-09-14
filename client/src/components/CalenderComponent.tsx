import React from "react";
import GridCard from "./GridCardComponent";

const CalenderComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "60%",
        margin: "0 auto",
        gap: "",
      }}>
      <GridCard dayText="Mon" dayString="Monday" />
      <GridCard dayText="Tues" dayString="Tuesday" />
      <GridCard dayText="Wed" dayString="Wednesday" />
      <GridCard dayText="Thur" dayString="Thursday" />
      <GridCard dayText="Fri" dayString="Friday" />
      <GridCard dayText="Sat" dayString="Saturday" />
      <GridCard dayText="Sun" dayString="Sunday" />
    </div>
  );
};

export default CalenderComponent;
