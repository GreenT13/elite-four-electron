import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FavoriteListApi} from "../../backend/favorite-list-api";

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
          <input ngbAutofocus type="text" class="form-control" id="itemName" [(ngModel)]="itemName" name="itemName">
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
export class AddItemFormModalComponent implements OnInit {
  @Input() listId: number
  itemName: string = ''

  constructor(public activeModal: NgbActiveModal,
              private favoriteListApi: FavoriteListApi) {
  }

  onSubmit() {
    this.favoriteListApi.addItemToFavoriteList(this.listId, this.itemName);
    this.activeModal.close("Submit");
  }

  ngOnInit(): void {
  }

}
