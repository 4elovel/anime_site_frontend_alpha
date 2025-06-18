"use client";

import { Card, CardContent } from "@/components/ui/card";

// If the file is actually 'success-tick.svg' and you have svg-loader configured:
import SuccessTick from "@/assets/auth/success-tick.svg";

// Or, if the file is 'success-tick.tsx':
// import SuccessTick from "@/assets/auth/success-tick.tsx";

export default function SuccessMessage() {
  return (
    <div className={"flex flex-col gap-6 w-full md:max-w-lg items-center"}>
      <Card className="bg-transparent border-none w-full pt-0">
        <CardContent className="p-3">
          <SuccessTick className="w-32 h-32 text-green-500 mx-auto mb-4" />
        </CardContent>
      </Card>
    </div>
  );
}
