import { FilterInterface, FilterQueryKey } from "@/models/FilterInterface";

export class RicksAndMortiesService {
    static readonly baseUrl = 'https://rickandmortyapi.com/api';

    static readonly endpoints = {
        getRickAndMorties: (filter: FilterInterface) => `/character?name=${filter.name}&status=${filter.status}&gender=${filter.gender}&species=${filter.species}&type=${filter.type}`
    }

    static async getRicksAndMorties({queryKey}: {queryKey: FilterQueryKey}){
        const [, filter] = queryKey;
        return fetch(
          `${RicksAndMortiesService.baseUrl}${RicksAndMortiesService.endpoints.getRickAndMorties(filter)}`
        ).then((res) => res.json());
    }
}