import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'flight-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() microAppMessage = new EventEmitter<any>();

  @Input('microappstate')
  set microAppState(value: string) {
    console.log(`state provided by shell: ${ value }`);
  }

  sendMessage(): void {
    this.microAppMessage.emit('micro-app-data');
  }
}
