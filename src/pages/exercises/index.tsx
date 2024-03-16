import { Chevron } from "@/components/Icons";
import Link from "next/link";

const pages = [
  {
    linktext: "Simple Queries Exercise",
    link: "/exercises/warmup-exercise",
    id: 0,
  },
  {
    linktext: "Simple Queries Solution",
    link: "/exercises/warmup-solution",
    id: 1,
  },
  // {
  //   linktext: "Filters with API query parameters",
  //   link: "/filters",
  //   id: 1,
  // },
  // {
  //   linktext: "TanStack Query with custom hooks",
  //   link: "/customHook",
  //   id: 2,
  // },
  // {
  //   linktext: "Dependent Queries",
  //   link: "/dependentQueries",
  //   id: 3,
  // },
  // {
  //   linktext: "Debounced Query",
  //   link: "/debounce",
  //   id: 4,
  // },
  // {
  //   linktext: "Mutations with and without refetch",
  //   link: "/mutations",
  //   id: 5,
  // },
];

export default function Home() {
  return (
    <main className="min-h-screen max-w-5xl m-[auto]">
      <div className="py-10 px-4 flex justify-between items-center gap-4">
        <h1 className="text-4xl font-extrabold tanstack-query-gradient py-2 flex-1">
          TanStack Query Exercises
        </h1>
      </div>
      <div className="py-10 px-4">
        <ul className="flex flex-col gap-2 pl-4">
          {pages.map((page) => (
            <li key={page.id} className="list-decimal">
              <Link href={page.link} className="hover:underline text-lg flex">
                <span>{page.linktext}</span>
                <Chevron></Chevron>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
