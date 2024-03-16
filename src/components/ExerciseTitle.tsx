import Link from "next/link";
import { Home, Keyboard } from "./Icons";

export function ExerciseTitle({ title }: { title: string }) {
  return (
    <>
      <div className="flex gap-4 items-center">
        <Link href="/">
          <Home fill="#fff"></Home>
        </Link>
        <Link href="/exercises">
          <Keyboard fill="#fff"></Keyboard>
        </Link>
      </div>
      <h1 className="text-4xl font-extrabold tanstack-query-gradient py-2 pb-4">
        {title}
      </h1>
    </>
  );
}
