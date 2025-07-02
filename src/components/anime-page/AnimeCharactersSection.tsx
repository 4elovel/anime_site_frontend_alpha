import React from "react";
import CardCollection from "@/components/main-page/card-collection";
import AuthorCardComponent from "../author-card";

interface AuthorCard {
  name: string;
  role: string;
  image: string;
  link: string;
}

interface AnimeCharactersSectionProps {
  authors: AuthorCard[];
  title: string;
}

const AnimeCharactersSection: React.FC<AnimeCharactersSectionProps> = ({
  authors,
  title,
}) => {
  return (
    <section className="mx-auto w-full max-w-2xl">
      <CardCollection
        items={authors}
        cardType="author"
        title={title}
        showButton={false}
      />
    </section>
  );
};

export default AnimeCharactersSection;
