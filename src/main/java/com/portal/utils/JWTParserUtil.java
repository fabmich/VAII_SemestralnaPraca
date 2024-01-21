package com.portal.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

import java.io.IOException;
import java.security.PublicKey;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.Base64;
import java.util.List;
import java.util.Map;


public class JWTParserUtil {


    public static List<String> ParseAndgetRoles(String token) {
        String tokenWithoutBearer = token.replaceFirst("Bearer\\s+", "");

        String[] chunks = tokenWithoutBearer.split("\\.");


        Base64.Decoder decoder = Base64.getUrlDecoder();
        String header = new String(decoder.decode(chunks[0]));
        String payload = new String(decoder.decode(chunks[1]));

        Map<String, Object> payloadMap = parseJson(payload);

        List<String> realmRoles = extractRealmRoles(payloadMap);

        return realmRoles;
    }
    private static Map<String, Object> parseJson(String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static List<String> extractRealmRoles(Map<String, Object> payloadMap) {
        Map<String, Object> realmAccess = (Map<String, Object>) payloadMap.get("realm_access");
        if (realmAccess != null) {
            return (List<String>) realmAccess.get("roles");
        }
        return null;
    }
}
