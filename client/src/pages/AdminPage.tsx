import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddActivityComponent from "../components/AddActivityComponent";
import { Activity } from "../types/Activity";

const AdminPage = () => {
  const handleAddActivity = async (activity: Activity) => {
    try {
      const res = await fetch("api/admin/activity", {
        method: "POST",
        body: JSON.stringify(activity),
      });

      const json = await res.json;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <Header btnText={"Log Out"} />
    <div className="container">
      

      <div className="my-3">
        <Link to="/admin/activity" className="btn btn-primary me-2">
          Gym Activities
        </Link>
        <Link to="/admin/user" className="btn btn-primary">
          Members
        </Link>
      </div>

      <AddActivityComponent addActivity={handleAddActivity} />
      <Footer />
    </div>
    </>
  );
};

export default AdminPage;