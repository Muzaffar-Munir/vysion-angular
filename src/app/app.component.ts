import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  imageObject = [] as any[];
  audios: Array<object> = [] as any;
  image: any;
  typeTitle = 'SEE IT';
  title = 'Vysion';
  active = 'active';
  headerInput = null as File;
  previewHeader = null as any;
  srcData = null;


  constructor(private sanitizer: DomSanitizer) {

  }
  checkType(type: any): any {
    this.typeTitle = type;
  }

  uploadFile(event: any): any {
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
    console.log(fileInput)
    this.headerInput = fileInput.target.files[0] as File;
    console.log(this.headerInput);
    // Show preview
    const mimeType = this.headerInput.type;
    if (!this.headerInput) {
      return;
    }
    if (this.typeTitle === 'SEE IT' && mimeType.match(/image\/*/) == null && mimeType.match(/video\/*/) == null) {
        return;
    } else if (this.typeTitle === 'Hear IT' && mimeType.match(/audio\/*/) == null) {
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
          type: 'image',
          src: this.previewHeader
        };
        this.imageObject.push(objImage);
      }
      if (mimeType.match(/video\/*/) != null) {
        console.log('in videos');
        const objVideo = {
          video: this.previewHeader,
          type: 'video',
          src: this.previewHeader
        };
        this.imageObject.push(objVideo);
      }
      if (mimeType.match(/audio\/*/) != null) {
        console.log('in objAudio');
        const objAudio = {
          audio: this.sanitizer.bypassSecurityTrustUrl(this.previewHeader),
          name: this.headerInput?.name
        };
        this.audios.push(objAudio);
      }
      console.log(this.imageObject);
    };
  }
  imageClick(index) {
    this.srcData =  this.imageObject[index];
    console.log(this.srcData)
  }
}
