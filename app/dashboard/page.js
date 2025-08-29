"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    async function fetchIdeas() {
      const res = await fetch("/api/ideas");
      const data = await res.json();
      setIdeas(data);
    }
    fetchIdeas();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen py-8 px-2">
      <h1 className="text-3xl font-bold mb-6">Business Ideas Dashboard</h1>
      {ideas.length === 0 ? (
        <p>No ideas submitted yet.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-4">
          {ideas.map((idea, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{idea.idea}</h2>
              <p className="mb-2">{idea.description}</p>
              <div className="text-sm text-gray-600">
                <span>Submitted by: {idea.name} ({idea.email})</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <a
        href="/"
        className="mt-6 text-blue-600 hover:underline text-lg"
      >
        Submit Another Idea
      </a>
    </main>
  );
}
