package com.tracker.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = TravelActivity.class, name = "travel"),
    @JsonSubTypes.Type(value = FoodActivity.class, name = "food"),
    @JsonSubTypes.Type(value = EnergyActivity.class, name = "energy")
})
public abstract class Activity {
        private String date;
    private String description;

    public Activity() {}

    public Activity(String date, String description) {
        this.date = date;
        this.description = description;
    }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public abstract double calculateCO2();
}
