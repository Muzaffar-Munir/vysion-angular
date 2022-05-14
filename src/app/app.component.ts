import { environment } from './../environments/environment.prod';
import { ConfirmActionModalComponent } from './confirm-action-modal/confirm-action-modal.component';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AttachmentsService } from '../services/attachments.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  imageObject = [] as any[];
  audios: Array<object> = [] as any;
  image: any;
  typeTitle = 'SEE IT';
  title = 'Vysion';
  active = 'active';
  headerInput = null as File;
  previewHeader = null as any;
  srcData = null;
  loadingResults = true as boolean;
  type: any;
  filter = {
    query: {
      $or: {} as any
    } as any
  } as any;
  reloadAttachments: FormControl = new FormControl('');
  constructor(
    private sanitizer: DomSanitizer,
    public attachmentService: AttachmentsService,
    public dialog: MatDialog
  ) {
    this.filter.query.$or = {} as any;
    this.reloadAttachments.setValue('');
  }
  ngOnInit(): any {
    merge(this.reloadAttachments.valueChanges)
      .pipe(startWith(''))
      .subscribe((result) => {
        this.filter.query.$or = [{ type: 'image' }, { type: 'video' }];
        this.attachmentService.getAttachments(this.filter).subscribe((data: any) => {
          if (result && result === 'delete') {
            console.log('here');
            this.imageObject = [];
          }
          this.loadingResults = false;
          console.log(data);
          if (data.length > 0) {
            data.forEach(element => {
              if (element.path) {

                if (element.type === 'image') {
                  const dataSrc = `${environment.apiUrl}` + element.path;
                  const img = {
                    _id: element._id,
                    image: dataSrc,
                    thumbImage: dataSrc,
                    alt: 'Attachment',
                    src: dataSrc,
                    type: 'image',
                  };
                  this.imageObject.push(img);
                  if (this.imageObject.length === 1 && this.imageObject[0]) {
                    this.srcData = this.imageObject[0];
                  }
                } else {
                  const dataSrc = `${environment.apiUrl}` + element.path;
                  const img = {
                    _id: element._id,
                    video: dataSrc,
                    thumbImage: dataSrc,
                    alt: 'Attachment',
                    src: dataSrc,
                    type: 'video',
                  };
                  this.imageObject.push(img);
                  if (this.imageObject.length === 1 && this.imageObject[0]) {
                    this.srcData = this.imageObject[0];
                  }
                }
              }
            });
          }

        });

      });
  }
  checkType(type: any): any {
    this.typeTitle = type;
  }


  previewImage(fileInput: any): void {
    this.loadingResults = true;
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
    } else if (mimeType.match(/video\/*/) != null) {
      formData.append('type', 'video');
    } else if (mimeType.match(/audio\/*/) != null) {
      formData.append('type', 'audio');
    }
    this.attachmentService.uploadAttachment(formData).subscribe(res => {
      console.log(res);
      this.loadingResults = false;
      const reader = new FileReader();
      reader.readAsDataURL(this.headerInput);
      reader.onload = (_event) => {
        this.previewHeader = reader.result;
        if (mimeType.match(/image\/*/) != null) {
          console.log('in image');
          // dbObj.path = this.previewHeader;
          const imgSrc = `${environment.apiUrl}` + res.path;
          const objImage = {
            image: imgSrc,
            thumbImage: imgSrc,
            type: 'image',
            src: imgSrc,
            _id: res._id
          };
          dbObj.path = this.previewHeader;
          this.imageObject.push(objImage);
        }
        if (mimeType.match(/video\/*/) != null) {
          console.log('in videos');
          const vidSrc = `${environment.apiUrl}` + res.path;
          const objVideo = {
            video: vidSrc,
            type: 'video',
            src: vidSrc,
            _id: res._id
          };
          this.imageObject.push(objVideo);
        }
        if (mimeType.match(/audio\/*/) != null) {
          console.log('in objAudio');
          const objAudio = {
            audio: this.sanitizer.bypassSecurityTrustUrl(`${environment.apiUrl}` + res.path),
            name: res?.fileName
          };
          dbObj.path = this.previewHeader;
          this.audios.push(objAudio);
        }
        if (this.imageObject.length === 1 && this.imageObject[0]) {
          this.srcData = this.imageObject[0];
        }
        console.log(this.imageObject);
        console.log(this.audios);
      };
    }, err => console.log(err))
  }
  imageClick(index): any {
    this.loadingResults = true;
    this.srcData = this.imageObject[index];
    console.log(this.srcData);
    this.loadingResults = false;
  }
  deleteAttachment(index?: any): any {
    const dialogRef = this.dialog.open(ConfirmActionModalComponent, {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result);
      if (result) {
        this.loadingResults = true;
        if (this.typeTitle === 'SEE IT') {
          // console.log(this.srcData);
          this.attachmentService.deleteAttachment(this.srcData._id).subscribe((data) => {
            // console.log(data);
            this.reloadAttachments.setValue('delete');
            this.loadingResults = false;
          });
        } else {
          this.loadingResults = false;
          console.log(index);
        }
      }
    });
  }

}
