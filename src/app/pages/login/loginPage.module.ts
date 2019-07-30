import { NgModule } from '@angular/core';
import { LoginPageComponent } from './loginPage.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { Routes, RouterModule } from '@angular/router';

const lazyModuleRoutes: Routes = [
    { path: '', component: LoginPageComponent }
];

@NgModule({
    declarations: [ LoginPageComponent ],
    imports: [
        SharedModule,
        ComponentsModule,
        RouterModule.forChild(lazyModuleRoutes) ],
    exports: [ LoginPageComponent ],
    providers: [],
})
export class LoginPageModule {}
