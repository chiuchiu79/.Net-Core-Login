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
    $('#countTable').empty();

    $.ajax({
        type: "POST",
        url: "/User/Search",
        data: {
            keyword: keyword,
            gender: gender,
            education: education
        },
        success: function (response) {
            console.log(response)
            var tableHTML =
                `<table class="table table-striped">
                    <tr>
                        <th>個人照片</th>
                        <th>用戶名</th>
                        <th>性別</th>
                        <th>學歷</th>
                        <th>帳號建立時間</th>
                    </tr> `;
            var totalCount = 0;
            if (Array.isArray(response)) {
                for (var i = 0; i < response.length; i++) {
                    var genderCodeString = response[i].gender.toString();
                    var createTime = new Date(response[i].createtime);
                    var formattedDate = createTime.toLocaleDateString();
                    tableHTML += '<tr class="table table-bordered"><td><img src="' + response[i].usericon + '" style="width:80px;heigh:80px"></td><td>' + response[i].username + '</td><td>' + genderToString(genderCodeString) + '</td><td>' + response[i].lineid + '</td><td>' + formattedDate + '</td></tr>';
                    totalCount++;
                }
            }

            tableHTML += '<tr><td colspan="2">小計: ' + totalCount + '人' + '</td><td colspan="10"></td></tr>';
            tableHTML += '</table>';

            $('#userList').html(tableHTML);

            if (keyword === "" && gender === "4" && education === "全部") {
                var tableHTML =
                    `<table class="table table-striped">
                    <tr>
                        <th>個人照片</th>
                        <th>用戶名</th>
                        <th>性別</th>
                        <th>學歷</th>
                        <th>帳號建立時間</th>
                    </tr> `;
                var totalCount = 0;
                if (Array.isArray(response.users)) {
                    for (var i = 0; i < response.users.length; i++) {
                        var genderCodeString = response.users[i].gender.toString();
                        var createTime = new Date(response.users[i].createtime);
                        var formattedDate = createTime.toLocaleDateString();
                        tableHTML += '<tr class="table table-bordered"><td><img src="' + response.users[i].usericon + '" style="width:80px;heigh:80px"></td><td>' + response.users[i].username + '</td><td>' + genderToString(genderCodeString) + '</td><td>' + response.users[i].lineid + '</td><td>' + formattedDate + '</td></tr>';
                        totalCount++;
                    }
                }

                tableHTML += '<tr><td colspan="2">小計: ' + totalCount + '人' + '</td><td colspan="10"></td></tr>';
                tableHTML += '</table>';

                $('#userList').html(tableHTML);

                var countPeople = 0;
                if (Array.isArray(response.educationCounts)) {
                    var counthtml =
                        `<table class="table table-success table-striped">
                    <tr>
                        <th>學歷</th>
                        <th>人數</th>
                    </tr> `;
                    for (var j = 0; j < response.educationCounts.length; j++) {
                        counthtml += '<tr><td>' + response.educationCounts[j].lineId + '</td><td>' + response.educationCounts[j].count + '</td></tr>';
                        countPeople += response.educationCounts[j].count;
                    }
                    //counthtml += '<tr><td>小計: ' + countPeople + '人' + '</td><td></td></tr>';
                    counthtml += '<tr><td>總計:</td><td>' + countPeople + '</td></tr>';

                    counthtml += '</table>';
                    $('#countTable').html(counthtml);
                }
            }
        },
        error: function (xhr, status, error) {
            if (xhr.status == 404) {
                alert("查無資料");
            }

        }
    })
})


var initialGender = "4";
var initialEducation = "全部";

var clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function () {

    document.getElementById("keyword").value = "";

    document.getElementById("gender").value = initialGender;
    document.getElementById("education").value = initialEducation;

    $('#userList').empty();
    $('#countTable').empty();
});

