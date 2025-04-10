import { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      quote: "The only person you are destined to become is the person you decide to be.",
      person: "Arnold Schwarzenegger",
      title: "7-time Mr. Olympia, Actor, Former Governor"
    },
    {
      quote: "The difference between the impossible and the possible lies in determination.",
      person: "Dwayne 'The Rock' Johnson",
      title: "Actor, Former WWE Champion, Entrepreneur"
    },
    {
      quote: "Success is usually the culmination of controlling failure.",
      person: "Sylvester Stallone",
      title: "Actor, Screenwriter, Director"
    },
    {
      quote: "You have to think it before you can do it. The mind is what makes it all possible.",
      person: "Bruce Lee",
      title: "Martial Artist, Actor, Philosophy"
    },
    {
      quote: "The only way to define your limits is by going beyond them.",
      person: "Mike Tyson",
      title: "Former Heavyweight Boxing Champion"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Fitness <span>Inspiration</span></h2>
      
      <div className="carousel-wrapper">
        <div className="carousel-slide">
          <div className="slide-content">
            <div className="quote-section">
              <blockquote>
                "{slides[currentIndex].quote}"
              </blockquote>
              <div className="person-info">
                <h3>{slides[currentIndex].person}</h3>
                <p>{slides[currentIndex].title}</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          className="nav-button prev"
          onClick={goToPrevious}
        >
          ‹
        </button>
        <button 
          className="nav-button next"
          onClick={goToNext}
        >
          ›
        </button>

        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;