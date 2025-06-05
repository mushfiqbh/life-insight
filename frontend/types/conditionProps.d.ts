import PostProps from "./postProps";

export default interface ConditionProps {
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
  postIds?: PostProps[];
  date?: string;
}

export interface ConditionState {
  condition: ConditionProps;
  conditions: {
    conditionList: ConditionProps[];
    totalPages: number;
  };
  index: ConditionIndex[];
  loading: boolean;
  error: string | null;
}

export interface ConditionIndex {
  _id: string;
  title: string;
  subtitle: string;
  label: string;
}
