$('document').ready(function(){
    $('#submit').on('click', function(e){

        console.log('button clicked');
        var formData = $('form').serialize(); 
            $.post('http://localhost:3000/', formData).done(function(data){
            
        var htmlString = "<select name='vidFormat' id='vidFormat'>"
        $.each(data, function(index,format){
          htmlString += `<option value='${format.formatId}'>${format.format} - ${format.filesize}</option>`;
        });
          htmlString += "</select>";
            
           $('fieldset#resolution').html(htmlString); 
        });

        e.preventDefault(); 
        return false; 


    });
});