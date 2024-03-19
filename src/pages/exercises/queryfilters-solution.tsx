import Character from "@/components/Character";
import { ExerciseTitle } from "@/components/ExerciseTitle";
import { PageWrapper } from "@/components/PageWrapper";
import { useFilterStore } from "@/lib/filterStore";
import { FilterQueryKey } from "@/models/FilterInterface";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import ReactPaginate from "react-paginate";

function getFilteredRicksAndMorties({
  queryKey,
}: {
  queryKey: FilterQueryKey;
}) {
  const [, filter] = queryKey;
  return fetch(
    `https://rickandmortyapi.com/api/character?name=${filter.name}&status=${filter.status}&gender=${filter.gender}&species=${filter.species}&type=${filter.type}&page=${filter.page}`
  ).then((res) => res.json());
}

function QueryFiltersSolution() {

  const { filter, updateFilter } = useFilterStore();

  function handlePageClick(e) {
    updateFilter("page", e.selected + 1);
  }

  function onFilterChange(e) {
    console.log(e.target.name, e.target.value);
    updateFilter(e.target.name, e.target.value);
  }
  const { data } = useQuery({
    queryKey: ["filteredCharacters", filter],
    queryFn: getFilteredRicksAndMorties,
    placeholderData: keepPreviousData,
  });
  return (
    <PageWrapper>
      <ExerciseTitle title="Query Filters and Pagination Solution"></ExerciseTitle>

      {/* Shows the total of characters: */}
      <div className="font-bold text-xl p-4 bg-white bg-opacity-20 rounded-lg text-white">
        <p>Total amount of filtered Characters: {data?.info?.count}</p>
      </div>
      {/* Filter component */}
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
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={data?.info?.pages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex gap-4 mt-4 justify-center"
        pageClassName="bg-white bg-opacity-20 rounded-lg p-2"
        activeClassName="bg-white bg-opacity-40"
        nextClassName="bg-white bg-opacity-20 rounded-lg p-2"
        previousClassName="bg-white bg-opacity-20 rounded-lg p-2"
      />
      {/* Componente que muestre las tarjetas */}
      <div className="grid grid-columns-cards gap-4 pt-4">
        {data?.results?.map((character) => (
          <Character key={character.id} character={character}></Character>
        ))}
      </div>
      {/* componente pagination */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={data?.info?.pages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex gap-4 mt-4 justify-center"
        pageClassName="bg-white bg-opacity-20 rounded-lg p-2"
        activeClassName="bg-white bg-opacity-40"
        nextClassName="bg-white bg-opacity-20 rounded-lg p-2"
        previousClassName="bg-white bg-opacity-20 rounded-lg p-2"
      />
    </PageWrapper>
  );
}

export default QueryFiltersSolution;
