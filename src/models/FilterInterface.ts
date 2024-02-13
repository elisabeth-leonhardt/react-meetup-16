export interface FilterInterface {
    name?: string;
    status?: string;
    gender?: string;
    species?: string;
    type?: string;
  }

  export type FilterQueryKey = [string, FilterInterface]