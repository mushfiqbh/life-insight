import React from "react";
import "@/styles/loadmore.module.css";

interface LoadMoreProps {
  length: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const LoadMore = ({ length, activeIndex, setActiveIndex } : LoadMoreProps) => {
  return (
    <div className="showcase_loadmore">
      <button
        onClick={() => setActiveIndex(activeIndex - 1)}
        disabled={activeIndex == 0}
      >
        <span>&#129168;</span> আগে
      </button>
      <b>
        {length ? activeIndex + 1 : 0}/{Math.ceil(length / 10)}
      </b>
      <button
        onClick={() => setActiveIndex(activeIndex + 1)}
        disabled={activeIndex + 1 == Math.ceil(length / 10)}
      >
        পরে <span>&#129170;</span>
      </button>
    </div>
  );
};

export default LoadMore;
