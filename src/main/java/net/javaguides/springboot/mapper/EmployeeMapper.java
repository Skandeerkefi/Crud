package net.javaguides.springboot.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import net.javaguides.springboot.dto.EmployeeDTO;
import net.javaguides.springboot.model.Employee;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel="spring")
public interface EmployeeMapper {
	
    EmployeeDTO toDto(Employee employee);

    List<EmployeeDTO> toDto(List<Employee> employee);

    Employee toEntity(EmployeeDTO employeeDto);
    
    List<Employee> toEntity(List<EmployeeDTO> employeeDto);


}