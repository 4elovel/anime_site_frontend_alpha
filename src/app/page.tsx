import { Button } from "@/components/ui/button";
import Link from "next/link";

import Navbar from "@/components/nav/navbar";

export default function Home() {
  return (
    <div className="p-0 m-0 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Button>Test</Button>
      <Link href="/signin">
        <Button>Sign In</Button>
      </Link>
      <Link href="/signin"></Link>

      <Link href="/anime">
        <Button>anime</Button>
      </Link>
      <Link href="/characters/blanche-considine">
        <Button>character</Button>
      </Link>

      <Link href="/signup">
        <Button>Sign Up</Button>
      </Link>
    </div>
  );
}
