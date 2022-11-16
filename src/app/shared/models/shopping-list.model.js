

export class ShoppingList{
    constructor(id, name, limit){
       this.id = id;
       this.name = name;
       this.createdAt = new Date();
       this.limit = limit;
       this.products = [];
       this.total = 0;
    }
}
