import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AngularEpubViewerComponent } from '../../../libs/angular-epub-viewer/src/public_api';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookCollection: any[] = [];
  @Output()
  bookCollectionEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }


  @ViewChild('epubViewer')
  epubViewer: AngularEpubViewerComponent;

  ngOnInit() {
  }

  addBook(event) {
    this.bookCollection.push(event.target.files[0]);
    this.bookCollectionEvent.emit(this.bookCollection);
  }

}
