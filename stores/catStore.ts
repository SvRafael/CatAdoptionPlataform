import { defineStore } from 'pinia';

interface CatState {
  cat: Object;
  cats: Array<Cat>;
}


interface Cat {
    id: number | null;
    name: string;
    description: string;
    image: string;
}

export const useCatStore = defineStore('cat', {
  state: (): CatState => ({
    cat: {} as Cat,
    cats: [] as Cat[]
  }),
  
  getters: {
    getCat(state): Object {
      return state.cat as Cat;
    },
    getCats(state): Array<Object> {
        return state.cats as Cat[];
    }
  },
  
  actions: {
    addCat(cat_param:Object) {
      this.cat = cat_param
      localStorage.setItem('loggedUser', JSON.stringify(cat_param));
    },
    addCats(cats_param:Cat[]){
        this.cats = cats_param as Cat[]
    }
  }
});