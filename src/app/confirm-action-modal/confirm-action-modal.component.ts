import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.scss']
})
export class ConfirmActionModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmActionModalComponent>,
  ) { }

  ngOnInit(): void {
  }

}
