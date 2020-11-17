export class BookHistory {
    constructor(public student_id : string,public book_name : string, public takenin_date : number, public submit_date : number, public status : string){}
}

export class BookHistorywithid{
    constructor(public student_id : string, public book_name : string, public takenin_date : number, public submit_date : number, public status : string, public id : string){}
}


export class Book {
    constructor(public book_name : string, public author : string ){}
}