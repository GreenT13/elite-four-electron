import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FavoriteList} from "../../backend/favorite-list-interfaces";
import {FavoriteListApi} from "../../backend/favorite-list-api";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddItemFormModalComponent} from "../../base/add-item-form-modal/add-item-form-modal.component";

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styles: []
})
export class ListDetailComponent implements OnInit {
  favoriteList: FavoriteList = {id: 0, name: '', status: undefined, tsCreated: new Date(), items: []}

  log(x) {
    console.log('A callback is for button ' + x);
  }

  constructor(private route: ActivatedRoute,
              private favoriteListApi: FavoriteListApi,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    const listId = +this.route.snapshot.paramMap.get('id');
    this.favoriteListApi.getFavoriteListById(listId)
      .subscribe((favoriteList) => {this.favoriteList = favoriteList;})
  }

  determineNumberOfFavoriteItemsPicked() {
    return this.favoriteList.items.filter((item)=> { !!item.favoritePosition }).length
  }

  openAddNewItemModal() {
    const modalRef = this.modalService.open(AddItemFormModalComponent)
    modalRef.componentInstance.listId = this.favoriteList.id
  }

  deleteItem(itemId: number) {
    this.favoriteListApi.deleteItemFromFavoriteList(this.favoriteList.id, itemId);
  }

}
