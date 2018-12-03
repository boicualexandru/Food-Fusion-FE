import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule,
    MatCardModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule, MatCardModule,
        MatProgressSpinnerModule],
    exports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule, MatCardModule,
        MatProgressSpinnerModule],
})
export class MaterialCustomModule { }
