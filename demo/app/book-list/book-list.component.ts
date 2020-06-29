import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AddBookComponent } from '../add-book/add-book.component';
import { BookComponent } from '../book/book.component';
import * as _ from "lodash";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor() { }
  @Input()
  bookCollection: any[] = [];
  @Input()
  bookmark: any[] = [];
  @Output() readBookEvent: EventEmitter<any> = new EventEmitter();
  @Output() collection: EventEmitter<any> = new EventEmitter();

  bookmarkFlagValue: boolean = true;



  ngOnInit() {
  }

  updateBookCollection(value) {
    this.bookCollection = value;
  }

  readBook(value){
    this.readBookEvent.emit(value);
    this.collection.emit(this.bookCollection);
  }

  deleteBook(index){
    let deletedBook = this.bookCollection.splice(index,1);
    for(var i=0;i<this.bookmark.length;i++){
      if(this.bookmark[i]['name'] === deletedBook[0]['name'])
        this.bookmark.splice(i,1);
    }
  }

  deleteBookmark(index) {
    this.bookmark.splice(index,1);
  }

  bookmarkBook(index) {
    let flag = false;
      for(var j=0;j<this.bookmark.length;j++) {
        if(this.bookmark[j].name === this.bookCollection[index].name)
          flag = true;
      } 

    if(!flag)
      this.bookmark.push(this.bookCollection[index]);
    }
  

}
