package com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.controllers;

import com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.entities.Student;
import com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.*;

/**
 (VPS) My frontend have no port because i build frontend and deployed to apache server on linux => http://thitikorn-nupan.com
 (VPS) React App on Linux => http://thitikorn-nupan.com:5173
 (VPN) Linux => http://192.168.1.106
*/
@CrossOrigin({"http://192.168.1.106","http://localhost:5173","http://thitikorn-nupan.com:5173","http://thitikorn-nupan.com"})
@RestController
@RequestMapping(value = "/api")
public class StudentEndpoint {
    private final StudentService studentService;

    @Autowired
    public StudentEndpoint(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping(value = "/students")
    private ResponseEntity<List<Student>> retrieveAll() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentService.getAllStudentsJoinDepartment());
    }

    @GetMapping(value = "/students/pk")
    private ResponseEntity<List<Student>> retrieveAllOnlyPk() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentService.getStudentsOnlyPk());
    }

    @GetMapping(value = "/student")
    private ResponseEntity<Student> retrieveByPk(@Param("sid") String sid) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentService.getStudentsJoinDepartment(sid));
    }

    @PutMapping(value = "/student/edit")
    private ResponseEntity<Boolean> editByPk(@RequestBody Student student,@Param("sid") String sid) {
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(studentService.editStudent(student,sid));
    }

    @PostMapping(value = "/student/add")
    private ResponseEntity<Boolean> add(@RequestBody Student student) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(studentService.addStudent(student));
    }

    @DeleteMapping(value = "/student/delete")
    private ResponseEntity<Boolean> deleteByPk(@Param("sid") String sid) {
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(studentService.deleteStudent(sid));
    }

}
