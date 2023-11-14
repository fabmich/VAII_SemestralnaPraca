import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://localhost:8090/auth",
    realm: "portal-realm",
    clientId: "fe-client"
});

export default keycloak;