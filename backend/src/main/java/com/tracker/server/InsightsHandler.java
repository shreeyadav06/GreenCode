package com.tracker.server;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.tracker.model.Family;
import com.tracker.model.Member;
import com.tracker.model.Activity;
import com.tracker.model.TravelActivity;
import com.tracker.model.FoodActivity;
import com.tracker.model.EnergyActivity;
import com.tracker.service.FamilyService;
import com.tracker.service.EmissionCalculator;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Comparator;

public class InsightsHandler implements HttpHandler {
    private final FamilyService familyService;
    private final ObjectMapper mapper;

    public InsightsHandler(FamilyService familyService) {
        this.familyService = familyService;
        this.mapper = new ObjectMapper();
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            Family family = familyService.getFamily();
            Map<String, Object> insights = new HashMap<>();

            // Calculate total OOP style
            double totalEmissions = family.getTotalEmissions();
            insights.put("totalEmissions", totalEmissions);

            // Category Breakdown using streams
            double travelEmissions = 0, foodEmissions = 0, energyEmissions = 0;
            for (Member m : family.getMembers()) {
                for (Activity a : m.getActivities()) {
                    double em = EmissionCalculator.calculate(a);
                    if (a instanceof TravelActivity)
                        travelEmissions += em;
                    else if (a instanceof FoodActivity)
                        foodEmissions += em;
                    else if (a instanceof EnergyActivity)
                        energyEmissions += em;
                }
            }
            Map<String, Double> breakdown = new HashMap<>();
            breakdown.put("travel", travelEmissions);
            breakdown.put("food", foodEmissions);
            breakdown.put("energy", energyEmissions);
            insights.put("categories", breakdown);

            // Highest Emitter
            Member highestEmitter = family.getMembers().stream()
                    .max(Comparator.comparingDouble(Member::getTotalEmissions))
                    .orElse(null);

            if (highestEmitter != null) {
                Map<String, Object> topMember = new HashMap<>();
                topMember.put("name", highestEmitter.getName());
                topMember.put("emissions", highestEmitter.getTotalEmissions());
                insights.put("topEmitter", topMember);
            }

            // Member breakdown
            List<Map<String, Object>> memberBreakdown = family.getMembers().stream().map(m -> {
                Map<String, Object> map = new HashMap<>();
                map.put("name", m.getName());
                map.put("emissions", m.getTotalEmissions());
                return map;
            }).toList();
            insights.put("memberBreakdown", memberBreakdown);

            String response = mapper.writeValueAsString(insights);

            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.getBytes().length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        } else {
            exchange.sendResponseHeaders(405, -1); // Method Not Allowed
        }
    }
}
