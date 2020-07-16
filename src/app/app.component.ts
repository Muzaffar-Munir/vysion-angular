import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  typeTitle = 'SEE IT';
  title = 'Vysion';
  active = 'active';
  checkType(type: any): any{
    this.typeTitle = type;
  }

  uploadFile(file) {
    console.log(file);
  }
}
