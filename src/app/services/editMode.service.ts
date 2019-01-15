import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';

// export interface IEditModeSubscriber {
//     notifyEditMode(isEditModeOn: boolean): void;
// }

export interface SubscriptionEntity {
    subFunction: (value: boolean) => void;
    subscription: Subscription;
}

@Injectable()
export class EditModeService {

    private subscriptions: SubscriptionEntity[] = [];
    private editModeOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {}

    public subscribe(subFunction: (value: boolean) => void): void {
        const subscription = this.editModeOn
            .asObservable()
            .subscribe(subFunction);

        this.subscriptions.push({
            subFunction: subFunction,
            subscription: subscription
        });
    }

    public unSubscribe(subFunction: (value: boolean) => void): void {
        this.subscriptions.find(s => s.subFunction === subFunction)
            .subscription.unsubscribe();

        const index = this.subscriptions.findIndex(s => s.subFunction === subFunction);
        this.subscriptions.splice(index, 1);
    }

    public toggleEditMode() {
        this.editModeOn.next(!this.editModeOn.value);
    }
}

