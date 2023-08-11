package net.javaguides.springboot.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.javaguides.springboot.dto.EmployeeDTO;
import net.javaguides.springboot.mapper.EmployeeMapper;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.EmployeeRepository;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private EmployeeMapper employeeMapper;


    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeMapper.toDto(employeeRepository.findAll());
    }

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {

            if (employeeDTO == null) {
                throw new IllegalArgumentException("EmployeeDTO is null");
            }

            return employeeMapper.toDto(employeeRepository.saveAndFlush(employeeMapper.toEntity(employeeDTO)));
       
    }

    @Override
    public EmployeeDTO updateEmployee(EmployeeDTO employeeDTO) {
      
        
        return employeeMapper.toDto(employeeRepository.saveAndFlush(employeeMapper.toEntity(employeeDTO)));
        
       
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with id: " + id));

        employeeRepository.delete(existingEmployee);
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            return employeeMapper.toDto(employee.get());
        } else {
            throw new IllegalArgumentException("Employee not found with id: " + id);
        }
    }
}
