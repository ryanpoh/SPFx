import * as React from "react";
import * as ReactDOM from "react-dom";
import jsonp from "jsonp";
import { IRyanPhotogalleryProps } from "./IRyanPhotogalleryProps";
import { IRyanPhotogalleryState } from "./IRyanPhotogalleryState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISchema } from "../ISchema";
import PhotoGallery from "./PhotoGallery";
import axios from "../axios-license";
import { Message } from "semantic-ui-react";

require("../../../../node_modules/semantic-ui-css/semantic.min.css");

export default class RyanMessagebar extends React.Component<
  IRyanPhotogalleryProps,
  IRyanPhotogalleryState
> {
  constructor(props: IRyanPhotogalleryProps) {
    super(props);
    this.state = {
      spListData: [],
      isLicenseActive: "true",
      width: -1,
      // photos: null
      photos: [
        {
          src:
            "https://images.unsplash.com/photo-1578554819102-31469ee32b08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
          width: 4,
          height: 3
        },
        {
          src:
            "https://images.unsplash.com/photo-1578737823301-cab0c2c7916f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          width: 4,
          height: 3
        },
        {
          src:
            "https://images.unsplash.com/photo-1578857182382-c6f9c4dc5bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2767&q=80",
          width: 4,
          height: 3
        },
        {
          src:
            "https://images.unsplash.com/photo-1578776675365-60c467cdc11b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          width: 2,
          height: 3
        }
      ]
    };
    this.loadPhotos = this.loadPhotos.bind(this);
  }

  //? METHOD: FETCHING DATA FROM SHAREPOINT LIST VIA REST API.
  private getDataFromSPListDb(): Promise<ISchema[]> {
    return new Promise<ISchema[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('PhotoGalleryList')/items?$select=Id,Title,width,height`;
      this.props.spHttpClient
        .get(endpoint, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((jsonResponse: any) => {
          let listFromSPDb: ISchema[] = [];
          for (let index = 0; index < jsonResponse.value.length; index++) {
            //?  TO GET INDEX NAMES SEE THE COLUMN NAME USING WEBSITE URL. IT WILL NOT CHANGE EVEN WHEN YOU RENAME IT.
            listFromSPDb.push({
              id: jsonResponse.value[index].Id,
              src: jsonResponse.value[index].Title,
              width: jsonResponse.value[index].width,
              height: jsonResponse.value[index].height
            });
            resolve(listFromSPDb);
          }
        });
    });
  }

  //? GENERATE SAMPLE IMAGES USING FLICKR API
  loadPhotos() {
    // const urlParams = {
    //   api_key: "455b5e2fa6b951f9b9ab58a86d5e1f8a",
    //   photoset_id: "72157708141247864",
    //   user_id: "146659101@N08",
    //   format: "json",
    //   per_page: "120",
    //   extras: "url_m,url_c,url_l,url_h,url_o"
    // };
    // let url =
    //   "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos";
    // url = Object.keys(urlParams).reduce((acc, item) => {
    //   return acc + "&" + item + "=" + urlParams[item];
    // }, url);
    // jsonp(url, { name: "jsonFlickrApi" }, (err, data) => {
    //   let photos = data.photoset.photo.map(item => {
    //     // let aspectRatio = parseFloat(item.width_o / item.height_o);
    //     return {
    //       src: item.url_l,
    //       width: parseInt(item.width_o),
    //       height: parseInt(item.height_o),
    //       title: item.title,
    //       alt: item.title,
    //       key: item.id,
    //       srcSet: [
    //         `${item.url_m} ${item.width_m}w`,
    //         `${item.url_c} ${item.width_c}w`,
    //         `${item.url_l} ${item.width_l}w`,
    //         `${item.url_h} ${item.width_h}w`
    //       ],
    //       sizes: "(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw"
    //     };
    //   });
    //   this.setState({
    //     photos: this.state.photos ? this.state.photos.concat(photos) : photos
    //   });
    // });
  }

  checkLicenseActive = () => {
    const tenantUrl = this.props.siteCollectionUrl.split("/")[2];
    const getObject = theObject => {
      var result = null;
      if (theObject instanceof Array) {
        for (var i = 0; i < theObject.length; i++) {
          result = getObject(theObject[i]);
          if (result) {
            break;
          }
        }
      } else {
        for (var prop in theObject) {
          prop + ": " + theObject[prop];
          if (prop == "tenant") {
            if (theObject[prop] == tenantUrl) {
              return theObject;
            }
          }
          if (
            theObject[prop] instanceof Object ||
            theObject[prop] instanceof Array
          ) {
            result = getObject(theObject[prop]);
            if (result) {
              break;
            }
          }
        }
      }

      return result;
    };
    axios
      .get(`/tenants.json`)
      .then(res => {
        let targetObj = getObject(res.data);
        this.setState({
          isLicenseActive: targetObj.isLicenseActive
        });
      })
      .catch(error => console.log(error));
  };

  generateDemoData = () => {
    //? ONLY FOR GENERATING DEMO DATA FOR PS1 FILES
    this.state.spListData.map(data =>
      console.log(
        `Add-PnPListItem -List "MessagebarList" -Values @{
            "Title" =  "${data.src}"; 
            "width"=" ${data.width}";
            "height"=" ${data.height}";
          }`
      )
    );
  };

  public componentDidMount() {
    //? INITIAL FETCHING OF DATA INTO COMPONENT STATE
    this.checkLicenseActive();
    // this.loadPhotos();
    this.getDataFromSPListDb().then(listFromSPDb => {
      this.setState({ spListData: listFromSPDb });
    });
  }

  //? DYNAMIC UPDATING OF DATA INTO COMPONENT STATE EVERY 5 SECONDS
  public componentWillMount() {
    //? For this webpart we won't be using live SPList because it messes with animation
    setInterval(() => this.checkLicenseActive(), 7000);
    setInterval(
      () =>
        this.getDataFromSPListDb().then(listFromSPDb => {
          this.setState({ spListData: listFromSPDb });
        }),
      5000
    );
  }

  public render(): React.ReactElement<IRyanPhotogalleryProps> {
    if (this.state.photos) {
      const width = this.state.width;
      return (
        <React.Fragment>
          {this.state.isLicenseActive === "true" ? (
            // <PhotoGallery photos={this.state.photos.slice(65, 75)} />
            <PhotoGallery photos={this.state.spListData} />
          ) : (
            <Message negative>
              <Message.Header>
                We're sorry your SRKK tenant account has been deactivated.
              </Message.Header>
              <p>
                Your license has expired. Please contact us for more
                information.
              </p>
            </Message>
          )}
        </React.Fragment>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}
