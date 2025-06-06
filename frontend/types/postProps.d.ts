import User from "./user";

export default interface PostProps {
  _id: string;
  label: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    bio: string;
  };
  content: string;
  readingTime?: number;
  editors: User[];
  sources: {
    text: string;
    href: string;
  }[];
  image: string;
  views: number;
  adminChoice: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContentDataProps {
  markup: string;
  input1: string;
  input2: string;
  placeholder1: string;
  placeholder2: string;
}

export interface PostsState {
  post: PostProps;
  posts: {
    postList: PostProps[];
    totalPages: number;
  };
  selectedPosts: {
    adminChoice: PostProps;
    latestPost: PostProps;
    popularPosts: PostProps[];
  };
  loading: boolean;
  error: string | null;
}
