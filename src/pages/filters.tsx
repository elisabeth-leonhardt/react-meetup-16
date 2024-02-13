import Character from "@/components/Character";
import { PageWrapper } from "@/components/PageWrapper";
import { Title } from "@/components/Title";
import { CharacterI } from "@/models/APITypes";
import { FilterInterface, FilterQueryKey } from "@/models/FilterInterface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function getRicksAndMorties({
  queryKey,
}: {
  queryKey: FilterQueryKey;
}) {
  const [, filter] = queryKey;
  return fetch(
    `https://rickandmortyapi.com/api/character?name=${filter.name}&status=${filter.status}&gender=${filter.gender}&species=${filter.species}&type=${filter.type}`
  ).then((res) => res.json());
}

function Filters() {
  const [filter, setFilter] = useState<FilterInterface>({
    name: "",
    status: "",
    gender: "",
    species: "",
    type: "",
  });

  const { data } = useQuery({
    queryKey: ["filteredCharacters", filter],
    queryFn: getRicksAndMorties,
  });

  function onFilterChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const newObject: FilterInterface = {};
    newObject[e.target.name as keyof FilterInterface] = e.target.value;
    setFilter({ ...filter, ...newObject });
  }

  console.log(data);
  return (
    <PageWrapper>
      <Title title="Filters with Query Parameters"></Title>
      <div className="grid grid-columns-filters gap-4">
        <div className="flex flex-col">
          <label htmlFor="nameInput">Name</label>
          <input
            id="nameInput"
            type="text"
            className="text-black"
            name="name"
            onChange={onFilterChange}
            value={filter.name}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            className="text-black"
            onChange={onFilterChange}
          >
            <option value="">Choose Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="genderSelect">Gender</label>
          <select
            name="gender"
            id="genderSelect"
            className="text-black"
            onChange={onFilterChange}
          >
            <option value="">Choose gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="speciesInput">Species</label>
          <input
            id="speciesInput"
            type="species"
            name="species"
            className="text-black"
            onChange={onFilterChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="typeInput">Type</label>
          <input
            id="typeInput"
            type="type"
            name="type"
            className="text-black"
            onChange={onFilterChange}
          />
        </div>
      </div>
      <div className="grid grid-columns-cards gap-4 pt-4">
        {data?.results?.map((character: CharacterI) => (
          <Character key={character.id} character={character}></Character>
        ))}
      </div>
    </PageWrapper>
  );
}

export default Filters;
