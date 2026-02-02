import {
  collection,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  query,
  where
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


/* =========================
   LOAD ALL FORMS (SERVERSIDE)
========================= */
export async function getAllForms() {
    const q = query(
        collection(db, "forms"),
        where("isActive", "==", true)
    );

    const snap = await getDocs(q);

    const formList = snap.docs.map(docSnap => {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            title: data.title,
            description: data.description,
            createdBy: data.createdBy,
            createdAt: data.createdAt ? data.createdAt.toMillis() : null,
        };
    });

    return formList;
}


/* =========================
   LOAD ALL USERS (SERVERSIDE)
========================= */
export async function getAllUsers() {
    const q = query(
        collection(db, "users"),
    );

    const snap = await getDocs(q);
    try {
      const formList = snap.docs.map(docSnap => {
          const data = docSnap.data();
          return {
              uid: docSnap.uid,
              email: data.email,
              adminStatus: data.admin, //bool
          };
      });
      return formList;
    } catch (e) {
      console.error(e);
      return [];
    }
}


/* =========================
   ADD A USER (SERVERSIDE)
========================= */
export async function updateUser(uid, email, submittedForms = [], attendedForms = []) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: email,
      admin: false, //DEFAULT VALUE, CHANGE MANUALLY IN FIRESTORE DB!
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      submittedForms: submittedForms,
      attendedForms: attendedForms,
    });
  } else {
    const snapData = userSnap.data();
    submittedForms, attendedForms = snapData.submittedForms, snapData.attendedForms; //fetch current values to prevent them being changed if empty.
    await setDoc(
      userRef,
      {
        email: email,
        lastLogin: serverTimestamp(),
        submittedForms: submittedForms,
        attendedForms: attendedForms,
      },
      { merge: true }
    );
  }
}