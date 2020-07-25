import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AttachmentsService } from '../services/attachments.service';

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


  constructor(
    private sanitizer: DomSanitizer,
    public attachmentService: AttachmentsService,
  ) {
    this.attachmentService.getAttachments().subscribe((data: any) => {
      console.log(data);
    });

  }
  checkType(type: any): any {
    this.typeTitle = type;
  }


  previewImage(fileInput: any): void {
    const dbObj = {} as any;
    const formData = new FormData();
    this.headerInput = fileInput.target.files[0] as File;
    console.log(this.headerInput);
    console.log(this.headerInput.name);
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
    if (this.headerInput.name) {
      dbObj.fileName = this.headerInput.name;
    }
    if (this.headerInput.size) {
      dbObj.fileSize = this.headerInput.size;
    }
    if (this.headerInput.type) {
      dbObj.fileType = this.headerInput.type;
    }

    formData.append('upload', this.headerInput);
    formData.append('ext', this.headerInput && this.headerInput.name && this.headerInput.name.split('.').pop());
    if (mimeType.match(/image\/*/) != null) { 
      formData.append('type', 'image');
    } else if (mimeType.match(/video\/*/) != null){
      formData.append('type', 'video');
    }  else if (mimeType.match(/audio\/*/) != null){
      formData.append('type', 'audio');
    }
    this.attachmentService.uploadAttachment(formData).subscribe(res => {
      const reader = new FileReader();
      reader.readAsDataURL(this.headerInput);
      reader.onload = (_event) => {
        this.previewHeader = reader.result;
        if (mimeType.match(/image\/*/) != null) {
          console.log('in image');
          dbObj.path = this.previewHeader;
          const objImage = {
            image: this.previewHeader,
            thumbImage: this.previewHeader,
            type: 'image',
            src: this.previewHeader
          };
          dbObj.path = this.previewHeader;
          this.imageObject.push(objImage);
        }
        if (mimeType.match(/video\/*/) != null) {
          console.log('in videos');
          const objVideo = {
            video: this.previewHeader,
            type: 'video',
            src: this.previewHeader
          };
          dbObj.path = this.previewHeader;
          this.imageObject.push(objVideo);
        }
        if (mimeType.match(/audio\/*/) != null) {
          console.log('in objAudio');
          const objAudio = {
            audio: this.sanitizer.bypassSecurityTrustUrl(this.previewHeader),
            name: this.headerInput?.name
          };
          dbObj.path = this.previewHeader;
          this.audios.push(objAudio);
        }
        if (this.imageObject.length === 1 && this.imageObject[0]) {
          this.srcData = this.imageObject[0];
        }
      };
    }, err => console.log(err))
  }
  imageClick(index): any {
    this.srcData = this.imageObject[index];
    console.log(this.srcData);
  }
  deleteAttachment(index?: any): any {

    if (this.typeTitle === 'SEE IT') {
      console.log(this.srcData);
    } else {
      console.log(index);
    }
  }
}
