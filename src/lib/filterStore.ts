import { FilterInterface } from "@/models/FilterInterface";
import { create } from "zustand";

interface FilterStoreInterface {
    filter: FilterInterface,
    updateFilter: (key: string, value: string) => void;
}

export const useFilterStore = create<FilterStoreInterface>()((set) => ({
    filter: {
        name: "",
        status: "",
        gender: "",
        species: "",
        type: "",
        page: "",
    },
    updateFilter: (key: string, value: string) => set((state) => ({filter: { ...state.filter, [key]: value}})),
  }))
  