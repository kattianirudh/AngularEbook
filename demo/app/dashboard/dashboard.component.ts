import { Component, OnInit, ViewChild } from '@angular/core';
import { BookListComponent } from '../book-list/book-list.component';
import { AngularEpubViewerComponent } from '../../../libs/angular-epub-viewer/src/public_api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  @ViewChild('epubViewer')
  epubViewer: AngularEpubViewerComponent;
  showBookList: boolean = true;
  bookCollection: any[] = [];
  bookmark: any[] = [];



  ngOnInit() {
  }

  readBook(value) {
    this.showBookList = false;
    console.log(value);
    setTimeout(() => {
      this.epubViewer.openFile(value);
    }, 2)
  }

  back() {
    this.showBookList = true;
  }

  setCollection(value) {
    this.bookCollection = value;
  }

  setBookmark(value) {
    this.bookCollection = value;
  }

}
