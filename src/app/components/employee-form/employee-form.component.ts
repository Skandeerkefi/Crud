import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  id: number | undefined;
  employeeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
    });

    if (this.id) {
      this.employeeService.getEmployeeById(this.id).subscribe(
        (data) => {
          this.employeeForm.patchValue(data);
        },
        (error) => console.log(error)
      );
    }
  }

  onSubmit() {
    const employeeData = this.employeeForm.value;

    if (this.id) {
      console.log('Updating Employee:', this.id);
      this.employeeService.updateEmployee(this.id, employeeData).subscribe(
        () => this.goToEmployeeList(),
        (error) => console.log('Update Error:', error)
      );
    } else {
      console.log('Creating Employee');
      this.employeeService.createEmployee(employeeData).subscribe(
        () => this.goToEmployeeList(),
        (error) => console.log('Create Error:', error)
      );
    }
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
