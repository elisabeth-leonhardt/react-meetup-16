import { RicksAndMortiesService } from "@/data/RicksAndMortiesService";
import { FilterInterface, FilterQueryKey } from "@/models/FilterInterface";
import { useQuery } from "@tanstack/react-query";

const ApplicationQueryKeys = {
    filteredCharacters: (filter: FilterInterface): FilterQueryKey => ["filteredCharacters", filter], //here you can process the filters too!
}

export function useFilteredRicksAndMorties(filter: FilterInterface) {
    return useQuery({
        queryKey: ApplicationQueryKeys.filteredCharacters(filter), 
        queryFn: RicksAndMortiesService.getRicksAndMorties,
        staleTime: 5000,
  })}