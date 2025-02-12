interface CatalogProps {
  _id: string;
  title: string;
  subtitle: string;
  label: string;
  desc: string;
  author: {
    name: string;
    bio: string;
  };
  faqs: [
    {
      question: string;
      answer: string;
    }
  ];
  keyterms: [
    {
      key: string;
      terms: string;
    }
  ];
  date: string;
}

export default CatalogProps;
