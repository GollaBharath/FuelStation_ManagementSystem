import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";


const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  console.log(token);
  
  useEffect(() => {
    // Redirect to login if no token
    if (!token) {
      navigate("/login");
      console.log("if fail");
      return;
    }

    

    const fetchProtectedData = async () => {
      try {
        const url = new URL("/api/protected", import.meta.env.VITE_API_URL);
        const res = await fetch(url.toString(), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setMessage(data.message || "Welcome to the Dashboard!");
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, [token,navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </DashboardLayout>
  );
};

export default Dashboard;