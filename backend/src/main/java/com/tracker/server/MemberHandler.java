package com.tracker.server;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.tracker.model.Member;
import com.tracker.service.FamilyService;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;

public class MemberHandler implements HttpHandler {
    private final FamilyService familyService;
    private final ObjectMapper mapper;

    public MemberHandler(FamilyService familyService) {
        this.familyService = familyService;
        this.mapper = new ObjectMapper();
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        // Simple CORS
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "POST, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            try {
                // Expected format: { "name": "...", "age": 25, "role": "..." }
                Member newMember = mapper.readValue(exchange.getRequestBody(), Member.class);
                
                // Initialize empty activities list if not present
                if (newMember.getActivities() == null) {
                    newMember.setActivities(new ArrayList<>());
                }

                familyService.addMember(newMember);
                
                String response = "{\"status\":\"success\"}";
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, response.getBytes().length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response.getBytes());
                }
            } catch (Exception e) {
                e.printStackTrace();
                String response = "{\"status\":\"error\", \"message\":\"" + e.getMessage() + "\"}";
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(400, response.getBytes().length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response.getBytes());
                }
            }
        }
        else {
            exchange.sendResponseHeaders(405, -1);
        }
    }
}
