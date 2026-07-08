import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [data, setData] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    lowStockProducts: 0,
  });
useEffect(() => {
  loadDashboard();

  const onFocus = () => loadDashboard();

  window.addEventListener("focus", onFocus);

  return () => window.removeEventListener("focus", onFocus);
}, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>StockFlow Dashboard</h1>

      <h3>Total Products: {data.totalProducts}</h3>
      <h3>Total Quantity: {data.totalQuantity}</h3>
      <h3>Low Stock Products: {data.lowStockProducts}</h3>

      <br />

      <Link to="/products">
        <button>Products</button>
      </Link>

      <Link to="/settings">
        <button style={{ marginLeft: "10px" }}>Settings</button>
      </Link>
    </div>
  );
}

export default Dashboard;
