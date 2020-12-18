import React from 'react';
import { IGBusinessAccount } from '../../common/interfaces/IG-business-account.interface';

const InstagramBusinessAccountItem: React.FC<{ igBusinessAccount: IGBusinessAccount}> = ({ igBusinessAccount }: {igBusinessAccount: IGBusinessAccount}) => {
    return (
        <div className="instagramBusinessAccount">
            <p>{igBusinessAccount.id}</p>
            <p>{igBusinessAccount.ig_id}</p>
            <p>{igBusinessAccount.biography}</p>
            <p>{igBusinessAccount.followers_count}</p>
            <p>{igBusinessAccount.follows_count}</p>
            <p>{igBusinessAccount.media_count}</p>
            <p>{igBusinessAccount.name}</p>
            <img src={igBusinessAccount.profile_picture_url} alt=""/>
            <p>{igBusinessAccount.username}</p>
            <p>{igBusinessAccount.website}</p>
        </div>
    );
}

export default InstagramBusinessAccountItem;
