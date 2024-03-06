function genderToString(genderCode) {
    //console.log(typeof genderCode)
    switch (genderCode) {
        case "0":
            return "不透露";
        case "1":
            return "男";
        case "2":
            return "女";
        default:
            return "未知";
    }
}

var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function () {
    var keyword = document.getElementById("keyword").value;
    var education = document.getElementById("education").value;
    var gender = document.getElementById("gender").value;
    //console.log(keyword);
    //console.log(gender);
    //console.log(education);


    $.ajax({
        type: "POST",
        url: "/User/Search",
        data: {
            keyword: keyword,
            gender: gender,
            education: education
        },
        success: function (response) {
            //console.log(response)
            var tableHTML =
                `<table class="table table-striped">
                    <tr>
                        <th>Name</th>
                        <th>性別</th>
                        <th>學歷</th>
                    </tr> `;
            var totalCount = 0;
            for (var i = 0; i < response.length; i++) {
                var genderCodeString = response[i].gender.toString();
                tableHTML += '<tr class="table table-bordered"><td>' + response[i].username + '</td><td>' + genderToString(genderCodeString) + '</td><td>' + response[i].lineid + '</td></tr>';
                totalCount++;
            }
            tableHTML += '<tr><td colspan="2">小計: ' + totalCount + '人' + '</td></tr>';
            tableHTML += '</table>';

            $('#userList').html(tableHTML);
        },
        error: function (xhr, status, error) {
            if (xhr.status == 404) {
                alert("查無資料");
            }

        }
    })
})


var initialGender = "0";
var initialEducation = "未選擇";

var clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function () {

    document.getElementById("keyword").value = "";

    document.getElementById("gender").value = initialGender;
    document.getElementById("education").value = initialEducation;

    $('#userList').empty();
});

