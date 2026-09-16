import { useState } from "react";

const API_URL = "http://13.210.12.202:3000";

function App() {
  const [repairs, setRepairs] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [device, setDevice] = useState("");
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/repair`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          vehicle: device,
          issue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create repair request");
      }

      const newRepair = {
        id: Date.now(),
        customerName: data.repairRequest.customerName,
        device: data.repairRequest.vehicle,
        issue: data.repairRequest.issue,
        status: "Pending",
      };

      setRepairs((previousRepairs) => [...previousRepairs, newRepair]);

      setCustomerName("");
      setDevice("");
      setIssue("");

      setMessage("Repair request submitted successfully.");
    } catch (error) {
      console.error("API error:", error);
      setMessage("Unable to submit repair request.");
    }
  };

  return (
    <div>
      <header>
        <h1>Repair Shop Management</h1>
        <p>Manage customer repair requests and service status.</p>
      </header>

      <main>
        <section>
          <h2>New Repair Request</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Customer Name</label>
              <input
                type="text"
                placeholder="Enter customer name"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                required
              />
            </div>

            <div>
              <label>Device</label>
              <input
                type="text"
                placeholder="Laptop, phone, desktop..."
                value={device}
                onChange={(event) => setDevice(event.target.value)}
                required
              />
            </div>

            <div>
              <label>Issue</label>
              <input
                type="text"
                placeholder="Describe the problem"
                value={issue}
                onChange={(event) => setIssue(event.target.value)}
                required
              />
            </div>

            <button type="submit">Create Repair Request</button>
          </form>

          {message && <p>{message}</p>}
        </section>

        <section>
          <h2>Repair Requests</h2>

          {repairs.length === 0 ? (
            <p>No repair requests yet.</p>
          ) : (
            repairs.map((repair) => (
              <div key={repair.id}>
                <h3>{repair.customerName}</h3>
                <p>Device: {repair.device}</p>
                <p>Issue: {repair.issue}</p>
                <p>Status: {repair.status}</p>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;