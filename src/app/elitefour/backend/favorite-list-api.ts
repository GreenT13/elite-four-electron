import {FavoriteItem, FavoriteList, FavoriteListStatus, IFavoriteListApi} from "./favorite-list-interfaces";
import {FavoriteListDatabase} from "./favorite-list-database";
import {Observable, ReplaySubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FavoriteListApi implements IFavoriteListApi {
  // Whenever this list is modified, it should be updated on disk.
  private readonly favoriteLists: FavoriteList[];
  private readonly favoriteListsSubject: ReplaySubject<FavoriteList[]>;

  constructor(private favoriteListDatabase: FavoriteListDatabase) {
    this.favoriteLists = favoriteListDatabase.getLists()
    this.favoriteListsSubject = new ReplaySubject<FavoriteList[]>(1)
    this.favoriteListsSubject.next(this.favoriteLists)
  }

  private save() {
    this.favoriteListDatabase.saveLists(this.favoriteLists);
    this.favoriteListsSubject.next(this.favoriteLists);
  }

  private findListById(listId: number): FavoriteList {
    return this.favoriteLists.find(favoriteList => favoriteList.id == listId);
  }

  private findItemById(listId: number, itemId: number) {
    return this.findListById(listId).items.find(item => item.id == itemId);
  }




  getFavoriteLists(): Observable<FavoriteList[]> {
    return this.favoriteListsSubject.asObservable();
  }

  getFavoriteListById(listId: number): Observable<FavoriteList> {
    return new Observable<FavoriteList>((observer) => {
      this.getFavoriteLists().subscribe((favoriteLists) => {
          observer.next(favoriteLists.find(favoriteList => favoriteList.id == listId))
      }
      )
    })
  }

  addNewFavoriteList(listName: string) {
    const nameExists: boolean = !!this.favoriteLists.find(favoriteList => favoriteList.name == listName);

    if (nameExists) {
      console.error('List with the same name already exists!')
      // TODO: learn how to throw errors?
      return null;
    }

    const favoriteList: FavoriteList = this.favoriteListDatabase.createNewList(listName);

    this.favoriteLists.push(favoriteList)
    this.save();
  }

  deleteFavoriteList(listId: number) {
    const favoriteList = this.findListById(listId);
    this.favoriteLists.splice(this.favoriteLists.indexOf(favoriteList), 1)
    this.save()
  }

  addItemToFavoriteList(listId: number, itemName: string) {
    const favoriteList: FavoriteList = this.findListById(listId);
    const itemExists: boolean = !!favoriteList.items.find(item => item.name == itemName)

    if(itemExists) {
      console.error('Item with the same name already exists!')
      // TODO: learn how to throw errors?
      return null;
    }

    favoriteList.items.push(this.favoriteListDatabase.createNewItem(favoriteList, itemName))
    this.save();
  }

  deleteItemFromFavoriteList(listId: number, itemId: number) {
    const items = this.findListById(listId).items;
    const favoriteItem: FavoriteItem = this.findItemById(listId, itemId);
    items.splice(items.indexOf(favoriteItem), 1)
    this.save()
  }

  setFavoritePosition(listId: number, itemId: number, position: number) {
    const favoriteItem: FavoriteItem = this.findItemById(listId, itemId);
    favoriteItem.favoritePosition = position;
    this.save();
  }

  setStatus(listId: number, status: FavoriteListStatus) {
    const favoriteList: FavoriteList = this.findListById(listId);
    favoriteList.status = status;
    this.save();
  }

}

