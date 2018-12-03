import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login/loginPage.component';
import { MaterialCustomModule } from '../maerial-custom.module';

@NgModule({
    declarations: [ LoginPageComponent ],
    imports: [ CommonModule, MaterialCustomModule, FormsModule ],
    exports: [ LoginPageComponent ],
})
export class PagesModule {}
