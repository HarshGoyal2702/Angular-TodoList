import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Removed NgModel import as it's not needed here
import { Todo } from './todo';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {Dialog, DialogModule, DialogRef} from '@angular/cdk/dialog';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDragPreview,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule,MatSlideToggleModule,CdkDropList, CdkDrag, CdkDragPreview,DialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TODO-app';
  todoValue: string;
  list: Todo[];

  constructor(public dialog: Dialog) {
    this.list = [];
    this.todoValue = '';
  }

  openDialog(): void {
    this.dialog.open<string>(CdkDialogStylingExampleDialog);
  }
  addItem() {
    if (this.todoValue.trim() !== '') {
      const newItem: Todo = {
        id: Date.now(),
        value: this.todoValue,
        isDone: false,
      };
      this.list.push(newItem);
    }

    this.todoValue = '';
  }

  deleteItem(id: number) {
    this.list = this.list.filter((item) => item.id !== id);
  }
  drop(event: CdkDragDrop<{title: string; poster: string}[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
  }
}

  

export class CdkDialogStylingExampleDialog {
  constructor(public dialogRef: DialogRef) {}
}