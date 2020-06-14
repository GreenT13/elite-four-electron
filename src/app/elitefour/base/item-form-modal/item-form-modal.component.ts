import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FavoriteListApi} from "../../backend/favorite-list-api";
import {FavoriteItem} from "../../backend/favorite-list-interfaces";

@Component({
  selector: 'app-add-item-form-modal',
  template: `
    <form (ngSubmit)="onSubmit()">
      <div class="modal-header">
        <h4 class="modal-title" *ngIf="!isEditMode">Add a new item</h4>
        <h4 class="modal-title" *ngIf="isEditMode">Edit item</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <!--suppress HtmlUnknownAttribute -->
          <input ngbAutofocus type="text" class="form-control" id="itemName" [(ngModel)]="itemName" name="itemName">
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
export class ItemFormModalComponent implements OnInit {
  @Input() listId: number
  @Input() favoriteItem: FavoriteItem
  itemName: string = ''
  isEditMode: boolean
  error: string

  constructor(public activeModal: NgbActiveModal,
              private favoriteListApi: FavoriteListApi) {
  }

  onSubmit() {
    if (this.itemName.length == 0) {
      this.error = 'You must set a name'
      return false;
    }

    try {
      if (this.isEditMode) {
        // Create a new item so that in case the update goes wrong we didn't update the incoming item (which is shown on the screen).
        this.favoriteListApi.updateItemForFavoriteList(this.listId, {id: this.favoriteItem.id, name: this.itemName, eliminatedBy: [], toBeChosen: false});
      } else {
        this.favoriteListApi.addItemToFavoriteList(this.listId, this.itemName);
      }
    } catch (error) {
      this.error = error.message
      // Do not close form if we could not submit properly.
      return false;
    }
    this.activeModal.close("Submit");
  }

  ngOnInit() {
    this.isEditMode = !!this.favoriteItem

    if (this.isEditMode) {
      this.itemName = this.favoriteItem.name;
    }
  }

}
