import React from "react";

interface CharacterDetailsProps {
  name: string;
  original_name?: string;
  gender?: string;
  age?: string;
  birth_date?: string;
  death_date?: string | null;
  birthplace?: string;
  biography?: string;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  name,
  original_name,
  gender,
  age,
  birth_date,
  death_date,
  birthplace,
  biography,
}) => (
  <div className="flex-1 flex flex-col gap-4 max-w-2xl">
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{name}</h1>
    {original_name && (
      <div className="text-lg text-zinc-400 mb-2">{original_name}</div>
    )}
    <div className="flex gap-2 items-center mb-2 flex-wrap text-zinc-400 text-sm">
      {gender && <span>Стать: {gender}</span>}
      {age && <span>Вік: {age}</span>}
      {birth_date && <span>Народження: {birth_date}</span>}
      {death_date && <span>Смерть: {death_date}</span>}
      {birthplace && <span>Місце народження: {birthplace}</span>}
    </div>
    {biography && (
      <div className="text-white text-base leading-relaxed whitespace-pre-line">
        {biography}
      </div>
    )}
  </div>
);

export default CharacterDetails;
