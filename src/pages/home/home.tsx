import { useContext, useEffect, useState } from "react";
import { IInstagramBusinessAccount } from "../../common/interfaces/IInstagramBusinessAccount";
import {
  getAllAccounts,
  getInstagramBusinessAccountData,
  getInstagramBusinessAccount,
} from "../../common/utils/facebookAPI";
import InstagramBusinessAccountList from "../../components/instagramBusinessAccount/instagramBusinessAccountList";
import { useSessionContext } from "../../contexts/sessionContext";

const Home: React.FC = () => {
  const [sessionContext] = useSessionContext();
  const [loaded, setLoaded] = useState(false);
  const [
    instagramBusinessAccountArray,
    setInstagramBusinessAccountArray,
  ] = useState([] as IInstagramBusinessAccount[]);
  const accessToken = sessionContext.accessToken || ""

  useEffect(() => {
    async function loadContent() {
      const arrayOfInstagramBusinessAccounts: Array<IInstagramBusinessAccount> = await getAllPagesWithUser(
        accessToken
      );
      setLoaded(true);
      setInstagramBusinessAccountArray(arrayOfInstagramBusinessAccounts);
    }

    loadContent();
  }, []);

  return (
    <div className="home"> 
      <InstagramBusinessAccountList
        arrayOfInstagramBusinessAccounts={instagramBusinessAccountArray}
      />
    </div>
  );
};

const getAllPagesWithUser = async (accessToken: string): Promise<any> => {
  const getIGAccPromiseArray: any[] = [];
  const getIGAccInfoPromiseArray: any[] = [];

  let accounts = await getAllAccounts(accessToken);
  const listOfPages = accounts?.data?.data;
  for (let index = 0; index < listOfPages.length; index++) {
    const page: { id: string } = listOfPages[index];
    getIGAccPromiseArray.push(
      getInstagramBusinessAccount(page.id, accessToken)
    );
  }

  let getIGAccPromiseResults = await Promise.all(getIGAccPromiseArray);
  for (const response of getIGAccPromiseResults) {
    const igAcc: { id: string } = response?.data?.instagram_business_account;
    getIGAccInfoPromiseArray.push(getInstagramBusinessAccountData(igAcc.id, accessToken));
  }

  let getIGAccInfoPromiseResults = await Promise.all(getIGAccInfoPromiseArray);
  const arrayOfInstagramBusinessAccounts: Array<IInstagramBusinessAccount> = [];
  for (const response of getIGAccInfoPromiseResults) {
    let instagramBusinessAccount: IInstagramBusinessAccount = {
      id: response.data.id,
      ig_id: response.data.ig_id,
      biography: response.data.biography,
      followers_count: response.data.followers_count,
      follows_count: response.data.follows_count,
      media_count: response.data.media_count,
      name: response.data.name,
      profile_picture_url: response.data.profile_picture_url,
      username: response.data.username,
      website: response.data.website,
    };
    arrayOfInstagramBusinessAccounts.push(instagramBusinessAccount);
  }

  return arrayOfInstagramBusinessAccounts;
};

export default Home;
