import Character from "@/components/Character";
import { ExerciseTitle } from "@/components/ExerciseTitle";
import { PageWrapper } from "@/components/PageWrapper";
import { RickAndMortyCharacterResponse } from "@/models/APITypes";
import { useQuery } from "@tanstack/react-query";
import React from "react";

async function getRicksAndMorties() {
  const response: Promise<RickAndMortyCharacterResponse> = await fetch(
    `https://rickandmortyapi.com/api/character`
  ).then((res) => res.json());
  return response;
}

function WarmupSolution() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ricks-and-morties"],
    queryFn: getRicksAndMorties,
  });
  return (
    <PageWrapper>
      <ExerciseTitle title="Warmup-Solution"></ExerciseTitle>
      {isLoading ? <span className="loader"></span> : null}
      {isError ? (
        <span className="text-red-600">Ups! An error occurred!</span>
      ) : null}
      <div className="grid grid-columns-cards gap-4 pt-4">
        {data?.results?.map((character) => (
          <Character key={character.id} character={character}></Character>
        ))}
      </div>
    </PageWrapper>
  );
}

export default WarmupSolution;
