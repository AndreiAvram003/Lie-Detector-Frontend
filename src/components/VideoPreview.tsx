import React, { useEffect, useState, useRef } from "react";

interface VideoPreviewProps {
  file: File;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ file }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <>
      
      <video
        ref={videoRef}
        src={URL.createObjectURL(file)}
        controls
        autoPlay={false}
        style={{
          width: "100%",
          borderRadius: "12px",
          display: "block"
        }}
      />
    </>
  );
};

export default VideoPreview;
