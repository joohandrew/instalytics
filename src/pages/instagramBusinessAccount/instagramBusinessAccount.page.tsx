import React from "react";
import facebookAPI from "../../common/utils/facebookAPI";

export const getAllMedia = async (
  instagramBusinessAccountID: string,
  accessToken: string
): Promise<any> => {
  try {
    const requestURL = `/${instagramBusinessAccountID}?fields=media_count,media&access_token=${accessToken}`;
    let response = await facebookAPI.get(requestURL);
    return response;
  } catch (err) {
    console.log(
      `There is an error occurred while making request to FB Graph API - getAllMedia: ${err}`
    );
  }
};

export const getMedia = async (
  mediaID: string,
  accessToken: string
): Promise<any> => {
  try {
    const requestURL = `/${mediaID}?fields=caption,comments_count,id,like_count,media_type,media_url,permalink,username,timestamp&access_token=${accessToken}`;
    let response = await facebookAPI.get(requestURL);
    return response;
  } catch (err) {
    console.log(
      `There is an error occurred while making request to FB Graph API - getInstagramBusinessAccount ${err}`
    );
  }
};

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

const InstagramBusinessAccount: React.FC = () => {
  return <div className="instagramBusinessAccount">HELLLLLLOOOOOOOOO</div>;
};

export default InstagramBusinessAccount;
