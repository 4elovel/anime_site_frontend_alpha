interface BulletPointProps {
  text: string;
  number: number | string;
  circleColor?: string; // Tailwind color class
  className?: string;
}

export function AnimeStatsBullet({
  text,
  number,
  circleColor = "bg-blue-500",
  className = "",
}: BulletPointProps) {
  return (
    <div className={`flex items-center w-full max-w-full gap-3 ${className}`}>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className={`w-2.5 h-2.5 rounded-full ${circleColor}`}
          style={
            !circleColor.startsWith("bg-")
              ? { backgroundColor: circleColor }
              : {}
          }
        />
        <span className="text-[#918C8C] text-[1rem] font-[500]">{text}</span>
      </div>
      {/* Spacer */}
      <div className="flex-1" />
      <span className="text-white text-[1rem] font-[500]">{number}</span>
    </div>
  );
}
