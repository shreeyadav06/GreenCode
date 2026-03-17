package com.tracker.model;

import java.util.ArrayList;
import java.util.List;

public class Member {
    private String name;
    private int age;
    private String role; // e.g., "Parent", "Child"
    private List<Activity> activities;

    public Member() {
        this.activities = new ArrayList<>();
    }

    public Member(String name, int age, String role) {
        this.name = name;
        this.age = age;
        this.role = role;
        this.activities = new ArrayList<>();
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public List<Activity> getActivities() { return activities; }
    public void setActivities(List<Activity> activities) { this.activities = activities; }

    public void addActivity(Activity activity) {
        this.activities.add(activity);
    }
}
