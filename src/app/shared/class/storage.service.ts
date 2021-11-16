import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private static _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  init() : Promise<Boolean> {
    return Promise.resolve(this.storage.create()
      .then(storage => {
        StorageService._storage = storage;
        return true;
      }).catch(err => {
        return false;
      })
    );
  }

  public async set(key: string, value: any) {
    if(StorageService._storage == null){
      if (await this.init())
        StorageService._storage?.set(key, value);
    }else{
      StorageService._storage?.set(key, value);
    }
  }

  public async get(key: string) {
    if(StorageService._storage == null){
      if (await this.init())
        return StorageService._storage?.get(key).then(value => { return value; });
    }else{
      return await StorageService._storage?.get(key);
    }
  }

  public async remove(key: string) {
    if(StorageService._storage == null){
      if (await this.init())
        StorageService._storage?.remove(key);
    }else{
      StorageService._storage?.remove(key);
    }
  }

  public async existKey(keyComp: string){
    return (await this.getKeys()).includes(keyComp);
  }

  public async getKeys(){
    if(StorageService._storage == null){
      if (await this.init())
        return StorageService._storage?.keys().then(value => { return value; });
    }else{
      return await StorageService._storage?.keys();
    }
  }

}
