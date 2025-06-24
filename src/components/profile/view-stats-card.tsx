import { AnimeChartRadial } from "@/components/profile/anime-chart-radial";
import { Card, CardContent } from "@/components/ui/card";

import { AnimeStatsBullet } from "@/components/profile/anime-stats-bullet";

export function ViewStatsCard() {
  return (
    <Card className="flex bg-transparent px-2 py-0 max-w-100">
      <CardContent className="flex flex-row p-0! py-0!">
        <AnimeChartRadial />
        <div className="flex flex-col items-center justify-center gap-4">
          <AnimeStatsBullet text="Дивлюсь" number={7} circleColor="#2b94ab" />
          <AnimeStatsBullet
            text="Заплановано"
            number={13}
            circleColor="#ab872b"
          />
          <AnimeStatsBullet text="Закинуто" number={2} circleColor="#952828" />
          <AnimeStatsBullet
            text="Відкладено"
            number={0}
            circleColor="#5c5c5c"
          />
        </div>
      </CardContent>
    </Card>
  );
}
