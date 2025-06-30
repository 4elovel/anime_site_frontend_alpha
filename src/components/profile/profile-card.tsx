"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ProfileCard({ isLoading }: { isLoading: boolean }) {
  const avatarUrl = "assets/mock-user-logo.png";
  const username = "SakuraShadow";
  const followerCount = 0;
  const followingCount = 0;

  return (
    <div className="z-1 flex w-full max-w-128 flex-col">
      <Card className="border-none bg-transparent p-0 shadow-none!">
        <CardContent className="flex flex-row gap-6 p-0">
          <div className="relative h-30 w-30 lg:h-50 lg:w-50">
            {isLoading ? (
              <Skeleton className="h-30 w-30 rounded-md bg-stone-500 lg:h-50 lg:w-50" />
            ) : (
              <Avatar className="h-30 w-30 cursor-pointer rounded-md border-none object-cover lg:h-50 lg:w-50">
                <AvatarImage src={avatarUrl} />
              </Avatar>
            )}
          </div>

          {isLoading ? (
            <div className="relative flex flex-col gap-4">
              <Skeleton className="h-8 max-w-40 rounded bg-stone-500" />
              <div className="flex flex-col lg:flex-row lg:gap-5">
                <Skeleton className="mb-2 h-6 w-32 rounded bg-stone-500" />
                <Skeleton className="h-6 w-32 rounded bg-stone-500" />
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col gap-2">
              <h1 className="text-[1.5rem] font-[700] text-white">
                {username}
              </h1>
              <div className="flex flex-col lg:flex-row lg:gap-5">
                <p className="text-[1rem] font-[500] text-[#918c8c]">
                  <span className="text-white">{followerCount}</span> стежать
                </p>
                <p className="text-[1rem] font-[500] text-[#918c8c]">
                  <span className="text-white">{followingCount}</span>{" "}
                  відстежується
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
