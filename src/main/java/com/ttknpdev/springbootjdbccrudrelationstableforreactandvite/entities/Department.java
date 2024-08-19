package com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.entities;
// one to many
public class Department {
    private String dpmid;
    private String department;

    public Department(String dpmid, String department) {
        this.dpmid = dpmid;
        this.department = department;
    }

    public String getDpmid() {
        return dpmid;
    }

    public void setDpmid(String dpmid) {
        this.dpmid = dpmid;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "Department{" +
                "dpmid='" + dpmid + '\'' +
                ", department='" + department + '\'' +
                '}';
    }
}
