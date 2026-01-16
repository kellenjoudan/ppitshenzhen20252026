"use client";

import { useState } from "react";
import { submitResponse } from "../../../../services/forms";

export default function FormClient({ form }) {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      await submitResponse(form.id, form.questions, answers);
      setSuccess(true);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-[150px]">
      <h1>{form.title}</h1>
      <p>{form.description}</p>

      {form.questions.map((q) => (
        <div key={q.id}>
          <label>
            {q.label} {q.required && "*"}
          </label>

          {q.type === "text" && (
            <input
              onChange={(e) =>
                setAnswers({ ...answers, [q.id]: e.target.value })
              }
            />
          )}
        </div>
      ))}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Form submitted!</p>}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
