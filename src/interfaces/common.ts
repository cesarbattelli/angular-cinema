export interface IApiResponse {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  backdrop_path?: string;
  id?: number;
  overview?: string;
  title?: string;
  userMovie?: boolean;
}
