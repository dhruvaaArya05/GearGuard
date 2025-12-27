import { useEffect, useState } from "react";
import { getEquipment, getRequestsByEquipment } from "../services/api";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [selected, setSelected] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const load = async () => {
      const eqs = await getEquipment();
      const allReq = await fetch("http://localhost:4000/api/requests").then(r => r.json());

      const withCount = eqs.map(eq => ({
        ...eq,
        openCount: allReq.filter(
          r => r.equipment_id === eq.id && r.status !== "Repaired"
        ).length
      }));

      setEquipment(withCount);
    };
    load();
  }, []);


  const openMaintenance = async (eq) => {
    setSelected(eq);
    const data = await getRequestsByEquipment(eq.id);
    setRequests(data);
  };

  return (
    <div>
      <h2>Equipment</h2>

      {!selected && (
        <div>
          {equipment.map(eq => (
            <div
              key={eq.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "8px"
              }}
            >
              <b>{eq.name}</b> — {eq.location}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => openMaintenance(eq)}
              >
                Maintenance({eq.openCount})
              </button>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div>
          <button onClick={() => setSelected(null)}>← Back</button>
          <h3>{selected.name} - Maintenance Requests</h3>

          {requests.length === 0 && <p>No requests.</p>}

          {requests.map(r => (
            <div key={r.id} style={{ padding: "6px 0" }}>
              • {r.subject} ({r.status})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
