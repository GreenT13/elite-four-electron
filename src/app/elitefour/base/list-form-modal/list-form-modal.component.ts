import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FavoriteListApi} from "../../backend/favorite-list-api";
import {FavoriteList} from "../../backend/favorite-list-interfaces";

@Component({
  selector: 'app-add-list-form',
  template: `
    <form (ngSubmit)="onSubmit()">
      <div class="modal-header">
        <h4 class="modal-title" *ngIf="!isEditMode">Add a new list</h4>
        <h4 class="modal-title" *ngIf="isEditMode">Edit list</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <!--suppress HtmlUnknownAttribute -->
          <input ngbAutofocus type="text" class="form-control" id="listName" [(ngModel)]="listName" name="listName">
          <div class="alert alert-danger" *ngIf="!!error">{{error}}</div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Cancel
        </button>
        <button class="btn btn-primary">Submit</button>
      </div>
    </form>
  `,
  styles: []
})
export class ListFormModalComponent implements OnInit {
  @Input() favoriteList: FavoriteList
  listName: string = ''
  error: string
  isEditMode: boolean

  constructor(public activeModal: NgbActiveModal,
              private favoriteListApi: FavoriteListApi) {
  }

  onSubmit() {
    if (this.listName.length == 0) {
      this.error = 'You must set a name'
      return false;
    }

    try {
      if (this.isEditMode) {
        // Create a new list so that in case the update goes wrong we didn't update the incoming list (which is shown on the screen).
        this.favoriteListApi.updateList({
          id: this.favoriteList.id,
          name: this.listName,
          items: this.favoriteList.items,
          status: this.favoriteList.status,
          tsCreated: this.favoriteList.tsCreated
        })
      } else {
        this.favoriteListApi.addNewFavoriteList(this.listName);
      }
    } catch (error) {
      this.error = error.message;
      return false;
    }

    this.activeModal.close("Submit");
  }

  ngOnInit(): void {
    this.isEditMode = !!this.favoriteList

    if (this.isEditMode) {
      this.listName = this.favoriteList.name
    }
  }
}
