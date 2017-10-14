var oUsername = document.querySelector('input[type=text]');
var oPassword = document.querySelector('input[type=password]');
var oSubmit = document.querySelector('input[type=submit]');
// console.log(oSubmit);
var oPrompt = document.querySelector('#lprompt');
var oP = document.createElement('p');
oSubmit.addEventListener('click', function() {
    var username= oUsername.value;
    var password= oPassword.value;
        shop.api.login(username,password,function (json) {
            if (json.code ===0) {
                localStorage.token=json.data.token;
                localStorage.username=json.data.username;
                oPrompt.innerText ='登录成功，3秒后跳转到主页...';
                console.log(json);
                var timer = setInterval(function() {
                    if (localStorage.backurl) {
                        location.href = localStorage.backurl;
                    } else {
                        location.href = 'index.html';
                    }
                }, 3000);
            } else {
                json.message=json.message==='少传参数username'?
                    '请输入账户和密码':json.message;
                oP.innerText = json.message;
                oPrompt.appendChild(oP);
            }
        });
    });
