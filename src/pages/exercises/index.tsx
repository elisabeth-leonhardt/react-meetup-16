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
  {
    linktext: "Query Filters and Pagination Exercise",
    link: "/exercises/queryfilters-exercise",
    id: 2,
  },
  {
    linktext: "Query Filters and Pagination Solution",
    link: "/exercises/queryfilters-solution",
    id: 3,
  },
  {
    linktext: "SSR Exercise",
    link: "/exercises/ssr-exercise",
    id: 4,
  },
  {
    linktext: "SSR Solution",
    link: "/exercises/ssr-solution",
    id: 5,
  },
  {
    linktext: "Infinite Scroll Exercise",
    link: "/exercises/infinite-scroll-exercise",
    id: 6,
  },
  {
    linktext: "Infinite Scroll Solution",
    link: "/exercises/infinite-scroll-solution",
    id: 7,
  },
  {
    linktext: "Mutation Exercise",
    link: "/exercises/mutation-exercise",
    id: 8,
  },
  {
    linktext: "Mutation Solution",
    link: "/exercises/mutation-solution",
    id: 9,
  },
  // infinite scroll  const [queryClient] = useState (
  // server side rendering
  // add a delete button to the existing todo application (you can update the cache, refetch or make an optimistic update)
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
