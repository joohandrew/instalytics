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
  getInstagramBusinessAccountMediaList,
  getMedia,
  getMediaInsightsForAlbum,
  getMediaInsightsForPhoto,
  getMediaInsightsForStory,
  getMediaInsightsForVideo,
} from "../../common/utils/facebookAPI";
import InstagramMediaList from "../../components/instagramMedia/instagramMediaList";
import { useSessionContext } from "../../contexts/sessionContext";
import BasicPagination from "../../components/pagination/basicPagination";

interface LocationState {
  instagramBusinessAccount : IInstagramBusinessAccount;
}

interface ICurrentPageMediaHash {
  [page: number]: IMedia[]
}

const InstagramBusinessAccount: React.FC = () => {
  const [sessionContext] = useSessionContext();
  const [mounted, setMounted] = useState(false);
  const [mediaArray, setMediaArray] = useState([] as IMedia[]);
  const [mediaList, setMediaList] = useState({} as IMediaList);
  const [currentPageMediaHash, setCurrentPageMediaHash] = useState({} as ICurrentPageMediaHash);
  const [page, setPage] = React.useState(1);
  const accessToken = sessionContext.accessToken || ""
  const location = useLocation<LocationState>();
  const pageSize = 12;

  const createCurrentPageMediaHash = (mediaArr: IMedia[]) => {
    let index = 0;
    let page = 1;
    let subMediaArray: IMedia[] = [];
    let hash: ICurrentPageMediaHash = {}
    mediaArr.forEach((element: IMedia) => {
      if (index === pageSize){
        hash[page] = subMediaArray
        subMediaArray = [];
        page++;
        index = 0;
      } 
      subMediaArray.push(element);
      index++;
    });
    hash[page] = subMediaArray;
    return hash;
  }

  const pageChangeHandler  = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    async function loadContent() {
      const mediaList = await getMediaList(
        location.state.instagramBusinessAccount.id,
        accessToken
      )
      setMediaList(mediaList);

      const mediaArray = await loadMediaForInstagramBusinessAccount(
        location.state.instagramBusinessAccount.id,
        accessToken,
        mediaList
      );
      setMediaArray(mediaArray);

      let mediaHash = createCurrentPageMediaHash(mediaArray);
      setCurrentPageMediaHash(mediaHash);

      setMounted(true);
    }

    loadContent();
  }, []);

  return (
    <div className="instagramBusinessAccount">
      { mounted && <InstagramMediaList mediaArray={currentPageMediaHash[page]} /> }
      { mounted && <BasicPagination pageCount={Math.ceil(mediaArray.length/pageSize)} pageChangeHandler={pageChangeHandler} /> }
    </div>
  );
};

const getMediaList =  async (
  instagramBusinessAccountID: string,
  accessToken: string
): Promise<any> => {
  let getInstagramBusinessAccountMediaList_response = await getInstagramBusinessAccountMediaList(
    instagramBusinessAccountID,
    accessToken
  );
  const paging: IPaging = {
    after: getInstagramBusinessAccountMediaList_response.data.media.paging.cursors.after,
    before: getInstagramBusinessAccountMediaList_response.data.media.paging.cursors.before,
    next: getInstagramBusinessAccountMediaList_response.data.media.paging.next,
    previous: getInstagramBusinessAccountMediaList_response.data.media.paging.previous || "",
  };
  const mediaList: IMediaList = {
    media_count: getInstagramBusinessAccountMediaList_response.data.media_count,
    media_array: getInstagramBusinessAccountMediaList_response.data.media.data.map(
      (i: { id: string }) => i.id
    ),
    paging: paging,
  };

  return mediaList
}

const loadMediaForInstagramBusinessAccount = async (
  instagramBusinessAccountID: string,
  accessToken: string,
  mediaList: IMediaList
): Promise<any> => {
  let getAllMedia_response = await getAllMedia(
    instagramBusinessAccountID,
    accessToken,
    mediaList.media_count
  );

  let mediaArray: IMedia[] = [];
  for (const response of getAllMedia_response.data.data) {
    let media: IMedia = {
      id: response.id,
      like_count: response.like_count,
      comments_count: response.comments_count,
      caption: response.caption,
      media_type: response.media_type,
      media_url: response.media_url,
      permalink: response.permalink,
      timestamp: response.timestamp,
      username: response.username,
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
  for (const response of getMediaInsightPromiseArrayResults) {
    if (response) {
      let id = getMediaIDFromInsightURL(response.config.url);
      let index = mediaArray.findIndex(i => i.id === id);
      switch (mediaArray[index].media_type) {
        case "IMAGE": {
          mediaArray[index].insight = populateMediaInsight(response.data.data);
          break;
        }
        case "VIDEO": {
          mediaArray[index].insight = populateMediaInsight(response.data.data);
          break;
        }
        case "CAROUSEL_ALBUM": {
          mediaArray[index].albumInsight = populateMediaAlbumInsight(response.data.data);
          break;
        }
        case "STORY": {
          break;
        }
        default: {
          break;
        }
      }
    }
  }
  return mediaArray;
};

const getMediaIDFromInsightURL = (url: string) => {
  return url.substring(1, url.lastIndexOf("/"));
}

const populateMediaInsight = (response: any) => {
  let insight: any = {};
  response.forEach((data: any) => {
    switch (data.title) {
      case "Engagement": {
        insight.engagement = data.values[0].value;
        break;
      }
      case "Impressions": {
        insight.impressions = data.values[0].value;
        break;
      }
      case "Reach": {
        insight.reach = data.values[0].value;
        break;
      }
      case "Saved": {
        insight.saved = data.values[0].value;
        break;
      }
      case "Video Views": {
        insight.video_views = data.values[0].value;
        break;
      }
      default: {
        break;
      }
    }
  })
  return insight as IMediaInsight;
}

const populateMediaAlbumInsight = (response: any) => {
  let insight: any = {};
  response.forEach((data: any) => {
    switch (data.title) {
      case "Carousel Album Engagement": {
        insight.carousel_album_engagement = data.values[0].value;
        break;
      }
      case "Carousel Album Impressions": {
        insight.carousel_album_impressions = data.values[0].value;
        break;
      }
      case "Carousel Album Reach": {
        insight.carousel_album_reach = data.values[0].value;
        break;
      }
      case "Carousel Album Saved": {
        insight.carousel_album_saved = data.values[0].value;
        break;
      }
      case "Carousel Album Video Views": {
        insight.carousel_album_video_views = data.values[0].value;
        break;
      }
      default: {
        break;
      }
    }
  })
  return insight as IMediaAlbumInsight;
}

export default InstagramBusinessAccount;
