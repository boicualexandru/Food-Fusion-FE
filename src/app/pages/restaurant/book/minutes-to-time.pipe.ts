import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'minutes_to_time'})
export class MinutesToTimePipe implements PipeTransform {
    transform(totalMinutes: number): string {
        const hours   = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes - (hours * 60);

        let result = (hours < 10 ? '0' + hours : hours);
            result += ':' + (minutes < 10 ? '0' + minutes : minutes);

        return result as string;
    }
}
