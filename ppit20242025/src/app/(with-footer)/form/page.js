"use client";

import { useEffect, useState } from "react";
import { auth } from "../../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getAllForms, createForm } from "../../../services/forms";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

function isDark(color) {
  // convert hex to RGB
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  // calculate brightness (0 = dark, 255 = light)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128; // true if dark
}

export default function loadAllFormsPage(){
    const [forms, setForms] = useState([]);
    const [activeQr, setActiveQr] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(undefined);
    const [admin, setAdmin] = useState(false);
    const [attendedForms, setAttendedForms] = useState([]);
    const [submittedForms, setSubmittedForms] = useState([]);
    const router = useRouter();
    const getQrUrl = (qrContent) => `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrContent)}`;

    // GET USER AND FORMS DATA
    useEffect(() => {
        async function fetchForms() {
            try {
                const data = await getAllForms();
                setForms(data);
            } finally {
                setLoading(false);
            }
        };
        fetchForms();

        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.replace("/login");
                return;
            }
            setUser(currentUser);
            
            //set user admin status
            const userRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) { 
                const userData = userSnap.data();
                setAdmin(userData.admin || false);
                setAttendedForms(userData.attendedForms);
                setSubmittedForms(userData.submittedForms);
            }
        });
        return () => unsub();
    }, [router]);
    
    if (user === undefined) {
        return (
        <div className="min-h-screen bg-[#7E0C0E] text-white flex items-center justify-center">
             <div className="font-montserrat" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>Loading session...</div>
        </div>
        );
    };

    if (loading) return (
        <div style={{ minHeight: "100vh", backgroundColor: "#7E0C0E", margin: 0, padding: 0 }}>
            <div className="font-montserrat" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>Fetching forms, please wait...</div>
        </div>

    );

    // console.log(forms)
    // forms.pop()

    if (forms.length == 0) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#7E0C0E", fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
                <div className="font-montserrat" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", fontWeight: "bolder" }}>No Events to Register At The Moment.</div>
            </div>
        )
    }

    return (
        <div style={{ paddingTop: "6rem", minHeight: "100vh", backgroundColor: "#7E0C0E", fontFamily: "Arial, sans-serif", margin: 0 }}>
            {/* FORM CONTENT */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, 30%)", gap: "2rem", padding: "2rem", justifyContent: "center", alignItems: "center" }}>
                {forms.map((form) => {
                    const status = attendedForms.includes(form.id) ? "attended" : submittedForms.includes(form.id) ? "submitted" : "open";

                    const buttonDisabled = status != "open";
                    const buttonStyle = {
                        marginBottom: "1rem",
                        padding: "0.45rem 1.4rem",
                        borderRadius: "8px",
                        border: "none",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        cursor: buttonDisabled ? "not-allowed" : "pointer",
                        opacity: buttonDisabled ? 0.7 : 1,
                        pointerEvents: buttonDisabled ? "none" : "auto",
                        color:
                        status === "submitted"
                            ? "#000"
                            : "white",
                        background:
                        status === "submitted"
                            ? "#fbbf24"
                            : status === "attended"
                            ? "#000"
                            : "#6d28d9",
                    }

                return (
                    <div key={form.id} style={{ position: "relative", borderRadius: "14px", overflow: "hidden", backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)", backgroundImage: `url(/DefaultFormCardBackground.webp)`, }}>
                        <div className="font-montserrat" style={{ background: `${form.headerColor ?? "#5b2cff"}`, color: `${isDark(form.headerColor ?? "#5b2cff") ? "#FFF" : "#000"}`, fontWeight: 600, textAlign: "center", padding: "0.75rem 1rem", fontSize: "1rem", }}> {form.title} </div>
                        
                        <div style={{ position: "relative", height: "30vh", display: "flex", alignItems: "flex-end", justifyContent: "center", }}>
                            {/* QR BUTTON (ONLY FOR ADMIN) */}
                            <button
                                onClick={() => setActiveQr(getQrUrl(`${form.id};${user.uid}`))} // TODO: FETCH USER ID
                                style={{
                                    display:
                                        admin ? "flex" : "none",
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "50%",
                                    border: "none",
                                    background: "rgba(0,0,0,0.65)",
                                    color: "white",
                                    cursor: "pointer",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.85rem",
                                    zIndex: 2,
                                }}> QR
                            </button>

                            {/* REGISTER BUTTON */}
                            <button className="font-montserrat"
                                style={ buttonStyle } 
                                onClick={() => {
                                    if (admin) {
                                        router.push(`form/${form.id}/adminform`);
                                    } else {
                                        router.push(`form/${form.id}`)
                                    }
                                }}>
                            {admin ? "Edit" : status === "submitted" ? "Submitted" : status === "attended" ? "Attended" : "Register"}
                            </button>
                        </div> 
                    </div>
                )})}

                

                {/* FADE ANIMATION FOR OVERLAY */}
                <div onClick={() => setActiveQr(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: activeQr ? 1 : 0,
                        pointerEvents: activeQr ? "auto" : "none",
                        transition: "opacity 0.3s ease",
                        zIndex: 999,
                    }}>
                    <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                            background: "#fff",
                            padding: "1.2rem",
                            borderRadius: "14px",
                            transform: activeQr ? "scale(1)" : "scale(0.95)",
                            transition: "transform 0.3s ease",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                        }}>
                        <img
                            src={activeQr}
                            alt="QR Code"
                            style={{ width: "220px", height: "220px" }}
                        />
                    </div>
                </div>
            </div> 

            {/* Create New Form Button */}
            {admin && (
                <div style={{ marginTop: "2rem", textAlign: "center" }}>
                    <button
                    onClick={ async () => {
                        try {
                            const formData = {
                                title: "Untitled Form",
                                description: "Add Description",
                                questions: [
                                    {
                                    id: "defaultNameQuestion",
                                    label: "Name",
                                    required: true,
                                    type: "text",
                                    },
                                ],
                                published: false,
                                createdBy: user.uid,
                            }
                            const docRef = await createForm(formData);

                            router.push(`/form/${docRef.id}/adminform`);

                        } catch (error) {
                            console.error(error);
                        }
                    }}
                    style={{
                        padding: "0.7rem 1.8rem",
                        borderRadius: "10px",
                        border: "none",
                        fontWeight: 600,
                        fontSize: "1rem",
                        cursor: "pointer",
                        background: "#16a34a",
                        color: "white",
                        margin: "2rem"
                    }}>
                    Create New Form
                    </button>
                </div>
            )}

        </div>
    );
}
