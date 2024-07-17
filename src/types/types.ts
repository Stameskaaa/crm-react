export interface CommentRespone {
  id: number;
  issue: string;
  date_created: string;
  message: string;
  designer: Designer;
}

export interface Designer {
  avatar: string;
  username: string;
}

export interface DesignerResponse {
  count: number;
  next: string;
  previous: null | string;
  results: ResultsDesignerResponse[];
}

export interface ResultsDesignerResponse {
  avatar: string;
  username: string;
  email: string;
  issues: Issues[];
}

export interface Issues {
  key: string;
  date_created: string;
  status: string;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  ordering?: string;
  key?: string | null;
  status?: string | null;
}

export interface Issue {
  id: number;
  status: string;
  designer: string;
  project: string;
  date_created: string;
  summary: string;
  received_from_client: number;
  send_to_project_manager: number;
  send_to_account_manager: number;
  send_to_designer: number;
  date_updated: string;
  date_started_by_designer: string;
  date_finished_by_designer: string;
  date_finished: string;
}

export interface Finances {
  revenue: number;
  costs: number;
  profit: number;
}

export interface Ratio {
  Done: number;
  'In Progress': number;
  New: number;
}
