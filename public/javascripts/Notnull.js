function  not_null(id) {
   var va = id.val();
   if(va == null||va ="")
   {
    alert("该值不能为空");
    $('#'+id).focus();
    return false;
   }
   return true;
}

function  all_not_null() {
    var input = $('form input');

    console.log(input);

    for (var key in input)
    {
        if(not_null(key) == false)
        {
            return false;
        }
    }
    var select = $('fom select');
    console.log(select);


    for(var key2 in select)
    {
        if(not_null(key2)==false)
        {
            return false
        }
    }
    return true;
}
