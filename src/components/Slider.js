import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Slide from "./Slide";

const data = [
  {
    id: 1,
    src: "https://assets.mspimages.in/wp-content/uploads/2021/06/pjimage-1.jpg",
    headline: "Discover the Future of Connectivity with Our IoT Devices",
    body: "This statement conveys a sense of innovation and excitement for what's to come. It suggests that the website is at the forefront of IoT technology, and that customers can expect to find cutting-edge devices that will keep them connected like never before.",
    cta: "Shop now",
    category: "laptop",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    headline: "Stay Connected Everywhere with Our High-Tech IoT Devices",
    body: "As a leading provider of IoT devices, we bring you the latest technology to keep you connected on-the-go. Whether you're looking for top-of-the-line options or budget-friendly choices, our range of IoT devices has got you covered. With advanced features tailored to enhance your mobile experience, you can now stay connected and up-to-date with ease.",
    cta: "Shop now",
    category: "smartphone",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1631281956016-3cdc1b2fe5fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
    headline: "Experience the Ultimate Convenience of Smart Living with Our Range of IoT Devices",
    body: "This statement emphasizes the convenience factor of IoT devices, positioning them as tools that can help customers streamline their lives and make everyday tasks easier. It suggests that the website offers a variety of devices that can help customers achieve a smarter, more efficient home.",
    cta: "Shop now",
    category: "smartwatch",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1600003263720-95b45a4035d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    headline: "Make Your Home Smarter and More Efficient with Our IoT Devices",
    body: "Similar to the previous statement, this one highlights the ways in which IoT devices can improve the functionality of a customer's home. By positioning these devices as tools for making a home 'smarter' and 'more efficient', the website is suggesting that customers can optimize their living space with the help of its products.",
    cta: "Shop now",
    category: "graphics card",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1526876798423-97e53fb23428?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    headline: "Make Every Day Easier and More Connected with Our Range of IoT Devices.",
    body: "This statement takes a similar approach to #2 and #3, emphasizing the convenience factor of IoT devices. By suggesting that its devices can make everyday tasks easier and more connected, the website is positioning its products as tools for improving customers' daily lives.",
    cta: "Shop now",
    category: "earbuds",
  },
];
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? data.length - 1 : (prevSlide) => prevSlide - 1
    );
  };
  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === data.length - 1 ? 0 : (prevSlide) => prevSlide + 1
    );
  };

  return (
    <div className="frame relative overflow-x-hidden">
      <div
        className="slider relative "
        style={{ transform: `translateX(-${100 * currentSlide}vw)` }}
      >
        {data.map((image) => (
          <Slide image={image} key={image.id} />
        ))}
      </div>
      <div className="btns absolute z-[1]  text-gray-50 bottom-[50%] w-screen ">
        <div className="flex  justify-between pr-5 pl-1 gap-10 ">
          <button
            onClick={prevSlide}
            className="backdrop-blur-xl bg-black bg-opacity-50 text-sky-50 px-4 py-7"
          >
            <span>
              <BsArrowLeft />
            </span>
          </button>

          <button
            onClick={nextSlide}
            className="backdrop-blur-xl bg-black bg-opacity-50 text-sky-50 px-4 py-5"
          >
            <span>
              <BsArrowRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
