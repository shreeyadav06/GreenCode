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
        // Mock calculation logic for v0.2
        double factor = mealType.equalsIgnoreCase("vegan") ? 1.5 : 3.0;
        return quantity * factor;
    }
}
