package com.example.praisebackend.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.example.praisebackend.models.auditLog.RequestSellerDataLog;

public class LogDataExtractor {
    private static final Pattern REQUEST_SELLER_DATA_LOG_PATTERN = Pattern.compile(
            "User with ID (\\d+) has requested data for Seller with ID (\\d+), related to Product with ID (\\d+)");

    public static RequestSellerDataLog extractRequestSellerDataFromLog(String logDescription) {
        Matcher matcher = REQUEST_SELLER_DATA_LOG_PATTERN.matcher(logDescription);
        if (matcher.find()) {
            Long userId = Long.parseLong(matcher.group(1));
            Long sellerId = Long.parseLong(matcher.group(2));
            Long productId = Long.parseLong(matcher.group(3));
            return new RequestSellerDataLog(userId, sellerId, productId);
        }
        throw new IllegalArgumentException("Invalid log description format");
    }
}
