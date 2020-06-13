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
  favoritePosition?: number,
  eliminatedBy: number[],
  toBeChosen: boolean
}

export enum FavoriteListStatus {
  CREATED = "Created",
  ONGOING = "Ongoing",
  FINISHED = "Finished"
}

export type IFavoriteListApi = {
  getFavoriteLists(): Observable<FavoriteList[]>
  getFavoriteListById(listId: number): Observable<FavoriteList>
  addNewFavoriteList(listName: string)
  deleteFavoriteList(listId: number)
  addItemToFavoriteList(listId: number, itemName: string)
  deleteItemFromFavoriteList(listId: number, itemId: number)
  setStatus(listId: number, status: FavoriteListStatus)
  setFavoritePosition(listId: number, itemId: number, position: number)
  saveList(favoriteList: FavoriteList)
}
