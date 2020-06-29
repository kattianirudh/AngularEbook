import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AngularEpubViewerModule} from '../../libs/angular-epub-viewer/src/angularEpubViewer.module';
import {CommonModule} from "@angular/common";
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddBookComponent } from './add-book/add-book.component';

@NgModule({
    declarations: [
        AppComponent,
        BookComponent,
        BookListComponent,
        DashboardComponent,
        NavBarComponent,
        AddBookComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        AngularEpubViewerModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
