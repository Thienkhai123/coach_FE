export interface IBlogResponse {
  errorMessage: any;
  errorExceptionMessage: any;
  successMessage: string;
  statusCode: number;
  totalData: number;
  totalPage: number;
  isSuccess: boolean;
  data: IBlog[];
  errors: any;
  otherData: any;
}

export interface IBlog {
  updatedByUser: any;
  createdByUser: any;
  company: any;
  blogCategory: any;
  isCreate: boolean;
  isActive: boolean;
  createdAt: string;
  enumBlogStatusDisplay: string;
  image: any;
  blogId: number;
  title: string;
  shortDescription?: string;
  content?: string;
  blogCategoryId: number;
  enumBlogStatus: number;
  customUrl: any;
  isHighlight: boolean;
  numberOfViews: number;
  imageUrl: string;
  companyId: any;
  createdByUserId?: number;
  updatedByUserId: number;
  updatedAt: string;
  isDeleted: boolean;
}
