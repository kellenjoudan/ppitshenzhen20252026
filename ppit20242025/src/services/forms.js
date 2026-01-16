import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

/* =========================
   CREATE FORM (ADMIN)
========================= */
export async function createForm(formData) {
  if (!formData.title || formData.questions.length === 0) {
    throw new Error("Form must have a title and at least one question");
  }

  return await addDoc(collection(db, "forms"), {
    title: formData.title,
    description: formData.description,
    questions: formData.questions,
    isActive: true,
    createdBy: "admin", // replace with auth later
    createdAt: serverTimestamp(),
  });
}

/* =========================
   GET FORM BY ID (PUBLIC)
========================= */
export async function getFormById(formId) {
  if (!formId) return null;

  const ref = doc(db, "forms", formId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data();

  return {
    id: snap.id,
    title: data.title,
    description: data.description,
    questions: data.questions,
    isActive: data.isActive,
    createdBy: data.createdBy,
    // CONVERT TIMESTAMP
    createdAt: data.createdAt
      ? data.createdAt.toMillis()
      : null,
  };
}


/* =========================
   SUBMIT RESPONSE (USER)
========================= */
export async function submitResponse(formId, questions, answers) {
  // REQUIRED FIELD VALIDATION
  questions.forEach((q) => {
    const answer = answers[q.id];

    if (q.required) {
      if (!answer) {
        throw new Error(`"${q.label}" is required`);
      }

      if (Array.isArray(answer) && answer.length === 0) {
        throw new Error(`"${q.label}" is required`);
      }

      if (typeof answer === "string" && answer.trim() === "") {
        throw new Error(`"${q.label}" is required`);
      }
    }
  });

  // SAVE RESPONSE
  return await addDoc(collection(db, "responses"), {
    formId,
    answers,
    submittedAt: serverTimestamp(),
  });
}
