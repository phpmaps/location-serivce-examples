# How to use:

Run
``` npm start ```

Run Dev
``` npm run dev ```

Deploy
``` npm run deploy ```

Example cURL ``` POST ``` request  to ``` /api/enrich/zips ```
```
curl 'https://location-services-kdoemvpk3.now.sh/api/enrich/zips' --data 'params={
  "postalCodes": [
    "92373",
    "92374"
  ],
  "collections": [
    "KeyGlobalFacts.*",
    "AGE.* "
  ],
  "clientId": "UziRXpkEKRl7ATU8",
  "clientSecret": "af50c2f5d915549aea6fd7e485b1e16e9"
}'

```

*go to [Esri's ArcGIS Developer Site](https://developers.arcgis.com/) and create a free account, to obtain a real clientId / clientSecret 