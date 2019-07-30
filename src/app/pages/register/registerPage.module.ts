import { NgModule } from '@angular/core';
import { RegisterPageComponent } from './registerPage.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { Routes, RouterModule } from '@angular/router';

const lazyModuleRoutes: Routes = [
    { path: '', component: RegisterPageComponent }
];

@NgModule({
    declarations: [ RegisterPageComponent ],
    imports: [
        SharedModule,
        ComponentsModule,
        RouterModule.forChild(lazyModuleRoutes) ],
    exports: [ RegisterPageComponent ],
    providers: [],
})
export class RegisterPageModule {}
