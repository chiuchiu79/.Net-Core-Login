//-----------------------------------------------------------

// 如果你要改 Bar 的斷點，改這個數字(px)。

const devMode = true;
var rightBarBreakPoint = rightBarBreakPoint || 900;
var leftBarBreakPoint = leftBarBreakPoint || 500;
const originalLeftBarBreakPoint = leftBarBreakPoint;

//-----------------------------------------------------------

let theme = "light"; //default to light
function detectColorScheme() {

  //local storage is used to override OS theme settings
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") == "dark") {
      theme = "dark";
    }
  } else if (!window.matchMedia) {
    //matchMedia method not supported
    return false;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //OS theme setting detected as dark
    theme = "dark";
  }
  //dark theme preferred, set document with a `data-theme` attribute
  if (theme == "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
  else {
    document.documentElement.setAttribute("data-theme", "light");
  }
  if (localStorage.getItem("theme") == null) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }
}
detectColorScheme();

let link = document.createElement('link');
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.css';
link.rel = 'stylesheet'
document.head.appendChild(link);

link = document.createElement('link');
link.href = './css/styleCroppie.css';
link.rel = 'stylesheet'
document.head.appendChild(link);

// link = document.createElement('link');
// link.href = './css/styleSettingbarSettingInform.css';
// link.rel = 'stylesheet'
// document.head.appendChild(link);

$.getScript("https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.min.js")
  .done(function () {
    $.getScript("./js/croppin.js");
  });

// 左邊Bar的HTML
$("#FixedLeft").append(`

<a href="/Home/mainPage" class="leftSelectAble">
    <div class="leftIcon">
        <i class="bi bi-house-door"></i>
    </div>
    <div class="leftIconText">首頁</div>
</a>

<a href="#" class="leftSelectAble" id="callCreatePostBlock">
    <div class="leftIcon">
    <i class="bi bi-plus-square"></i>
    </div>
    <div class="leftIconText">建立貼文</div>
</a>

<a href="./explorepage" class="leftSelectAble">
    <div class="leftIcon">
         <i class="bi bi-compass"></i>
    </div>
    <div class="leftIconText">探索</div>
</a>

<a href="#notice" class="leftSelectAble" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
    <div class="leftIcon">
       <i class="bi bi-search"></i>
    </div>
    <div class="leftIconText">搜尋</div>
</a>

<a href="#notice" class="leftSelectAble" type="button" data-bs-toggle="offcanvas" data-bs-target="#inform" aria-controls="offcanvasScrolling">
    <div class="leftIcon">
        <i class="bi bi-bell"></i>
    </div>
    <div class="leftIconText">通知</div>
</a>

<a href="./chattingRoom" class="leftSelectAble">
    <div class="leftIcon">
        <i class="bi bi-chat-left-dots"></i>
    </div>
    <div class="leftIconText">訊息</div>
</a>

<a href="/personalPage" class="leftSelectAble">
    <div class="leftIcon">
         <i class="bi bi-person-circle"></i>
    </div>
    <div class="leftIconText">個人檔案</div>
</a>

<div id="otherBar">
    <a href="#" class="leftSelectAble">
        <div class="leftIcon">
            <i class="bi bi-list"></i>
        </div>
        <div class="leftIconText">更多</div>
    </a>
</div>

`);

// 縮小後按鈕的HTML
$("body").append(`
<div id="phoneMenuButton" onclick="phoneMenu()">
<i class="bi bi-three-dots"></i>
</div>
`);

// 右邊Bar的HTML
$("#FixedRight").append(`

<div id="userProfile">
<div class="rightBox popFollowing"><a href="#">追蹤中</a></div>
<div class="rightBox popFans"><a href="#">粉絲</a></div>
<div class="rightBox"><a href="/record">近期看過</a></div>
</div>
<div id="rightFooter">
<a href="#about" class="rightFooterItem">關於</a>
<a href="#manual" class="rightFooterItem">手冊</a>
<a href="#privacy" class="rightFooterItem">隱私條款</a>
<a href="#language" class="rightFooterItem">地區與語言</a>
</div>

`);

