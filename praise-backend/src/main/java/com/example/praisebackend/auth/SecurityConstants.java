package com.example.praisebackend.auth;

public class SecurityConstants {

        public static final String[] PUBLIC_URLS = {
                        "/api/auth/login",
                        "/api/auth/register",
                        "/api/auth/recoverPassword",
                        "/api/auth/resetPasssword"
        };

        public static final String[] ADMIN_URLS = {
                        "/api/admin/**"
        };

        public static final String[] BUYER_URLS = {
                        "/api/buyer/**"
        };

        public static final String[] SELLER_URLS = {
                        "/api/seller/**"
        };

        public static final String[] COMMON_URLS = {
                        "/api/user/**"
        };

        public static final String ADMIN_ROLE = "ADMIN";
        public static final String SELLER_ROLE = "SELLER";
        public static final String BUYER_ROLE = "BUYER";

}
