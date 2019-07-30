import { NgModule } from '@angular/core';
import { HelpPageComponent } from './helpPage.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { Routes, RouterModule } from '@angular/router';

const lazyModuleRoutes: Routes = [
    { path: '', component: HelpPageComponent }
];

@NgModule({
    declarations: [ HelpPageComponent ],
    imports: [
        SharedModule,
        ComponentsModule,
        RouterModule.forChild(lazyModuleRoutes) ],
    exports: [ HelpPageComponent ],
    providers: [],
})
export class HelpPageModule {}
