import Character from "@/components/Character";
import { PageWrapper } from "@/components/PageWrapper";
import { Title } from "@/components/Title";
import { delay } from "@/lib/delay";
import { RickAndMortyCharacterResponse } from "@/models/APITypes";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import React from "react";

function Simplequeries() {
  const justGetMeSomeData = useQuery({
    queryKey: ["someMorties"],
    queryFn: async () => {
      await delay(2000);
      const res: Promise<RickAndMortyCharacterResponse> = await fetch(
        `https://rickandmortyapi.com/api/character?name=alien`
      ).then((res) => res.json());
      return res;
    },
  });

  const justGetMeSomeDataWithAxios = useQuery({
    queryKey: ["someMortiesWithAxios"],
    queryFn: async () => {
      try {
        const response: AxiosResponse = await axios.get(
          "https://rickandmortyapi.com/api/character?name=morty"
        );
        const responseData: RickAndMortyCharacterResponse = response.data;
        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error: ", error.message);
        }
      }
    },
    staleTime: 5000,
    retry: 5,
  });

  const loadForever = useQuery({
    queryKey: ["longLoader"],
    queryFn: async () => {
      await delay(100000);
      const res: Promise<RickAndMortyCharacterResponse> = await fetch(
        `https://rickandmortyapi.com/api/character?name=morty`
      ).then((res) => res.json());
      return res;
    },
  });

  const throwAnError = useQuery({
    queryKey: ["forcingAnError"],
    queryFn: async () =>
      await fetch(`https://rickandmortyi.com/api/chcter?name=morty`).then(
        (res) => res.json()
      ),
    retry: false,
  });

  return (
    <PageWrapper>
      <Title title="Simple Query"></Title>
      {throwAnError.isError ? (
        <p className="text-orange-600 pb-4">Ouch! An error ocurred</p>
      ) : null}
      {loadForever.isLoading ? <span className="loader"></span> : null}
      {justGetMeSomeData.isSuccess ? (
        <div className="grid grid-columns-cards gap-4 pt-4">
          {justGetMeSomeData.data?.results?.map((character) => (
            <Character character={character} key={character.id}></Character>
          ))}
        </div>
      ) : null}
      {justGetMeSomeDataWithAxios.isSuccess ? (
        <div className="grid grid-columns-cards gap-4 pt-4">
          {justGetMeSomeDataWithAxios.data?.results?.map((character) => (
            <Character character={character} key={character.id}></Character>
          ))}
        </div>
      ) : null}
    </PageWrapper>
  );
}

export default Simplequeries;
