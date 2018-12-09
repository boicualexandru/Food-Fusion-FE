import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule,
    MatCardModule, MatProgressSpinnerModule, MatMenuModule, MatDividerModule, MatTabsModule, MatListModule } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule, MatCardModule,
        MatProgressSpinnerModule, MatMenuModule, MatDividerModule, MatTabsModule, MatListModule],
    exports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule, MatCardModule,
        MatProgressSpinnerModule, MatMenuModule, MatDividerModule, MatTabsModule, MatListModule],
})
export class MaterialCustomModule { }
