import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';

export interface ICustomSubscriber {
    notify(isEditModeOn: boolean): void;
}

export interface SubscriptionEntity {
    subscriber: ICustomSubscriber;
    subscription: Subscription;
}

@Injectable()
export class EditModeService {

    private subscriptions: SubscriptionEntity[];
    private editModeOn: BehaviorSubject<boolean>;

    constructor() {}

    public subscribe(subscriber: ICustomSubscriber): void {
        const subscription = this.editModeOn
            .asObservable()
            .subscribe(subscriber.notify);

        this.subscriptions.push({
            subscriber: subscriber,
            subscription: subscription
        });
    }

    public unSubscribe(subscriber: ICustomSubscriber): void {
        this.subscriptions.find(s => s.subscriber === subscriber)
            .subscription.unsubscribe();

            // todo remove
    }

    // redundant -- notify se apeleaza automat la modificarea valorii editModeOn
    // public notifyObservers(): void {

    // }

    public toggleEditMode() {
        this.editModeOn.next(!this.editModeOn.value);
    }
}

