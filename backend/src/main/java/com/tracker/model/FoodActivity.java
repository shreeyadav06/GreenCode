package com.tracker.model;

public class FoodActivity extends Activity {
    private String mealType; // e.g., "vegan", "vegetarian", "omnivore"
    private int quantity; // number of meals

    public FoodActivity() {}

    public FoodActivity(String date, String description, String mealType, int quantity) {
        super(date, description);
        this.mealType = mealType;
        this.quantity = quantity;
    }

    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    @Override
    public double calculateCO2() {
        // Keep this method aligned with EmissionCalculator fallbacks.
        String normalizedMealType = mealType == null ? "omnivore" : mealType.toLowerCase();
        double factor;
        switch (normalizedMealType) {
            case "vegan":
                factor = 1.5;
                break;
            case "vegetarian":
                factor = 2.0;
                break;
            default:
                factor = 3.3;
                break;
        }
        return Math.max(1, quantity) * factor;
    }
}
