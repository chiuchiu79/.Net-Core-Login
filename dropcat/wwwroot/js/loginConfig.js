// 一般登入
var login = document.getElementById("loginForm");

login.addEventListener("submit", function(event) {
	event.preventDefault();

	var username = document.getElementById("account").value;
	var password = document.getElementById("passwd").value;
	var rememberMe = document.getElementById("rememberMe");

	var loginData = {
		username: username,
		password: password
	};

	$.ajax({
		url: "/Home/Login",
		method: "POST",
		contentType: "application/json",
		data: JSON.stringify(loginData),
		success: function() {
			console.log("登入成功")
			//alert("登入成功");
			window.location.href = "/Home/mainPage";

		},
		error: function(xhr) {

			if (xhr.status === 400) {
				alert(xhr.responseText);
			}
		}
	})
})