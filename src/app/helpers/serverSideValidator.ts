import { AbstractControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export function serverSideValidator(serverErrorMessage: BehaviorSubject<any>, fieldName: string = ''): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        console.log(serverErrorMessage.value);

        if (serverErrorMessage.value == null) { return; }
        const isInvalid = serverErrorMessage.value[fieldName] != null;
        return isInvalid ? {'serverSideValidator': {value: serverErrorMessage.value[fieldName]}} : null;
    };
}