import Character from "@/components/Character";
import { ExerciseTitle } from "@/components/ExerciseTitle";
import { PageWrapper } from "@/components/PageWrapper";
import { RickAndMortyCharacterResponse } from "@/models/APITypes";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

async function getInfiniteMorties(pageParam: number) {
  const response: Promise<RickAndMortyCharacterResponse> = await fetch(
    `https://rickandmortyapi.com/api/character?name=morty&page=${pageParam}`
  ).then((res) => res.json());
  return response;
}

function InfiniteScrollSolution() {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["infiniteRicks"],
    queryFn: ({ pageParam }) => getInfiniteMorties(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.info.next) {
        return pages.length + 1;
      }
    },
    getPreviousPageParam: (lastPage) => lastPage.info.prev,
  });

  return (
    <PageWrapper>
      <ExerciseTitle title="Infinite Scroll Solution"></ExerciseTitle>
      {status === "success" && (
        <InfiniteScroll
          dataLength={data?.pages.length * 20}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<h4>Loading...</h4>}
        >
          <div className="grid grid-columns-cards gap-4 pt-4">
            {data?.pages?.map((singlePage) => (
              <>
                {singlePage.results.map((character) => (
                  <Character
                    key={character.id}
                    character={character}
                  ></Character>
                ))}
              </>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </PageWrapper>
  );
}

export default InfiniteScrollSolution;
