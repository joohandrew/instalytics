import { Component } from "react";
import { IGBusinessAccount } from "../../common/interfaces/IG-business-account.interface";
import facebookAPI from "../../common/utils/facebookAPI";
import User from "../../components/user/user.component";
import InstagramBusinessAccountList from "../../components/instagramBusinessAccount/instagramBusinessAccountList.component";
interface HomeProps {
}

interface HomeState {
    isLoading: boolean,
    arrayOfInstagramBusinessAccounts: IGBusinessAccount[];
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      isLoading: true,
      arrayOfInstagramBusinessAccounts: []
    };
  }

  render() {
    return (
      <div className="home">
        <User />
        <InstagramBusinessAccountList arrayOfInstagramBusinessAccounts={this.state.arrayOfInstagramBusinessAccounts}/>
      </div>
    );
  }

  async componentDidMount() {
    const accessToken = localStorage.getItem("accessToken") || "";
    const arrayOfInstagramBusinessAccounts: Array<IGBusinessAccount> = await this.getAllPagesWithUser(accessToken);
    this.setState({
          isLoading: false,
          arrayOfInstagramBusinessAccounts: arrayOfInstagramBusinessAccounts,
        }
    );
  }

  getAllPagesWithUser = async (accessToken: string): Promise<any> => {
    const getIGAccPromiseArray: any[] = [];
    const getIGAccInfoPromiseArray: any[] = [];

    let accounts = await this.getAllAccounts(accessToken);
    const listOfPages = accounts?.data?.data;
      for (let index = 0; index < listOfPages.length; index++) {
        const page: { id: string } = listOfPages[index];
        getIGAccPromiseArray.push(this.getInstagramBusinessAccount(page.id, accessToken))
      }

    let getIGAccPromiseResults = await Promise.all(getIGAccPromiseArray);
    for (const response of getIGAccPromiseResults) {
        const igAcc: { id: string } = response?.data?.instagram_business_account;
        getIGAccInfoPromiseArray.push(this.getIGUserMetrics(igAcc.id, accessToken));
    }

    let getIGAccInfoPromiseResults = await Promise.all(getIGAccInfoPromiseArray);
    const arrayOfInstagramBusinessAccounts: Array<IGBusinessAccount> = [];
    for (const response of getIGAccInfoPromiseResults) {
        let instagramBusinessAccount: IGBusinessAccount = {
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

  getAllAccounts = async (accessToken: string): Promise<any> => {
    try {
      const requestURL = "/me/accounts?access_token=" + accessToken;
      let response = await facebookAPI.get(requestURL);
      return response;
    } catch (err) {
      console.log(
        `There is an error occurred while making request to FB Graph API - getAllAccounts: ${err}`
      );
    }
  };

  getInstagramBusinessAccount = async (
    pageID: string,
    accessToken: string
  ): Promise<any> => {
    try {
      const requestURL = `/${pageID}?fields=instagram_business_account&access_token=${accessToken}`;
      let response = await facebookAPI.get(requestURL);
      return response;
    } catch (err) {
      console.log(
        `There is an error occurred while making request to FB Graph API - getInstagramBusinessAccount ${err}`
      );
    }
  };

  getIGUserMetrics = async (
    instagramBusinessAccountID: string,
    accessToken: string
  ): Promise<any> => {
    try {
      const requestURL = `/${instagramBusinessAccountID}?fields=biography,id,ig_id,followers_count,follows_count,media_count,name,profile_picture_url,username,website&access_token=${accessToken}`;
      const response = await facebookAPI.get(requestURL);
      return response;
    } catch (err) {
      console.log(
        `There is an error occurred while making request to FB Graph API: ${err}`
      );
    }
  };
}

export default Home;
