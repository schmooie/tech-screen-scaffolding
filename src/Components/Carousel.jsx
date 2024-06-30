import { useEffect, useState } from "react";
import PropTypes, { string } from 'prop-types'

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: string,
    download_url: string
  }))
}

function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function updateIndex(offset = 1, goToIndex = false, index) {
    let nextIndex = goToIndex ? index : currentIndex + offset;

    if (nextIndex >= images.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = images.length - 1;
    }

    setCurrentIndex(nextIndex);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      updateIndex();
    }, 2500);

    return () => clearInterval(timer)
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between">
        <button onClick={() => updateIndex(-1)}>{'<'}</button>
        <div className="flex flex-nowrap overflow-hidden mx-2">
          {images.map(image => (
            <img
              key={image.id}
              src={image.download_url}
              className="flex w-full min-w-full carousel-item"
              style={{ transform: `translate(-${currentIndex * 100}%)` }}
            />
          ))}
        </div>
        <button onClick={() => updateIndex(1)}>{'>'}</button>
      </div>
      <div className="mt-3">
        {images.map((image, idx) => (
          <button onClick={() => updateIndex(0, true, idx)} key={image.id}>{idx + 1}</button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