// 左下按鈕按下後，跳出來的popover的HTML
$("body").append(`
<div id="popOverBar">

<a href="/logoutlogout" class="leftSelectAble">
    <div class="leftIcon">
         <i class="bi bi-box-arrow-right"></i>
    </div>
    <div class="leftIconText">登出</div>
</a>
<a href="#" class="leftSelectAble" id="settingButton">
    <div class="leftIcon">
        <i class="bi bi-gear-fill"></i>
    </div>
    <div class="leftIconText">設定</div>
</a>

<a href="#" class="leftSelectAble rightBarHide">
    <div class="leftIcon">
         <i class="bi bi-box-arrow-right"></i>
    </div>
    <div class="leftIconText popFollowing">追蹤中</div>
</a>

<a href="#" class="leftSelectAble rightBarHide">
    <div class="leftIcon">
        <i class="bi bi-heart"></i>
    </div>
    <div class="leftIconText popFans">粉絲</div>
</a>

<a href="/record" class="leftSelectAble rightBarHide">
    <div class="leftIcon">
        <i class="bi bi-clock-history"></i>
    </div>
    <div class="leftIconText">近期看過</div>
</a>

<a href="#" class="leftSelectAble" id="toggleDarkMode">
    <div class="leftIcon">
        <i class="bi bi-moon"></i>
    </div>
    <div class="leftIconText">夜間模式</div>
</a>

<a href="/User/UserList" class="leftSelectAble" id="toggleSearch">
    <div class="leftIcon">
        <i class="bi bi-search"></i>
    </div>
    <div class="leftIconText">用戶查詢</div>
</a>

</div>
`);

// 搜尋的HTML
$("body").append(`
<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="true" tabindex="-1"
id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel"
style="overflow:auto;">
<div class="offcanvas-header" style="padding-bottom: 0px;" >


  <div class="input-group mb-3">

    <input type="text" id="search" class="form-control " placeholder="搜尋" aria-label="Username" aria-describedby="basic-addon1">

    <button type="button" class="btn-close text-reset " data-bs-dismiss="offcanvas" aria-label="Close"></button>

  </div>



</div>

<hr>

<div id="zzzzzzzzzz"></div>
</div>
</div>




`);

// 通知的HTML
$("body").append(`
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="true" tabindex="-1" id="inform"
aria-labelledby="offcanvasScrollingLabel">
<div class="offcanvas-header">

  <h3 class="offcanvas-title fw-bold">
    通知
  </h3>
  <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>

<hr>
<div class="offcanvas-body ">

  <div id="thisWeek" >
      <h5 class="fw-bold" data-list-time="0">
      本週
    </h5>
  </div>
  <hr>
  <div id="thisMonth" data-list-time="0">
      <h5 class="fw-bold" data-list-time="0">
      本月
    </h5>
  </div>
  <hr>
  <div id="longTimeAgo" data-list-time="0">
      <h5 class="fw-bold" data-list-time="0">
      更早之前
    </h5>
  </div>
</div>
</div>`);

// 設定頁的HTML
$("body").append(`
<div id="settingBox">

<div id="settingBar">
    <div class="leftSelectAbleTitle">
        <div class="leftIconText">設定</div>
    </div>
    <a href="#" class="leftSelectAble" id="profileSetting">
        <div class="leftIconText">個人檔案</div>
    </a>
    <a href="#" class="leftSelectAble" id="informSetting">
        <div class="leftIconText">設定通知</div>
    </a>
    <a href="#" class="leftSelectAble" id="privacySetting">
        <div class="leftIconText">隱私</div>
    </a>  

    <div id="otherBarSetting">
        <a href="#" class="leftIconText" id="leaveSetting">離開設定</a>
    </div>  


</div>

<div id="settingBlock">
    <div id="profileSettingBlock"></div>
    <div id="informSettingBlock"></div>
    <div id="privacySettingBlock"><div>
</div>

</div>
`);

