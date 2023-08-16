import { Component, OnInit } from '@angular/core';
import { Employee } from '../../services/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filterForm: FormGroup;
  allEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  sortedColumn: string = '';
  sortOrder: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.filterForm = this.fb.group({
      firstName: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe((data) => {
      this.employees = data;
      this.allEmployees = data; // Initialize allEmployees with the same data
      this.filteredEmployees = data; // Initialize filteredEmployees with all employees initially
    });
  }

  createEmployee() {
    this.router.navigate(['employee-form']);
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

  filterEmployees() {
    const firstName = this.filterForm
      .get('firstName')
      ?.value?.toLowerCase()
      .trim();
    const email = this.filterForm.get('email')?.value?.toLowerCase().trim();

    this.filteredEmployees = this.allEmployees.filter((employee: Employee) => {
      const matchesFirstName = employee.firstName
        .toLowerCase()
        .includes(firstName);
      const matchesEmail = employee.emailId.toLowerCase().includes(email);

      // Filter based on both criteria
      return (
        (firstName === '' || matchesFirstName) && (email === '' || matchesEmail)
      );
    });
  }

  sortEmployees(column: string) {
    if (this.sortedColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortOrder = 'asc';
    }

    this.filteredEmployees.sort((a: Employee, b: Employee) => {
      const aValue = (a as any)[column].toLowerCase(); // Type assertion here
      const bValue = (b as any)[column].toLowerCase(); // Type assertion here

      if (aValue < bValue) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
