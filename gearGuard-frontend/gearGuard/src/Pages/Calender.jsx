import { useEffect, useState } from "react";
import { getRequests, createRequest } from "../services/api";

export default function Calendar() {
  const [requests, setRequests] = useState([]);
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");

  const load = () => {
    getRequests().then(data => {
      setRequests(data.filter(r => r.type === "preventive"));
    });
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    if (!subject || !date) return;
    await createRequest({
      subject,
      type: "preventive",
      equipment_id: 1,
      scheduled_date: date
    });
    setSubject("");
    load();
  };

  // Group by date
  const grouped = requests.reduce((acc, r) => {
    acc[r.scheduled_date] = acc[r.scheduled_date] || [];
    acc[r.scheduled_date].push(r);
    return acc;
  }, {});

  return (
    <div>
      <h2>Preventive Maintenance Calendar</h2>

      <div>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />
        <button onClick={handleAdd}>Schedule</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {Object.keys(grouped).length === 0 && <p>No preventive tasks.</p>}
        {Object.entries(grouped).map(([d, list]) => (
          <div key={d} style={{ marginBottom: "16px" }}>
            <h4>{d}</h4>
            {list.map(r => (
              <div key={r.id} style={{ paddingLeft: "10px" }}>
                • {r.subject}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
