export interface PermitApplication {
  id: number;
  applicant_name: string;
  applicant_email: string;
  permit_type: string;
  application_status: 'Pending' | 'Approved' | 'Rejected';
  submitted_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PermitsResponse {
  data: PermitApplication[];
  meta: PaginationMeta;
}

export interface CreatePermitDto {
  applicant_name: string;
  applicant_email: string;
  permit_type: string;
}

export interface UpdatePermitDto {
  applicant_name?: string;
  applicant_email?: string;
  permit_type?: string;
  application_status?: 'Pending' | 'Approved' | 'Rejected';
}
