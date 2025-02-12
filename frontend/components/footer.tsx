import React from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "../assets/assets";
import styles from "@/styles/footer.module.css";

const Footer = () => {
  return (
    <div className="w-full text-white bg-deepcolor px-[10%]">
      <Image src={assets.verywellmind} alt="" className="w-[150px] my-5" />
      <hr className="opacity-30" />
      <div className="w-full flex">
        <form className="w-[45%] pt-[50px]">
          <h4>আপনার ইনবক্সে একটি সুস্থ মনের জন্য দৈনিক টিপস</h4>
          <input
            type="search"
            id="footer_search"
            placeholder="Enter your email"
            className="w-[70%] text-lg p-2.5 mt-2.5 border-none outline-none rounded-tl-lg"
          />
          <button className="w-[20%] p-2.5 mt-2.5 text-white bg-redcolor rounded-r-lg text-lg border-none outline-none cursor-pointer">
            সাবমিট করুন
          </button>
        </form>
        <div className="w-[18%] p-[30px] pl-2.5 flex flex-col gap-2.5">
          <Link href="">Condition A-Z</Link>
          <Link href="">Therapy</Link>
          <Link href="">Living Well</Link>
          <Link href="">Relationships</Link>
          <Link href="">Psychology</Link>
        </div>
        <div className="w-[18%] p-[30px] pl-2.5 flex flex-col gap-2.5">
          <Link href="">Meet Our Review Board</Link>
          <Link href="">Editorial Process</Link>
          <Link href="">Privacy Policy</Link>
          <Link href="">Advertise</Link>
          <Link href="">Careers</Link>
          <Link href="">Crisis Support</Link>
        </div>
        <div className="w-[18%] p-[30px] pl-2.5 flex flex-col gap-2.5">
          <Link href="">About Us</Link>
          <Link href="">Diversity Pledge</Link>
          <Link href="">In the News</Link>
          <Link href="">Terms of Service</Link>
          <Link href="">Contact</Link>
        </div>
      </div>
      <hr className="opacity-30" />
      <div className="w-full flex">
        <div className="w-[45%] py-[50px]">
          <b>আমাদের অনুসরণ করো</b>
          <div className="mt-5 flex gap-2.5">
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
        <div className="w-[55%] py-[50px] px-2.5">
          <p>
            &quot;খুব ভালো মন&quot; বিষয়বস্তু তথ্য ও শিক্ষামূলক শুধুমাত্র
            উদ্দেশ্য। আমাদের ওয়েবসাইট একটি বিকল্প হতে উদ্দেশ্য নয় পেশাদার
            চিকিৎসা পরামর্শ, রোগ নির্ণয় বা চিকিৎসা।
          </p>
          <br />
          <p>Ⓒ 2024 Tesseract BD, Inc. — সমস্ত অধিকার সংরক্ষিত</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
