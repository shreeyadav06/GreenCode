package com.tracker.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tracker.model.Activity;
import com.tracker.model.Family;

import java.io.File;
import java.io.IOException;

public class FamilyService {
    private static final String DATA_FILE = "../data/sample_family.json";
    private final ObjectMapper mapper;
    private Family family;

    public FamilyService() {
        this.mapper = new ObjectMapper();
        loadData();
    }

    private void loadData() {
        try {
            File file = new File(DATA_FILE);
            if (file.exists()) {
                this.family = mapper.readValue(file, Family.class);
            } else {
                this.family = new Family("FAM-000", "New Family");
            }
        } catch (IOException e) {
            e.printStackTrace();
            this.family = new Family("FAM-ERR", "Error Family");
        }
    }

    public Family getFamily() {
        return family;
    }

    public void addMember(com.tracker.model.Member member) {
        if (family == null) return;
        family.addMember(member);
        saveFamily();
    }

    public void addMemberActivity(String memberName, Activity activity) {
        if (family == null) return;
        family.getMembers().stream()
                .filter(m -> m.getName().equalsIgnoreCase(memberName))
                .findFirst()
                .ifPresent(m -> {
                    m.addActivity(activity);
                    saveFamily();
                });
    }

    public void saveFamily() {
        try {
            mapper.writeValue(new File(DATA_FILE), family);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
