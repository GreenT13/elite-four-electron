import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FavoriteListApi} from "../../backend/favorite-list-api";
import {FavoriteItem} from "../../backend/favorite-list-interfaces";

@Component({
  selector: 'app-add-item-form-modal',
  template: `
    <form (ngSubmit)="onSubmit()">
      <div class="modal-header">
        <h4 class="modal-title">Add a new item</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <!--suppress HtmlUnknownAttribute -->
          <input ngbAutofocus type="text" class="form-control" id="itemName" [(ngModel)]="favoriteItem.name" name="itemName">
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
  isEditMode: boolean

  constructor(public activeModal: NgbActiveModal,
              private favoriteListApi: FavoriteListApi) {
  }

  onSubmit() {
    if (this.isEditMode) {
      this.favoriteListApi.updateItemForFavoriteList(this.listId, this.favoriteItem);
    } else {
      this.favoriteListApi.addItemToFavoriteList(this.listId, this.favoriteItem.name);
    }
    this.activeModal.close("Submit");
  }

  ngOnInit() {
    this.isEditMode = !!this.favoriteItem

    // We use the favoriteItem as model, so set it to empty value if we are not in edit mode.
    if (!this.isEditMode) {
      this.favoriteItem = {id: 0, name: ''}
    }
  }

}
