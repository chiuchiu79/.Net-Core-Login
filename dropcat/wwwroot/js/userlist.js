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

function genderToString2(genderCode) {
    //console.log(typeof genderCode)
    switch (genderCode) {
        case 0:
            return "不透露";
        case 1:
            return "男";
        case 2:
            return "女";
        default:
            return "未知";
    }
}


var searchData;
var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function () {
    var keyword = document.getElementById("keyword").value;
    var education = document.getElementById("education").value;
    var gender = document.getElementById("gender").value;
    $('#countTable').empty();
    $('#pieChart').empty();


    var canvas = document.createElement('canvas');
    canvas.id = 'barChart';
    $('#barChart').replaceWith(canvas);

    var canvas = document.createElement('canvas');
    canvas.id = 'pieChart';
    $('#pieChart').replaceWith(canvas);


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
            searchData = response;
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
                        tableHTML += '<tr class="table table-bordered"><td><img src="' + response.users[i].usericon + '" style="width:80px;height:80px"></td><td>' + response.users[i].username + '</td><td>' + genderToString(genderCodeString) + '</td><td>' + response.users[i].lineid + '</td><td>' + formattedDate + '</td></tr>';
                        totalCount++;
                    }
                }

                tableHTML += '<tr><td colspan="2">小計: ' + totalCount + '人' + '</td><td colspan="10"></td></tr>';
                tableHTML += '</table>';

                $('#userList').html(tableHTML);

                var countPeople = 0;
                var educationLabels = [];
                var educationCounts = [];
                if (Array.isArray(response.educationCounts)) {

                    var hasUnselected = false;
                    for (var j = 0; j < response.educationCounts.length; j++) {
                        if (response.educationCounts[j].lineId !== "未選擇") {
                            educationLabels.push(response.educationCounts[j].lineId);
                            educationCounts.push(response.educationCounts[j].count);
                        } else {
                            hasUnselected = true;
                        }
                    }
                    if (hasUnselected) {
                        educationLabels.push("未選擇");
                        educationCounts.push(response.educationCounts.find(item => item.lineId === "未選擇").count);
                    }

                    //長條圖
                    var ctx = document.getElementById("barChart");
                    var barChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: educationLabels,
                            datasets: [{
                                label: '學歷統計人數',
                                data: educationCounts,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });

                    barChart.resize();
                    $('#barChart').html();

                    if (Array.isArray(response.genderCounts)) {
                        //console.log(response.genderCounts);

                        //圓餅圖
                        var genderLabels = response.genderCounts.map(function (item) {
                            return genderToString2(item.gender);
                        });
                        var genderCounts = response.genderCounts.map(function (item) {
                            return item.count;
                        });
                        //console.log(genderLabels);
                        //console.log(genderCounts);


                        var pieCtx = document.getElementById('pieChart').getContext('2d');
                        var pieChart = new Chart(pieCtx, {
                            type: 'pie',
                            data: {
                                labels: genderLabels,
                                datasets: [{
                                    data: genderCounts,
                                    backgroundColor: [
                                        "rgba(255, 99, 132, 0.5)",
                                        "rgba(54, 162, 235, 0.5)",
                                        "rgba(255, 206, 86, 0.5)"
                                    ],
                                }],
                            }
                        })
                    };
                    pieChart.resize();
                    $('#pieChart').html();


                    var counthtml =
                        `<table class="table table-success table-striped">
                    <tr>
                        <th>學歷</th>
                        <th>人數</th>
                    </tr> `;
                    for (var j = 0; j < educationLabels.length; j++) {
                        counthtml += '<tr><td>' + educationLabels[j] + '</td><td>' + educationCounts[j] + '</td></tr>';
                        countPeople += response.educationCounts[j].count;
                    }
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

//清除
var initialGender = "4";
var initialEducation = "全部";

var clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function () {

    document.getElementById("keyword").value = "";

    document.getElementById("gender").value = initialGender;
    document.getElementById("education").value = initialEducation;

    $('#userList').empty();
    $('#countTable').empty();
    $('#barChart').empty();
    $('#pieChart').empty();


    var canvas = document.createElement('canvas');
    canvas.id = 'barChart';
    $('#barChart').replaceWith(canvas);

    var canvas = document.createElement('canvas');
    canvas.id = 'pieChart';
    $('#pieChart').replaceWith(canvas);

});

