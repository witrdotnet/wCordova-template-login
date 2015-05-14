var loginCredentials = { username : "", password : "" }

function setupPageLogin(){ 
    $('#login-button').on('click', function(){
        if($('#username').val().length > 0 && $('#password').val().length > 0){
            loginCredentials.username = $('#username').val();
            loginCredentials.password = $('#password').val();
            var outputJSON = JSON.stringify(loginCredentials);
            loginAuth.login({action : 'login', outputJSON : outputJSON});
        } else {
            alert('all fields are required');
        }
    });    
}

function setupPageHome(){ 
    if(loginCredentials.username.length == 0){
        $.mobile.changePage( "#login", { transition: "slide"} );
    }
    $(this).find('[data-role="header"] h3').append('hi ' + loginCredentials.username);
}

var loginAuth = {
    login:function(loginData){
        $.ajax({url: 'http://witr.net/heartbeat/heartbeatAuth.php',
            data: loginData,
            async: true,
            beforeSend: function() {
                $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success: function (result) {
                if(result == "true") {
                    $.mobile.changePage( "#index", { transition: "slide"} );
                } else {
                    alert('Login failed. Please try again!');
                }
            },
            error: function (request,error) {
                alert('system or network error. Please try again!');
            }
        });
    }
}

$(document).on('pagecreate', '#login', setupPageLogin);
$(document).on('pagebeforeshow', '#index', setupPageHome);
