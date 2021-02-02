import React, { useEffect, useState } from "react";
import { Location } from "history";
import { RouteComponentProps, useLocation } from "react-router-dom";
import { IInstagramBusinessAccount } from "../../common/interfaces/IInstagramBusinessAccount";
import { IMedia } from "../../common/interfaces/IMedia";
import { IMediaAlbumInsight } from "../../common/interfaces/IMediaAlbumInsight";
import { IMediaInsight } from "../../common/interfaces/IMediaInsight";
import { IMediaList } from "../../common/interfaces/IMediaList";
import { IPaging } from "../../common/interfaces/IPaging";
import {
  getAllMedia,
  getMedia,
  getMediaInsightsForAlbum,
  getMediaInsightsForPhoto,
  getMediaInsightsForStory,
  getMediaInsightsForVideo,
} from "../../common/utils/facebookAPI";
import InstagramMediaList from "../../components/instagramMedia/instagramMediaList";
import { useSessionContext } from "../../contexts/sessionContext";

interface LocationState {
  instagramBusinessAccount : IInstagramBusinessAccount;
}

const InstagramBusinessAccount: React.FC = () => {
  const [sessionContext] = useSessionContext();
  const [mounted, setMounted] = useState(false);
  const [mediaArray, setMediaArray] = useState([] as IMedia[]);
  const accessToken = sessionContext.accessToken || ""
  const location = useLocation<LocationState>();

  useEffect(() => {
    async function loadContent() {
      const mediaArray = await loadMediaForInstagramBusinessAccount(
        location.state.instagramBusinessAccount.id,
        accessToken
      );
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

  let getMediaInsightPromiseArrayResults = await Promise.all(
    getMediaInsightPromiseArray
  );
  let index = 0;
  for (const response of getMediaInsightPromiseArrayResults) {
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

export default InstagramBusinessAccount;
