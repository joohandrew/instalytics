import React from "react";
import { instagramMedia } from "../../common/interfaces/InstagramMedia.interface";
import InstagramMedia from "./instagramMedia.component";

interface InstagramMediaListProps {
  mediaArray: instagramMedia[];
}

const InstagramMediaList: React.FC<InstagramMediaListProps> = ({
  mediaArray
}) => {
  return (
    <div className="instagramMediaList">
      {mediaArray.map((media) => (
        <div key={media.id}>
          <InstagramMedia media={media} />
        </div>
      ))}
    </div>
  );
};

export default InstagramMediaList;