import { access } from "fs";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import facebookAPI from "../../common/utils/facebookAPI";
import { instagramMedia } from "../../common/interfaces/InstagramMedia.interface";

export const getMediaInsightsForPhotoAndVideo = async (
  mediaID: string,
  accessToken: string
): Promise<any> => {
  try {
    const requestURL = `/${mediaID}/insights?metric=engagement,impressions,reach,saved,video_views&access_token=${accessToken}`;
    const response = await facebookAPI.get(requestURL);
    return response;
  } catch (err) {
    console.log(
      `There is an error occurred while making request to FB Graph API: ${err}`
    );
  }
};

export const getMediaInsightsForAlbum = async (
  mediaID: string,
  accessToken: string
): Promise<any> => {
  try {
    const requestURL = `/${mediaID}/insights?metric=carousel_album_engagement,carousel_album_impressions,carousel_album_reach,carousel_album_saved,carousel_album_video_views&access_token=${accessToken}`;
    const response = await facebookAPI.get(requestURL);
    return response;
  } catch (err) {
    console.log(
      `There is an error occurred while making request to FB Graph API: ${err}`
    );
  }
};

export const getMediaInsightsForStory = async (
  mediaID: string,
  accessToken: string
): Promise<any> => {
  try {
    const requestURL = `/${mediaID}/insights?metric=exits,impressions,reach,replies,taps_forward,taps_back&access_token=${accessToken}`;
    const response = await facebookAPI.get(requestURL);
    return response;
  } catch (err) {
    console.log(
      `There is an error occurred while making request to FB Graph API: ${err}`
    );
  }
};

const InstagramMedia: React.FC<{
  media: instagramMedia;
}> = ({ media }) => {
  return (
    <div className="instagramMedia">
      <img
          className="media_url"
          src={media.media_url}
          alt=""
        />
      {media.id}
      {media.like_count}
      {media.comments_count}
      {media.caption}
      {media.media_type}
      {media.media_url}
      {media.permalink}
      {media.timestamp}
      {media.username}
    </div>
  );
}

export default InstagramMedia;
