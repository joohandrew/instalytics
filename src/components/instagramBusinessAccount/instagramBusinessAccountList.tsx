// Components
import React from "react";
import { IInstagramBusinessAccount } from "../../common/interfaces/IInstagramBusinessAccount";
import InstagramBusinessAccountItem from "./instagramBusinessAccountItem";

interface InstagramBusinessAccountProps {
  arrayOfInstagramBusinessAccounts: IInstagramBusinessAccount[];
}

const InstagramBusinessAccountList: React.FC<InstagramBusinessAccountProps> = ({
  arrayOfInstagramBusinessAccounts,
}: InstagramBusinessAccountProps) => {
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
