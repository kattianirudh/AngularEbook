import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  @Output() backEvent: EventEmitter<any> = new EventEmitter();


  ngOnInit() {
  }

  back() {
      this.backEvent.emit();
  }

}
