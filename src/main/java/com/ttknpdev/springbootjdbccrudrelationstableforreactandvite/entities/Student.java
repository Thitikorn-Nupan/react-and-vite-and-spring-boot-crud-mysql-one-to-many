package com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.entities;
// many to one
public class Student {
    private String sid;
    private String firstname;
    private String lastname;
    private int age;
    private int year;
    private String address;
    private String phone;
    // for insert
    private String dpmid;
    // try to join
    private Department department;

    public Student(String sid, String firstname, String lastname, int age, int year, String address, String phone, String dpmid, Department department) {
        this.sid = sid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.year = year;
        this.address = address;
        this.phone = phone;
        this.dpmid = dpmid;
        this.department = department;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getDpmid() {
        return dpmid;
    }

    public void setDpmid(String dpmid) {
        this.dpmid = dpmid;
    }
}
