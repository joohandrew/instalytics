export interface instagramMedia {
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
export interface IMediaInsight {
    engagement: number;
    impressions: number;
    reach: number;
    saved: number;
    video_views?: number;
}
export interface IMediaAlbumInsight {
    carousel_album_engagement: number;
    carousel_album_impressions: number;
    carousel_album_reach: number;
    carousel_album_saved: number;
    carousel_album_video_views: number;
}