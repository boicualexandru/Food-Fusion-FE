import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/models/employee/employee';
import { MAT_DIALOG_DATA, MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { EmployeesService } from 'src/app/services/employees.service';
import { Validators, FormControl, FormGroupDirective, NgForm, AbstractControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

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
    serverErrorMessage: BehaviorSubject<any> = new BehaviorSubject<any>({});
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
        this.serverSideValidator(this.serverErrorMessage)
    ]);
    matcher = new DirtyTouchedSubmittedErrorStateMatcher();

    constructor(public dialogRef: MatDialogRef<EmpoyeeEditDialogComponent>,
        private employeesService: EmployeesService,
        @Inject(MAT_DIALOG_DATA) private restaurantId: number) {}

    ngOnInit(): void {
        this.emailFormControl.valueChanges.subscribe(() => {
            const errMessage = this.serverErrorMessage.value;
            errMessage[''] = null;
            this.serverErrorMessage.next(errMessage);
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
                    this.serverErrorMessage.next(err.error || {});
                    this.emailFormControl.updateValueAndValidity();
                    console.log(err);
                });
    }

    serverSideValidator(serverErrorMessage: BehaviorSubject<any>, fieldName: string = ''): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            console.log(serverErrorMessage.value);

            if (serverErrorMessage.value == null) { return; }
            const isInvalid = serverErrorMessage.value[fieldName] != null;
            return isInvalid ? {'serverSideValidator': {value: serverErrorMessage.value[fieldName]}} : null;
        };
    }
}
