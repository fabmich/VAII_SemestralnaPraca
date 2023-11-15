#!/bin/bash

/opt/jboss/keycloak/bin/kcadm.sh config credentials --server http://localhost:8090/auth --realm master --user admin --password admin
/opt/jboss/keycloak/bin/kcadm.sh create realms -f ./realm-export.json