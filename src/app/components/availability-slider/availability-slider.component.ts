import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MatSlider, MAT_SLIDER_VALUE_ACCESSOR } from '@angular/material';

@Component({
    selector: 'app-availability-slider',
    providers: [MAT_SLIDER_VALUE_ACCESSOR],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '(focus)': '_onFocus()',
        '(blur)': '_onBlur()',
        '(mousedown)': '_onMousedown($event)',
        '(keydown)': '_onKeydown($event)',
        '(keyup)': '_onKeyup()',
        '(mouseenter)': '_onMouseenter()',
        '(slide)': '_onSlide($event)',
        '(slideend)': '_onSlideEnd()',
        '(slidestart)': '_onSlideStart($event)',
        'class': 'mat-slider',
        'role': 'slider',
        '[tabIndex]': 'tabIndex',
        '[attr.aria-disabled]': 'disabled',
        '[attr.aria-valuemax]': 'max',
        '[attr.aria-valuemin]': 'min',
        '[attr.aria-valuenow]': 'value',
        '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
        '[class.mat-slider-disabled]': 'disabled',
        '[class.mat-slider-has-ticks]': 'tickInterval',
        '[class.mat-slider-horizontal]': '!vertical',
        '[class.mat-slider-axis-inverted]': '_invertAxis',
        '[class.mat-slider-sliding]': '_isSliding',
        '[class.mat-slider-thumb-label-showing]': 'thumbLabel',
        '[class.mat-slider-vertical]': 'vertical',
        '[class.mat-slider-min-value]': '_isMinValue || _isUnavailable',
        '[class.mat-slider-hide-last-tick]': 'disabled || _isMinValue && _thumbGap && _invertAxis',
        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    },
    // tslint:disable-next-line:max-line-length
    templateUrl: './availability-slider.component.html',
    // tslint:disable-next-line:max-line-length
    styleUrls: [ './availability-slider.component.scss' ],
    // tslint:disable-next-line:use-input-property-decorator
    inputs: ['disabled', 'color', 'tabIndex'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailabilitySliderComponent extends MatSlider {
    get _isUnavailable() {
        console.log(this.percent);
        return this.percent > 0.2 && this.percent < 0.8;
    }
}
