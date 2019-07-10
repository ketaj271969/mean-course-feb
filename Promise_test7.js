// https://codehandbook.org/how-to-make-api-calls-inside-for-loop-in-javascript/
const rp = require('request-promise')
let user_list  = [{"Id":1 },{"Id":2 },{"Id":3 },{"Id":4 },{"Id":5 }];
let URL = "https://jsonplaceholder.typicode.com/users/"

function make_api_call(id){
    return rp({
        url : `${URL}${id}`,
        method : 'GET',
        json : true
    })
}

async function processUsers(){
    let result;
    for(let i = 0; i < user_list.length; i++){
        result = await make_api_call(user_list[i].Id);
        user_list[i]['result'] = result;
    }
    return user_list;
}

async function doTask(){
    let result = await processUsers();
    console.log(result);
}

doTask();
