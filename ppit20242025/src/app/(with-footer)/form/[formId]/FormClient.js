"use client";

import { useState } from "react";
import { submitResponse } from "../../../../services/forms";

export default function FormClient({ form }) {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateRequired = () => {
    for (const q of form.questions) {
      if (q.required) {
        const value = answers[q.id];
        if (
          value === undefined ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          throw new Error(`Please fill required field: ${q.label}`);
        }
      }
    }
  };


  const handleSubmit = async () => {
    try {
      validateRequired();
      await submitResponse(form.id, answers);
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
        <div key={q.id} className="mb-6 space-y-2">
          <label>
            {q.label} {q.required && "*"}
          </label>

          {/* TEXT */}
          {q.type === "text" && (
            <input
              className="border p-2 w-full"
              value={answers[q.id] || ""}
              onChange={(e) =>
                setAnswers({ ...answers, [q.id]: e.target.value })
              }
            />
          )}

          {/* RADIO */}
          {q.type === "radio" &&
            q.options?.map((opt) => (
              <label key={opt} className="flex gap-2">
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() =>
                    setAnswers({ ...answers, [q.id]: opt })
                  }
                />
                {opt}
              </label>
            ))}

          {/* CHECKBOX */}
          {q.type === "checkbox" &&
            q.options?.map((opt) => (
              <label key={opt} className="flex gap-2">
                <input
                  type="checkbox"
                  value={opt}
                  checked={(answers[q.id] || []).includes(opt)}
                  onChange={(e) => {
                      setAnswers((prevAnswers) => {
                      const prev = prevAnswers[q.id] || [];
                      return {
                        ...prevAnswers,
                        [q.id]: e.target.checked
                          ? [...prev, opt]
                          : prev.filter((v) => v !== opt),
                      };
                    });
                  }}
                />
                {opt}
              </label>
            ))}

        </div>
      ))}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Form submitted!</p>}

      <button
        onClick={handleSubmit}
        disabled={success}
      >
        {success ? "Submitted" : "Submit"}
      </button>

    </div>
  );
}
