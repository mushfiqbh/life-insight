import add_icon from "./add_icon.png";
import order_icon from "./order_icon.png";
import profile_image from "./profile_image.png";
import upload_area from "./upload_area.png";
import parcel_icon from "./parcel_icon.png";
import anxiety from "./anxiety.webp";
import deppresion from "./depression.webp";
import selfImprovement from "./self-improvement.webp";
import meditation from "./meditation.webp";
import therapy from "./therapy.webp";
import relationship from "./relationship.webp";
import menu from "./menu_icon.png";
import logo from "./kvm_logo.svg";
import brand from "./brand.png";
import verywellmind from "./verywellmind.png";
import search from "./search-icon.png";
import attachment from "./ExIntrovert.webp";
import gaslight from "./Stress.webp";
import emotion from "./EQ.webp";
import leadership from "./Leadership.webp";
import health_expert from "./health_experts.svg";
import fact_checked from "./fact_checked.svg";
import medical_reviewd from "./medically_reviewed.svg";
import update from "./update.svg";
import steven_gans from "./Steven_Gans.jpg";
import daniel from "./Block.jpg";
import akeem from "./Akeemmarsh.jpg";
import sara_clerk from "./Sara_Clark.jpg";
import carly from "./Carly.jpg";
import shaheen from "./Shaheen_Lakhan.jpg";
import award_mmm from "./logo_awards_mmm.png";
import award_pm from "./logo_awards_pmeb.png";
import award_adweek from "./logo_awards_adweek_mind.png";
import award_fast from "./logo_awards_fast-company.png";
import dunning_krugar from "./dunning_krugar.jpeg";
import PostProps from "@/types/postProps";

export const assets = {
  add_icon,
  order_icon,
  profile_image,
  upload_area,
  parcel_icon,
  menu,
  logo,
  brand,
  verywellmind,
  search,
  award_mmm,
  award_pm,
  award_adweek,
  award_fast,
  dunning_krugar,
};

export const sections = {
  promises: [
    {
      img: health_expert,
      text: "health_expert",
    },
    {
      img: fact_checked,
      text: "fact_checked",
    },
    {
      img: medical_reviewd,
      text: "medical_reviewed",
    },
    {
      img: update,
      text: "update",
    },
  ],
  reviewBoard: [
    {
      name: "স্টিভেন গ্যান্স, এমডি",
      role: "মনোরোগ বিশেষজ্ঞ",
      image: steven_gans,
    },
    {
      name: "ড্যানিয়েল বি ব্লক, এমডি",
      role: "মনোরোগ বিশেষজ্ঞ",
      image: daniel,
    },
    {
      name: "আকিম মার্শ, এমডি",
      role: "শিশু, কিশোর, প্রাপ্তবয়স্ক মনোরোগ বিশেষজ্ঞ",
      image: akeem,
      width: 120,
    },
    {
      name: "সারা ক্লার্ক",
      role: "মননশীলতা শিক্ষক",
      image: sara_clerk,
    },
    {
      name: "কার্লি স্নাইডার, এমডি",
      role: "মনোরোগ বিশেষজ্ঞ",
      image: carly,
    },
    {
      name: "শাহীন লিখন, মো, পিএইচডি",
      role: "নিউরোলজিস্ট",
      image: shaheen,
    },
  ],
  rewards: [
    {
      title: "2021 সেরা স্বাস্থ্যসেবা গ্রাহক মিডিয়া ব্র্যান্ড",
      image: award_mmm,
    },
    {
      title: "2021 পণ্য উদ্ভাবক ভেরিওয়েল মাইন্ড পডকাস্ট",
      image: award_pm,
    },
    {
      title: "2021 স্বাস্থ্যের ক্ষেত্রে হটেস্ট",
      image: award_adweek,
    },
    {
      title: "2020 বিশ্ব পরিবর্তনশীল ধারণা",
      image: award_fast,
    },
  ],
};

