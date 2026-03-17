package com.tracker.model;

public class EnergyActivity extends Activity {
    private double kwh;
    private String energySource; // e.g., "grid", "solar"

    public EnergyActivity() {}

    public EnergyActivity(String date, String description, double kwh, String energySource) {
        super(date, description);
        this.kwh = kwh;
        this.energySource = energySource;
    }

    public double getKwh() { return kwh; }
    public void setKwh(double kwh) { this.kwh = kwh; }

    public String getEnergySource() { return energySource; }
    public void setEnergySource(String energySource) { this.energySource = energySource; }

    @Override
    public double calculateCO2() {
        // Mock calculation logic for v0.2
        double factor = energySource.equalsIgnoreCase("solar") ? 0.05 : 0.45;
        return kwh * factor;
    }
}
