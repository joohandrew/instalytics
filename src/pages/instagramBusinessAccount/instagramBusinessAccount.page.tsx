import { access } from "fs";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import facebookAPI from "../../common/utils/facebookAPI";
import InstagramMediaList from "../../components/instagramMedia/instagramMediaList.component";

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


export const loadMediaForInstagramBusinessAccount = async (instagramBusinessAccountID: string, accessToken: string): Promise<any> => {
  let getAllMedia_response = await getAllMedia(instagramBusinessAccountID, accessToken);
  const paging: IPaging = {
    after: getAllMedia_response.data.media.paging.cursors.after,
    before: getAllMedia_response.data.media.paging.cursors.before, 
    next: getAllMedia_response.data.media.paging.next
  }
  const mediaList: IMediaList = {
    media_count: getAllMedia_response.data.media_count,
    media_array: getAllMedia_response.data.media.data.map((i: { id: string }) => i.id),
    paging: paging,
  }

  const getMediaPromiseArray: any[] = [];
  mediaList.media_array.forEach((mediaID) =>{
    getMediaPromiseArray.push(
      getMedia(mediaID, accessToken)
    );
  })

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
    }
    mediaArray.push(media);
  }
  
  return mediaArray;
};

interface IInstagramBusinessAccountLocationState {
  id: string;
}

interface IPaging {
  after: string; 
  before: string; 
  next: string;
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
}

const InstagramBusinessAccount: React.FC<RouteComponentProps> = (props: RouteComponentProps<{}, any, IInstagramBusinessAccountLocationState | any>
  ) => {
  const [mounted, setMounted] = useState(false)
  const [mediaArray, setMediaArray] = useState([] as IMedia[]);

  useEffect(() =>{
    // This is similar to componentDidMount
    // Call back-end api here.
    async function loadContent() {
      const accessToken = localStorage.getItem("accessToken") || "";
      const mediaArray = await loadMediaForInstagramBusinessAccount(
        props.location.state.id,
        accessToken
      );
      setMediaArray(mediaArray);   
      setMounted(true);
    }

    loadContent();
  },[])
  
  return ( 
    <div className="instagramBusinessAccount">
      {props.location.state.id}
      <InstagramMediaList
          mediaArray={
            mediaArray
          }
        />
    </div>
  ) 
};

export default InstagramBusinessAccount;
