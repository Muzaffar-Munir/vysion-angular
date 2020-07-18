import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  imageObject: Array<object> = [] as any;
  typeTitle = 'SEE IT';
  title = 'Vysion';
  active = 'active';
  checkType(type: any): any{
    this.typeTitle = type;
  }

  uploadFile(event: any): any {
    console.log(event);
    if (event.target.value) {
      const objVideo = {
        // video: event.target.value,
        video: 'https://youtu.be/6pxRHBw-k8M'
      };
      const objImage = {
        image: event.target.value,
        thumbImage: event.target.value,
      };
      this.imageObject.push(objImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
      };
      reader.readAsDataURL(event.target.value);
      console.log(reader.readAsDataURL(event.target.value));
    }
  }
}
