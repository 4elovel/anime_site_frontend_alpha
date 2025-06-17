import React from "react";

interface VoiceActorCardProps {
  image: string;
  name: string;
  title: string;
  animeImage?: string; // Optional, for overlay
}

const VoiceActorCard: React.FC<VoiceActorCardProps> = ({
  image,
  name,
  title,
  animeImage,
}) => {
  return (
    <div className="flex flex-col items-center w-full sm:w-full">
      <div className="relative w-full block">
        <img
          src={image}
          alt={name}
          className="rounded-2xl w-full h-auto sm:w-full sm:h-64 aspect-[3/4] sm:aspect-auto object-cover shadow-lg mb-3"
          style={{ background: "#18181b" }}
        />
        {animeImage && (
          <div className="absolute bottom-5 right-2 w-16 h-20 rounded-xl overflow-hidden shadow-md border-2 border-white bg-black/80 flex items-end">
            <img
              src={animeImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      <span
        className="block w-full max-w-full items-center text-center text-sm truncate text-zinc-400"
        title={title}
      >
        {title}
      </span>
      <div
        className=" text-center max-w-full justify-center block text-white mt-1 w-full text-base font-semibold truncate"
        title={name}
      >
        {name}
      </div>
    </div>
  );
};

export default VoiceActorCard;
