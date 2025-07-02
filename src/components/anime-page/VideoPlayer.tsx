"use client";
import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({
  url,
  isLightOn,
  setIsLightOn,
}: {
  url: string;
  isLightOn: boolean;
  setIsLightOn: (v: boolean) => void;
}) {
  const playerRef = useRef<ReactPlayer | null>(null);
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(() => {
    if (typeof window !== "undefined") {
      const savedVolume = localStorage.getItem("videoPlayerVolume");
      if (savedVolume !== null) {
        const volumeValue = parseFloat(savedVolume);
        if (!isNaN(volumeValue) && volumeValue >= 0 && volumeValue <= 1) {
          return volumeValue;
        }
      }
    }
    return 0.8;
  });
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  let hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const [leftColor, setLeftColor] = useState({ r: 0, g: 0, b: 0 });
  const [rightColor, setRightColor] = useState({ r: 0, g: 0, b: 0 });
  const [targetLeftColor, setTargetLeftColor] = useState({ r: 0, g: 0, b: 0 });
  const [targetRightColor, setTargetRightColor] = useState({
    r: 0,
    g: 0,
    b: 0,
  });

  useEffect(() => {
    localStorage.setItem("videoPlayerVolume", volume.toString());
  }, [volume]);

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayPause = () => setPlaying(!playing);
  const handleMute = () => setMuted(!muted);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVolume(parseFloat(e.target.value));
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPlayed(parseFloat(e.target.value));
  const handleSeekMouseDown = () => setSeeking(true);
  const handleSeekMouseUp = () => {
    setSeeking(false);
    if (playerRef.current) {
      playerRef.current.seekTo(played);
    }
  };
  const handleProgress = (state: { played: number }) => {
    if (!seeking) setPlayed(state.played);
  };
  const handleDuration = (d: number) => setDuration(d);
  const handleRewind = () => {
    if (playerRef.current) {
      const current = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(current - 15, 0));
    }
  };
  const handleForward = () => {
    if (playerRef.current) {
      const current = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.min(current + 15, duration));
    }
  };
  const handleFullscreen = () => {
    const elem = document.getElementById("video-container");
    if (isFullscreen) {
      if (document.exitFullscreen) document.exitFullscreen();
    } else {
      if (elem && elem.requestFullscreen) elem.requestFullscreen();
    }
  };
  const checkFullscreen = () => {
    const fsEl = document.fullscreenElement;
    setIsFullscreen(!!fsEl);
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", checkFullscreen);
    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen);
    };
  }, []);
  useEffect(() => {
    if (!isFullscreen) return;
    const resetTimer = () => {
      setShowControls(true);
      if (hideControlsTimeout.current)
        clearTimeout(hideControlsTimeout.current);
      hideControlsTimeout.current = setTimeout(
        () => setShowControls(false),
        3000
      );
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      if (hideControlsTimeout.current)
        clearTimeout(hideControlsTimeout.current);
    };
  }, [isFullscreen]);

  // Динамічне світло по боках
  useEffect(() => {
    if (!isLightOn) return;
    let interval: NodeJS.Timeout;
    const updateColor = () => {
      if (!videoElRef.current) {
        const container = document.getElementById("video-container");
        if (container) {
          const video = container.querySelector("video");
          if (video) videoElRef.current = video as HTMLVideoElement;
        }
      }
      const video = videoElRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) {
        // console.log("No video or canvas");
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        // console.log("No ctx");
        return;
      }
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let lR = 0,
          lG = 0,
          lB = 0,
          lCount = 0;
        let rR = 0,
          rG = 0,
          rB = 0,
          rCount = 0;
        const w = canvas.width,
          h = canvas.height;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            if (x < w * 0.12) {
              lR += data[idx];
              lG += data[idx + 1];
              lB += data[idx + 2];
              lCount++;
            } else if (x > w * 0.88) {
              rR += data[idx];
              rG += data[idx + 1];
              rB += data[idx + 2];
              rCount++;
            }
          }
        }
        lR = Math.round(lR / Math.max(1, lCount));
        lG = Math.round(lG / Math.max(1, lCount));
        lB = Math.round(lB / Math.max(1, lCount));
        rR = Math.round(rR / Math.max(1, rCount));
        rG = Math.round(rG / Math.max(1, rCount));
        rB = Math.round(rB / Math.max(1, rCount));
        setTargetLeftColor({ r: lR, g: lG, b: lB });
        setTargetRightColor({ r: rR, g: rG, b: rB });
        // console.log("Left color:", lR, lG, lB, "Right color:", rR, rG, rB);
      } catch (e) {
        // console.log("drawImage error", e);
      }
    };
    interval = setInterval(updateColor, 500);
    return () => clearInterval(interval);
  }, [isLightOn]);

  useEffect(() => {
    let raf: number;
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }
    function animate() {
      setLeftColor((prev) => {
        const t = 0.05; // швидкість (0.05-0.2)
        return {
          r: Math.round(lerp(prev.r, targetLeftColor.r, t)),
          g: Math.round(lerp(prev.g, targetLeftColor.g, t)),
          b: Math.round(lerp(prev.b, targetLeftColor.b, t)),
        };
      });
      setRightColor((prev) => {
        const t = 0.05;
        return {
          r: Math.round(lerp(prev.r, targetRightColor.r, t)),
          g: Math.round(lerp(prev.g, targetRightColor.g, t)),
          b: Math.round(lerp(prev.b, targetRightColor.b, t)),
        };
      });
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [targetLeftColor, targetRightColor]);

  useEffect(() => {
    const findVideo = () => {
      const container = document.getElementById("video-container");
      if (!container) return;
      const video = container.querySelector("video");
      if (video) videoElRef.current = video as HTMLVideoElement;
    };
    setTimeout(findVideo, 500);
  }, []);

  return (
    <div
      id="video-container"
      className="relative flex items-center justify-center w-full aspect-video sm:aspect-video xs:aspect-video min-h-[220px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[60vh]
      z-20 cursor-pointer"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={handlePlayPause}
    >
      {isLightOn && (
        <>
          {/* Left ambient light */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "15%",
              zIndex: 0,
              pointerEvents: "none",
              background: `radial-gradient(ellipse at left, rgba(${leftColor.r},${leftColor.g},${leftColor.b},0.7) 60%, rgba(0,0,0,0.95) 100%)`,
              filter: "blur(40px)",
            }}
          />
          {/* Right ambient light */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "15%",
              zIndex: 0,
              pointerEvents: "none",
              background: `radial-gradient(ellipse at right, rgba(${rightColor.r},${rightColor.g},${rightColor.b},0.7) 60%, rgba(0,0,0,0.95) 100%)`,
              filter: "blur(40px)",
            }}
          />
          {/* Top ambient light */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "15%",
              zIndex: 0,
              pointerEvents: "none",
              background: `radial-gradient(ellipse at top, rgba(${leftColor.r},${leftColor.g},${leftColor.b},0.7) 60%, rgba(0,0,0,0.95) 100%)`,
              filter: "blur(40px)",
            }}
          />
          {/* Bottom ambient light */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "15%",
              zIndex: 0,
              pointerEvents: "none",
              background: `radial-gradient(ellipse at bottom, rgba(${rightColor.r},${rightColor.g},${rightColor.b},0.7) 60%, rgba(0,0,0,0.95) 100%)`,
              filter: "blur(40px)",
            }}
          />
        </>
      )}
      <canvas
        ref={canvasRef}
        width={32}
        height={18}
        style={{ display: "none" }}
      />

      {/* Large play/pause button overlay */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center z-5 pointer-events-none">
          <div className="bg-black/50 rounded-full p-4 sm:p-6 md:p-8 pointer-events-auto">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M6 3.99979V19.9998C5.99995 20.1777 6.04737 20.3524 6.13738 20.5059C6.22739 20.6594 6.35672 20.7861 6.51202 20.8729C6.66733 20.9598 6.84299 21.0036 7.02088 20.9999C7.19878 20.9961 7.37245 20.945 7.524 20.8518L20.524 12.8518C20.6696 12.7623 20.7898 12.637 20.8733 12.4879C20.9567 12.3387 21.0005 12.1707 21.0005 11.9998C21.0005 11.8289 20.9567 11.6609 20.8733 11.5117C20.7898 11.3626 20.6696 11.2373 20.524 11.1478L7.524 3.14779C7.37245 3.05456 7.19878 3.00345 7.02088 2.99973C6.84299 2.99601 6.66733 3.03983 6.51202 3.12665C6.35672 3.21348 6.22739 3.34017 6.13738 3.49366C6.04737 3.64714 5.99995 3.82186 6 3.99979Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      )}

      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        muted={muted}
        volume={volume}
        width="100%"
        height="100%"
        controls={false}
        onProgress={handleProgress}
        onDuration={handleDuration}
        style={{ background: "#000", zIndex: 1 }}
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous",
            },
          },
        }}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 sm:px-4 md:px-10 pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-6 md:pb-8 transition-opacity duration-300 ${
          showControls || !playing ? "opacity-100" : "opacity-0"
        } z-10`}
      >
        <div className="relative w-full h-1 bg-white/30 rounded-sm mb-5 cursor-pointer">
          <div
            className="h-full bg-white rounded-sm relative transition-all duration-150"
            style={{ width: `${played * 100}%` }}
          >
            <div className="absolute -right-1.5 -top-1 w-3 h-3 bg-white rounded-full"></div>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeekChange}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleSeekMouseDown();
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              handleSeekMouseUp();
            }}
            onClick={(e) => e.stopPropagation()}
            className="absolute -top-1.5 left-0 w-full h-4 opacity-0 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-y-2">
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
              className="bg-transparent border-none text-white cursor-pointer p-1 sm:p-2 rounded flex items-center justify-center transition-colors hover:bg-white/10"
            >
              {playing ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="6" y="4" width="4" height="16" rx="2" fill="white" />
                  <rect
                    x="14"
                    y="4"
                    width="4"
                    height="16"
                    rx="2"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 3.99979V19.9998C5.99995 20.1777 6.04737 20.3524 6.13738 20.5059C6.22739 20.6594 6.35672 20.7861 6.51202 20.8729C6.66733 20.9598 6.84299 21.0036 7.02088 20.9999C7.19878 20.9961 7.37245 20.945 7.524 20.8518L20.524 12.8518C20.6696 12.7623 20.7898 12.637 20.8733 12.4879C20.9567 12.3387 21.0005 12.1707 21.0005 11.9998C21.0005 11.8289 20.9567 11.6609 20.8733 11.5117C20.7898 11.3626 20.6696 11.2373 20.524 11.1478L7.524 3.14779C7.37245 3.05456 7.19878 3.00345 7.02088 2.99973C6.84299 2.99601 6.66733 3.03983 6.51202 3.12665C6.35672 3.21348 6.22739 3.34017 6.13738 3.49366C6.04737 3.64714 5.99995 3.82186 6 3.99979Z"
                    fill="white"
                  />
                </svg>
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMute();
              }}
              className="bg-transparent border-none text-white cursor-pointer p-1 sm:p-2 rounded flex items-center justify-center transition-colors hover:bg-white/10"
            >
              {muted ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 15.0002H4C3.73478 15.0002 3.48043 14.8949 3.29289 14.7073C3.10536 14.5198 3 14.2654 3 14.0002V10.0002C3 9.735 3.10536 9.48065 3.29289 9.29311C3.48043 9.10557 3.73478 9.00022 4 9.00022H6L9.5 4.50022C9.5874 4.33045 9.73265 4.19754 9.90949 4.12551C10.0863 4.05348 10.2831 4.04708 10.4643 4.10746C10.6454 4.16784 10.799 4.29103 10.8972 4.45476C10.9955 4.61849 11.0319 4.81196 11 5.00022V19.0002C11.0319 19.1885 10.9955 19.3819 10.8972 19.5457C10.799 19.7094 10.6454 19.8326 10.4643 19.893C10.2831 19.9534 10.0863 19.947 9.90949 19.8749C9.73265 19.8029 9.5874 19.67 9.5 19.5002L6 15.0002Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 9L21 13M21 9L17 13"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 8C15.621 8.46574 16.125 9.06966 16.4721 9.76393C16.8193 10.4582 17 11.2238 17 12C17 12.7762 16.8193 13.5418 16.4721 14.2361C16.125 14.9303 15.621 15.5343 15 16M17.7 5C18.7439 5.84365 19.586 6.91013 20.1644 8.12132C20.7429 9.33252 21.0431 10.6578 21.0431 12C21.0431 13.3422 20.7429 14.6675 20.1644 15.8787C19.586 17.0899 18.7439 18.1563 17.7 19M6 15.0002H4C3.73478 15.0002 3.48043 14.8949 3.29289 14.7073C3.10536 14.5198 3 14.2654 3 14.0002V10.0002C3 9.735 3.10536 9.48065 3.29289 9.29311C3.48043 9.10557 3.73478 9.00022 4 9.00022H6L9.5 4.50022C9.5874 4.33045 9.73265 4.19754 9.90949 4.12551C10.0863 4.05348 10.2831 4.04708 10.4643 4.10746C10.6454 4.16784 10.799 4.29103 10.8972 4.45476C10.9955 4.61849 11.0319 4.81196 11 5.00022V19.0002C11.0319 19.1885 10.9955 19.3819 10.8972 19.5457C10.799 19.7094 10.6454 19.8326 10.4643 19.893C10.2831 19.9534 10.0863 19.947 9.90949 19.8749C9.73265 19.8029 9.5874 19.67 9.5 19.5002L6 15.0002Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={handleVolumeChange}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              className="w-12 sm:w-16 accent-white"
              style={{ accentColor: "#fff" }}
            />

            <span className="text-white text-xs sm:text-sm font-mono font-normal">
              {formatTime(played * duration)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRewind();
              }}
              className="bg-transparent border-none text-white cursor-pointer p-1 sm:p-2 rounded flex items-center justify-center transition-colors hover:bg-white/10"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0002 3H10.4202L12.5202 0H10.0802L7.28024 4L10.0802 8H12.5202L10.4202 5H12.0002C13.8435 4.99979 15.6303 5.6361 17.0585 6.80136C18.4867 7.96661 19.4688 9.58932 19.8385 11.3951C20.2083 13.2009 19.9432 15.079 19.0879 16.7118C18.2327 18.3447 16.8398 19.6321 15.1448 20.3564C13.4498 21.0808 11.5567 21.1976 9.78557 20.6871C8.0144 20.1766 6.47385 19.0701 5.42439 17.5548C4.37493 16.0394 3.88095 14.2082 4.02596 12.3706C4.17097 10.5331 4.94608 8.80197 6.22024 7.47L5.01024 5.85C3.35256 7.47087 2.30959 9.61736 2.05973 11.9223C1.80986 14.2272 2.36864 16.5473 3.64048 18.4858C4.91231 20.4242 6.81816 21.8605 9.03201 22.5489C11.2459 23.2374 13.6301 23.1352 15.777 22.2599C17.9238 21.3846 19.6998 19.7905 20.8011 17.7504C21.9025 15.7102 22.2607 13.3508 21.8146 11.0757C21.3685 8.80062 20.1457 6.75122 18.3554 5.27811C16.5652 3.805 14.3187 2.99971 12.0002 3Z"
                  fill="white"
                />
                <path
                  d="M10.0602 16.25V9.87H9.50023C8.74023 10.24 8.07023 10.56 7.24023 10.76L7.44023 11.8C7.99023 11.68 8.37023 11.54 8.75023 11.31V16.25H10.0502H10.0602ZM13.2902 15.33C12.8002 15.33 12.3202 15.25 11.7802 15.11L11.9002 16.15C12.4202 16.27 12.8102 16.33 13.3202 16.33C15.1402 16.33 16.0502 15.52 16.0502 14.21C16.0502 12.98 15.3002 12.42 13.0802 12.29L13.2002 10.91H15.7402L15.9302 9.87H12.2302L11.9202 13.21C14.1602 13.25 14.7202 13.52 14.7202 14.27C14.7202 15.06 14.2202 15.33 13.2902 15.33Z"
                  fill="white"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleForward();
              }}
              className="bg-transparent border-none text-white cursor-pointer p-1 sm:p-2 rounded flex items-center justify-center transition-colors hover:bg-white/10"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.9898 5.85L17.7798 7.47C19.054 8.80197 19.8291 10.5331 19.9741 12.3706C20.1191 14.2082 19.6251 16.0394 18.5756 17.5548C17.5262 19.0701 15.9856 20.1766 14.2145 20.6871C12.4433 21.1976 10.5502 21.0808 8.8552 20.3564C7.16021 19.6321 5.76735 18.3447 4.91211 16.7118C4.05687 15.079 3.79172 13.2009 4.1615 11.3951C4.53128 9.58932 5.5133 7.96661 6.94152 6.80136C8.36974 5.6361 10.1565 4.99979 11.9998 5H13.5798L11.4798 8H13.9198L16.7198 4L13.9198 0H11.4798L13.5798 3H11.9998C9.68137 2.99971 7.43488 3.805 5.64462 5.27811C3.85436 6.75122 2.63157 8.80062 2.18544 11.0757C1.73931 13.3508 2.09755 15.7102 3.19889 17.7504C4.30023 19.7905 6.07622 21.3846 8.22306 22.2599C10.3699 23.1352 12.7542 23.2374 14.968 22.5489C17.1819 21.8605 19.0877 20.4242 20.3596 18.4858C21.6314 16.5473 22.1902 14.2272 21.9403 11.9223C21.6904 9.61736 20.6475 7.47087 18.9898 5.85Z"
                  fill="white"
                />
                <path
                  d="M10.0597 16.25V9.87H9.49975C8.73975 10.24 8.06975 10.56 7.23975 10.76L7.43975 11.8C7.98975 11.68 8.36975 11.54 8.74975 11.31V16.25H10.0497H10.0597ZM13.2897 15.33C12.7997 15.33 12.3197 15.25 11.7797 15.11L11.8997 16.15C12.4197 16.27 12.8097 16.33 13.3297 16.33C15.1497 16.33 16.0597 15.52 16.0597 14.21C16.0597 12.98 15.3097 12.42 13.0897 12.29L13.1997 10.91H15.7397L15.9297 9.87H12.2297L11.9197 13.21C14.1597 13.25 14.7197 13.52 14.7197 14.27C14.7197 15.06 14.2197 15.33 13.2897 15.33Z"
                  fill="white"
                />
              </svg>
            </button>
            <button
              className="bg-transparent border-none text-white cursor-pointer p-2 rounded flex items-center justify-center transition-colors hover:bg-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 10.5C10 10.1022 9.84196 9.72064 9.56066 9.43934C9.27936 9.15804 8.89782 9 8.5 9C8.10218 9 7.72064 9.15804 7.43934 9.43934C7.15804 9.72064 7 10.1022 7 10.5V13.5C7 13.8978 7.15804 14.2794 7.43934 14.5607C7.72064 14.842 8.10218 15 8.5 15C8.89782 15 9.27936 14.842 9.56066 14.5607C9.84196 14.2794 10 13.8978 10 13.5M17 10.5C17 10.1022 16.842 9.72064 16.5607 9.43934C16.2794 9.15804 15.8978 9 15.5 9C15.1022 9 14.7206 9.15804 14.4393 9.43934C14.158 9.72064 14 10.1022 14 10.5V13.5C14 13.8978 14.158 14.2794 14.4393 14.5607C14.7206 14.842 15.1022 15 15.5 15C15.8978 15 16.2794 14.842 16.5607 14.5607C16.842 14.2794 17 13.8978 17 13.5M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              className="bg-transparent border-none text-white cursor-pointer p-2 rounded flex items-center justify-center transition-colors hover:bg-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 20.01L2.01 19.999M15 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V7M2 16C4 16.5 5.5 18 6 20M2 12C6 12.5 9.5 16 10 20"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="bg-transparent border-none text-white cursor-pointer p-2 rounded flex items-center justify-center transition-colors hover:bg-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFullscreen();
              }}
              className="bg-transparent border-none text-white cursor-pointer p-2 rounded flex items-center justify-center transition-colors hover:bg-white/10"
            >
              {isFullscreen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 17C13 15.114 13 14.172 13.586 13.586C14.172 13 15.114 13 17 13H18C19.886 13 20.828 13 21.414 13.586C22 14.172 22 15.114 22 17C22 18.886 22 19.828 21.414 20.414C20.828 21 19.886 21 18 21H17C15.114 21 14.172 21 13.586 20.414C13 19.828 13 18.886 13 17Z"
                    stroke="white"
                    stroke-width="1.5"
                  />
                  <path
                    d="M11.5 11.5V8.5M11.5 11.5H8.5M11.5 11.5L7.5 7.5"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11 21H10C6.229 21 4.343 21 3.172 19.828C2.001 18.656 2 16.771 2 13V11M22 11C22 7.229 22 5.343 20.828 4.172C19.656 3.001 17.771 3 14 3H10C6.229 3 4.343 3 3.172 4.172C2.518 4.825 2.229 5.7 2.102 7"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.793 12.793C9.97296 12.6137 10.2144 12.5095 10.4684 12.5018C10.7223 12.494 10.9697 12.5832 11.1603 12.7512C11.3508 12.9193 11.4703 13.1536 11.4944 13.4065C11.5185 13.6594 11.4454 13.912 11.29 14.113L11.207 14.207L6.414 19H9C9.25488 19.0003 9.50003 19.0979 9.68537 19.2728C9.8707 19.4478 9.98224 19.687 9.99717 19.9414C10.0121 20.1958 9.92933 20.4464 9.76574 20.6418C9.60215 20.8373 9.3701 20.9629 9.117 20.993L9 21H4C3.75507 21 3.51866 20.91 3.33563 20.7473C3.15259 20.5845 3.03566 20.3603 3.007 20.117L3 20V15C3.00028 14.7451 3.09788 14.5 3.27285 14.3146C3.44782 14.1293 3.68695 14.0178 3.94139 14.0028C4.19584 13.9879 4.44638 14.0707 4.64183 14.2343C4.83729 14.3979 4.9629 14.6299 4.993 14.883L5 15V17.586L9.793 12.793ZM20 3C20.2449 3.00003 20.4813 3.08996 20.6644 3.25272C20.8474 3.41547 20.9643 3.63975 20.993 3.883L21 4V9C20.9997 9.25488 20.9021 9.50003 20.7272 9.68537C20.5522 9.8707 20.313 9.98224 20.0586 9.99717C19.8042 10.0121 19.5536 9.92933 19.3582 9.76574C19.1627 9.60215 19.0371 9.3701 19.007 9.117L19 9V6.414L14.207 11.207C14.027 11.3863 13.7856 11.4905 13.5316 11.4982C13.2777 11.506 13.0303 11.4168 12.8397 11.2488C12.6492 11.0807 12.5297 10.8464 12.5056 10.5935C12.4815 10.3406 12.5546 10.088 12.71 9.887L12.793 9.793L17.586 5H15C14.7451 4.99972 14.5 4.90212 14.3146 4.72715C14.1293 4.55218 14.0178 4.31305 14.0028 4.05861C13.9879 3.80416 14.0707 3.55362 14.2343 3.35817C14.3979 3.16271 14.6299 3.0371 14.883 3.007L15 3H20Z"
                    fill="white"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
