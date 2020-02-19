# SPFx
### Quickstart

1. Go to any SPFX webpart directory. For this example, I'll be using `SPFXHeader`. 
<br></br>
`cd SPFXHeader`

2. Serve app using Terminal.
<br></br>
`gulp serve --nobrowser`

3. Then use your internet browser to visit your respective online workbench.
<br></br>
`https://<TENANT NAME>.sharepoint.com/sites/<SITEPAGE>/_layouts/15/workbench.aspx`

---

### SPFX Migration to LicenseDashboard 2.X.X

1. Copy code below and replace old codes in `axios-license.ts`

```javascript
import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://firestore.googleapis.com/v1/projects/srkklicense/databases/(default)/documents/"
});

export default instance;
```
2. Copy code below and replace old `checkLicenseActive()` method **only**. In this case, the method can be found in `RyanHeader.tsx`.   

```javascript
  checkLicenseActive = () => {
    const tenantUrl = this.props.siteCollectionUrl.split("/")[2];
    axios
      .get("/tenants")
      .then(res => {
        Object.keys(res.data.documents).map(k => {
          //? Object.keys returns an array of object keys
          let obj = res.data.documents[k];
          if (obj.fields.tenant.stringValue === tenantUrl) {
            console.log(
              "isLicenseActive",
              obj.fields.isLicenseActive.stringValue
            );
            this.setState({
              isLicenseActive: obj.fields.isLicenseActive.stringValue //? This is pretty pointless. It's more prepare for the future if using seperate database for key auth.
            });
          }
        }); //? Extract object to put in array of object
      })
      .catch(error => console.log(error));
  };
```

