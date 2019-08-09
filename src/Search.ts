export class Search {
    searchQuery: string;
    searchQueryArray: Array<string>;
    constructor(request: any) {
        this.searchQuery = request.query.s || request.query.search;
        this.searchQueryArray = this.searchQuery.split(" ");
    }
    sFilter(data:any, property: string, callback) {
        if (this.searchQuery) {
            const filteredData = data.filter((item) => {
                if (this.searchQueryArray.length > 0){
                    for (var a = 0; a <= this.searchQueryArray.length - 1; a++) {
                        if (item[property].includes(this.searchQueryArray[a])) {
                            return item;
                        }
                    }
                }
                else{
                    return item[property].includes(this.searchQuery);
                }
               
            });
           
            callback(filteredData);
        }
        else{
            callback(data)
        }
         
    }
}