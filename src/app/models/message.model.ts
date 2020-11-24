
export class MessageModel {
    constructor(public message : string, public Timestamp : number, public check : string ){}
}


export class RecentMessageModel {
    constructor(public message : string, public Timestamp : number, public check : string, public ide : string ){}
}