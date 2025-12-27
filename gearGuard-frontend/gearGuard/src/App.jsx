import { useState, useEffect } from "react";
import Kanban from "./Pages/Kanban";
import Calender from "./Pages/Calender"
import Equipment from "./Pages/Equipment";
import Auth from "./Pages/Auth";

function App() {
  const [page, setPage] = useState("kanban");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <div className="navbar">
      <h1>GearGuard</h1>
      <p>
        Welcome, <b>{user.name}</b> ({user.role})
        <button
          style={{ marginLeft: 10 }}
          onClick={() => {
            localStorage.clear();
            setUser(null);
          }}
        >
          Logout
        </button>
      </p>

      <div className="nav-links">
        <button onClick={() => setPage("kanban")}>Kanban</button>
        <button onClick={() => setPage("calender")}>Calender</button>
        <button onClick={() => setPage("equipment")}>Equipment</button>
      </div>

      <hr />

      <div className="container">
        {page === "kanban" && <Kanban />}
        {page === "calender" && <Calender />}
        {page === "equipment" && <Equipment />}
      </div>
    </div>
  );
}

export default App;




// import { useState } from "react";
// import Kanban from "./pages/Kanban";
// import Calendar from "./pages/Calender";
// import Equipment from "./pages/Equipment";

// function App() {
//   const [page, setPage] = useState("kanban");

//   return (
//     <div>
//       <h1>GearGuard</h1>

//       <button onClick={() => setPage("kanban")}>Kanban</button>
//       <button onClick={() => setPage("calendar")}>Calendar</button>
//       <button onClick={() => setPage("equipment")}>Equipment</button>

//       <hr />

//       {page === "kanban" && <Kanban />}
//       {page === "calendar" && <Calendar />}
//       {page === "equipment" && <Equipment />}
//     </div>
//   );
// }

// export default App;
