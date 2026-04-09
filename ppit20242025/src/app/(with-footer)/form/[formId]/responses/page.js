"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, query, orderBy, where } from "firebase/firestore";
import { db, auth } from "../../../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, useParams } from "next/navigation"

export default function ResponsesPage() {
const [responses, setResponses] = useState([]);
const [loading, setLoading] = useState(true);
const [user, setUser] = useState(null);
const router = useRouter();
const formId = useParams()?.formId;

useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
        if(!u) {
            router.push("/login")
        }
        setUser(u);

        try {
            const userRef = doc(db, "users", u.uid);
            const userSnap = await getDoc(userRef);
    
            if (userSnap.exists()) {
                const userData = userSnap.data();
                if(!userData.admin) {
                    router.push("/")
                }
            }
        } catch (error) {
            console.error("failed to verify admin status: " + error);
        }
    });
    return () => unsub();
}, []);


useEffect(() => {
    const fetchResponses = async () => {
    try {
        const q = query(
            collection(db, "responses"),
            where("formId", "==", formId),
            orderBy("submittedAt", "desc")
        );

        const snapshot = await getDocs(q); 

        const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));

        setResponses(data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
    };

    fetchResponses();
}, []);

const exportToCSV = () => {
    if (responses.length === 0) return;

    const headers = new Set();

    responses.forEach((res) => {
    Object.keys(res.answers || {}).forEach((key) =>
        headers.add(key)
    );
    });

    const headerArray = ["email", ...Array.from(headers)];

    const rows = responses.map((res) => {
    return headerArray.map((header) => {
        if (header === "email") return res.email || "";

        const val = res.answers?.[header];

        if (Array.isArray(val)) return `"${val.join(", ")}"`;
        return val || "";
    });
    });

    const csvContent = [
    headerArray.join(","),
    ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "responses.csv";
    link.click();
};

if (loading) {
    return (
    <div className="min-h-screen flex items-center justify-center">
        Loading responses...
    </div>
    );
}

return (
    <div className="min-h-screen bg-[#7E0C0E] text-white p-8">
    <h1 className="text-3xl font-bold mb-6">Responses</h1>

    <button
        onClick={exportToCSV}
        className="mb-6 bg-white text-black px-4 py-2 rounded"
    >
        Export CSV
    </button>

    {responses.length === 0 ? (
        <p>No responses yet.</p>
    ) : (
        <div className="space-y-6">
        {responses.map((res, index) => (
            <div
            key={res.id}
            className="bg-[#B88C8C] text-black p-4 rounded"
            >
            <p className="text-sm mb-2 text-gray-700">
                {res.email || "No email"}
            </p>

            <p className="font-semibold mb-2">
                Response #{index + 1}
            </p>

            {Object.entries(res.answers || {}).map(
                ([qId, value]) => (
                <div key={qId} className="mb-2">
                    <span className="font-medium">{qId}:</span>{" "}
                    {typeof value === "string" &&
                    value.startsWith("http") ? (
                    <a
                        href={value}
                        target="_blank"
                        className="underline text-blue-700"
                    >
                        View File
                    </a>
                    ) : Array.isArray(value) ? (
                    value.join(", ")
                    ) : (
                    value
                    )}
                </div>
                )
            )}
            </div>
        ))}
        </div>
    )}
    </div>
);
}