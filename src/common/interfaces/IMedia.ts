import { IMediaAlbumInsight } from "./IMediaAlbumInsight";
import { IMediaInsight } from "./IMediaInsight";

export interface IMedia {
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