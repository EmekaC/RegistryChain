const {Contract} = require('fabric-contract-api');

class testContract extends Contract {
    //adding marks for students in the student record on chain
    async addMarks(ctx, studentId, subject1, subject2, subject3) {
        let marks = {
            subj1:subject1,
            subj2:subject2,
            subj3:subject3
        };
    await
    ctx.stub.putState(studentId, Buffer.from(JSON.stringify(marks)));

    console.log('Student marks added to the ledger Succesfully..');
    }

    //deleting student marks
    async deleteMarks(ctx, studentId) {
        await ctx.stub.deleteState(studentId);
        console.log('Student marks deleted succesfully from the ledger..');
    }

    //Query student marks, make sure to convert the buffer back to string
    async queryMarks (ctx, studentId) {
        let marksAsBytes = await ctx.stub.getState(studentId);
        if (!marksAsBytes || marksAsBytes.toString().length <= 0) {
            throw new Error('Student with Id does not exist: ');
        }
    let marks = JSON.parse(marksAsBytes.toString());
    return JSON.stringify(marks);
    }
}

module.exports=testContract;