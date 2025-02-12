'use client';

import React from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const Statbar: React.FC = () => {
  return (
    <div className="w-full bg-deep mt-[70px] text-white flex items-center justify-between px-10 min-h-[5.5rem]">
      <div className="w-[55%] flex items-center justify-between py-2 pr-5">
        <div>
          <h3 className="text-lg">বিশ্বস্ত মানসিক স্বাস্থ্য তথ্য আপনার প্রয়োজন</h3>
          <h3 className="text-lg text-green-500">আরও জানুন, আরও উজ্জ্বল হয়ে উঠুন</h3>
        </div>
        <Image src={assets.logo} alt="logo" className="w-24" />
      </div>
      <div className="w-[45%] flex items-center justify-between">
        {[
          { value: '150M+', label: 'পাঠকরা সাহায্য করছে' },
          { value: '100+', label: 'বিশেষজ্ঞ স্বাস্থ্য লেখক' },
          { value: '100+', label: 'মানসিক স্বাস্থ্য বিষয়' },
        ].map((stat, index) => (
          <div
            key={index}
            className="flex items-center px-3 cursor-pointer border-r border-dashed border-white last:border-r-0 hover:text-red-500 transition-all duration-200"
          >
            <div>
              <h3 className="text-xl font-bold">{stat.value}</h3>
              <h4 className="text-sm">{stat.label}</h4>
            </div>
            <b className="pl-2 text-2xl">&#129170;</b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statbar;
