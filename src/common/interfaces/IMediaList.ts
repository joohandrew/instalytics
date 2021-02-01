import { IPaging } from "./IPaging";

export interface IMediaList {
    media_count: number;
    media_array: string[];
    paging: IPaging;
  }