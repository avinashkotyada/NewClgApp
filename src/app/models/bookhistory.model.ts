export class BookHistory {
    constructor(public book_name : string, public takenin_date : number, public submit_date : number, public status : string){}
}

export class BookHistorywithid{
    constructor(public book_name : string, public takenin_date : number, public submit_date : number, public status : string, public id : string){}
}