var exportPDFBtn = document.getElementById("exportPdf");
exportPDFBtn.onclick = function () {
    html2canvas(
        document.getElementById("userList"),
        {
            dpi: 300,//匯出pdf清晰度
            onrendered: function (canvas) {

                var contentWidth = canvas.width;
                var contentHeight = canvas.height;

                //一頁pdf顯示html頁面生成的canvas高度;
                var pageHeight = contentWidth / 592.28 * 841.89;
                //未生成pdf的html頁面高度
                var leftHeight = contentHeight;
                //pdf頁面偏移
                var position = 0;
                //html頁面生成的canvas在pdf中圖片的寬高（a4紙的尺寸[595.28,841.89]）
                var imgWidth = 595.28;
                var imgHeight = 592.28 / contentWidth * contentHeight;

                var pageData = canvas.toDataURL('image/jpeg', 1.0);
                var pdf = new jsPDF('', 'pt', 'a4');

                //有兩個高度需要區分，一個是html頁面的實際高度，和生成pdf的頁面高度(841.89)
                //當內容未超過pdf一頁顯示的範圍，無需分頁
                if (leftHeight < pageHeight) {
                    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                        leftHeight -= pageHeight;
                        position -= 841.89;
                        //避免新增空白頁
                        if (leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }
                // 將其他元素轉換為 Canvas 並添加到 PDF 中
                html2canvas(document.getElementById("countTable"), {
                    dpi: 300,
                    onrendered: function (canvas) {
                        var pageData = canvas.toDataURL('image/jpeg', 1.0);
                        pdf.addPage();
                        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                    },
                    background: "#fff"
                });

                html2canvas(document.getElementById("img"), {
                    dpi: 300,
                    onrendered: function (canvas) {
                        var pageData = canvas.toDataURL('image/jpeg', 1.0);
                        pdf.addPage();
                        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                    },
                    background: "#fff"
                });

                pdf.save('myPDF.pdf');
            },
            //背景設為白色（預設為黑色）
            background: "#fff"
        })
}

var excelBtn = document.getElementById("exportExcel");
excelBtn.addEventListener("click", function () {

    if (searchData) {


        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('UserList');
        var data;

        const headerRow = sheet.addRow(['個人照片', '用戶名', '性別', '學歷', '帳號建立時間']);
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFF00' } 
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        sheet.getColumn(1).width = 10
        sheet.getColumn(2).width = 20
        sheet.getColumn(3).width = 10
        sheet.getColumn(4).width = 10
        sheet.getColumn(5).width = 20


        if (searchData.users) {
            data = searchData.users;
            for (var i = 0; i < data.length; i++) {
                //console.log(user[i].usericon)
                sheet.getRow(i + 2).height = 50;
                var base64Image = data[i].usericon;
                var imageId = workbook.addImage({
                    base64: base64Image,
                    extension: 'png',
                });
                sheet.addImage(imageId, {
                    tl: { col: 0, row: i + 1 },
                    ext: { width: 50, height: 50 },
                    editAs: 'oneCell'
                });
                const userInfoRow = sheet.getRow(i + 2);
                userInfoRow.getCell(2).value = data[i].username;
                userInfoRow.getCell(3).value = genderToString2(data[i].gender);
                userInfoRow.getCell(4).value = data[i].lineid;
                userInfoRow.getCell(5).value = new Date(data[i].createtime).toLocaleDateString();
            }

            var totalRows = sheet.rowCount - 1;

            sheet.addRow(['小計:', totalRows + '人']);

            html2canvas(document.getElementById("barChart"), {
                dpi: 300,
                background: "#fff"
            }).then((barCanvas) => {
                var chartDataUrl = barCanvas.toDataURL('image/jpeg', 1.0);
                var chartImageId = workbook.addImage({
                    base64: chartDataUrl,
                    extension: 'png',
                });
                sheet.addImage(chartImageId, {
                    tl: { col: 7, row: 1 },
                    ext: { width: 800, height: 400 },
                    editAs: 'oneCell'
                });

                return html2canvas(document.getElementById("pieChart"), {
                    dpi: 300,
                    background: "#fff"
                });
            }).then((pieCanvas) => {
                var pieChartDataUrl = pieCanvas.toDataURL('image/jpeg', 1.0);
                var pieChartImageId = workbook.addImage({
                    base64: pieChartDataUrl,
                    extension: 'png',
                });
                sheet.addImage(pieChartImageId, {
                    tl: { col: 7, row: 10 },
                    ext: { width: 400, height: 400 },
                    editAs: 'oneCell'
                });

                return workbook.xlsx.writeBuffer();
            }).then((content) => {
                const link = document.createElement("a");
                const blobData = new Blob([content], {
                    type: "application/vnd.ms-excel;charset=utf-8;"
                });
                link.download = 'demo.xlsx';
                link.href = URL.createObjectURL(blobData);
                link.click();
            }).catch((error) => {
                console.error('Error during canvas rendering:', error);
            });


        } else {
            data = searchData;

            for (var i = 0; i < data.length; i++) {
                sheet.getRow(i + 2).height = 50;
                var base64Image = data[i].usericon;
                var imageId = workbook.addImage({
                    base64: base64Image,
                    extension: 'png',
                });
                sheet.addImage(imageId, {
                    tl: { col: 0, row: i + 1 },
                    ext: { width: 50, height: 50 },
                    editAs: 'oneCell'
                });

                const userInfoRow = sheet.getRow(i + 2);
                userInfoRow.getCell(2).value = data[i].username;
                userInfoRow.getCell(3).value = genderToString2(data[i].gender);
                userInfoRow.getCell(4).value = data[i].lineid;
                userInfoRow.getCell(5).value = new Date(data[i].createtime).toLocaleDateString();
            }
            var totalRows = sheet.rowCount - 1;

            sheet.addRow(['小計:', totalRows + '人']);


            // 表格裡面的資料都填寫完成之後，訂出下載的callback function
            // 異步的等待他處理完之後，創建url與連結，觸發下載
            workbook.xlsx.writeBuffer().then((content) => {

                const link = document.createElement("a");
                const blobData = new Blob([content], {
                    type: "application/vnd.ms-excel;charset=utf-8;"
                });
                link.download = 'demo.xlsx';
                link.href = URL.createObjectURL(blobData);
                link.click();
            });
        }



    } else {
        alert("請先查詢，再點選輸出按鈕");
    }
})