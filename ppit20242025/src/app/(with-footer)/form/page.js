"use client";

import { useEffect, useState } from "react";
import { getAllForms } from "../../../services/forms";

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
    const [loading, setLoading] = useState(true);

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
    }, []);

    if (loading) return <p>Loading...</p>;
    // console.log(forms)
    // forms.pop()

    if (forms.length == 0) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#7E0C0E", fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
                <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>No Events to Register.</div>
            </div>
        )
    }

    return (
        <div style={{ paddingTop: "6rem", minHeight: "100vh", backgroundColor: "#7E0C0E", fontFamily: "Arial, sans-serif", margin: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, 30%)", gap: "2rem", padding: "2rem", justifyContent: "center", alignItems: "center" }}>
                {forms.map((form) => (
                    <div key={form.id} style={{ borderRadius: "14px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)", background: "#000", }}>
                        {/* <div style={{ background: `${headerColor}`, color: isDark(headerColor) ? "#FFF" : "#000", fontWeight: 600, textAlign: "center", padding: "0.75rem 1rem", fontSize: "1rem", }}> {form.title} </div> */}
                        <div style={{ background: `${form.headerColor ?? "#5b2cff"}`, color: `${isDark(form.headerColor ?? "#5b2cff") ? "#FFF" : "#000"}`, fontWeight: 600, textAlign: "center", padding: "0.75rem 1rem", fontSize: "1rem", }}> {form.title} </div>

                        <div style={{ position: "relative", height: "170px", backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "flex-end", justifyContent: "center", backgroundImage: `url(${form.coverImage || "/placeholder.jpg"})`, }}>
                            <button
                                style={{
                                    marginBottom: "1rem",
                                    padding: "0.45rem 1.4rem",
                                    borderRadius: "8px",
                                    border: "none",
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                    cursor: "pointer",
                                    color:
                                    form.status === "registered"
                                        ? "#000"
                                        : form.status === "attended"
                                        ? "white"
                                        : "white",
                                    background:
                                    form.status === "registered"
                                        ? "#fbbf24"
                                        : form.status === "attended"
                                        ? "#7c3aed"
                                        : "#6d28d9",
                            }}>
                            {form.status === "registered" ? "Registered" : form.status === "attended" ? "Attended" : "Register"}
                            </button>
                        </div> 
                    </div>
                ))}
            </div> 
        </div>
    );
}