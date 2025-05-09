import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { useState } from "react";
import ImageModal from "../ImageModal/ImageModal";
import { useToggle } from "../../hooks/useToggle";
import Loader from "../Loader/Loader";

const ImageGallery = ({ images }) => {
  const [isLoading, setLoading] = useState(false);
  const { isOpen, open, close } = useToggle();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setLoading(true);
    const img = new Image();
    img.src = image.urls.regular;

    img.onload = () => {
      setSelectedImage(image);
      setLoading(false);
      open();
    };

    img.onerror = () => {
      setLoading(false);
      alert("Failed to load image");
    };
  };
  return (
    <>
      <ul className={css.list}>
        {images.map((image) => (
          <li className={css.item} key={image.id}>
            <ImageCard image={image} onClick={handleImageClick} />
          </li>
        ))}
      </ul>
      {isLoading && (
        <div className={css.loaderWrapper}>
          <Loader />
        </div>
      )}
      {isOpen && (
        <ImageModal
          isOpen={isOpen}
          onRequestClose={close}
          image={selectedImage}
        />
      )}
    </>
  );
};
export default ImageGallery;
