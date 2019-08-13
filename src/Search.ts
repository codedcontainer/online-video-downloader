
export class Search {
    searchQuery: string;
    searchQueryArray: Array<string>;
    filteredData: Array<Object>; 

    constructor(request: any) {
        this.searchQuery = request.query.s || request.query.search; 
        if (this.searchQuery){ 
            this.searchQueryArray = this.searchQuery.split(" ");
        }  
    }
    sFilter(data:any, property: string, callback) {
        if (this.searchQuery) {
            console.log('not undefined')
            this.filteredData = data.filter((item) => {
                if (this.searchQueryArray.length > 0){
                    for (var a = 0; a <= this.searchQueryArray.length - 1; a++) {
                        if (item[property].includes(this.searchQueryArray[a]) {
                            return item;
                        }
                    }
                }
                else{
                    return item[property].includes(this.searchQuery);
                }
               
            });          
            callback(this.filteredData);
        }
        else{            
            callback(data);
        }
    }
}