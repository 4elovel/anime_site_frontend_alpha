import React from "react";

interface CharacterImageProps {
  image: string;
  name: string;
}

const CharacterImage: React.FC<CharacterImageProps> = ({ image, name }) => (
  <div className="rounded-2xl overflow-hidden shadow-lg border border-zinc-700 bg-zinc-900 w-[220px] h-[300px] relative">
    <img
      src={image}
      alt={name}
      width={220}
      height={300}
      className="object-cover w-full h-full"
      style={{ objectFit: "cover" }}
    />
  </div>
);

export default CharacterImage;
