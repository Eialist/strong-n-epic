import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { User } from "../types/Users";

const AdminUserPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((json) => setUsers(json.users))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header btnText={"Log Out"} />
      <div className="container mt-4" style={{ height: "100vh" }}>
        {users ? (
          <div>
            <h3 className="mb-4">All Members</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">UserName</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Booked activities</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.id}</td>
                    <td>{user.activities?.toString()}</td>
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
    </div>
  );
};

export default AdminUserPage;
