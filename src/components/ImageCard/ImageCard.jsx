const ImageCard = ({ image }) => {
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        width="300"
        height="200"
      />
    </div>
  );
};
export default ImageCard;
