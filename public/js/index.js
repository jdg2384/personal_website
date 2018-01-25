$( document ).ready(function() {
    var $xhr = $.getJSON('http://localhost:3010/login');
    $xhr.done(function(data) {
        if ($xhr.status !== 200) {
            return;
        }
        //console.log(data)
        data.map(user => {
            console.log(user)
            $('#messDate').append(`
            <i>${user._id}</i>
            <i>${user.username}</i>
            <i>${user.password}</i>
            <br/>
            <br/>
            `) 
        })
     
    })
    //Submit click event
    $( "#submit" ).on( "click", function() {
        const  username= $('#username').val();
        const password = $( "#password" ).val()
        // Log in object
        let obj = {
            username: username ,
            password: password,
        }
        console.log(obj)
        // Ajax post 
        $.ajax({
            url: `/check`,
            type: 'POST',
            data: obj,
            success: function (data) {
            window.location.href = '/success.html'
            console.log("success")
            }
        })
    })
    $( "#log" ).on( "click", function() {
        const  username= $('#username').val();
        const password = $( "#password" ).val()
        // Log in object
        let obj = {
            username: username ,
            password: password,
        }
        console.log(obj)
        // Ajax post 
        $.ajax({
            url: `/login`,
            type: 'POST',
            data: obj,
            success: function (data) {
            window.location.href = '/success.html'
            console.log("success")
            }
        })
    })
    
});