import React from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "../assets/assets";
import styles from "@/styles/footer.module.css";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <div className="w-full text-white text-center md:text-left bg-deep_blue px-[8%]">
      <Image src={assets.verywellmind} alt="" className="w-[150px] my-5" />
      <hr className="opacity-30" />
      <div className="w-full md:flex">
        <form className="md:w-[45%] pt-10">
          <h4>{t("tips")}</h4>
          <div className="flex items-center justify-center md:justify-start mt-3">
            <input
              type="search"
              id="footer_search"
              placeholder="Enter your email"
              className="w-[70%] text-lg p-2.5 border-none outline-none rounded-lg bg-ash"
            />
            <button className="w-[10%] ml-3 rounded-lg text-lg cursor-pointer">
              <svg
                height="32"
                viewBox="0 0 48 48"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.02 42l41.98-18-41.98-18-.02 14 30 4-30 4z" />
                <path d="M0 0h48v48h-48z" fill="none" />
              </svg>
            </button>
          </div>
        </form>
        <div className="w-full md:w-[18%] p-[30px] pl-2.5 flex flex-col gap-2.5">
          <Link href="">Condition A-Z</Link>
          <Link href="">Therapy</Link>
          <Link href="">Living Well</Link>
          <Link href="">Relationships</Link>
          <Link href="">Psychology</Link>
        </div>
        <div className="w-full md:w-[18%] p-[30px] pl-2.5 flex flex-col gap-2.5">
          <Link href="">Meet Our Review Board</Link>
          <Link href="">Editorial Process</Link>
          <Link href="">Privacy Policy</Link>
          <Link href="">Advertise</Link>
          <Link href="">Careers</Link>
          <Link href="">Crisis Support</Link>
        </div>
        <div className="w-full md:w-[18%] p-[30px] pl-2.5 flex flex-col gap-2.5">
          <Link href="">About Us</Link>
          <Link href="">Diversity Pledge</Link>
          <Link href="">In the News</Link>
          <Link href="">Terms of Service</Link>
          <Link href="">Contact</Link>
        </div>
      </div>
      <hr className="opacity-30" />
      <div className="w-full md:flex">
        <div className="w-full md:w-[45%] pt-10">
          <b>{t("follow")}</b>
          <div className="w-fit mt-5 mx-auto md:mx-0 flex gap-2.5">
            <Link href="" className={styles.sociallink}>
              +
            </Link>
            <Link href="" className={styles.sociallink}>
              +
            </Link>
            <Link href="" className={styles.sociallink}>
              +
            </Link>
            <Link href="" className={styles.sociallink}>
              +
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[55%] py-[50px] px-2.5">
          <p>{t("about")}</p>
          <br />
          <p>Ⓒ 2024 Tesseract BD, Inc. — {t("rights")}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
