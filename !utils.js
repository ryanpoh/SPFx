objObj2arrObj = () => {
  const tenantUrl = this.props.siteCollectionUrl.split("/")[2];
  axios
    .get(`/tenants.json`)
    .then(res => {
      console.log("RESPONSE", res.data); //? Received Obj of Obj
      let arr = [];
      Object.keys(res.data).map(k => arr.push(res.data[k])); //? Extract object to put in array of object
      arr.forEach(obj => {
        if (obj.tenant === tenantUrl) {
          console.log("KEY FOUND:", obj.isLicenseActive);
          this.setState({
            isLicenseActive: obj.isLicenseActive
          });
        }
      });
    })
    .catch(error => console.log(error));
};

checkLicenseActive = () => {
  const tenantUrl = this.props.siteCollectionUrl.split("/")[2];
  axios
    .get(`/tenants.json`)
    .then(res => {
      console.log("RESPONSE", res.data); //? Received Obj of Obj
      Object.keys(res.data).map(k => {
        let obj = res.data[k];
        if (obj.tenant === tenantUrl) {
          console.log("KEY FOUND:", obj.isLicenseActive);
          this.setState({
            isLicenseActive: obj.isLicenseActive
          });
        }
      }); //? Extract object to put in array of object
    })
    .catch(error => console.log(error));
};

const iterateAllNestedPropsObj = theObject => {
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
