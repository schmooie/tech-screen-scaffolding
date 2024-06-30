import { useEffect, useState } from 'react'
import './App.css'
import Carousel from './Components/Carousel'

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {

    async function fetchImages() {
      const response = await fetch('https://picsum.photos/v2/list');
      return await response.json();
    }

    fetchImages().then(images => setImages(images.slice(0, 5)));
  });

  return (
    <>
      <Carousel images={images} />
    </>
  )
}

export default App
