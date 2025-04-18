import React, { useState } from "react";
import {
  ArrowDownToLineIcon,
  Heart,
  ScanFace,
  Share2,
  ShoppingCart,
  Upload,
  X,
  ArrowLeftCircle,
  ArrowRightCircle,
  RotateCw,
  FlipVertical,
} from "lucide-react";
import { useSelector } from "react-redux";

const ClientPhotosView = ({ setWhichView }) => {
  const { layout, spacing, thumbnail, background } = useSelector(
    (state) => state.galleryLayout
  );

  const adminSettings = {
    spacing: spacing || "large",
    layout: layout || "vertical",
    thumbnail: thumbnail || "large",
    background: background || "dark",
  };

  const [modalImage, setModalImage] = useState(null);
  const [rotation, setRotation] = useState(0); // rotation state
  const [flip, setFlip] = useState(false); // flip state
  const [isSlideshow, setIsSlideshow] = useState(false); // slideshow on/off state
  const [slideshowInterval, setSlideshowInterval] = useState(null); // to store interval id
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // to track the current image in slideshow

  const bgClass =
    adminSettings.background === "dark"
      ? "bg-gray-900 text-white"
      : "bg-gray-100 text-gray-900";

  const sampleImages = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/${i}/800/600`,
  }));

  const spacingClasses = {
    small: "gap-2",
    regular: "gap-4",
    large: "gap-6",
  };

  const layoutClasses = {
    vertical: "columns-1 sm:columns-2 md:columns-3", // Masonry-style
    horizontal: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4", // Regular grid
  };

  const thumbSizeClasses = {
    small: "h-32",
    regular: "h-48",
    large: "h-64",
  };

  const closeModal = () => setModalImage(null);

  const goBack = () => {
    // Trigger setWhichView with the previous view, assuming "photos" is the main view
    setWhichView("");
  };

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % sampleImages.length;
    setCurrentImageIndex(nextIndex);
    setModalImage(sampleImages[nextIndex].url);
  };

  const handlePreviousImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + sampleImages.length) % sampleImages.length;
    setCurrentImageIndex(prevIndex);
    setModalImage(sampleImages[prevIndex].url);
  };

  const toggleSlideshow = () => {
    if (isSlideshow) {
      clearInterval(slideshowInterval);
      setSlideshowInterval(null);
    } else {
      const interval = setInterval(handleNextImage, 3000); // Change image every 3 seconds
      setSlideshowInterval(interval);
    }
    setIsSlideshow(!isSlideshow);
  };

  const rotateImage = (e) => {
    e.stopPropagation(); // Prevent the modal close when clicking on the rotate button
    setRotation((prev) => prev + 90);
  };

  const flipImage = (e) => {
    e.stopPropagation(); // Prevent the modal close when clicking on the flip button
    setFlip((prev) => !prev);
  };

  return (
    <div className={`${bgClass} min-h-screen w-full py-6`}>
      <div className="max-w-[95%] mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-white border rounded shadow hover:bg-gray-200 transition mb-4"
        >
          <span className="text-black">&larr; Back</span>
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">RAHUL</h2>
            <p className="text-sm text-gray-500">dyhrf</p>
          </div>
          <div className="flex flex-wrap gap-3 text-black">
            {[
              { icon: <ScanFace className="w-5 h-5" />, label: "Face Search" },
              { icon: <Heart className="w-5 h-5" />, label: "Favourites" },
              { icon: <Upload className="w-5 h-5" /> },
              { icon: <ShoppingCart className="w-5 h-5" /> },
              { icon: <Share2 className="w-5 h-5" /> },
              { icon: <ArrowDownToLineIcon className="w-5 h-5" /> },
            ].map((btn, index) => (
              <button
                key={index}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-white border rounded shadow hover:bg-gray-200 transition"
              >
                {btn.icon}
                {btn.label && <span>{btn.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Highlights Title */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-semibold">Highlights</h3>
        </div>

        {/* Image Gallery */}
        <div
          className={`${layoutClasses[adminSettings.layout]} ${
            spacingClasses[adminSettings.spacing]
          }`}
        >
          {sampleImages.map((img) => (
            <div
              key={img.id}
              className={`mb-4 ${
                adminSettings.layout === "vertical" ? "break-inside-avoid" : ""
              } rounded overflow-hidden bg-white shadow hover:shadow-lg transition duration-300 cursor-pointer`}
              onClick={() => {
                setModalImage(img.url);
                setCurrentImageIndex(img.id);
              }}
            >
              <img
                src={img.url}
                alt={`sample-${img.id}`}
                className={`w-full object-cover ${
                  thumbSizeClasses[adminSettings.thumbnail]
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center transition duration-300"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full px-4">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-80"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Display */}
            <div
              className={`relative mx-auto rounded transition-transform duration-300 ease-in-out ${
                flip ? "scale-x-[-1]" : ""
              }`}
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <img
                src={modalImage}
                alt="Full view"
                className="w-full max-h-[90vh] object-contain mx-auto"
                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking on image
              />
            </div>

            {/* Icon Buttons */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={rotateImage}
                className="p-2 bg-white text-black rounded-full shadow hover:bg-gray-200"
              >
                <RotateCw className="w-6 h-6" />
              </button>
              <button
                onClick={flipImage}
                className="p-2 bg-white text-black rounded-full shadow hover:bg-gray-200"
              >
                <FlipVertical className="w-6 h-6" />
              </button>
              <button
                onClick={toggleSlideshow}
                className="p-2 bg-white text-black rounded-full shadow hover:bg-gray-200"
              >
                {isSlideshow ? "Stop" : "Start"} Slideshow
              </button>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <button
                onClick={handlePreviousImage}
                className="p-3 bg-white text-black rounded-full shadow hover:bg-gray-200"
              >
                <ArrowLeftCircle className="w-8 h-8" />
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <button
                onClick={handleNextImage}
                className="p-3 bg-white text-black rounded-full shadow hover:bg-gray-200"
              >
                <ArrowRightCircle className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPhotosView;
