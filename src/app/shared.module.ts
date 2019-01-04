import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
    providers: [ DatePipe ],
})
export class SharedModule {}
