import axios from "axios";

export const facebookAPI = axios.create({
  baseURL: "https://graph.facebook.com/v9.0",
  responseType: "json",
});

export const getAllAccounts = async (accessToken: string): Promise<any> => {
  try {
    const requestURL = "/me/accounts?access_token=" + accessToken;
    let response = await facebookAPI.get(requestURL);
    return response;
  } catch (err) {
    console.log(
      `There is an error occurred while making request to FB Graph API - getAllAccounts: ${err}`
    );
  }
};

// Instagram Business Account
export const getInstagramBusinessAccount = async (
  pageID: string,
  accessToken: string
): Promise<any> => {
  try {
    const requestURL = `/${pageID}?fields=instagram_business_account&access_token=${accessToken}`;
    let response = await facebookAPI.get(requestURL);
    return response;
  } catch (err) {
    console.log(
      `There is an error occurred while making request to FB Graph API - getInstagramBusinessAccount ${err}`
    );
  }
};

export const getInstagramBusinessAccountData = async (
  instagramBusinessAccountID: string,
  accessToken: string
): Promise<any> => {
  try {
    const requestURL = `/${instagramBusinessAccountID}?fields=biography,id,ig_id,followers_count,follows_count,media_count,name,profile_picture_url,username,website&access_token=${accessToken}`;
    const response = await facebookAPI.get(requestURL);
    return response;
  } catch (err) {
    console.log(
      `There is an error occurred while making request to FB Graph API: ${err}`
    );
  }
};

export const getInstagramBusinessAccountMediaList = async (
  instagramBusinessAccountID: string,
  accessToken: string
): Promise<any> => {
  try {
    const requestURL = `/${instagramBusinessAccountID}?fields=media_count,media&access_token=${accessToken}`;
    const response = await facebookAPI.get(requestURL);
    return response;
  } catch (err) {
    console.log(
      `There is an error occurred while making request to FB Graph API: ${err}`
    );
  }
};

// Instagram Media  
export const getAllMedia = async (
  instagramBusinessAccountID: string,
  accessToken: string,
  media_count: number
): Promise<any> => {
  try {
    const requestURL = `/${instagramBusinessAccountID}/media?fields=caption,comments_count,id,like_count,media_type,media_url,permalink,username,timestamp&limit=${media_count}&access_token=${accessToken}`;
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

// Instagram Media Insights 

export const getMediaInsightsForPhoto = async (
  mediaID: string,
  accessToken: string
): Promise<any> => {
  try {
    const requestURL = `/${mediaID}/insights?metric=engagement,impressions,reach,saved&access_token=${accessToken}`;
    const response = await facebookAPI.get(requestURL);
    return response;
  } catch (err) {
    console.log(
      `There is an error occurred while making request to FB Graph API: ${err}`
    );
  }
};

export const getMediaInsightsForVideo = async (
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
