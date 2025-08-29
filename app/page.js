"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    await fetch("/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, idea, description }),
    });

    setSubmitting(false);
    setName("");
    setEmail("");
    setIdea("");
    setDescription("");
    router.push("/dashboard"); // Go to dashboard after submit
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-8 px-2">
      <h1 className="text-3xl font-bold mb-6">Submit Your Business Idea</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Project/Idea Title"
          value={idea}
          required
          onChange={(e) => setIdea(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Describe your idea or optimization"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full min-h-[100px]"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      <a
        href="/dashboard"
        className="mt-6 text-blue-600 hover:underline text-lg"
      >
        View Dashboard
      </a>
    </main>
  );
}
