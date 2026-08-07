package com.ttknpdev.springbootjdbccrudrelationstableforreactandvite;

import com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.controllers.StudentEndpoint;
import com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.entities.Department;
import com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.entities.Student;
import com.ttknpdev.springbootjdbccrudrelationstableforreactandvite.services.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentEndpointTest {

    @Mock
    private StudentService studentService;

    private StudentEndpoint endpoint;

    @BeforeEach
    void setUp() {
        endpoint = new StudentEndpoint(studentService);
    }

    // Helper to call private controller methods
    private Object invoke(String name, Class<?>[] paramTypes, Object... args) throws Exception {
        Method m = StudentEndpoint.class.getDeclaredMethod(name, paramTypes);
        m.setAccessible(true);
        return m.invoke(endpoint, args);
    }

    @Test
    void retrieveAll_returnsListAndOk() throws Exception {
        List<Student> expected = Arrays.asList(new Student("S1","John","Doe",20,2,"addr","phone","D1",new Department("D1","CS")));
        when(studentService.getAllStudentsJoinDepartment()).thenReturn(expected);

        ResponseEntity<?> resp = (ResponseEntity<?>) invoke("retrieveAll", new Class<?>[0]);

        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertSame(expected, resp.getBody());
        verify(studentService, times(1)).getAllStudentsJoinDepartment();
    }

    @Test
    void retrieveAllOnlyPk_returnsListAndOk() throws Exception {
        List<Student> expected = Arrays.asList(new Student("S2",null,null,0,0,null,null,null,null));
        when(studentService.getStudentsOnlyPk()).thenReturn(expected);

        ResponseEntity<?> resp = (ResponseEntity<?>) invoke("retrieveAllOnlyPk", new Class<?>[0]);

        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertSame(expected, resp.getBody());
        verify(studentService, times(1)).getStudentsOnlyPk();
    }

    @Test
    void retrieveByPk_returnsStudentAndOk() throws Exception {
        Student expected = new Student("S3","A","B",21,3,"a","p","D2",new Department("D2","EE"));
        when(studentService.getStudentsJoinDepartment("S3")).thenReturn(expected);

        ResponseEntity<?> resp = (ResponseEntity<?>) invoke("retrieveByPk", new Class<?>[]{String.class}, "S3");

        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertSame(expected, resp.getBody());
        verify(studentService, times(1)).getStudentsJoinDepartment("S3");
    }

    @Test
    void editByPk_returnsAcceptedAndTrue() throws Exception {
        Student toEdit = new Student("S4","X","Y",22,4,"addr","ph","D3",new Department("D3","ME"));
        when(studentService.editStudent(toEdit, "S4")).thenReturn(Boolean.TRUE);

        ResponseEntity<?> resp = (ResponseEntity<?>) invoke("editByPk", new Class<?>[]{Student.class, String.class}, toEdit, "S4");

        assertEquals(HttpStatus.ACCEPTED, resp.getStatusCode());
        assertEquals(Boolean.TRUE, resp.getBody());
        verify(studentService, times(1)).editStudent(toEdit, "S4");
    }

    @Test
    void add_returnsCreatedAndTrue() throws Exception {
        Student toAdd = new Student("S5","F","G",19,1,"addr","ph","D4",new Department("D4","CE"));
        when(studentService.addStudent(toAdd)).thenReturn(Boolean.TRUE);

        ResponseEntity<?> resp = (ResponseEntity<?>) invoke("add", new Class<?>[]{Student.class}, toAdd);

        assertEquals(HttpStatus.CREATED, resp.getStatusCode());
        assertEquals(Boolean.TRUE, resp.getBody());
        verify(studentService, times(1)).addStudent(toAdd);
    }

    @Test
    void deleteByPk_returnsAcceptedAndTrue() throws Exception {
        when(studentService.deleteStudent("S6")).thenReturn(Boolean.TRUE);

        ResponseEntity<?> resp = (ResponseEntity<?>) invoke("deleteByPk", new Class<?>[]{String.class}, "S6");

        assertEquals(HttpStatus.ACCEPTED, resp.getStatusCode());
        assertEquals(Boolean.TRUE, resp.getBody());
        verify(studentService, times(1)).deleteStudent("S6");
    }
}
