"use client";
import Navbar from "@/components/nav/navbar";
import React, { useRef, useState, MutableRefObject, useEffect } from "react";
import ReactPlayer from "react-player";
import VideoPlayer from "../../../../components/anime-page/VideoPlayer";
import PlayerSettings from "../../../../components/anime-page/player-settings";

const TEST_VIDEO_URL = "/My Hero Academia FINAL SEASON _ OFFICIAL TRAILER.mp4";

function WatchPage() {
  const [isLightOn, setIsLightOn] = useState(true);
  const [activePlayer, setActivePlayer] = useState("player1");
  const [activeVoiceover, setActiveVoiceover] = useState("voice1");

  const handlePlayerChange = (playerId: string) => {
    setActivePlayer(playerId);
    console.log("Player changed to:", playerId);
  };

  const handleVoiceoverChange = (voiceoverId: string) => {
    setActiveVoiceover(voiceoverId);
    console.log("Voiceover changed to:", voiceoverId);
  };

  return (
    <>
      <div className="min-h-screen px-2 xs:px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-16 transition-all duration-500 ease-in-out relative">
        <div
          className={`fixed inset-0 bg-black z-10 pointer-events-none transition-opacity duration-500 ease-in-out ${
            isLightOn ? "opacity-80" : "opacity-0"
          }`}
        />

        <div className="flex flex-row w-full gap-6 relative">
          <div className="flex flex-col items-center w-full lg:w-3/4 relative">
            <VideoPlayer
              url={TEST_VIDEO_URL}
              isLightOn={isLightOn}
              setIsLightOn={setIsLightOn}
            />
            <PlayerSettings
              isLightOn={isLightOn}
              setIsLightOn={setIsLightOn}
              episode={1}
              players={[{ id: "player1", name: "AMANOGAWA" }]}
              voiceovers={[
                { id: "voice1", name: "GenericTerra" },
                { id: "voice2", name: "ПЛЄЄР MOON" },
              ]}
              onPlayerChange={handlePlayerChange}
              onVoiceoverChange={handleVoiceoverChange}
            />
          </div>

          <div className="hidden lg:flex flex-col w-1/4 gap-6">
            <div className="bg-[#181A20] rounded-xl p-5 mb-4 shadow-md">
              <div className="text-white text-xl font-bold mb-2">
                My Hero Academia: Final Season
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-gray-400 text-sm">2024</span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-400 text-sm">
                  Екшн, Школа, Суперсила
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                    fill="#FACC15"
                  />
                </svg>
                <span className="text-white font-semibold text-sm">8.7</span>
                <span className="text-gray-400 text-xs">IMDB</span>
              </div>
              <div className="text-gray-300 text-sm leading-snug line-clamp-5">
                У новому сезоні герої стикаються з найнебезпечнішим ворогом, що
                загрожує всьому світу. Дружба, мужність і надзвичайні сили — усе
                це чекає на вас у фіналі!
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1" />
      </div>
    </>
  );
}

export default WatchPage;
