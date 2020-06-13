import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FavoriteItem, FavoriteList} from "../../backend/favorite-list-interfaces";
import {FavoriteListApi} from "../../backend/favorite-list-api";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ItemFormModalComponent} from "../../base/item-form-modal/item-form-modal.component";
import {AreYouSureModalComponent} from "../../base/are-you-sure-modal/are-you-sure-modal.component";

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
              private router: Router,
              private favoriteListApi: FavoriteListApi,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    const listId = +this.route.snapshot.paramMap.get('id');
    this.favoriteListApi.getFavoriteListById(listId)
      .subscribe((favoriteList) => {
        this.favoriteList = favoriteList;
      })
  }

  determineNumberOfFavoriteItemsPicked() {
    return this.favoriteList.items.filter((item) => !!item.favoritePosition).length
  }

  openItemModal(favoriteItem: FavoriteItem) {
    const modalRef = this.modalService.open(ItemFormModalComponent)
    modalRef.componentInstance.listId = this.favoriteList.id

    if (!!favoriteItem) {
      modalRef.componentInstance.favoriteItem = favoriteItem
    }
  }

  deleteItem(itemId: number) {
    const modalRef = this.modalService.open(AreYouSureModalComponent)
    modalRef.result.then((result) => {
      if (result) {
        this.favoriteListApi.deleteItemFromFavoriteList(this.favoriteList.id, itemId);
      }}, () => {})
  }

}
