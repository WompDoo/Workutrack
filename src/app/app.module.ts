import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent, DialogWeight } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        AppComponent,
        DialogWeight
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
