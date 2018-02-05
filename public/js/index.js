$( document ).ready(function() {
    var $xhr = $.getJSON('http://localhost:3010/api');
    $xhr.done(function(data) {
        if ($xhr.status !== 200) {
            return;
        }
        console.log(data)
        data.map(user => {
            //console.log('Index.js',user)
            $('#messDate').append(`
            <i>${user._id}</i>
            <i>${user.description}</i>
            <i>${user.tech}</i>
            <i>${user.github}</i>
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
                console.log("success")
            window.location.href = '/success.html'
            
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
                console.log("success")
            window.location.href = '/success.html'
            //console.log("success")
            }
        })
    })
    // Project submit
    $( "#post" ).on( "click", function() {
        const  one = $('#one').val().replace("C:\\fakepath\\", "");
        const  two = $( "#two" ).val().replace("C:\\fakepath\\", "")
        const  three = $( "#three" ).val().replace("C:\\fakepath\\", "")
        const  description = $( "#description" ).val()
        const  tech = $( "#tech" ).val()
        const  github= $( "#github" ).val()
        // Log in object
        let obj = {
            imageOne: one,
            imageTwo: two,
            imageThree: three,
            description: description,
            tech: tech,
            github: github,
        }
        console.log(obj)
        // Ajax post 
        $.ajax({
            url: `/projects`,
            type: 'POST',
            data: obj,
            success: function (data) {
            console.log("success")
            //window.location.href = '/success.html'
            
            }
        })
    })
    
});