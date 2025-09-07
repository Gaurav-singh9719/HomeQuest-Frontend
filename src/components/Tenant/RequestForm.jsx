import React, { useState } from "react";

const RequestForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Request sent: ${message}`);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Send Request</h3>
      <textarea
        placeholder="Enter your request..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      ></textarea>
      <button type="submit">Send</button>
    </form>
  );
};

export default RequestForm;
