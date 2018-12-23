import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { EmployeesService } from 'src/app/services/employees.service';
import { Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { serverSideValidator } from 'src/app/helpers/serverSideValidator';
import { DirtyTouchedSubmittedErrorStateMatcher } from 'src/app/helpers/dirtyTouchedSubmittedErrorStateMatcher';

@Component({
    selector: 'app-employee-edit-dialog',
    templateUrl: './employee-edit-dialog.component.html'
})
export class EmpoyeeEditDialogComponent implements OnInit {
    serverErrorMessage: BehaviorSubject<any> = new BehaviorSubject<any>({});
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
        serverSideValidator(this.serverErrorMessage)
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
}
