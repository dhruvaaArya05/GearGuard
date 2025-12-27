import { useEffect, useState } from "react";
import { getRequests, createRequest } from "../services/api";

export default function Kanban() {
  const [requests, setRequests] = useState([]);
  const [subject, setSubject] = useState("");

  const loadRequests = () => {
    getRequests().then(data => setRequests(data));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAdd = async () => {
    await createRequest({
      subject,
      type: "corrective",
      equipment_id: 1   // make sure equipment with id=1 exists
    });
    setSubject("");
    loadRequests();
  };

  return (
    <div>
      <h2>Kanban Board</h2>

      <input
        placeholder="Issue subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <button onClick={handleAdd}>Add Request</button>

      <pre>{JSON.stringify(requests, null, 2)}</pre>
    </div>
  );
}
