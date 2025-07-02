"use client";
import React, { useState } from "react";

interface Player {
  id: string;
  name: string;
}

interface Voiceover {
  id: string;
  name: string;
}

interface PlayerSettingsProps {
  isLightOn: boolean;
  setIsLightOn: (value: boolean) => void;
  episode?: number;
  players?: Player[];
  voiceovers?: Voiceover[];
  onPlayerChange?: (playerId: string) => void;
  onVoiceoverChange?: (voiceoverId: string) => void;
}

function PlayerSettings({
  isLightOn,
  setIsLightOn,
  episode = 1,
  players = [{ id: "player1", name: "AMANOGAWA" }],
  voiceovers = [
    { id: "voice1", name: "GenericTerra" },
    { id: "voice2", name: "ПЛЄЄР MOON" },
  ],
  onPlayerChange,
  onVoiceoverChange,
}: PlayerSettingsProps) {
  const [activePlayer, setActivePlayer] = useState(players[0]?.id || "");
  const [activeVoiceover, setActiveVoiceover] = useState(
    voiceovers[0]?.id || ""
  );

  const handlePlayerChange = (playerId: string) => {
    setActivePlayer(playerId);
    onPlayerChange?.(playerId);
  };

  const handleVoiceoverChange = (voiceoverId: string) => {
    setActiveVoiceover(voiceoverId);
    onVoiceoverChange?.(voiceoverId);
  };

  return (
    <>
      {/* Player Settings Controls */}
      <div className="w-full flex items-center justify-center gap-2 sm:gap-8 py-2 sm:py-3 select-none flex-wrap text-xs sm:text-base">
        <div className="flex items-center gap-1 sm:gap-2 text-white">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.793 12.793C9.97296 12.6137 10.2144 12.5095 10.4684 12.5018C10.7223 12.494 10.9697 12.5832 11.1603 12.7512C11.3508 12.9193 11.4703 13.1536 11.4944 13.4065C11.5185 13.6594 11.4454 13.912 11.29 14.113L11.207 14.207L6.414 19H9C9.25488 19.0003 9.50003 19.0979 9.68537 19.2728C9.8707 19.4478 9.98224 19.687 9.99717 19.9414C10.0121 20.1958 9.92933 20.4464 9.76574 20.6418C9.60215 20.8373 9.3701 20.9629 9.117 20.993L9 21H4C3.75507 21 3.51866 20.91 3.33563 20.7473C3.15259 20.5845 3.03566 20.3603 3.007 20.117L3 20V15C3.00028 14.7451 3.09788 14.5 3.27285 14.3146C3.44782 14.1293 3.68695 14.0178 3.94139 14.0028C4.19584 13.9879 4.44638 14.0707 4.64183 14.2343C4.83729 14.3979 4.9629 14.6299 4.993 14.883L5 15V17.586L9.793 12.793ZM20 3C20.2449 3.00003 20.4813 3.08996 20.6644 3.25272C20.8474 3.41547 20.9643 3.63975 20.993 3.883L21 4V9C20.9997 9.25488 20.9021 9.50003 20.7272 9.68537C20.5522 9.8707 20.313 9.98224 20.0586 9.99717C19.8042 10.0121 19.5536 9.92933 19.3582 9.76574C19.1627 9.60215 19.0371 9.3701 19.007 9.117L19 9V6.414L14.207 11.207C14.027 11.3863 13.7856 11.4905 13.5316 11.4982C13.2777 11.506 13.0303 11.4168 12.8397 11.2488C12.6492 11.0807 12.5297 10.8464 12.5056 10.5935C12.4815 10.3406 12.5546 10.088 12.71 9.887L12.793 9.793L17.586 5H15C14.7451 4.99972 14.5 4.90212 14.3146 4.72715C14.1293 4.55218 14.0178 4.31305 14.0028 4.05861C13.9879 3.80416 14.0707 3.55362 14.2343 3.35817C14.3979 3.16271 14.6299 3.0371 14.883 3.007L15 3H20Z"
              fill="white"
            />
          </svg>
          <span>Розгорнути</span>
        </div>
        <div
          className="flex items-center gap-1 sm:gap-2 text-white cursor-pointer"
          onClick={() => setIsLightOn(!isLightOn)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" />
            <path
              d="M12 2V4M12 20V22M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M2 12H4M20 12H22M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
          <span>
            Динамічне освітлення{" "}
            <span className={isLightOn ? "text-blue-500" : "text-gray-500"}>
              {isLightOn ? "On" : "Off"}
            </span>
          </span>
        </div>
      </div>

      <div
        className="w-full flex flex-row gap-0 mt-6 rounded-2xl overflow-hidden shadow-lg z-5 transition-all duration-500 ease-in-out"
        style={{ minHeight: "110px", background: "transparent" }}
      >
        {/* Left: Episode Info */}
        <div className="bg-blue-500 flex flex-col justify-center items-center px-4 sm:px-8 py-3 sm:py-4 min-w-[140px] sm:min-w-[260px] max-w-[180px] sm:max-w-[320px] text-white text-center">
          <div className="text-xs sm:text-sm font-medium">Ви дивитеся</div>
          <div className="text-base sm:text-xl font-bold mt-1 mb-2">
            Епізод {episode}
          </div>
          <div className="text-xs sm:text-sm leading-tight">
            Якщо поточний сервер не працює, спробуйте інші сервіси
          </div>
        </div>
        {/* Right: Subtitles & Voiceover */}
        <div className="flex-1 bg-[#181A20] flex flex-col justify-center px-2 sm:px-6 py-2 sm:py-4">
          {/* Subtitles row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
            <span className="text-white text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
              <span className="inline-block align-middle">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="3"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 15H9M15 15H17M9 15C9 13.8954 8.10457 13 7 13C5.89543 13 5 13.8954 5 15M17 15C17 13.8954 16.1046 13 15 13C13.8954 13 13 13.8954 13 15"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              Субтитри:
            </span>
            {players.map((player) => (
              <button
                key={player.id}
                onClick={() => handlePlayerChange(player.id)}
                className={`rounded-xl px-3 sm:px-4 py-0.5 sm:py-1 font-medium text-xs sm:text-sm transition-all duration-200 hover:scale-105 ${
                  activePlayer === player.id
                    ? "bg-blue-500 text-white"
                    : "bg-[#23262F] text-white hover:bg-[#2A2E38]"
                }`}
              >
                {player.name}
              </button>
            ))}
          </div>
          <div className="border-t border-[#23262F] my-1" />
          {/* Voiceover row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3">
            <span className="text-white text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
              <span className="inline-block align-middle">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 9V15C9 15.5304 9.21071 16.0391 9.58579 16.4142C9.96086 16.7893 10.4696 17 11 17H13C13.5304 17 14.0391 16.7893 14.4142 16.4142C14.7893 16.0391 15 15.5304 15 15V9C15 8.46957 14.7893 7.96086 14.4142 7.58579C14.0391 7.21071 13.5304 7 13 7H11C10.4696 7 9.96086 7.21071 9.58579 7.58579C9.21071 7.96086 9 8.46957 9 9Z"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path d="M19 11V13M5 11V13" stroke="white" strokeWidth="2" />
                </svg>
              </span>
              Озвучка:
            </span>
            {voiceovers.map((voiceover) => (
              <button
                key={voiceover.id}
                onClick={() => handleVoiceoverChange(voiceover.id)}
                className={`rounded-xl px-3 sm:px-4 py-0.5 sm:py-1 font-medium text-xs sm:text-sm transition-all duration-200 hover:scale-105 ${
                  activeVoiceover === voiceover.id
                    ? "bg-blue-500 text-white"
                    : "bg-[#23262F] text-white hover:bg-[#2A2E38]"
                }`}
              >
                {voiceover.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerSettings;
