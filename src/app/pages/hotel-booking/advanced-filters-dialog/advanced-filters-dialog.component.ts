import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HotelFeature } from 'src/app/models/hotel/hotelFeature';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
    selector: 'app-advanced-filters-dialog',
    templateUrl: './advanced-filters-dialog.component.html',
    styleUrls: ['./advanced-filters-dialog.component.scss']
})
export class AdvancedFiltersDialogComponent implements OnInit {
    roomViews: HotelFeature[] = [];
    bedTypes: HotelFeature[] = [];
    amenities: { checked: boolean, feature: HotelFeature }[] = [];

    selectedRoomViewId = -1;
    selectedBedTypeId = -1;

    constructor(public dialogRef: MatDialogRef<AdvancedFiltersDialogComponent>,
        private hotelService: HotelService,
        @Inject(MAT_DIALOG_DATA) public filterIds: number[]) {
        const allOption: HotelFeature = {
            id: -1,
            name: 'All',
            category: '',
            icon: ''
        };

        hotelService.getFeatures().subscribe(features => {
            this.roomViews = features.filter(f => f.category === 'ViewType');
            this.roomViews.splice(0, 0, allOption);
            const selectedRoom = this.roomViews.find(f => filterIds.includes(f.id));
            if (selectedRoom != null) {
                this.selectedRoomViewId = selectedRoom.id;
            }

            this.bedTypes = features.filter(f => f.category === 'BedType');
            this.bedTypes.splice(0, 0, allOption);
            const selectedBedType = this.bedTypes.find(f => filterIds.includes(f.id));
            if (selectedBedType != null) {
                this.selectedBedTypeId = selectedBedType.id;
            }


            this.amenities = features.filter(f => f.category === 'Amenities').map(f => {
                return {
                    checked: filterIds.includes(f.id),
                    feature: f
                };
            });
        });
    }

    ngOnInit(): void { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getSelectedFeatures(): HotelFeature[] {
        const result: HotelFeature[] = [];
        if (this.selectedRoomViewId !== -1) {
            result.push(this.roomViews.find(f => f.id === this.selectedRoomViewId));
        }
        if (this.selectedBedTypeId !== -1) {
            result.push(this.bedTypes.find(f => f.id === this.selectedBedTypeId));
        }

        this.amenities
            .filter(amenity => amenity.checked)
            .map(amenity => amenity.feature)
            .forEach(feature => {
                result.push(feature);
            });

        return result;
    }

    filter(): void {
        this.dialogRef.close(this.getSelectedFeatures());
    }
}
