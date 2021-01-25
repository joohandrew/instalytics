import React from "react";
import { IGBusinessAccount } from "../../common/interfaces/IG-business-account.interface";
import InstagramBusinessAccountItem from "./instagramBusinessAccountItem.component";

interface IGBusinessAccountProps {
  arrayOfInstagramBusinessAccounts: IGBusinessAccount[];
}

const InstagramBusinessAccountList: React.FC<IGBusinessAccountProps> = ({
  arrayOfInstagramBusinessAccounts,
}: IGBusinessAccountProps) => {
  return (
    <div className="instagramBusinessAccountList">
      {arrayOfInstagramBusinessAccounts.map((igAcc) => (
        <div key={igAcc.id}>
          <InstagramBusinessAccountItem igBusinessAccount={igAcc} />
        </div>
      ))}
    </div>
  );
};

export default InstagramBusinessAccountList;
