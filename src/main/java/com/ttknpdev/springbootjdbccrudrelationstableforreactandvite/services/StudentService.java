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
public class StudentService  implements RowCallbackHandler , RowMapper {
    private JdbcTemplate jdbcTemplate;
    private Logback logback;
    private List<Student> students;
    private Student student;

    @Autowired
    public StudentService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        logback = new Logback(StudentService.class);
        students = new ArrayList<>();
    }
    public List<Student> getAllStudentsJoinDepartment() {
        students.clear();
        // *** we call override method by <Class>::<Method>
        jdbcTemplate.query(Sql.READS_BOTH, this::processRow);
        return students;
    }

    // With NamedParameterJdbcTemplate
    public Student getStudentsJoinDepartment(String sid) {
        return (Student) jdbcTemplate.queryForObject(Sql.READ_BOTH_WHERE_PK, new Object[]{sid},this::mapRow);
    }

    public Boolean addStudent(Student student) {
        int row = jdbcTemplate.update(Sql.CREATE_STUDENT ,
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
        int row = jdbcTemplate.update(Sql.UPDATE_STUDENT ,
                student.getFirstname(),
                student.getLastname(),
                student.getAge(),
                student.getYear(),
                student.getPhone(),
                student.getDpmid(),
                sid
        );
        return row > 0;
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
