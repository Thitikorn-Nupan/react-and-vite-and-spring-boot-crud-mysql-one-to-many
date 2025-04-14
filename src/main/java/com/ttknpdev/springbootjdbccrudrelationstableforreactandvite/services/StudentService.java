package com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.services;

import com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.entities.Department;
import com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.entities.Student;
import com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.log.Logback;
import com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.services.sql_comman.Sql;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService implements RowCallbackHandler, RowMapper {

    private List<Student> students;
    private final JdbcTemplate jdbcTemplate;
    private final Logback logback;

    @Autowired
    public StudentService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        logback = new Logback(StudentService.class);
        students = new ArrayList<>();
    }

    public List<Student> getStudentsOnlyPk() {
        List<Student> studentsOnlyPk = new ArrayList<>();
        jdbcTemplate.query(Sql.READS_ONLY_PK, ( (rs, rid) -> mapRowOnlyPk(rs,rid,studentsOnlyPk) ) ); // after ended this row studentsOnlyPk will change
        return studentsOnlyPk;
    }

    public List<Student> getAllStudentsJoinDepartment() {
        students.clear();
        jdbcTemplate.query(Sql.READS_BOTH, this::processRow); // *** we call override method by <Class>::<Method>
        return students;
    }

    // With NamedParameterJdbcTemplate
    public Student getStudentsJoinDepartment(String sid) {
        return (Student) jdbcTemplate.queryForObject(Sql.READ_BOTH_WHERE_PK, new Object[]{sid}, this::mapRow);
    }

    public Boolean addStudent(Student student) {
        int row = jdbcTemplate.update(Sql.CREATE_STUDENT,
                student.getSid(),
                student.getFirstname(),
                student.getLastname(),
                student.getAge(),
                student.getDpmid(),
                student.getYear(),
                student.getAddress(),
                student.getPhone()
        );
        return row > 0;
    }

    public Boolean editStudent(Student student, String sid) {
        int row = jdbcTemplate.update(Sql.UPDATE_STUDENT,
                student.getFirstname(),
                student.getLastname(),
                student.getAge(),
                student.getYear(),
                student.getPhone(),
                student.getDpmid(),
                student.getAddress(),
                sid
        );
        return row > 0;
    }

    public Boolean deleteStudent(String sid) {
        jdbcTemplate.update(Sql.DELETE_STUDENT_HOBBIES, sid);
        jdbcTemplate.update(Sql.DELETE_STUDENT_SUBJECTS, sid);
        int row = jdbcTemplate.update(Sql.DELETE_STUDENT, sid);
        return row > 0;
    }

    private Object mapRowOnlyPk(ResultSet rs, int rowNum,List<Student> studentsOnlyPk) throws SQLException {
        Student std = new Student(
                rs.getString("sid"),
                null,
                null,
                0,
                0,
                null,
                null,
                null,
                null
        );
        studentsOnlyPk.add(std);
        return studentsOnlyPk;
    }

    @Override
    public void processRow(ResultSet rs) throws SQLException {
        Student student = new Student(
                rs.getString("sid"),
                rs.getString("firstname"),
                rs.getString("lastname"),
                rs.getInt("age"),
                rs.getInt("year"),
                rs.getString("address"),
                rs.getString("phone"),
                rs.getString("dpmid"),
                new Department(
                        rs.getString("dpmid"),
                        rs.getString("department")
                )
        );
        students.add(student);
    }


    @Override
    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Student(
                rs.getString("sid"),
                rs.getString("firstname"),
                rs.getString("lastname"),
                rs.getInt("age"),
                rs.getInt("year"),
                rs.getString("address"),
                rs.getString("phone"),
                rs.getString("dpmid"),
                new Department(
                        rs.getString("dpmid"),
                        rs.getString("department")
                )
        );
    }
}
