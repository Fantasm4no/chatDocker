import { Component,Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-username',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './username.component.html',
  styleUrl: './username.component.scss'
})
export class UsernameComponent {
  @Output() userNameEvent = new EventEmitter<string>();

  userName = '';

  constructor() { }

  setUserName(): void {
    this.userNameEvent.emit(this.userName);
  }

}