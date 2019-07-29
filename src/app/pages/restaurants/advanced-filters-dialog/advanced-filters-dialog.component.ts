import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import availablePriceRanges, { PriceRangeValue, PriceRange } from 'src/app/models/restaurant/priceRange';
import { Cuisine } from 'src/app/models/cuisine/cuisine';
import { CuisinesService } from 'src/app/services/cuisines.service';

@Component({
    selector: 'app-advanced-filters-dialog',
    templateUrl: './advanced-filters-dialog.component.html',
    styleUrls: ['./advanced-filters-dialog.component.scss']
})
export class AdvancedFiltersDialogComponent implements OnInit {
    cuisineCheckboxes: { checked: boolean, cuisine: Cuisine }[] = [];
    priceRangeCheckboxes: { checked: boolean, priceRange: PriceRangeValue }[];

    constructor(public dialogRef: MatDialogRef<AdvancedFiltersDialogComponent>,
        cuisinesService: CuisinesService,
        @Inject(MAT_DIALOG_DATA) public filters: { cuisineIds: number[], priceRanges: PriceRange[] }) {
            cuisinesService.getAll().subscribe(cuisines => {
            this.cuisineCheckboxes = cuisines.map(c => {
                return {
                    checked: filters.cuisineIds.includes(c.id),
                    cuisine: c
                };
            });
        });

        this.priceRangeCheckboxes = availablePriceRanges
            .map(pr => ({ checked: filters.priceRanges.includes(pr.priceRange), priceRange: pr }));
    }

    ngOnInit(): void { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getSelectedFilters(): { cuisineIds: number[], priceRanges: PriceRange[] } {
        const selectedCuisineIds = this.cuisineCheckboxes
            .filter(cuisine => cuisine.checked)
            .map(cuisine => cuisine.cuisine.id);

        const selectedPriceRanges = this.priceRangeCheckboxes
            .filter(pr => pr.checked)
            .map(pr => pr.priceRange.priceRange);

        return { cuisineIds: selectedCuisineIds, priceRanges: selectedPriceRanges };
    }

    filter(): void {
        this.dialogRef.close(this.getSelectedFilters());
    }
}
