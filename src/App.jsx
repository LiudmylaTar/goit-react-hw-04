import { useState, CSSProperties, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { fetchGallery } from "./gallery-api";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import NotFoundMessage from "./components/NotFoundMessage/NotFoundMessage";
import Modal from "react-modal";
Modal.setAppElement("#root");

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [typeImg, setTypeImg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const searchImg = (inputValue) => {
    setTypeImg(inputValue);
    setCurrentPage(1);
    setImages([]);
  };

  const incrementPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (typeImg === "") {
      return;
    }
    async function getImages() {
      try {
        setIsError(false);
        setLoading(true);
        const data = await fetchGallery(typeImg, currentPage);
        setImages((prevImg) => [...prevImg, ...data.images]);
        setTotalPages(data.totalPages);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [typeImg, currentPage]);

  return (
    <>
      <SearchBar onSubmit={searchImg} />
      {isLoading && <Loader />}
      {isError && <p>Something went wrong, try again later</p>}
      {!isLoading && !isError && images.length === 0 && typeImg !== "" && (
        <NotFoundMessage
          text={`Try a different search — no results here "${typeImg}".`}
        />
      )}
      {images.length > 0 && <ImageGallery images={images} />}
      {images.length > 0 && !isLoading && currentPage !== totalPages && (
        <LoadMoreBtn changePage={incrementPage} />
      )}
    </>
  );
}

export default App;
