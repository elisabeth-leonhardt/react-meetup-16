export interface FilterInterface {
    name?: string;
    status?: string;
    gender?: string;
    species?: string;
    type?: string;
    page?: string;
  }

  export type FilterQueryKey = [string, FilterInterface]