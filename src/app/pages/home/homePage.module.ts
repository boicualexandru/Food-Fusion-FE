import { NgModule } from '@angular/core';
import { HomePageComponent } from './homePage.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { Routes, RouterModule } from '@angular/router';

const lazyModuleRoutes: Routes = [
    { path: '', component: HomePageComponent }
];

@NgModule({
    declarations: [ HomePageComponent ],
    imports: [
        SharedModule,
        ComponentsModule,
        RouterModule.forChild(lazyModuleRoutes) ],
    exports: [ HomePageComponent ],
    providers: [],
})
export class HomePageModule {}
