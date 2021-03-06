const { post, getAppToken, stringify, featureSetToGeoJSON } = require("../libs/utils");


let online_url = "https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/GeoEnrichment/enrich";
let portal_url = "https://doubledouble.eastus.cloudapp.azure.com/portal/sharing/servers/09570257519241ee83c7c147e51db607/rest/services/World/GeoenrichmentServer/Geoenrichment/enrich";


async function _enrichZips(zips, datacollections, clientId, clientSecret) {
    let sa = [{ "sourceCountry": "US", "layer": "US.ZIP5", "ids": zips }];
    let token = await getAppToken(clientId, clientSecret);
    let params = {
        f: "json",
        studyAreas: stringify(sa),
        analysisVariables: stringify(datacollections),
        suppressNullValues: false,
        useData: stringify({ "sourceCountry": "US" }),
        returnGeometry: true,
        token: token
    };
    let result = await post(online_url, params);
    try {
        var fset = result.results[0].value.FeatureSet[0];
        return featureSetToGeoJSON(fset);
    }
    catch (err) {
        return ({ "error": "Opps, error handling geoenrichment response." })
    }
}


module.exports = {
    enrichZips: function enrichZips(studyareas, datacollections, clientId, clientSecret) {
        return _enrichZips(studyareas, datacollections, clientId, clientSecret);
    }
}