// 個人檔案設定的HTML
$("#profileSettingBlock").append(`
<div id="settingpersoninfo">
<form id="settingpersoninfoblock">
    <div class="personalinfofirstlaypsetting">
        <h2 class="personalinfotitle">編輯個人檔案</h2>
    </div>

    <div id="personalinfoaccountimgchange">
        <div id="personalinfosettingaccountimgblock">
            <img id="personalinfosettingaccountimg"
                src="https://placehold.co/128x128.png">
        </div>
        <div id="personalinfosettingaccountnameblock">
            <span id="personalinfoaccountname"></span>
            <div class="personalinfosettingaccountimgchangeblock">
            <div class="personalinfoupladimgbtndiv">
                <label class="btn btn-primary upload_img personalinfoupladimgbtn" id="personalinfouploadbutton">
                    更換相片
                    <input id="upload_img_portrait" style="display: none;" type="file" accept="image/*">
                </label>
            </div>
        </div>
        </div>
        

    </div>

    <div class="personalinfofirstlaypsetting">
        <label for="personalinfoinputtext">
            <div class="personalinfosecondlaypsetting">
                <span class="personalinfotitle h3">個人簡介</span>
            </div>
        </label>
        <div id="personalinfoinputarea">
            <textarea id="personalinfoinputtext" type="text" placeholder="個人簡介"></textarea>
            <div id="personalinfoinputlength">
                <span>0/150</span>
            </div>
        </div>
    </div>
    <div class="personalinfofirstlaypsetting">
        <h3 class="personalinfotitle">性別</h3>
        <select transfer id="personalinfogender">
            <option value="0">不方便說明</option>
            <option value="1">男性</option>
            <option value="2">女性</option>
        </select>
    </div>
    <div class="personalinfofirstlaypsetting " style="text-align: right;">
        <input type="button" class="btn btn-primary personalinfosubmit" style="width: 30%;"
            value="提交" onclick="submitNewProfile()"></input>
    </div>
</form>
</div>

`);

// 隱私設定的HTML
$("#privacySettingBlock").append(`

<div id="privacy">
<h1>隱私設定</h1>
<div id="openAccount">
    <h5>公開帳號</h5>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked>
    </div>
</div>
<div id="blockList">
    <h5>封鎖的帳號</h5>
    <div id= "blockContent">
	    <p style="color:var(--fontColor)">無</p>
    </div>
</div>
</div>

`);

// 追蹤中、粉絲、上傳 block
$("body").append(`
  <div id="boxBlackOut">

  <div id="FollowingBox" class="popBox">
      <div class="mapTop">
      <span>追蹤中</span>
    </div>
    <div class="mapMid">
    </div>
    <div class="mapFooter">
      <button type="button" class="btn btn-secondary" id="FollowingClose">關閉</button>
    </div>
  </div>

    <div id="FansBox" class="popBox">
    <div class="mapTop">
    <span>粉絲</span>
  </div>
  <div class="mapMid">
  </div>
  <div class="mapFooter">
    <button type="button" class="btn btn-secondary" id="FansClose">關閉</button>
  </div>
  </div>

  <div id="UploadBox" class="popBox">
  <div class="mapTop">
  <span>上傳</span>
</div>
<div class="mapMid">
  <div id="dragAndUploadBox">
  <span>將圖片拖至此上傳</span>
  <span style="font-size:1rem;">或</span>

  <label>
  <input id="uploadimg" class="upload_img" style="display:none;" type="file" accept="image/*">
  <div class="leftIcon">
  <i class="bi bi-plus-square"></i>
  </div>
  <div class="leftIconText">點擊以上傳</div>
  </label>


  </div>
</div>
<div class="mapFooter">
  <button type="button" class="btn btn-secondary" id="UploadClose">關閉</button>
</div>
</div>

  </div>
`);

// 導入粉絲
$(async function () {

  let whoifollowDatas = await $.get(`./whoifollow`);
  if (whoifollowDatas.data != null) {
    whoifollowDatas.data.map((ele) => {
      $("#FollowingBox>.mapMid").append(`
      <div class="mapMidUserinfo">
        <a href="./personalPageForOthers-${ele.userAccount}" class="mapMidUsericonBox"> 
          <img src="${ele.usericon}" class="mapMidUsericon">
        </a>
        <div class="mapMidUsername">
          <a href="./personalPageForOthers-${ele.userAccount}">@${ele.username}</a>
          <a href="./personalPageForOthers-${ele.userAccount}">${ele.userAccount}</a>
        </div>
        <div class="mapMidButton">
        <button type="button" class="btn btn-secondary Following${ele.id}">取消追蹤</button>
        </div>
      </div>
      `);
      $(`.Following${ele.id}`).on("click", () => { unfollowButton(ele.id) });
    })
  }

  let whofollowmeDatas = await $.get(`./whofollowme`);
  if (whofollowmeDatas.data != null) {
    whofollowmeDatas.data.map((ele) => {

      var mutual = 0;

      $("#FansBox>.mapMid").append(`
      <div class="mapMidUserinfo Userinfo${ele.userAccount}">
        <a href="./personalPageForOthers-${ele.userAccount}" class="mapMidUsericonBox"> 
          <img src="${ele.usericon}" class="mapMidUsericon">
        </a>
        <div class="mapMidUsername">
          <a href="./personalPageForOthers-${ele.userAccount}">@${ele.username}</a>
          <a href="./personalPageForOthers-${ele.userAccount}">${ele.userAccount}</a>
        </div>
        <div class="mapMidButton">
        </div>
      </div>
      `);

      mutual = whoifollowDatas.data.find((e) => {
        return e.id == ele.id;
      }) || 0;

      if (mutual != 0) {
        $(`#FansBox>.mapMid>.Userinfo${ele.userAccount}>div.mapMidButton`).append(`
        <button type="button" class="btn btn-secondary Following${ele.id}">取消追蹤</button>
        `);
        $(`.Following${ele.id}`).on("click", function () { unfollowButton(ele.id) });
      }
      else {
        $(`#FansBox>.mapMid>.Userinfo${ele.userAccount}>div.mapMidButton`).append(`
        <button type="button" class="btn btn-primary Following${ele.id}">追蹤</button>
        `);
        $(`.Following${ele.id}`).on("click", function () { followButton(ele.id) });
      }
    });
  }

});


