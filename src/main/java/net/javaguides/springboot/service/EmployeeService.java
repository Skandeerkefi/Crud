package net.javaguides.springboot.service;

import java.util.List;
import net.javaguides.springboot.dto.EmployeeDTO;

public interface EmployeeService {
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO getEmployeeById(Long id);
    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);
    EmployeeDTO updateEmployee(EmployeeDTO employeeDTO);
    void deleteEmployee(Long id);
}
