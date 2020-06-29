import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input()  book: any;
  @Input()  index: any;
  @Input()  bookmarkFlag: boolean = false;


  @Output() readBookEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteBookEvent: EventEmitter<any> = new EventEmitter();
  @Output() bookmarkEvent: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  readBook(){
    this.readBookEvent.emit(this.book);
  }

  deleteBook(){
    this.deleteBookEvent.emit(this.index);
  }
  
  bookmark() {
    this.bookmarkEvent.emit(this.index);
  }




}
