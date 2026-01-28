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
      await submitResponse(form.id, form.questions, answers);
      setSuccess(true);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#7E0C0E] font-montserrat flex justify-center pt-[140px] pb-20">
      <div className="w-full max-w-2xl px-6 text-white">
        <h1 className="text-2xl font-semibold text-center uppercase">
          {form.title}
        </h1>

        <p className="text-sm text-center text-gray-200 mt-2 mb-10">
          {form.description}
        </p>

        {form.questions.map((q) => (
          <div key={q.id} className="mb-8">
            <label className="block mb-2 text-sm font-medium">
              {q.label} {q.required && "*"}
            </label>

            {/* TEXTAREA (COMMENTS) */}
            {q.type === "textarea" && (
              <textarea
                rows={4}
                className="w-full rounded bg-[#B88C8C] px-3 py-2 text-black focus:outline-none resize-none"
                value={answers[q.id] || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [q.id]: e.target.value })
                }
              />
            )}

            {/* FILE UPLOAD */}
            {q.type === "file" && (
              <input
                type="file"
                className="block text-sm text-white
                          file:mr-4 file:rounded
                          file:border-0
                          file:bg-[#B88C8C]
                          file:px-4 file:py-2
                          file:text-black
                          hover:file:opacity-90"
                onChange={(e) =>
                  setAnswers({ ...answers, [q.id]: e.target.files[0] })
                }
              />
            )}

            {/* TEXT */}
            {q.type === "text" && (
              <input
                className="w-full rounded bg-[#B88C8C] px-3 py-2 text-black focus:outline-none"
                value={answers[q.id] || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [q.id]: e.target.value })
                }
              />
            )}

            {/* RADIO */}
            {q.type === "radio" &&
              q.options?.map((opt) => (
                <label key={opt} className="flex items-center gap-3 text-sm mb-1">
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
                <label key={opt} className="flex items-center gap-3 text-sm mb-1">
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
          className="bg-white text-[#7A1E1E] px-8 py-2 rounded font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {success ? "Submitted" : "Submit"}
        </button>
      </div>
    </div>
  );
}