//右邊Bar初始存在/不存在的額外設定
let middleBarSize = "col-7";
if ($("#FixedRight").length == 0) {
  middleBarSize = "col-10";
  $("#middleBar").addClass("col-10");
  $("#middleBar").removeClass("col-7");
  $("#rightBar").hide();
}

//手機端主按鈕按下
function phoneMenu() {
  $("#FixedLeft").css("width", "60%");
  $("#FixedLeft").css("display", "flex");
  $("#FixedLeft>.leftSelectAble>.leftIconText").css("display", "flex");
  $("#otherBar>.leftSelectAble>.leftIconText").css("display", "flex");
  document.addEventListener("click", closephoneMenu);
}

//手機端主按鈕離開
function closephoneMenu(event) {
  if (event.clientX > $("#FixedLeft").width()) {
    $("#FixedLeft").css("width", "16.666667%");
    $("#FixedLeft").hide();
    document.removeEventListener("click", closephoneMenu);
  }
}

// 左下按鈕顯示、隱藏設定
function showMorePop() {

  if ($("#popOverBar").css("display") == "none") {

    window.addEventListener('click', function eventHandler(e) {
      if (!(document.getElementById('popOverBar').contains(e.target))) {
        $("#popOverBar").css("display", "none");
        window.removeEventListener('click', eventHandler);
      }
    });

    $("#popOverBar").css("display", "flex");
  }

  else {
    $("#popOverBar").css("display", "none");
  }
  this.event.stopPropagation();
}

// 重新載入頁面配置
function reloadPageSize() {

  $("#FixedLeft").css("width", "16.666667%");
  if ($("#FixedRight").length == 1) {
    if (window.innerWidth < rightBarBreakPoint || window.innerWidth < 500) {
      $("#middleBar").addClass("col-10");
      $("#middleBar").removeClass(middleBarSize);
      $("#rightBar").css("display", "none");
      $("#FixedRight").css("display", "none");
      $(".rightBarHide").css("display", "flex");

    }
    else {
      $("#middleBar").addClass(middleBarSize);
      $("#middleBar").removeClass("col-10");
      $("#rightBar").css("display", "flex");
      $("#FixedRight").css("display", "flex");
      $(".rightBarHide").css("display", "none");
    }
  }

  if (window.innerWidth <= leftBarBreakPoint) {
    $("#middleBar").addClass("col-12");
    $("#middleBar").removeClass(middleBarSize);
    $("#leftBar").css("display", "none");
    $("#FixedLeft").css("display", "none");
    $("#phoneMenuButton").css("display", "flex");
    $("#settingBar").css("width", "33.3333333%");
    $("#settingBlock").css("width", "66.6666667%");
    $("#settingBox").css("width", "100%");
  }
  else {
    $("#middleBar").removeClass("col-12");
    $("#middleBar").addClass(middleBarSize);
    $("#leftBar").css("display", "flex");
    $("#FixedLeft").css("display", "flex");
    $("#phoneMenuButton").css("display", "none");
    $("#settingBar").css("width", "20%");
    $("#settingBlock").css("width", "80%");
    $("#settingBox").css("width", "83.33333333%");
  }

  if ($("#FixedLeft").width() < 155) {
    $("#FixedLeft>.leftSelectAble>.leftIconText").css("display", "none");
    $("#otherBar>.leftSelectAble>.leftIconText").css("display", "none");
  }
  else {
    $("#FixedLeft>.leftSelectAble>.leftIconText").css("display", "flex");
    $("#otherBar>.leftSelectAble>.leftIconText").css("display", "flex");
  }

  $("#popOverBar").css("display", "none");
  document.removeEventListener("click", closephoneMenu);
}

