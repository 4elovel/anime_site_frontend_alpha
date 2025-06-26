import React from "react";
import StudioCard from "@/components/studio-card";

const studios = [
  {
    name: "Toei Animation",
    logo: "/assets/mock-user-logo.png",
    description: (
      <>
        <a href="#" className="text-[#4B7FCC] hover:underline">Японська анімаційна студія</a><br />
        Заснована <span className="text-[#4B7FCC]">1956</span> року. За більш ніж 50 років існування, студія <a href="#" className="text-[#4B7FCC] hover:underline">«Toei Animation»</a> створила безліч популярних аніме.<br />
        Зараз Toei є провідною компанією у виробництві аніме в Японії, попри те, що популярність вона набула за <a href="#" className="text-[#4B7FCC] hover:underline">хіти, випущені багато років тому</a>.
      </>
    ),
    releases: 442,
  },
  {
    name: "Kyoto Animation",
    logo: "/assets/mock-user-logo.png", // замінити на справжній логотип
    description: (
      <>
        <a href="#" className="text-[#4B7FCC] hover:underline">Японська анімаційна студія</a><br />
        Заснована <span className="text-[#4B7FCC]">1985</span> року. Студія <a href="#" className="text-[#4B7FCC] hover:underline">Kyoto Animation</a> відома емоційними історіями, деталізованою анімацією та глибокими персонажами. Вона створила багато улюблених глядачами романтичних і драматичних аніме. Її стиль вирізняється <a href="#" className="text-[#4B7FCC] hover:underline">ніжною атмосферою</a> та <a href="#" className="text-[#4B7FCC] hover:underline">турботою до кожної сцени</a>.
      </>
    ),
    releases: 21,
  },
  {
    name: "MAPPA",
    logo: "/assets/mock-user-logo.png", // замінити на справжній логотип
    description: (
      <>
        <a href="#" className="text-[#4B7FCC] hover:underline">Японська анімаційна студія</a><br />
        Заснована <span className="text-[#4B7FCC]">2011</span> року. <a href="#" className="text-[#4B7FCC] hover:underline">MAPPA</a> швидко здобула популярність завдяки динамічним боям та сучасному підходу до анімації. Вона працює над <a href="#" className="text-[#4B7FCC] hover:underline">масштабними проектами</a>.
      </>
    ),
    releases: 38,
  },
  {
    name: "Studio Ghibli",
    logo: "/assets/mock-user-logo.png", // замінити на справжній логотип
    description: (
      <>
        <a href="#" className="text-[#4B7FCC] hover:underline">Японська анімаційна студія</a><br />
        Заснована <span className="text-[#4B7FCC]">1985</span> року. <a href="#" className="text-[#4B7FCC] hover:underline">Studio Ghibli</a> визнана у всьому світі за свої культові аніме-фільми, які поєднують <a href="#" className="text-[#4B7FCC] hover:underline">глибоку філософію, унікальну анімацію</a> та <a href="#" className="text-[#4B7FCC] hover:underline">яскравих персонажів</a>.
      </>
    ),
    releases: 24,
  },
];

function FilterButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-[#181F2A] text-white rounded-xl px-4 py-2 text-base font-medium border border-[#232B3A] ml-2 focus:outline-none focus:ring-2 focus:ring-[#4B7FCC]">
      {children}
    </button>
  );
}

export default function StudiosPage() {
  return (
    <div className="min-h-screen w-full px-4 pt-10 pb-20
      md:pt-8 md:pb-14 sm:px-8 sm:pt-6 sm:pb-8">
      <div className="flex items-center justify-between mb-8 sm:flex-col sm:items-start sm:gap-4 sm:mb-6">
        <h1 className="text-4xl font-bold text-white sm:text-2xl">Студії</h1>
        <div className="flex items-center space-x-2 sm:space-x-0 sm:gap-2 sm:w-full sm:justify-end">
          <FilterButton>А-Я</FilterButton>
          <FilterButton>Кількість релізів</FilterButton>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-8 md:gap-x-6 md:gap-y-6">
        {studios.map((studio) => (
          <StudioCard
            key={studio.name}
            logo={studio.logo}
            name={studio.name}
            description={studio.description}
            releases={studio.releases}
          />
        ))}
      </div>
    </div>
  );
} 