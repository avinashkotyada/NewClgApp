export class StudentModel{
        constructor(public student_name : string, public student_email : string,  public student_id : string, public student_photo: string,public student_uid : string,public student_phoneNumber : number, public student_outstatus : number ){
}
}

export class OutpassRegisterLog{
        constructor(public purpose : string, public student_phoneno : number,public intime : number, public outtime : string){

        }
}


