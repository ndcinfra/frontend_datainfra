function launchTest(jwt){

    // First, You should check It has JWT or not in your cookie.
    // If not, You shoule rediret to Login page or see Error message
    //var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDc1MzgwOTEsImlzcyI6IlUxNTQyODYxNDk3Mzc2OTQxNjU2In0.k7oeuHtE1mAoShMjYIxHjfBTkMDU7Sd9bIasCirqrSg'

    // Second, Make url protocol
    // Thailand is naddiclaunchertha
    // Vietname is naddiclaunchervie

    //console.log("launcher start: ", jwt)

    url = "naddiclaunchertha:"+jwt;

    console.log('launcher start: ', url); // for test

    window.protocolCheck(url ,function () {}); // run.....
    
    var btnGameStart = $('.gamestart')[0];

    var isfocus = false;
    btnGameStart.focus();
    btnGameStart.onblur = function(){isfocus = true;};
    
    // Third, Check. If there is the launcher or not.
    // If not, redirect to download page or see error message

    // TODO: If you have better Idea!. Do it.

    setTimeout(function(){
        var launcherDownloadMsg = "Launcher downloaded..." ;
        btnGameStart.onblur = null;
        if (!isfocus) {
            if(confirm(launcherDownloadMsg)){
                //download
                window.location.href = ''; // path of AWS S3 launcher.exe. ex) 'http://jp.mangot5.com/HappyTukLauncher_Setup_JP.exe'; <- Closers JP
            }else{
                // msg > need launcher install
                // reidrect to launcher download page
                window.location.href = 'http://www.google.com'
            }
            
        }
    }, 5000);
    
}
