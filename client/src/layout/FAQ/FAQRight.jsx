import React, {
  memo,
  useState,
} from "react";

import FAQItem from "./FAQItem";

const FAQRight = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex((currentIndex) =>
      currentIndex === index ? -1 : index,
    );
  };

  if (!items.length) return null;

  return (
    <div
      className="
        grid
        w-full
        grid-cols-1
        items-start
        gap-4
        md:grid-cols-2
        md:gap-5
        xl:gap-6
      "
      data-aos="fade-up"
    >
      {items.map((item, index) => (
        <FAQItem
          key={item.id ?? item.question}
          item={item}
          index={index}
          isOpen={activeIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default memo(FAQRight);