"use client";

import { useState, useEffect } from "react";

const INITIAL_QUESTION_ID = "initial-question-1";
const INITIAL_FORM_ID = "initial-form-1";

let clientIdCounter = 1;
const generateClientId = () => {
  const id = `client-id-${clientIdCounter}`;
  clientIdCounter++;
  return id;
};

export default function FormAdminBuilder() {
  const [form, setForm] = useState({
    id: INITIAL_FORM_ID,
    title: "Untitled Form",
    questions: [
      {
        id: INITIAL_QUESTION_ID,
        type: "text",
        required: false,
        options: [],
      },
    ],
  });

  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (form.id === INITIAL_FORM_ID) {
      setForm((prev) => ({
        ...prev,
        id: generateClientId(),
        questions: prev.questions.map((q) => ({ ...q, id: generateClientId() })),
      }));
    }
  }, []);

  const updateFormMeta = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const addNewQuestion = () => {
    const newQuestion = {
      id: generateClientId(),
      type: "text", // (Short Answer)
      label: "Type Question",
      required: false,
      options: [],
    };
    if (["radio", "checkbox"].includes(newQuestion.type)) newQuestion.options = ["Option 1"];
    setForm({ ...form, questions: [...form.questions, newQuestion] });
  };

  const deleteQuestion = (questionId) => {
    setForm({
      ...form,
      questions: form.questions.filter((q) => q.id !== questionId),
    });
  };

  const updateQuestion = (questionId, field, value) => {
    setForm({
      ...form,
      questions: form.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    });
  };

  const changeQuestionType = (questionId, newType) => {
    setForm({
      ...form,
      questions: form.questions.map((q) => {
        if (q.id !== questionId) return q;
        let newOptions = q.options;
        if (["text", "textarea", "file", "info"].includes(newType)) newOptions = [];
        else if (["radio", "checkbox"].includes(newType)) newOptions = ["Option 1"];
        return { ...q, type: newType, options: newOptions };
      }),
    });
  };

  const addOption = (questionId) => {
    setForm({
      ...form,
      questions: form.questions.map((q) =>
        q.id === questionId
          ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
          : q
      ),
    });
  };

  const deleteOption = (questionId, optionIndex) => {
    setForm({
      ...form,
      questions: form.questions.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((_, idx) => idx !== optionIndex) }
          : q
      ),
    });
  };

  const updateOption = (questionId, optionIndex, value) => {
    setForm({
      ...form,
      questions: form.questions.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.map((opt, idx) => (idx === optionIndex ? value : opt)) }
          : q
      ),
    });
  };

  const publishForm = () => {
    if (showPublishConfirm) {
      console.log("Form Published:", form);
      alert("Form published successfully! It's now live for respondents.");
      setShowPublishConfirm(false);
    } else {
      setShowPublishConfirm(true);
      setShowDeleteConfirm(false);
    }
  };

  const deleteForm = () => {
    if (showDeleteConfirm) {
      setForm({
        id: generateClientId(),
        title: "Untitled Form",
        questions: [
          { id: generateClientId(), type: "text", label: "Type Question", required: false, options: [] },
        ],
      });
      alert("Form deleted successfully! A new blank form has been created.");
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
      setShowPublishConfirm(false);
    }
  };

  const cancelConfirmation = () => {
    setShowPublishConfirm(false);
    setShowDeleteConfirm(false);
  };

  const questionTypes = [
    { value: "text", label: "Short Answer" },
    { value: "textarea", label: "Paragraph" },
    { value: "radio", label: "Multiple Choice" },
    { value: "checkbox", label: "Checkboxes" },
    { value: "file", label: "File Upload" }, // File Upload User
    { value: "info", label: "Text Only (No Answer)" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#7E0C0E",
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: 0
    }}>
      <header style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "1rem 1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#111827",
          margin: 0
        }}>PPITSZ Form Builder</h1>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {showDeleteConfirm ? (
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <button
                onClick={deleteForm}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#dc2626"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#ef4444"}
              >
                Confirm Delete
              </button>
              <button
                onClick={cancelConfirmation}
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#e5e7eb"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#f3f4f6"}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={deleteForm}
              style={{
                backgroundColor: "#f87171",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#ef4444"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#f87171"}
            >
              🗑️ Delete Form
            </button>
          )}

          {showPublishConfirm ? (
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <button
                onClick={publishForm}
                style={{
                  backgroundColor: "#10b981",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#059669"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#10b981"}
              >
                Confirm Publish
              </button>
              <button
                onClick={cancelConfirmation}
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#e5e7eb"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#f3f4f6"}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={publishForm}
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "0.5rem 1.5rem",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#1d4ed8"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}
            >
              🚀 Publish
            </button>
          )}
        </div>
      </header>

      <main style={{
        maxWidth: "768px",
        margin: "0 auto",
        padding: "2rem 1rem"
      }}>
        <div style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          border: "1px solid #e5e7eb",
          padding: "1.5rem",
          marginBottom: "2rem"
        }}>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateFormMeta("title", e.target.value)}
            style={{
              width: "100%",
              fontSize: "1.875rem",
              fontWeight: "bold",
              border: "none",
              outline: "none",
              marginBottom: "0.5rem",
              padding: "0.25rem 0",
              boxSizing: "border-box",
              color: "#111827",
              placeholder: "Form Title"
            }}
            placeholder="Form Title"
          />
          <textarea
            value={form.description}
            onChange={(e) => updateFormMeta("description", e.target.value)}
            style={{
              width: "100%",
              fontSize: "1rem",
              border: "none",
              outline: "none",
              padding: "0.25rem 0",
              boxSizing: "border-box",
              color: "#4b5563",
              resize: "none",
              minHeight: "40px",
              placeholder: "Form Description"
            }}
            placeholder="Form Description"
            rows={2}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          {form.questions.map((question) => (
            <div
              key={question.id}
              style={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
                padding: "1.5rem",
                marginBottom: "1.5rem",
                transition: "border-color 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = "#d1d5db"}
              onMouseOut={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
            >
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem"
              }}>
                <input
                  type="text"
                  value={question.label}
                  onChange={(e) => updateQuestion(question.id, "label", e.target.value)}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    fontSize: "1.125rem",
                    fontWeight: "500",
                    border: "none",
                    outline: "none",
                    padding: "0.5rem 0",
                    boxSizing: "border-box",
                    borderBottom: "1px solid transparent",
                    color: "#111827",
                    placeholder: "Question"
                  }}
                  onFocus={(e) => e.target.style.borderBottom = "1px solid #2563eb"}
                  onBlur={(e) => e.target.style.borderBottom = "1px solid transparent"}
                  placeholder="Question"
                />
                {/* REMOVED: Media button (🖼️) */}
                <select
                  value={question.type}
                  onChange={(e) => changeQuestionType(question.id, e.target.value)}
                  style={{
                    padding: "0.4rem 0.6rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    backgroundColor: "white",
                    fontSize: "0.85rem",
                    color: "#374151"
                  }}
                >
                  {questionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {question.type === "text" && (
                <input
                  type="text"
                  placeholder="Respondent's short answer"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    marginBottom: "1rem",
                    color: "#6b7280",
                    backgroundColor: "#f9fafb"
                  }}
                  readOnly 
                />
              )}

              {question.type === "textarea" && (
                <textarea
                  placeholder="Respondent's paragraph answer"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    marginBottom: "1rem",
                    color: "#6b7280",
                    backgroundColor: "#f9fafb",
                    minHeight: "100px"
                  }}
                  readOnly
                  rows={4}
                />
              )}

              {["radio", "checkbox"].includes(question.type) && (
                <div style={{
                  marginBottom: "1rem",
                  gap: "0.75rem",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  {question.options.map((option, index) => (
                    <div key={`${question.id}-option-${index}`} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem"
                    }}>
                      <div style={{
                        width: "1rem",
                        height: "1rem",
                        border: "1px solid #9ca3af",
                        borderRadius: question.type === "radio" ? "50%" : "0.25rem",
                        flexShrink: 0
                      }}></div>
                      
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(question.id, index, e.target.value)}
                        style={{
                          flex: 1,
                          border: "none",
                          outline: "none",
                          padding: "0.25rem 0.5rem",
                          borderBottom: "1px solid #e5e7eb",
                          fontSize: "0.9rem"
                        }}
                        placeholder="Option"
                      />
                      
                      <button
                        onClick={() => deleteOption(question.id, index)}
                        disabled={question.options.length === 1}
                        style={{
                          color: question.options.length === 1 ? "#d1d5db" : "#6b7280",
                          border: "none",
                          background: "none",
                          cursor: question.options.length === 1 ? "not-allowed" : "pointer",
                          fontSize: "1rem",
                          padding: "0.25rem",
                          borderRadius: "0.25rem"
                        }}
                        onMouseOver={(e) => {
                          if (question.options.length > 1) {
                            e.target.style.color = "#ef4444";
                            e.target.style.backgroundColor = "#fee2e2";
                          }
                        }}
                        onMouseOut={(e) => {
                          if (question.options.length > 1) {
                            e.target.style.color = "#6b7280";
                            e.target.style.backgroundColor = "transparent";
                          }
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addOption(question.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#2563eb",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      padding: "0.5rem 0",
                      transition: "color 0.2s"
                    }}
                    onMouseOver={(e) => e.target.style.color = "#1d4ed8"}
                    onMouseOut={(e) => e.target.style.color = "#2563eb"}
                  >
                    ➕ Add Option
                  </button>
                </div>
              )}

              {/* File Upload Info Box (KEPT) */}
              {question.type === "file" && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  backgroundColor: "#f3f4f6",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  marginBottom: "0.5rem"
                }}>
                  ℹ️ Users will be able to upload files (images, documents, etc.)
                </div>
              )}

              {question.type === "info" && (
                <div
                  style={{
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    backgroundColor: "#f9fafb",
                    color: "#374151",
                    fontSize: "0.95rem",
                    marginBottom: "1rem"
                  }}
                >
                  ℹ️ This is display text only. Users will not answer this.
                </div>
              )}

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <input
                    type="checkbox"
                    id={`required-${question.id}`}
                    checked={question.required}
                    disabled={question.type === "info"}
                    onChange={(e) => updateQuestion(question.id, "required", e.target.checked)}
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "#2563eb",
                      accentColor: "#2563eb"
                    }}
                  />
                  <label
                    htmlFor={`required-${question.id}`}
                    style={{
                      fontSize: "0.875rem",
                      color: "#374151"
                    }}
                  >
                    Required
                  </label>
                </div>

                <button
                  onClick={() => deleteQuestion(question.id)}
                  style={{
                    color: "#ef4444",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    padding: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}
                >
                  🗑️ Delete Question
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addNewQuestion}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#ffffffff",
            color: "black",
            border: "none",
            borderRadius: "0.375rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer",
            margin: "0 auto",
            transition: "background-color 0.2s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#d4d4d4ff"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#ffffffff"}
        >
          ➕ Add Question
        </button>
      </main>
    </div>
  );
}
