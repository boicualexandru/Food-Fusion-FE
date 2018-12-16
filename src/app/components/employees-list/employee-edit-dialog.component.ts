import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/models/employee/employee';
import { MAT_DIALOG_DATA, MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { EmployeesService } from 'src/app/services/employees.service';
import { Validators, FormControl, FormGroupDirective, NgForm, AbstractControl, ValidatorFn } from '@angular/forms';

export class DirtyTouchedSubmittedErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-employee-edit-dialog',
    templateUrl: './employee-edit-dialog.component.html'
})
export class EmpoyeeEditDialogComponent implements OnInit {
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
        this.serverSideValidator()
    ]);
    matcher = new DirtyTouchedSubmittedErrorStateMatcher();
    serverErrorMessage: any = {};

    constructor(public dialogRef: MatDialogRef<EmpoyeeEditDialogComponent>,
        private employeesService: EmployeesService,
        @Inject(MAT_DIALOG_DATA) private restaurantId: number) {}

    ngOnInit(): void {
        this.emailFormControl.valueChanges.subscribe(() => {
            this.serverErrorMessage[''] = null;
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    add(): void {
        this.employeesService.addEmployeeByEmail(this.restaurantId, this.emailFormControl.value)
            .subscribe(
                employee => this.dialogRef.close(employee),
                err => {
                    this.serverErrorMessage = err.error || {};
                    this.emailFormControl.updateValueAndValidity();
                    console.log(err);
                });
    }

    serverSideValidator(fieldName: string = ''): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            console.log(this.serverErrorMessage);

            if (this.serverErrorMessage == null) { return; }
            const isInvalid = this.serverErrorMessage[fieldName] != null;
            return isInvalid ? {'serverSideValidator': {value: this.serverErrorMessage[fieldName]}} : null;
        };
    }
}
