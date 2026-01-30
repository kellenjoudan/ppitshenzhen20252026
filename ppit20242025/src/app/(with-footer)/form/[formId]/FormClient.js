// use http://localhost:3000/form/YgJDVQi8Te6c6oHu1J4Z for testing

"use client";

import { useState, useEffect } from "react";
import { submitResponse } from "../../../../services/forms";
import { auth } from "../../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function FormClient({ form }) {
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  /* Auth check */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to submit this form.</p>;
  }

  /* Validation check */
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

  /* Submit */
  const handleSubmit = async () => {
    try {
      validateRequired();
      await submitResponse(form.id, form.questions, answers);
      setSuccess(true);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-[150px] max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
      <p className="mb-6">{form.description}</p>

      {form.questions.map((q) => (
        <div key={q.id} className="mb-6 space-y-2">
          <label className="font-medium">
            {q.label} {q.required && <span className="text-red-500">*</span>}
          </label>

          {/* TEXT */}
          {q.type === "text" && (
            <input
              className="border p-2 w-full rounded"
              value={answers[q.id] || ""}
              onChange={(e) =>
                setAnswers({ ...answers, [q.id]: e.target.value })
              }
            />
          )}

          {/* RADIO */}
          {q.type === "radio" &&
            q.options?.map((opt) => (
              <label key={opt} className="flex gap-2 items-center">
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
              <label key={opt} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={opt}
                  checked={(answers[q.id] || []).includes(opt)}
                  onChange={(e) => {
                    setAnswers((prev) => {
                      const prevArr = prev[q.id] || [];
                      return {
                        ...prev,
                        [q.id]: e.target.checked
                          ? [...prevArr, opt]
                          : prevArr.filter((v) => v !== opt),
                      };
                    });
                  }}
                />
                {opt}
              </label>
            ))}
        </div>
      ))}

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">Form submitted!</p>}

      <button
        onClick={handleSubmit}
        disabled={success}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {success ? "Submitted" : "Submit"}
      </button>
    </div>
  );
}

