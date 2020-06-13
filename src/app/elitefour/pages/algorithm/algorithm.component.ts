import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FavoriteItemApi} from "../../backend/favorite-item-api";
import {FavoriteItem, FavoriteList} from "../../backend/favorite-list-interfaces";

@Component({
  selector: 'app-algorithm',
  templateUrl: './algorithm.component.html',
  styleUrls: ['./algorithm.component.css']
})
export class AlgorithmComponent implements OnInit {
  private favoriteList: FavoriteList
  // noinspection JSMismatchedCollectionQueryUpdate
  private toBeChosenItems: FavoriteItem[]
  private selectedItems: FavoriteItem[]

  constructor(private route: ActivatedRoute,
              private router: Router,
              private favoriteItemApi: FavoriteItemApi) {
  }

  ngOnInit(): void {
    const listId = +this.route.snapshot.paramMap.get('id');
    this.favoriteItemApi.initialize(listId);
    this.favoriteItemApi.getFavoriteList().subscribe((list) => this.favoriteList = list)
    this.initializeNextStep()
  }

  private initializeNextStep() {
    this.selectedItems = []
    this.toBeChosenItems = this.favoriteItemApi.getNextItems();
  }

  skip() {

  }

  select() {
    this.favoriteItemApi.selectItems(this.selectedItems)
    this.initializeNextStep()
  }

  clickItem(item: FavoriteItem) {
    // Toggle the selection of the item.
    const indexOfItem = this.selectedItems.indexOf(item);
    if (indexOfItem >= 0) {
      // Remove the item from the list.
      this.selectedItems.splice(indexOfItem, 1)
    } else {
      // Add the item to the list.
      this.selectedItems.push(item);
    }
  }

  isItemSelected(item: FavoriteItem) {
    return this.selectedItems.includes(item);
  }
}
