package com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.controllers;

import com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.entities.Student;
import com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping(value = "/api")
public class StudentEndpoint {
    private StudentService studentService;

    @Autowired
    public StudentEndpoint(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping(value = "/students")
    private ResponseEntity<List<Student>> retrieveAll() {
        return ResponseEntity.status(201).body(studentService.getAllStudentsJoinDepartment());
    }

    @GetMapping(value = "/student")
    private ResponseEntity<Student> retrieveByPk(@Param("sid") String sid) {
        return ResponseEntity.status(201).body(studentService.getStudentsJoinDepartment(sid));
    }

    @PutMapping(value = "/student/edit")
    private ResponseEntity<Boolean> editByPk(@RequestBody Student student,@Param("sid") String sid) {
        return ResponseEntity.status(200).body(studentService.editStudent(student,sid));
    }
    @PostMapping(value = "/student/add")
    private ResponseEntity<Boolean> add(@RequestBody Student student) {
        return ResponseEntity.status(201).body(studentService.addStudent(student));
    }
}
