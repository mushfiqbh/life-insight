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

export const catalogue = [
  {
    title: "এটুজেড",
    pathname: "/overview",
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
