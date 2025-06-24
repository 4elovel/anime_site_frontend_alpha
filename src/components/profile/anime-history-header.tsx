import { Grid2x2, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnimeHistoryHeader() {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row justify-start items-center gap-3">
        <h1 className="text-white font-[700] text-[2rem]">Історія</h1>
        <div className="flex items-center justify-center w-10 h-10 border-2 border-white rounded-sm">
          <Grid2x2 className="text-white w-6 h-6" />
        </div>
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="group flex items-center justify-center w-10 h-10 border-2 border-white rounded-sm bg-transparent cursor-pointer  hover:bg-white"
      >
        <MoveRight className="text-white w-6 h-6 group-hover:text-black transition-colors" />
      </Button>
    </div>
  );
}
