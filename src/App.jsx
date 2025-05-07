import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";
import axios from "axios";
import ImageGallery from "./components/ImageGallery/ImageGallery";

const ACCESS_KEY = "vC_IV0ThH0s_ufETrBgaw59-mcOgxBtLqNUStBqmC_8";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const serchImg = async (inputValue) => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: inputValue,
            per_page: 9,
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );
      console.log("Отримано дані:", response.data.results);
      setImages(response.data.results);
    } catch (error) {}
  };
  return (
    <>
      <SearchBar onSubmit={serchImg} />
      {images.length > 0 && <ImageGallery images={images} />}
    </>
  );
}

export default App;
