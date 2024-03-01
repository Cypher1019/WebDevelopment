package webDevelopmeny.EmployeManage.Service;


import java.util.List; // Import List from java.util
import java.util.Optional; // Import Optional from java.util

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import webDevelopmeny.EmployeManage.Entity.Employee;
import webDevelopmeny.EmployeManage.Repository.EmployeeRepository;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public Employee postEmployee(Employee employee){
        return  employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public void deleteEmployee(Long id){
        if (!employeeRepository.existsById(id)){
            throw new EntityExistsException("Employee with ID" + id + " not found");
        }

        employeeRepository.deleteById(id);
    }


    public Employee getEmployeeById(Long id){
        return employeeRepository.findById(id).orElse((null));
    }

    public Employee updateEmployee(Long id, Employee employee){
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if(optionalEmployee.isPresent()){
            Employee existingEmployee = optionalEmployee.get();

            existingEmployee.setDepartment(employee.getDepartment());
            existingEmployee.setName(employee.getName());
            existingEmployee.setPhone(employee.getPhone());

            return employeeRepository.save(existingEmployee);
        }
        return null;
    }
}