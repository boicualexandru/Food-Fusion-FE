import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialCustomModule } from './material-custom.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [],
    imports: [ CommonModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule,
        ReactiveFormsModule, MaterialCustomModule, AppRoutingModule],
    exports: [ CommonModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule,
        ReactiveFormsModule, MaterialCustomModule, AppRoutingModule],
    providers: [],
})
export class SharedModule {}
