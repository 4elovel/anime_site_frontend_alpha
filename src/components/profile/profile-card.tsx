"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";

export default function ProfileCard({ pageLoaded }: { pageLoaded: boolean }) {
  const avatarUrl = "assets/mock-user-logo.png";
  const username = "SakuraShadow";
  const followerCount = 0;
  const followingCount = 0;

  return (
    <div className="z-1 flex w-full max-w-128 flex-col">
      <Card className="border-none bg-transparent p-0 shadow-none!">
        <CardContent className="flex flex-row gap-6 p-0">
          <div className="relative h-30 w-30 lg:h-50 lg:w-50">
            <Skeleton
              className={`absolute top-0 left-0 z-10 h-30 w-30 rounded-md border-none bg-stone-500 lg:h-50 lg:w-50 ${
                pageLoaded ? "pointer-events-none hidden" : "block"
              }`}
            />
            <Avatar className="h-30 w-30 cursor-pointer rounded-md border-none object-cover lg:h-50 lg:w-50">
              <AvatarImage
                src={avatarUrl}
                className={`transition-opacity duration-500 ${
                  pageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </Avatar>
          </div>
          <div className="relative flex flex-col gap-2">
            <div
              className={`absolute inset-0 z-10 transition-opacity duration-500 ${
                pageLoaded ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <Skeleton className="mb-2 h-8 w-32 rounded bg-stone-500" />
              <div className="flex flex-col lg:flex-row lg:gap-5">
                <Skeleton className="mb-2 h-6 w-24 rounded bg-stone-500" />
                <Skeleton className="h-6 w-32 rounded bg-stone-500" />
              </div>
            </div>
            <div
              className={`transition-opacity duration-500 ${
                pageLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
