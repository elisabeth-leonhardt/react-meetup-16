import Link from "next/link";
import { Home } from "./Icons";

export function Title({title}: {title: string}) {
  return (
    <>
      <Link href="/">
        <Home fill="#fff"></Home>
      </Link>
      <h1 className="text-4xl font-extrabold tanstack-query-gradient py-2 pb-4">
        {title}
      </h1>
    </>
  );
}
