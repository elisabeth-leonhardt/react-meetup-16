import Character from "@/components/Character";
import { PageWrapper } from "@/components/PageWrapper";
import { Title } from "@/components/Title";
import { CharacterI, RickAndMortyCharacterResponse } from "@/models/APITypes";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";

type TimeoutID = ReturnType<typeof setTimeout>;

function Debounce() {
  const [search, setSearch] = useState<string>("");
  const [searchEnabled, setSearchEnabled] = useState<boolean>(true);
  const timeOutIdRef = useRef<TimeoutID | undefined>();

  const { data } = useQuery({
    queryKey: ["rickAndMorties", search],
    queryFn: async () => {
      const res: Promise<RickAndMortyCharacterResponse> = await fetch(
        `https://rickandmortyapi.com/api/character?name=${search}`
      ).then((res) => res.json());
      return res;
    },
    enabled: searchEnabled,
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    if (timeOutIdRef.current !== undefined) {
      clearTimeout(timeOutIdRef.current);
    }
    setSearchEnabled(false);
    if (e.target.value.length > 1) {
      timeOutIdRef.current = setTimeout(() => {
        setSearchEnabled(true);
      }, 400);
    }
  }
  return (
    <PageWrapper>
      <Title title="Debounced API calls"></Title>
      <div>
        <input
          type="text"
          className="text-black w-full"
          value={search}
          placeholder="Search for any Character..."
          onChange={handleInputChange}
        />
        <div className="grid grid-columns-cards gap-4 pt-4">
          {data?.results?.map((character: CharacterI) => (
            <Character character={character} key={character.id}></Character>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Debounce;
