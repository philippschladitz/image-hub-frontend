import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-topics-dialog',
  templateUrl: './edit-topics-dialog.component.html',
  styleUrls: ['./edit-topics-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTopicsDialogComponent implements OnInit {
  topics: {
    name: string;
    imageUrl: string;
  }[];

  selectedTopics: string[];

  constructor(
    private readonly dialogRef: MatDialogRef<EditTopicsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private readonly data: {
      availableTopics: {
        name: string;
        imageUrl: string;
      }[];
      selectedTopics: {
        name: string;
        imageUrl: string;
      }[];
    }
  ) {}

  ngOnInit() {
    this.topics = this.data.availableTopics;
    this.selectedTopics = this.data.selectedTopics.map(t => t.name);
  }

  close() {
    this.dialogRef.close();
  }
}
