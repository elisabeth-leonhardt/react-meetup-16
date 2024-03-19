import Character from "@/components/Character";
import { ExerciseTitle } from "@/components/ExerciseTitle";
import { PageWrapper } from "@/components/PageWrapper";
import { RickAndMortyCharacterResponse } from "@/models/APITypes";
import { useQuery } from "@tanstack/react-query";
import React from "react";

async function getServerSideMorties() {
  const response: Promise<RickAndMortyCharacterResponse> = await fetch(
    `https://rickandmortyapi.com/api/character?name=morty`
  ).then((res) => res.json());
  return response;
}

function SSRExercise() {
  const { data } = useQuery({
    queryKey: ["server-side-morties"],
    queryFn: getServerSideMorties,
  });

  // do the neccessary modifications here to show the server side rendered cards (the _app.tsx is already prepared)
  // when loading the page, you shouldn't see a network request
  // what problems can you identify regarding the query key?
  return (
    <PageWrapper>
      <ExerciseTitle title="Server Side Rendering Exercise"></ExerciseTitle>
      <div className="grid grid-columns-cards gap-4 pt-4">
        {data?.results?.map((character) => (
          <Character key={character.id} character={character}></Character>
        ))}
      </div>
    </PageWrapper>
  );
}

export default SSRExercise;

export const getServerSideProps = async () => {
  // prefetch the data here, on the server side
  return { props: {} };
};
