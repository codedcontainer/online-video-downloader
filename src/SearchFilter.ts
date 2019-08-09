import { Dirent } from "fs";

export class SearchFilter {
    searchQuery: string;
    searchQueryArray: Array<string>;
    constructor(request: any) {
        this.searchQuery = request.query.s || request.query.search;
        this.searchQueryArray = this.searchQuery.split(" ");
    }
    filter(data: Array<Dirent>, property: string) {
        if (this.searchQuery) {
            const filteredData = data.filter((item) => {
                for (var a = 0; a <= this.searchQuery.length - 1; a++) {
                    if (item[property].includes(this.searchQueryArray[a])) {
                        return item;
                    }
                }
                if (this.searchQuery.length == 0) {
                    return item[property].includes(this.searchQuery);
                }
            });
            return filteredData;
        }
    }
}