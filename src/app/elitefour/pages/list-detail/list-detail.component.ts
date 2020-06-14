import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FavoriteItem, FavoriteList, FavoriteListStatus} from "../../backend/favorite-list-interfaces";
import {FavoriteListApi} from "../../backend/favorite-list-api";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ItemFormModalComponent} from "../../base/item-form-modal/item-form-modal.component";
import {AreYouSureModalComponent} from "../../base/are-you-sure-modal/are-you-sure-modal.component";
import {ListFormModalComponent} from "../../base/list-form-modal/list-form-modal.component";

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styles: []
})
export class ListDetailComponent implements OnInit {
  // A field has to be created, otherwise it cannot be used in the HTML template.
  readonly CREATED = FavoriteListStatus.CREATED
  readonly ONGOING = FavoriteListStatus.ONGOING
  readonly FINISHED = FavoriteListStatus.FINISHED

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

  openListModal() {
    const modalRef = this.modalService.open(ListFormModalComponent)
    modalRef.componentInstance.favoriteList = this.favoriteList
  }

  deleteItem(itemId: number) {
    const modalRef = this.modalService.open(AreYouSureModalComponent)
    modalRef.result.then((result) => {
      if (result) {
        this.favoriteListApi.deleteItemFromFavoriteList(this.favoriteList.id, itemId);
      }}, () => {})
  }

  sortByFavoriteThenId(favoriteItems: FavoriteItem[]) {
    return favoriteItems.sort((a, b) => {
      // If both are favorites already, sort them by favorite.
      if (!!a.favoritePosition && !!b.favoritePosition) {
        return a.favoritePosition - b.favoritePosition;
      }

      // The item with a favorite is always larger.
      if (!!a.favoritePosition && !b.favoritePosition) {
        return -1;
      } else if (!a.favoritePosition && !!b.favoritePosition) {
        return 1;
      }

      // If neither is a favorite, sort by id.
      return a.id - b.id
    });
  }

  resetAlgorithm() {
    const modalRef = this.modalService.open(AreYouSureModalComponent)
    modalRef.componentInstance.body =
      "Resetting the algorithm will clear all the favorites you picked and set the status of the list to created. " +
      "No items will be deleted."
    modalRef.result.then((result) => {
      if (result) {
        this.favoriteListApi.resetAlgorithm(this.favoriteList.id);
      }}, () => {})
  }

  removeAllItems() {
    const modalRef = this.modalService.open(AreYouSureModalComponent)
    modalRef.result.then((result) => {
      if (result) {
        this.favoriteListApi.removeAllItems(this.favoriteList.id);
      }}, () => {})
  }
}

