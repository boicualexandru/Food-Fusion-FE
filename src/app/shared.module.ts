import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialCustomModule } from './material-custom.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [ CommonModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, MaterialCustomModule],
    exports: [ CommonModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, MaterialCustomModule],
    providers: [],
})
export class SharedModule {}
