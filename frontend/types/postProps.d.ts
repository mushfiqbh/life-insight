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
  readingTime: number;
  editors: string[];
  sources: {
    text: string;
    href: string;
  }[];
  image: string;
  views: number;
  adminChoice: boolean;
  date: string;
}

export interface ContentDataProps {
  markup: string;
  input1: string;
  input2: string;
  placeholder1: string;
  placeholder2: string;
}
