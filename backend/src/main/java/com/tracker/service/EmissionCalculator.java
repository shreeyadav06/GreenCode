package com.tracker.service;

import com.tracker.model.*;

import java.util.Map;

/**
 * Central engine for calculating CO2 emissions based on predefined factors.
 */
public class EmissionCalculator {

    // Predefined emission factors (kg CO2 per unit)
    private static final Map<String, Double> TRAVEL_FACTORS = Map.of(
        "car", 0.17,
        "bus", 0.10,
        "train", 0.04,
        "bike", 0.0
    );

    private static final Map<String, Double> FOOD_FACTORS = Map.of(
        "vegan", 1.5,
        "vegetarian", 2.0,
        "omnivore", 3.3
    );

    private static final Map<String, Double> ENERGY_FACTORS = Map.of(
        "grid", 0.45,
        "solar", 0.05
    );

    public static double calculate(Activity activity) {
        if (activity instanceof TravelActivity travel) {
            double factor = TRAVEL_FACTORS.getOrDefault(travel.getMode().toLowerCase(), 0.12);
            return travel.getDistance() * factor;
        } else if (activity instanceof FoodActivity food) {
            double factor = FOOD_FACTORS.getOrDefault(food.getMealType().toLowerCase(), 2.5);
            return food.getQuantity() * factor;
        } else if (activity instanceof EnergyActivity energy) {
            double factor = ENERGY_FACTORS.getOrDefault(energy.getEnergySource().toLowerCase(), 0.4);
            return energy.getKwh() * factor;
        }
        return 0.0;
    }

    public static double calculateMemberTotal(Member member) {
        return member.getActivities().stream()
                .mapToDouble(EmissionCalculator::calculate)
                .sum();
    }

    public static double calculateFamilyTotal(Family family) {
        return family.getMembers().stream()
                .mapToDouble(EmissionCalculator::calculateMemberTotal)
                .sum();
    }
}
