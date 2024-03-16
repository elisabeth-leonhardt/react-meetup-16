import { ExerciseTitle } from "@/components/ExerciseTitle";
import { PageWrapper } from "@/components/PageWrapper";
import { RickAndMortyCharacterResponse } from "@/models/APITypes";
import React from "react";

async function getRicksAndMorties() {
  const response: Promise<RickAndMortyCharacterResponse> = await fetch(
    `https://rickandmortyapi.com/api/character`
  ).then((res) => res.json());
  return response;
}

function WarmupExercise() {
  // write a useQuery hook that gets rick and morty characters with the getRicksAndMorties function

  return (
    <PageWrapper>
      <ExerciseTitle title="Warmup-Exercise"></ExerciseTitle>
      {/* bonus: display some loading and error state */}
      {/* you can use this as a loader: */}
      {/* <span className="loader"></span> */}
      <div className="grid grid-columns-cards gap-4 pt-4">
        {/* display the result of the query*/}
      </div>
    </PageWrapper>
  );
}

export default WarmupExercise;
