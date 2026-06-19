package com.tracker.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.tracker.config.FirebaseConfig;
import com.tracker.model.Activity;
import com.tracker.model.Family;
import com.tracker.model.FoodActivity;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public class FamilyService {
    private static final String DATA_FILE = "../data/sample_family.json";
    private static final String COLLECTION_NAME = "families";
    private static final String DOC_ID = "FAM-000";
    private final ObjectMapper mapper;
    private Family family;

    public FamilyService() {
        this.mapper = new ObjectMapper();
        loadData();
    }

    private void loadData() {
        try {
            Firestore db = FirebaseConfig.getFirestore();
            if (db != null) {
                DocumentReference docRef = db.collection(COLLECTION_NAME).document(DOC_ID);
                DocumentSnapshot document = docRef.get().get();
                if (document.exists()) {
                    Map<String, Object> data = document.getData();
                    this.family = mapper.convertValue(data, Family.class);
                    System.out.println("Loaded data from Firestore.");
                    return;
                }
            }
        } catch (Exception e) {
            System.err.println("Could not load from Firestore, falling back to local file: " + e.getMessage());
        }

        // Fallback to local file
        try {
            File file = new File(DATA_FILE);
            if (file.exists()) {
                this.family = mapper.readValue(file, Family.class);
                System.out.println("Loaded data from local file.");
                // Seed Firestore with this data so it's there next time
                try {
                    Firestore db = FirebaseConfig.getFirestore();
                    if (db != null) {
                        saveFamily();
                    }
                } catch (Exception e) {
                    // Ignore
                }
            } else {
                this.family = new Family(DOC_ID, "New Family");
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

        if (activity instanceof FoodActivity food && food.getQuantity() <= 0) {
            food.setQuantity(1);
        }

        family.getMembers().stream()
                .filter(m -> m.getName().equalsIgnoreCase(memberName))
                .findFirst()
                .ifPresent(m -> {
                    m.addActivity(activity);
                    saveFamily();
                });
    }

    public void saveFamily() {
        // Try saving to Firestore first
        try {
            Firestore db = FirebaseConfig.getFirestore();
            if (db != null) {
                Map<String, Object> data = mapper.convertValue(family, new TypeReference<Map<String, Object>>() {});
                db.collection(COLLECTION_NAME).document(DOC_ID).set(data).get();
                System.out.println("Saved data to Firestore.");
            }
        } catch (Exception e) {
            System.err.println("Could not save to Firestore: " + e.getMessage());
        }

        // Always save to local file as backup
        try {
            mapper.writeValue(new File(DATA_FILE), family);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
