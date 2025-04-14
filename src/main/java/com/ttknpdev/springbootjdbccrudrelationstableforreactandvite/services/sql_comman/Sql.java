package com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.services.sql_comman;

public class Sql {
    public static final String READS_ONLY_PK = "SELECT sid FROM students";
    public static final String READS_BOTH = "SELECT s.* ," +
            "d.* \n" +
            "FROM students AS s \n" +
            "JOIN departments AS d \n" +
            "ON d.dpmid = s.dpmid";
    public static final String READ_BOTH_WHERE_PK = "SELECT s.* ," +
            "d.* \n" +
            "FROM students AS s \n" +
            "JOIN departments AS d \n" +
            "ON d.dpmid = s.dpmid\n" +
            "WHERE s.sid = ?";
    public static final String CREATE_STUDENT = "INSERT INTO students(sid,firstname,lastname,age,dpmid,year,address,phone) VALUES (?,?,?,?,?,?,?,?)";
    public static final String UPDATE_STUDENT = "UPDATE students SET firstname = ? , lastname = ? ,age = ? , year = ?,phone = ? ,dpmid = ? , address = ? where sid = ?";
    public static final String DELETE_STUDENT = "DELETE FROM students WHERE sid = ?";
    public static final String DELETE_STUDENT_HOBBIES = "DELETE FROM students_hobbies WHERE sid = ?";
    public static final String DELETE_STUDENT_SUBJECTS = "DELETE FROM students_subjects WHERE sid = ?";
}
