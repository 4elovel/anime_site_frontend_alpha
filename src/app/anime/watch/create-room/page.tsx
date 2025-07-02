"use client";

import Image from "next/image";
import { useState } from "react";

export default function CreateRoomPage() {
  const [roomName, setRoomName] = useState("");
  const [roomNameError, setRoomNameError] = useState("");
  const [password, setPassword] = useState("");
  const [anime, setAnime] = useState("MILGRAM");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) {
      setRoomNameError("Назва кімнати обов'язкова");
      return;
    }
    setRoomNameError("");
    // handle create room logic
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent">
      {/* Header with lines */}
      <div className="mx-auto mb-8 flex w-full max-w-md items-center justify-center gap-4">
        <Image
          className="w-20"
          src="/assets/auth/login-line.svg"
          alt="line"
          width={75}
          height={10}
          unoptimized
        />
        <h1 className="text-center text-2xl font-bold whitespace-nowrap text-white">
          Створити кімнату
          <br />
          для перегляду
        </h1>
        <Image
          className="w-20 rotate-180"
          src="/assets/auth/login-line.svg"
          alt="line"
          width={75}
          height={10}
          unoptimized
        />
      </div>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-md flex-col gap-5"
        autoComplete="off"
      >
        <div className="flex flex-col gap-1">
          <label className="mb-1 text-base text-white" htmlFor="roomName">
            Назва кімнати
          </label>
          <input
            id="roomName"
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className={`rounded-lg border border-[#23252a] bg-[#181C24] px-4 py-2 text-base text-white outline-none placeholder:text-[#bfc6d5] focus:border-blue-400 focus:ring-0 ${
              roomNameError ? "border-red-500" : ""
            }`}
            placeholder=""
          />
          {roomNameError && (
            <span className="mt-1 text-sm text-red-500">{roomNameError}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="mb-1 text-base text-white" htmlFor="password">
            Пароль (необов'язково)
          </label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-[#23252a] bg-[#181C24] px-4 py-2 text-base text-white outline-none placeholder:text-[#bfc6d5] focus:border-blue-400 focus:ring-0"
            placeholder=""
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="mb-1 text-base text-white" htmlFor="anime">
            Виберіть аніме для перегляду
          </label>
          <select
            id="anime"
            value={anime}
            onChange={(e) => setAnime(e.target.value)}
            className="rounded-lg border border-[#23252a] bg-[#181C24] px-4 py-2 text-base text-white outline-none focus:border-blue-400 focus:ring-0"
          >
            <option value="MILGRAM">MILGRAM</option>
            {/* Add more options here */}
          </select>
        </div>
        <button
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#4B7FCC] px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#3a6bb0]"
        >
          <span className="text-xl font-normal">+</span> Створити кімнату
        </button>
      </form>
    </div>
  );
}
