import Character from "@/components/Character";
import { ExerciseTitle } from "@/components/ExerciseTitle";
import { PageWrapper } from "@/components/PageWrapper";
import { RickAndMortyCharacterResponse } from "@/models/APITypes";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import React from "react";

async function getServerSideMorties() {
  const response: Promise<RickAndMortyCharacterResponse> = await fetch(
    `https://rickandmortyapi.com/api/character?name=morty`
  ).then((res) => res.json());
  return response;
}

function SSRSolution({ dehydratedState }) {
  const { data } = useQuery({
    queryKey: ["server-side-morties"],
    queryFn: getServerSideMorties,
  });
  return (
    <HydrationBoundary state={dehydratedState}>
      <PageWrapper>
        <ExerciseTitle title="Server Side Rendering Solution"></ExerciseTitle>
        <div className="grid grid-columns-cards gap-4 pt-4">
          {data?.results?.map((character) => (
            <Character key={character.id} character={character}></Character>
          ))}
        </div>
      </PageWrapper>
    </HydrationBoundary>
  );
}

export default SSRSolution;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["server-side-morties"],
    queryFn: getServerSideMorties,
  });
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
