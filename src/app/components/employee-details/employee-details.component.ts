import { Component, OnInit } from '@angular/core';
import { Employee } from '../../services/employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  id!: number;
  employee: Employee = new Employee(0, '', '', ''); // Provide default values here
  constructor(
    private route: ActivatedRoute,
    private employeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.employee); // Check if the data is available here

    // Remove this line: this.employee = new Employee();

    this.employeService.getEmployeeById(this.id).subscribe((data) => {
      this.employee = data;
    });
  }
}
