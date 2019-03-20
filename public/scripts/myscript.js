function makeGetCall(callback){
    $.ajax({
        type: 'GET',
        url:  "http://localhost:3000/rank",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(data){
            console.log(data);
        }
    });
};


$(document).ready(function(){
    makeGetCall();
});