onresize = () => {
  reloadPageSize();
};

// 調整夜間模式
function toggleDarkMode() {
  if (theme == "light") {
    theme = "dark";
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else if (theme == "dark") {
    theme = "light";
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
  else {
    theme = "light";
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
  return false;
}

// 跳出警告
if (devMode == false) {
  console.log("%c等一下！", 'color: red; font-size: 48px; text-shadow: 0 0 5px #000000');
  console.log("%c如果有人叫您在這裡複製/貼上任何東西，您百分之百被騙了。", 'font-size: 16px;');
  console.log("%c在這裡貼上任何資訊，均有可能讓惡意攻擊者存取您的帳號。", 'font-size: 16px; color: red; font-weight:bold;');
}

// 個人檔案圖片、名稱
$(async function () {

  let userDatas = await $.get(`./morganshowicon`);
  if (userDatas.data != null) {
    userDatas.data.map((ele) => {
      $("#userProfilePicture").attr("src", `${ele[0]}`);
      $("#personalinfosettingaccountimg").attr("src", `${ele[0]}`);
      $("#userName").text(`@${ele[1]}`);
      $("#personalinfoaccountname").text(`@${ele[1]}`);
      $("#personalinfoinputtext").val(`${ele[2] != null ? ele[2] : ""}`);
      $("#personalinfogender").val(`${ele[3]}`);
      personalinfoinputtext();
    })
  }
});

// 設定右下按鈕按下觸發
$("#otherBar>a").on("click", function (e) {
  e.preventDefault();
  showMorePop();
});
// 設定夜間模式按鈕按下觸發
$("#toggleDarkMode").on("click", function (e) {
  e.preventDefault();
  toggleDarkMode();
});
// 顯示設定區域，以及關閉區域的按鈕按下觸發
$("#settingButton").on("click", function (e) {
  e.preventDefault();
  if ($("#settingBox").css("display") == "none") {
    leftBarBreakPoint = 1000;
    $("body").css("overflow-y", "hidden");
    $("#settingBox").css("display", "flex");
  } else {
    leftBarBreakPoint = originalLeftBarBreakPoint;
    $("body").css("overflow-y", "auto");
    $("#settingBox").css("display", "none");
  }
  reloadPageSize();
});
// 離開設定區域
$("#leaveSetting").on("click", function (e) {
  e.preventDefault();
  leftBarBreakPoint = originalLeftBarBreakPoint;
  $("body").css("overflow-y", "auto");
  $("#settingBox").css("display", "none");
  reloadPageSize();
})

// 設定頁的按鈕跳出其設定頁面
const settingBarNames = ["profileSetting", "informSetting", "privacySetting"];

settingBarNames.forEach(element => {
  $(`#${element}`).on("click", function (clicks) {
    clicks.preventDefault();
    settingBarNames.forEach(e => {
      $(`#${e}Block`).css("display", "none");
    });
    $(`#${element}Block`).css("display", "block");
  });
});

// 推送新個人檔案的按鈕
function submitNewProfile() {

  let newProfile = {
    "usericon": newPortraitsrcOutput || $("#personalinfosettingaccountimg").attr("src"),
    "introduction": $("#personalinfoinputtext").val(),
    "gender": $("#personalinfogender").find(":selected").val()
  }

  let res = $.ajax({
    url: "./postnewprofile",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(newProfile)
  });

  $(".personalinfosubmit").val("完成！");
  $(".personalinfosubmit").attr("disabled", true);

  $("#personalinfosettingaccountimg").on("load", function (e) {
    resetPersonalinfosubmit();
  });

  $("#personalinfogender").on("change", function (e) {
    resetPersonalinfosubmit();
  });

}

// 重置個人檔案按鈕
function resetPersonalinfosubmit() {
  $(".personalinfosubmit").val("提交");
  $(".personalinfosubmit").attr("disabled", false);
}

// 追蹤按鈕
function unfollowButton(userid) {
  $(`.Following${userid}`).off("click");
  $(`.Following${userid}`).removeClass("btn-secondary");
  $(`.Following${userid}`).addClass("btn-primary");
  $(`.Following${userid}`).text("追蹤");
  let followingList = { "followingUserID": userid };
  const res = $.ajax({
    url: "/deleteFollowingList",
    type: "DELETE",
    contentType: "application/json",
    data: JSON.stringify(followingList)
  });
  $(`.Following${userid}`).on("click", () => { followButton(userid) });
}

// 退追蹤按鈕
function followButton(userid) {
  $(`.Following${userid}`).off("click");
  $(`.Following${userid}`).removeClass("btn-primary");
  $(`.Following${userid}`).addClass("btn-secondary");
  $(`.Following${userid}`).text("取消追蹤");
  let followingList = { "followingUserID": userid };
  const res = $.ajax({
    url: "/insertFollowingList",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(followingList)
  });
  $(`.Following${userid}`).on("click", () => { unfollowButton(userid) });
}

$("#boxBlackOut").on("click", function (e) {
  e.stopPropagation();
  closeFollowing();
  closeFans();
  closeUpload();
})

//追蹤按鈕
$(".popFollowing").on("click", function (e) {
  e.preventDefault();
  $("body").css("overflow-y", "hidden");
  $("#boxBlackOut").css("display", "flex");
  $("#FollowingBox").css("display", "flex");
})

//粉絲按鈕
$(".popFans").on("click", function (e) {
  e.preventDefault();
  $("body").css("overflow-y", "hidden");
  $("#boxBlackOut").css("display", "flex");
  $("#FansBox").css("display", "flex");
})
//按鈕防止按下事件離開彈出框
$(".popBox").on("click", function (e) {
  e.stopPropagation();
});

//新建貼文按鈕
$("#callCreatePostBlock").on("click", function (e) {
  $("body").css("overflow-y", "hidden");
  $("#boxBlackOut").css("display", "flex");
  $("#UploadBox").css("display", "flex");
  e.preventDefault();
});

//關閉新建貼文框
function closeUpload() {
  $("body").css("overflow-y", "auto");
  $("#boxBlackOut").css("display", "none");
  $("#UploadBox").css("display", "none");
}

//關閉追蹤框
function closeFollowing() {
  $("body").css("overflow-y", "auto");
  $("#boxBlackOut").css("display", "none");
  $("#FollowingBox").css("display", "none");
}

//關閉粉絲框
function closeFans() {
  $("body").css("overflow-y", "auto");
  $("#boxBlackOut").css("display", "none");
  $("#FansBox").css("display", "none");
}

//設置關閉框事件至框內關閉按鈕
$("#FansClose").on("click", e => { closeFans(); });
$("#FollowingClose").on("click", e => { closeFollowing(); });
$("#UploadClose").on("click", e => { closeUpload(); });

//防止拖入圖片導致新建視窗
window.addEventListener("dragover", function (e) {
  e.preventDefault();
}, false);
window.addEventListener("drop", function (e) {
  e.preventDefault();
}, false);

//重新計算視覺
reloadPageSize();
detectColorScheme();

//導入設定、搜尋、通知JS
$.getScript("./js/settingpersonalinfo.js");
$.getScript("./js/newestInformResize.js");

$(async function () {
  let blockset = await $.get("./setting");
  let messageSetting = await $.get("./messageSetting");
  (messageSetting[0].openState == 0) ? $("#flexSwitchCheckDefault").prop('checked', false) : $("#flexSwitchCheckDefault").prop('checked', true);
  $("#blockContent").empty();
  if (blockset.data[0].blockedUserID != null) {
    blockset.data.map((block) => {
      $("#blockContent").append(`
				<div class="blockImage" id="Block${block.userAccount}">
			        <img class="blockImg" src="${block.usericon}">
			        <span>${block.userAccount}</span>
			        <button type="button" class="btn btn-light" data-unblock-id="${block.blockedUserID}">解除封鎖</button>
			    </div>
		    `);
      $(".blockImage").on("click", function () {

        var blockList={};
        blockList.blockedUserID = $(this).data("black-id");
        const res = $.ajax({
          url: "/deleteblackList",
          type: "DELETE",
          contentType: "application/json",
          data: JSON.stringify(block),
        });
        $(`#Block${block.userAccount}`).remove();
      });

      
    });
  } else {
    $("#blockContent").append(`<p style="color:var(--fontColor)">無</p>`);
  }
});


