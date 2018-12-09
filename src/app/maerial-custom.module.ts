import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule,
    MatCardModule, MatProgressSpinnerModule, MatMenuModule, MatDividerModule } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule, MatCardModule,
        MatProgressSpinnerModule, MatMenuModule, MatDividerModule],
    exports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule, MatCardModule,
        MatProgressSpinnerModule, MatMenuModule, MatDividerModule],
})
export class MaterialCustomModule { }
