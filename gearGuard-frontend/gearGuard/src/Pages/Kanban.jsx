import { useEffect, useState } from "react";
import { getRequests, createRequest, updateRequest } from "../services/api";

const stages = ["New", "In Progress", "Repaired", "Scrap"];

export default function Kanban() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [requests, setRequests] = useState([]);
  const [subject, setSubject] = useState("");
  const [dragId, setDragId] = useState(null);

  const loadRequests = () => {
    getRequests().then(data => setRequests(data));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAdd = async () => {
    if (!subject) return;
    await createRequest({
      subject,
      type: "corrective",
      equipment_id: 1
    });
    setSubject("");
    loadRequests();
  };

  // const onDrop = async (status) => {
  //   if (!dragId) return;
  //   await updateRequest(dragId, { status });
  //   setDragId(null);
  //   loadRequests();
  // };

  // const onDrop = async (status) => {
  //   const req = requests.find(r => r.id === dragId);

  //   const payload = { status };

  //   if (user.role === "technician" && !req.assigned_to) {
  //     payload.assigned_to = user.id;
  //   }

  //   await updateRequest(dragId, payload);
  //   loadRequests();
  // };

  const onDrop = async (status) => {
    const req = requests.find(r => r.id === dragId);
    if (!req) return;

    const payload = {
      status,
      assigned_to: req.assigned_to
    };

    // If technician and unassigned → auto-assign
    if (user.role === "technician" && !req.assigned_to) {
      payload.assigned_to = user.id;
    }

    await updateRequest(dragId, payload);
    await loadRequests();
  };



  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Kanban Board</h2>

      <input
        placeholder="Issue subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <div className="kanban">
        {stages.map(stage => (
          <div
            key={stage}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(stage)}
            style={{
              flex: 1,
              border: "1px solid #ccc",
              padding: "8px",
              minHeight: "300px"
            }}
          >
            <h3>{stage}</h3>

            {requests
              .filter(r => r.status === stage)
              .filter(r => {
                if (user.role === "technician") {
                  return !r.assigned_to || r.assigned_to === user.id;
                }
                return true; // manager & user see all
              })
              .map(r => (
                <div className="card"
                  key={r.id}
                  draggable
                  onDragStart={() => setDragId(r.id)}
                  style={{
                    border: "1px solid #999",
                    marginBottom: "8px",
                    padding: "6px",
                    background: "#f9f9f9",
                    cursor: "grab"
                  }}
                >
                  <b>{r.subject}</b>

                  {/* {r.assigned_to && (
                    <div style={{ fontSize: "12px" }}>
                      Assigned to: {r.assigned_to === user.id ? "You" : r.assigned_to}
                    </div>
                  )} */}

                  {r.assigned_to && (
                    <div style={{ fontSize: "12px" }}>
                      Assigned to: {r.assigned_to === user.id ? "You" : r.assigned_name}
                    </div>
                  )}

                  {user.role === "technician" &&
                    r.status === "New" &&
                    (r.assigned_to === null || r.assigned_to === undefined) && (
                      <button
                        style={{ marginTop: "4px" }}
                        onClick={async () => {
                          await updateRequest(r.id, {
                            status: r.status,
                            assigned_to: user.id
                          });
                          loadRequests();
                        }}
                      >
                        Assign to me
                      </button>
                    )}



                  {/* {user.role === "technician" && !r.assigned_to && r.status !== "Scrap" &&
                    r.status !== "Repaired" && (
                      <button
                        style={{ marginTop: "4px" }}
                        onClick={async () => {
                          await updateRequest(r.id, {
                            status: r.status,
                            assigned_to: user.id
                          });
                          loadRequests();
                        }}
                      >
                        Assign to me
                      </button>
                    )} */}
                </div>
              ))}


            {/* {requests
              .filter(r => r.status === stage)
              .filter(r => {
                if(user.role === "technician") {
                  return r.assigned_to === user.id || !r.assigned_to;
                }
                return true; //managers and users see all
              })
              .map(r => (
                <div
                  key={r.id}
                  draggable
                  onDragStart={() => setDragId(r.id)}
                  style={{
                    border: "1px solid #999",
                    marginBottom: "8px",
                    padding: "6px",
                    background: "#f9f9f9",
                    cursor: "grab"
                  }}
                >
                  <b>{r.subject}</b>
                </div>
              ))} */}
          </div>
        ))}
      </div>
    </div>
  );
}






// import { useEffect, useState } from "react";
// import { getRequests, createRequest, updateRequest } from "../services/api";

// const stages = ["New", "In Progress", "Repaired", "Scrap"];

// export default function Kanban() {
//   const [requests, setRequests] = useState([]);
//   const [subject, setSubject] = useState("");

//   // const loadRequests = () => {
//   //   getRequests().then(data => setRequests(data));
//   // };

//   useEffect(() => {
//     const loadRequests = () => {
//       getRequests().then(data => setRequests(data));
//     }
//     loadRequests();
//   }, []);

//   const handleAdd = async () => {
//     if (!subject) return;
//     await createRequest({
//       subject,
//       type: "corrective",
//       equipment_id: 1
//     });
//     setSubject("");
//     loadRequests();
//   };

//   const moveTo = async (id, newStatus) => {
//     await updateRequest(id, {
//       status: newStatus
//     });
//     loadRequests();
//   };

//   return (
//     <div>
//       <h2>Kanban Board</h2>

//       <input
//         placeholder="Issue subject"
//         value={subject}
//         onChange={e => setSubject(e.target.value)}
//       />
//       <button onClick={handleAdd}>Add</button>

//       <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
//         {stages.map(stage => (
//           <div
//             key={stage}
//             style={{
//               flex: 1,
//               border: "1px solid #ccc",
//               padding: "8px",
//               minHeight: "300px"
//             }}
//           >
//             <h3>{stage}</h3>

//             {requests
//               .filter(r => r.status === stage)
//               .map(r => (
//                 <div
//                   key={r.id}
//                   style={{
//                     border: "1px solid #999",
//                     marginBottom: "8px",
//                     padding: "6px",
//                     background: "#f9f9f9"
//                   }}
//                 >
//                   <b>{r.subject}</b>
//                   <div style={{ marginTop: "6px" }}>
//                     {stages
//                       .filter(s => s !== stage)
//                       .map(s => (
//                         <button
//                           key={s}
//                           onClick={() => moveTo(r.id, s)}
//                           style={{ marginRight: "4px" }}
//                         >
//                           → {s}
//                         </button>
//                       ))}
//                   </div>
//                 </div>
//               ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }










// import { useEffect, useState } from "react";
// import { getRequests, createRequest } from "../services/api";

// export default function Kanban() {
//   const [requests, setRequests] = useState([]);
//   const [subject, setSubject] = useState("");

//   const loadRequests = () => {
//     getRequests().then(data => setRequests(data));
//   };

//   useEffect(() => {
//     loadRequests();
//   }, []);

//   const handleAdd = async () => {
//     await createRequest({
//       subject,
//       type: "corrective",
//       equipment_id: 1   // make sure equipment with id=1 exists
//     });
//     setSubject("");
//     loadRequests();
//   };

//   return (
//     <div>
//       <h2>Kanban Board</h2>

//       <input
//         placeholder="Issue subject"
//         value={subject}
//         onChange={e => setSubject(e.target.value)}
//       />
//       <button onClick={handleAdd}>Add Request</button>

//       <pre>{JSON.stringify(requests, null, 2)}</pre>
//     </div>
//   );
// }
