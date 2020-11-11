export class BookHistory {
    constructor(public book_name : string, public takenin_date : string, public submit_date : string, public status : string){}
}

export class BookHistorywithid{
    constructor(public book_name : string, public takenin_date : string, public submit_date : string, public status : string, public id : string){}
}