export const quizes = [
  {
    icon: attachment,
    question: "attach",
    link: "",
  },
  {
    icon: gaslight,
    question: "gaslight",
    link: "",
  },
  {
    icon: emotion,
    question: "emotion",
    link: "",
  },
  {
    icon: leadership,
    question: "leadership",
    link: "",
  },
];

export const topics = [
  {
    icon: meditation,
    title: "meditation",
    link: "",
  },
  {
    icon: therapy,
    title: "therapy",
    link: "",
  },
  {
    icon: relationship,
    title: "relationship",
    link: "",
  },
  {
    icon: selfImprovement,
    title: "self",
    link: "",
  },

  {
    icon: deppresion,
    title: "depression",
    link: "",
  },

  {
    icon: anxiety,
    title: "anxiety",
    link: "",
  },
];

export const grouped_conditions = [
  {
    title: "এটুজেড",
    pathname: "/condition",
    includes: [
      {
        title: "Addiction",
        subtitle: "আসক্তি",
        pathname: "",
      },
      {
        title: "Depression",
        subtitle: "ডিপ্রেশন",
        pathname: "",
      },
      {
        title: "PTSD",
        subtitle: "পিটিএসডি",
        pathname: "",
      },
    ],
  },
  {
    title: "থেরাপি",
    pathname: "/therapy",
    includes: [
      {
        title: "Bipolar Disorder",
        subtitle: "বাইপোলার ডিসঅর্ডার",
        pathname: "",
      },
      {
        title: "PTSD",
        subtitle: "পিটিএসডি",
        pathname: "",
      },
    ],
  },
  {
    title: "জীবন",
    pathname: "/living-well",
    includes: [
      {
        title: "Addiction",
        subtitle: "আসক্তি",
        pathname: "",
      },
      {
        title: "Depression",
        subtitle: "ডিপ্রেশন",
        pathname: "",
      },
      {
        title: "ADHD",
        subtitle: "এডিএইচডি",
        pathname: "",
      },
      {
        title: "Bipolar Disorder",
        subtitle: "বাইপোলার ডিসঅর্ডার",
        pathname: "",
      },
      {
        title: "PTSD",
        subtitle: "পিটিএসডি",
        pathname: "",
      },
    ],
  },
  {
    title: "সম্পর্ক",
    pathname: "/relationship",
    includes: [
      {
        title: "Addiction",
        subtitle: "আসক্তি",
        pathname: "",
      },
      {
        title: "Depression",
        subtitle: "ডিপ্রেশন",
        pathname: "",
      },
      {
        title: "ADHD",
        subtitle: "এডিএইচডি",
        pathname: "",
      },
      {
        title: "Bipolar Disorder",
        subtitle: "বাইপোলার ডিসঅর্ডার",
        pathname: "",
      },
      {
        title: "PTSD",
        subtitle: "পিটিএসডি",
        pathname: "",
      },
    ],
  },
  {
    title: "মনোবিজ্ঞান",
    pathname: "/psychology",
    includes: [
      {
        title: "Addiction",
        subtitle: "আসক্তি",
        pathname: "",
      },
      {
        title: "Depression",
        subtitle: "ডিপ্রেশন",
        pathname: "",
      },
      {
        title: "ADHD",
        subtitle: "এডিএইচডি",
        pathname: "",
      },
      {
        title: "Bipolar Disorder",
        subtitle: "বাইপোলার ডিসঅর্ডার",
        pathname: "",
      },
      {
        title: "PTSD",
        subtitle: "পিটিএসডি",
        pathname: "",
      },
    ],
  },
];

