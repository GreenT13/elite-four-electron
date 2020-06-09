import {Observable} from "rxjs";

export type FavoriteList = {
  id: number,
  name: string,
  tsCreated: Date,
  status: FavoriteListStatus,
  items: FavoriteItem[]
}

export type FavoriteItem = {
  id: number,
  name: string,
  favoritePosition?: number
}

export enum FavoriteListStatus {
  CREATED = "Created",
  ONGOING = "Ongoing",
  FINISHED = "Finished"
}

export type IFavoriteListApi = {
  getFavoriteLists(): Observable<FavoriteList[]>
  getFavoriteListByName(listName: string): FavoriteList
  getFavoriteListById(listId: number): FavoriteList
  addNewFavoriteList(listName: string)
  deleteFavoriteList(listId: number)
  addItemToFavoriteList(listId: number, itemName: string)
  deleteItemFromFavoriteList(listId: number, itemId: number)
  setStatus(listId: number, status: FavoriteListStatus)
  setFavoritePosition(listId: number, itemId: number, position: number)
}
