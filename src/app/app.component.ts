import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  imageObject: Array<object> = [] as any;
  image: any;
  typeTitle = 'SEE IT';
  title = 'Vysion';
  active = 'active';
  headerInput = null as File;
  previewHeader = null as any;

  checkType(type: any): any {
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
  previewImage(fileInput: any): void {
    this.headerInput = fileInput.target.files[0] as File;
    console.log(this.headerInput);
    // Show preview
    const mimeType = this.headerInput.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    console.log('here');
    const reader = new FileReader();
    reader.readAsDataURL(this.headerInput);
    reader.onload = (_event) => {
      this.previewHeader = reader.result;
      this.image = this.previewHeader;
      if (mimeType.match(/image\/*/) != null) {
        console.log('in image');
        const objImage = {
          image: this.previewHeader,
          thumbImage: this.previewHeader,
        };
        this.imageObject.push(objImage);
      }
      if (mimeType.match(/video\/*/) != null) {
        console.log('in videos');
        const objVideo = {
          video: this.previewHeader
        };
        this.imageObject.push(objVideo);
      }
      console.log(this.imageObject);
    };
  }
}
