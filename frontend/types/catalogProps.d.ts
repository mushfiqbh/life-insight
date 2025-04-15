import PostProps from "./postProps";

export default interface CatalogProps {
  _id: string;
  title: string;
  subtitle: string;
  label: string;
  desc: string;
  author: {
    name: string;
    bio: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  keyterms: {
    key: string;
    terms: string;
  }[];
  posts?: PostProps[];
  date?: string;
}

export interface CatalogState {
  overview: CatalogProps;
  overviews: {
    overviewList: CatalogProps[];
    totalPages: number;
  };
  index: OverviewIndex[];
  loading: boolean;
  error: string | null;
}

export interface OverviewIndex {
  _id: string;
  title: string;
  subtitle: string;
  label: string;
}