export const demo_selected_posts: {
  adminChoice: PostProps;
  latestPost: PostProps;
  popularPosts: PostProps[];
} = {
  adminChoice: {
    _id: "1",
    label: "self-improvement",
    title:
      "আরও অর্থ কি আপনাকে সুখী করে? হ্যাঁ, কিন্তু এটা জটিল তবে কয়েকটি সতর্কতা রয়েছে",
    subtitle: "গবেষণা বলে যে এটি সাহায্য করতে পারে, তবে কয়েকটি সতর্কতা রয়েছে",
    tags: [],
    author: {
      name: "Kendra Cherry, MSEd",
      bio: "Kendra Cherry, MS, is a psychosocial rehabilitation specialist, psychology educator, and author of the Everything Psychology Book.",
    },
    content: "f",
    readingTime: 1,
    editors: [],
    sources: [
      {
        text: "Kahneman, D., & Deaton, A. (2010). High income improves evaluation of life but not emotional well-being. Proceedings of the National Academy of Sciences, 107(38), 16489–16493.",
        href: "https://doi.org/10.1073/pnas.1011492107",
      },
      {
        text: "Ek, C. (2017). Some causes are more equal than others? The effect of similarity on substitution in charitable giving. Journal of Economic Behavior & Organization, 136, 45–62.",
        href: "https://doi.org/10.1016/j.jebo.2017.01.007",
      },
      {
        text: "Hill, P. L., Turiano, N. A., Mroczek, D. K., & Burrow, A. L. (2016). The value of a purposeful life: Sense of purpose predicts greater income and net worth. Journal of Research in Personality, 65, 38–42.",
        href: "https://doi.org/10.1016/j.jrp.2016.07.003",
      },
    ],
    image:
      "https://res.cloudinary.com/dmmi1ququ/image/upload/v1748066983/posts/wvtpdxx1mj0dllbvnpb0.png",
    views: 117,
    adminChoice: true,
    createdAt: "2025-02-28T00:00:00.000Z",
    updatedAt: "2024-07-23T00:00:00.000Z",
  },
  latestPost: {
    _id: "2",
    label: "life",
    title:
      'আপনার "কর্টিসল ফেস" কি স্ট্রেসের কারণে? বিশেষজ্ঞরা যা বলছেন তা এখানে',
    subtitle:
      "সিরি, দয়া করে আমাকে বলুন কিভাবে আমার নিটোল গাল এবং বৃত্তাকার চোয়াল ডিপফ করতে হয়",
    tags: [],
    author: {
      name: "new",
      bio: "twxf",
    },
    content: "",
    readingTime: 1,
    editors: [],
    sources: [
      {
        text: "Hoenig, L. J. (2018). The “moon face” of cushing syndrome. JAMA Dermatology, 154(3), 329–329. doi.org:10.1001/jamadermatol.2017.5798",
        href: "https://doi.org/10.1001/jamadermatol.2017.5798",
      },
      {
        text: "Pappachan, J. M., Hariman, C., Edavalath, M., Waldron, J., & Hanna, F. W. (2017). Cushing’s syndrome: A practical approach to diagnosis and differential diagnoses. Journal of Clinical Pathology, 70(4), 350–359. doi.org:10.1136/jclinpath-2016-203933",
        href: "https://doi.org/10.1136/jclinpath-2016-203933",
      },
    ],
    image:
      "https://res.cloudinary.com/dmmi1ququ/image/upload/v1748066983/posts/wvtpdxx1mj0dllbvnpb0.png",
    views: 15,
    adminChoice: false,
    createdAt: "2025-02-28T00:00:00.000Z",
    updatedAt: "2025-02-28T00:00:00.000Z",
  },
  popularPosts: [
    {
      _id: "3",
      label: "good-life",
      title: "আপনার আবেগীয় বুদ্ধিমত্তা (Emotional intelligence) কি উচ্চ?",
      subtitle: "First Post First Post First Post  up",
      tags: [],
      author: {
        name: "Tasnim",
        bio: "Teacher",
      },
      content: "",
      readingTime: 1,
      editors: [],
      sources: [
        {
          text: "What are the causes of the problem?",
          href: "http://www.facebook.com",
        },
      ],
      image:
        "https://res.cloudinary.com/dmmi1ququ/image/upload/v1748066983/posts/wvtpdxx1mj0dllbvnpb0.png",
      views: 81,
      adminChoice: false,
      createdAt: "2025-02-28T00:00:00.000Z",
      updatedAt: "2024-07-21T00:00:00.000Z",
    },
    {
      _id: "4",
      label: "good-life",
      title:
        "আপনার কর্টিসল ফেস কি স্ট্রেসের কারণে? বিশেষজ্ঞরা যা বলছেন তা এখানে",
      subtitle:
        "সিরি, দয়া করে আমাকে বলুন কিভাবে আমার নিটোল গাল এবং বৃত্তাকার চোয়াল ডিপফ করতে হয়",
      tags: [],
      author: {
        name: "Tara",
        bio: "Doctor",
      },
      content: "",
      readingTime: 1,
      editors: [],
      sources: [
        {
          text: "Hoenig, L. J. (2018). The “moon face” of cushing syndrome. JAMA Dermatology, 154(3), 329–329. doi.org:10.1001/jamadermatol.2017.5798",
          href: "https://doi.org/10.1001/jamadermatol.2017.5798",
        },
        {
          text: "Pappachan, J. M., Hariman, C., Edavalath, M., Waldron, J., & Hanna, F. W. (2017). Cushing’s syndrome: A practical approach to diagnosis and differential diagnoses. Journal of Clinical Pathology, 70(4), 350–359. doi.org:10.1136/jclinpath-2016-203933",
          href: "https://doi.org/10.1136/jclinpath-2016-203933",
        },
      ],
      image:
        "https://res.cloudinary.com/dmmi1ququ/image/upload/v1748066983/posts/wvtpdxx1mj0dllbvnpb0.png",
      views: 108,
      adminChoice: false,
      createdAt: "2025-02-28T00:00:00.000Z",
      updatedAt: "2024-06-12T00:00:00.000Z",
    },
    {
      _id: "5",
      label: "good-life",
      title: "আপনার আবেগীয় বুদ্ধিমত্তা (Emotional intelligence) কি উচ্চ?",
      subtitle: "First Post First Post First Post  up",
      tags: [],
      author: {
        name: "Tasnim",
        bio: "Teacher",
      },
      content: "",
      readingTime: 1,
      editors: [],
      sources: [
        {
          text: "What are the causes of the problem?",
          href: "http://www.facebook.com",
        },
      ],
      image:
        "https://res.cloudinary.com/dmmi1ququ/image/upload/v1748066983/posts/wvtpdxx1mj0dllbvnpb0.png",
      views: 81,
      adminChoice: false,
      createdAt: "2025-02-28T00:00:00.000Z",
      updatedAt: "2024-07-21T00:00:00.000Z",
    },
    {
      _id: "6",
      label: "good-life",
      title:
        "আপনার কর্টিসল ফেস কি স্ট্রেসের কারণে? বিশেষজ্ঞরা যা বলছেন তা এখানে",
      subtitle:
        "সিরি, দয়া করে আমাকে বলুন কিভাবে আমার নিটোল গাল এবং বৃত্তাকার চোয়াল ডিপফ করতে হয়",
      tags: [],
      author: {
        name: "Tara",
        bio: "Doctor",
      },
      content: "",
      readingTime: 1,
      editors: [],
      sources: [
        {
          text: "Hoenig, L. J. (2018). The “moon face” of cushing syndrome. JAMA Dermatology, 154(3), 329–329. doi.org:10.1001/jamadermatol.2017.5798",
          href: "https://doi.org/10.1001/jamadermatol.2017.5798",
        },
        {
          text: "Pappachan, J. M., Hariman, C., Edavalath, M., Waldron, J., & Hanna, F. W. (2017). Cushing’s syndrome: A practical approach to diagnosis and differential diagnoses. Journal of Clinical Pathology, 70(4), 350–359. doi.org:10.1136/jclinpath-2016-203933",
          href: "https://doi.org/10.1136/jclinpath-2016-203933",
        },
      ],
      image:
        "https://res.cloudinary.com/dmmi1ququ/image/upload/v1748066983/posts/wvtpdxx1mj0dllbvnpb0.png",
      views: 108,
      adminChoice: false,
      createdAt: "2025-02-28T00:00:00.000Z",
      updatedAt: "2024-06-12T00:00:00.000Z",
    },
  ],
};
