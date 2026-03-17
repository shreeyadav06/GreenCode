package com.tracker.model;

import java.util.ArrayList;
import java.util.List;

public class Family {
    private String familyId;
    private String familyName;
    private List<Member> members;

    public Family() {
        this.members = new ArrayList<>();
    }

    public Family(String familyId, String familyName) {
        this.familyId = familyId;
        this.familyName = familyName;
        this.members = new ArrayList<>();
    }

    public String getFamilyId() { return familyId; }
    public void setFamilyId(String familyId) { this.familyId = familyId; }

    public String getFamilyName() { return familyName; }
    public void setFamilyName(String familyName) { this.familyName = familyName; }

    public List<Member> getMembers() { return members; }
    public void setMembers(List<Member> members) { this.members = members; }

    public void addMember(Member member) {
        this.members.add(member);
    }
}
