import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
const LightBoxComponent = ({ open = false, slides, close = () => {} }) => {
  return (
    <Lightbox
      open={open}
      close={close}
      slides={slides}
      render={{
        slide: ({ slide }) =>
          slide.type === "pdf" ? <iframe src={slide?.src}></iframe> : undefined,
      }}
    />
  );
};

export default LightBoxComponent;
