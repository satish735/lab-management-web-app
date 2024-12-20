
import React from "react";
import PropTypes from "prop-types";

const YoutubeComponent = ({ embedId }) => (
  <div className="video-responsive" >
    <iframe
      width="100%"
      height="280"
      src={`https://www.youtube.com/embed/${embedId}`}
    //   frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      style={{borderRadius:'10px'}}
    />
  </div>
);

YoutubeComponent.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeComponent;