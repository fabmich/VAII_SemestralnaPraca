package com.portal.utils;

import com.portal.ciselniky.Role;

import java.util.List;

public class RoleCheckerUtil {


    public static boolean checkRoles(List<String> prijateRole, List<Role> akceptovaneRole) {

        for (Role akceptovanaRole : akceptovaneRole) {
            if (prijateRole.contains(akceptovanaRole.name()) || prijateRole.contains(Role.ROLA_ADMIN.name())) {
                return true;
            }
        }
        return false;

    }
}
