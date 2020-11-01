import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Output() outcome = new EventEmitter<any>();
  modalRef: NgbModalRef;
  @ViewChild('modalContent', { static: false })
  templateRef: TemplateRef<any>;
  fileURL: any;
  croppedImage: any;
  format: any;

  selectedFile: File = null;

  constructor(private modal: NgbModal) {}

  processFile(fileEvent: any) {
    this.selectedFile = <File>fileEvent.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    if (this.selectedFile.type.indexOf('image') > -1) {
      this.format = 'image';
    } else if (this.selectedFile.type.indexOf('video') > -1) {
      this.format = 'video';
    }
    reader.addEventListener('load', (event: any) => {
      this.fileURL = reader.result;
      if (this.format === 'image') {
        this.openModal(this.templateRef);
      }
    });

    const newImg = document.createElement('img');
    this.outcome.emit(this.croppedImage);
  }

  getCroppedImage(event) {
    this.croppedImage = event;
  }

  openModal(modalContent) {
    this.modalRef = this.modal.open(modalContent, {
      container: '.app',
      size: 'lg',
      backdrop: 'static'
    });

    this.modalRef.result.then(
        result => console.log(result),
        reason => console.log(reason)
    );
  }

  closeModal() {
    this.modalRef.close();
  }

}
