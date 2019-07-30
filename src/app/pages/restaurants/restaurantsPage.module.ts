import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { RestaurantsPageComponent } from './restaurantsPage.component';
import { AdvancedFiltersDialogComponent } from './advanced-filters-dialog/advanced-filters-dialog.component';
import { RouterModule, Routes } from '@angular/router';

const lazyModuleRoutes: Routes = [
    { path: '', component: RestaurantsPageComponent }
];

@NgModule({
    declarations: [
        RestaurantsPageComponent,
        AdvancedFiltersDialogComponent
    ],
    imports: [
        SharedModule,
        ComponentsModule,
        RouterModule.forChild(lazyModuleRoutes) ],
    exports: [
        RestaurantsPageComponent
    ],
    entryComponents: [
        AdvancedFiltersDialogComponent
    ],
})
export class RestaurantsPageModule {}
