import { Component, OnInit } from '@angular/core';
import { Employee } from '../../services/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe((data) => {
      this.employees = data;
    });
  }

  createEmployee() {
    this.router.navigate(['employee-form']); // Navigate to create employee form
  }

  updateEmployee(id: number) {
    this.router.navigate(['employee-form', id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.getEmployees();
    });
  }

  employeeDetails(id: number) {
    this.router.navigate(['employee-details', id]);
  }
}
