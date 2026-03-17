package com.tracker.model;

public class TravelActivity extends Activity {
    private double distance; // in km
    private String mode; // e.g., "car", "bus", "train"

    public TravelActivity() {}

    public TravelActivity(String date, String description, double distance, String mode) {
        super(date, description);
        this.distance = distance;
        this.mode = mode;
    }

    public double getDistance() { return distance; }
    public void setDistance(double distance) { this.distance = distance; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    @Override
    public double calculateCO2() {
        // Mock calculation logic for v0.2
        return distance * 0.15; 
    }
}
