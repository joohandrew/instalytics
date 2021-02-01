import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import facebookAPI from "../../common/utils/facebookAPI";
import InstagramMediaList from "../../components/instagramMedia/instagramMediaList.component";

const getAllMedia = async (
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

const getMedia = async (mediaID: string, accessToken: string): Promise<any> => {
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

const loadMediaForInstagramBusinessAccount = async (
  instagramBusinessAccountID: string,
  accessToken: string
): Promise<any> => {
  let getAllMedia_response = await getAllMedia(
    instagramBusinessAccountID,
    accessToken
  );
  const paging: IPaging = {
    after: getAllMedia_response.data.media.paging.cursors.after,
    before: getAllMedia_response.data.media.paging.cursors.before,
    next: getAllMedia_response.data.media.paging.next,
    previous: getAllMedia_response.data.media.paging.previous || "",
  };
  const mediaList: IMediaList = {
    media_count: getAllMedia_response.data.media_count,
    media_array: getAllMedia_response.data.media.data.map(
      (i: { id: string }) => i.id
    ),
    paging: paging,
  };

  const getMediaPromiseArray: any[] = [];
  mediaList.media_array.forEach((mediaID) => {
    getMediaPromiseArray.push(getMedia(mediaID, accessToken));
  });

  let getMediaPromiseArrayResults = await Promise.all(getMediaPromiseArray);
  let mediaArray: IMedia[] = [];
  for (const response of getMediaPromiseArrayResults) {
    let media: IMedia = {
      id: response.data.id,
      like_count: response.data.like_count,
      comments_count: response.data.comments_count,
      caption: response.data.caption,
      media_type: response.data.media_type,
      media_url: response.data.media_url,
      permalink: response.data.permalink,
      timestamp: response.data.timestamp,
      username: response.data.username,
    };
    mediaArray.push(media);
  }

  console.log(mediaArray);

  const getMediaInsightPromiseArray: any[] = [];
  mediaArray.forEach((media) => {
    switch (media.media_type) {
      case "IMAGE": {
        getMediaInsightPromiseArray.push(
          getMediaInsightsForPhoto(media.id, accessToken)
        );
        break;
      }
      case "VIDEO": {
        getMediaInsightPromiseArray.push(
          getMediaInsightsForVideo(media.id, accessToken)
        );
        break;
      }
      case "CAROUSEL_ALBUM": {
        getMediaInsightPromiseArray.push(
          getMediaInsightsForAlbum(media.id, accessToken)
        );
        break;
      }
      case "STORY": {
        getMediaInsightPromiseArray.push(
          getMediaInsightsForStory(media.id, accessToken)
        );
        break;
      }
      default: {
        break;
      }
    }
  });

  console.log(getMediaInsightPromiseArray);

  let getMediaInsightPromiseArrayResults = await Promise.all(
    getMediaInsightPromiseArray
  );
  let index = 0;
  for (const response of getMediaInsightPromiseArrayResults) {
    console.log(response);
    // let index = mediaArray.findIndex((i) => i.id === response.data.id);
    switch (mediaArray[index].media_type) {
      case "IMAGE": {
        let insight: IMediaInsight = {
          engagement: response.data.data[0].values[0].value,
          impressions: response.data.data[1].values[0].value,
          reach: response.data.data[2].values[0].value,
          saved: response.data.data[3].values[0].value,
        };
        mediaArray[index].insight = insight;
        break;
      }
      case "VIDEO": {
        let insight: IMediaInsight = {
          engagement: response.data.data[0].values[0].value,
          impressions: response.data.data[1].values[0].value,
          reach: response.data.data[2].values[0].value,
          saved: response.data.data[3].values[0].value,
          video_views: response.data.data[4].values[0].value,
        };
        mediaArray[index].insight = insight;
        break;
      }
      case "CAROUSEL_ALBUM": {
        let insight: IMediaAlbumInsight = {
          carousel_album_engagement: response.data.data[0].values[0].value,
          carousel_album_impressions: response.data.data[1].values[0].value,
          carousel_album_reach: response.data.data[2].values[0].value,
          carousel_album_saved: response.data.data[3].values[0].value,
          carousel_album_video_views: response.data.data[4].values[0].value,
        };
        mediaArray[index].albumInsight = insight;
        break;
      }
      case "STORY": {
        break;
      }
      default: {
        break;
      }
    }
    index += 1;
  }
  return mediaArray;
};

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

interface IInstagramBusinessAccountLocationState {
  id: string;
}

interface IPaging {
  after: string;
  before: string;
  next: string;
  previous: string;
}
interface IMediaList {
  media_count: number;
  media_array: string[];
  paging: IPaging;
}

interface IMedia {
  id: string;
  like_count: number;
  comments_count: number;
  caption: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  username: string;
  insight?: IMediaInsight;
  albumInsight?: IMediaAlbumInsight;
}

interface IMediaInsight {
  engagement: number;
  impressions: number;
  reach: number;
  saved: number;
  video_views?: number;
}

interface IMediaAlbumInsight {
  carousel_album_engagement: number;
  carousel_album_impressions: number;
  carousel_album_reach: number;
  carousel_album_saved: number;
  carousel_album_video_views: number;
}

const InstagramBusinessAccount: React.FC<RouteComponentProps> = (
  props: RouteComponentProps<
    {},
    any,
    IInstagramBusinessAccountLocationState | any
  >
) => {
  const [mounted, setMounted] = useState(false);
  const [mediaArray, setMediaArray] = useState([] as IMedia[]);

  useEffect(() => {
    // This is similar to componentDidMount
    // Call back-end api here.
    async function loadContent() {
      const accessToken = localStorage.getItem("accessToken") || "";
      const mediaArray = await loadMediaForInstagramBusinessAccount(
        props.location.state.id,
        accessToken
      );
      console.log(mediaArray);
      setMediaArray(mediaArray);
      setMounted(true);
    }

    loadContent();
  }, []);

  return (
    <div className="instagramBusinessAccount">
      <InstagramMediaList mediaArray={mediaArray} />
    </div>
  );
};

export default InstagramBusinessAccount;
