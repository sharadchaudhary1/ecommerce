"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SelectUseCase() {
  const [usecase, setUsecase] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { data: session } = useSession();

  const usertosave = {
    provider: "google",
    email: session?.user?.email,
    username: session?.user?.name,
    usecase: usecase,
  };

  async function handleUseCase(e: any) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usertosave),
      });

      const data = await res.json();
      if (data.success) {
        router.refresh();
      } else {
        setError(data?.message);
      }
    } catch (err) {
      setError("Failed to connect to server.");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">
          How do you want to use this account?
        </h2>

        <form
          onSubmit={handleUseCase}
          className="flex flex-col gap-4 justify-center"
        >
          <select
            value={usecase}
            onChange={(e) => setUsecase(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select --</option>
            <option value="personal">Personal use</option>
            <option value="business">Business</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
      </div>
    </div>
  );
}
