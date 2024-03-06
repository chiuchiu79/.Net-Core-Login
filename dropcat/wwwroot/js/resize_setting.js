//-----------------------------------------------------------

// 如果你要改 Bar 的斷點，改這個數字(px)。

const devMode = true;
var rightBarBreakPoint = rightBarBreakPoint || 900;
var leftBarBreakPoint = leftBarBreakPoint || 1000;
var settingBarBreakPoint = leftBarBreakPoint || 500;

//-----------------------------------------------------------

$("#FixedLeft").append(`

<div id="logo">
    <div style="border: 5px black solid; border-radius: 15px 15px 0px 15px; width: 50px;height: 50px;"></div>
</div>

<a href="#" class="leftSelectAble">
    <div class="leftIcon">
        <i class="bi bi-house-door"></i>
    </div>
    <div class="leftIconText">首頁</div>
</a>

<a href="#search" class="leftSelectAble">
    <div class="leftIcon">
       <i class="bi bi-search"></i>
    </div>
    <div class="leftIconText">搜尋</div>
</a>

<a href="./explorepage" class="leftSelectAble">
    <div class="leftIcon">
         <i class="bi bi-compass"></i>
    </div>
    <div class="leftIconText">探索</div>
</a>

<a href="#notice" class="leftSelectAble">
    <div class="leftIcon">
        <i class="bi bi-bell"></i>
    </div>
    <div class="leftIconText">通知</div>
</a>

<a href="#message" class="leftSelectAble">
    <div class="leftIcon">
        <i class="bi bi-chat-left-dots"></i>
    </div>
    <div class="leftIconText">訊息</div>
</a>


<label class="leftSelectAble">
    <input id="upload_img" style="display:none;" type="file" accept="image/*">
    <div class="leftIcon">
    <i class="bi bi-plus-square"></i>
    </div>
    <div class="leftIconText">建立</div>
</label>




<a href="/personalPage" class="leftSelectAble">
    <div class="leftIcon">
         <i class="bi bi-person-circle"></i>
    </div>
    <div class="leftIconText">個人檔案</div>
</a>

<div id="otherBar">
    <a href="#" class="leftSelectAble" onclick="showMorePop()">
        <div class="leftIcon">
            <i class="bi bi-list"></i>
        </div>
        <div class="leftIconText">更多</div>
    </a>
</div>

`);

$("body").append(`
<div id="phoneMenuButton" onclick="phoneMenu()">
<i class="bi bi-three-dots"></i>
</div>
`);

$("#FixedRight").append(`

<div id="userProfile">
<div id="userProfilePicture"></div>
<a href="#profile" id="userName">@abcdefg12345</a>
<a href="#following" class="rightBox">追蹤中</a>
<a href="#fans" class="rightBox">粉絲</a>
<a href="#recently" class="rightBox">近期看過</a>
</div>
<div id="rightFooter">
<a href="#about" class="rightFooterItem">關於</a>
<a href="#manual" class="rightFooterItem">追蹤中</a>
<a href="#privacy" class="rightFooterItem">隱私條款</a>
<a href="#language" class="rightFooterItem">地區與語言</a>
</div>

`);

$("body").append(`
<div id="popOverBar">

<a href="#" class="leftSelectAble">
    <div class="leftIcon">
         <i class="bi bi-box-arrow-right"></i>
    </div>
    <div class="leftIconText">登出</div>
</a>

<a href="#" class="leftSelectAble">
    <div class="leftIcon">
        <i class="bi bi-gear-fill"></i>
    </div>
    <div class="leftIconText">設定</div>
</a>

<a href="#" class="leftSelectAble">
    <div class="leftIcon">
         <i class="bi bi-box-arrow-right"></i>
    </div>
    <div class="leftIconText">追蹤中</div>
</a>

<a href="#" class="leftSelectAble">
    <div class="leftIcon">
        <i class="bi bi-heart"></i>
    </div>
    <div class="leftIconText">粉絲</div>
</a>

<a href="#" class="leftSelectAble">
    <div class="leftIcon">
        <i class="bi bi-clock-history"></i>
    </div>
    <div class="leftIconText">近期看過</div>
</a>

</div>
`);

$("#FixedSetting").append(`

<div class="leftSelectAbleTitle">
    <div class="leftIconText">設定</div>
</div>
<a href="../SettingPagepersonalinfo/settingpagepersonalinfo.html" class="leftSelectAble">
    <div class="leftIconText">編輯個人檔案</div>
</a>
<a href="../settingPrivacy/settingPrivacy.html" class="leftSelectAble">
    <div class="leftIconText">隱私設定</div>
</a>


`);

if ($("#FixedRight").length == 0) {
    // console.log("沒有找到右邊的Fix");
    middleBarSize = "col-8";
    $("#middleBar").addClass("col-8");
    $("#middleBar").removeClass("col-7");
    $("#rightBar").hide();
}

function phoneMenu() {
    $("#FixedLeft").css("width", "60%");
    $("#FixedLeft").css("display", "flex");
    $("#FixedLeft>.leftSelectAble>.leftIconText").css("display", "flex");
    $("#otherBar>.leftSelectAble>.leftIconText").css("display", "flex");
    document.addEventListener("click", closephoneMenu);
}

function closephoneMenu(event) {
    if (event.clientX > $("#FixedLeft").width()) {
        $("#FixedLeft").css("width", "16.666667%");
        $("#FixedLeft").hide();
        document.removeEventListener("click", closephoneMenu);
    }
}

function settingMenu() {
    $("#FixedSetting").css("width", "60%");
    $("#FixedSetting").css("display", "flex");
    $("#FixedLeft>.leftSelectAble>.leftIconText").css("display", "flex");
    $("#otherBar>.leftSelectAble>.leftIconText").css("display", "flex");
    document.addEventListener("click", closesettingMenu);
}

function closesettingMenu(event) {
    if (event.clientX > $("#FixedSetting").width()) {
        $("#FixedSetting").css("width", "16.666667%");
        $("#FixedSetting").hide();
        document.removeEventListener("click", closesettingMenu);
    }
}



function showMorePop(){

    if($("#popOverBar").css("display") == "none"){

        window.addEventListener('click', function eventHandler(e){
            if (!(document.getElementById('popOverBar').contains(e.target))){
                $("#popOverBar").css("display","none");
                window.removeEventListener('click',eventHandler);
            }
        });   

        $("#popOverBar").css("display","flex"); 
    }
    
    else{
        $("#popOverBar").css("display","none"); 
    }
   

    this.event.stopPropagation();

}


function reloadPageSize() {

    $("#FixedLeft").css("width", "16.666667%");
    if ($("#FixedRight").length == 1) {
        if (window.innerWidth < rightBarBreakPoint || window.innerWidth < 500) {

            $("#rightBar").css("display", "none");
            $("#FixedRight").css("display", "none");
        }
        else {

            $("#rightBar").css("display", "flex");
            $("#FixedRight").css("display", "flex");
        }
    }

    if (window.innerWidth <= leftBarBreakPoint) {
        $("#middleBar").addClass("col-8");
        $("#middleBar").removeClass(middleBarSize);
        $("#leftBar").css("display", "none");
        $("#FixedLeft").css("display", "none");
        $("#phoneMenuButton").css("display", "flex");

        $("#settingbar").addClass("col-4");
        $("#settingbar").removeClass("col-2");

        $("#phoneSettingButton").css("display", "flex");

        

        $("#FixedSetting").css({
            "left": "0%",
            "width": "33.33333333%"
        });
        
    }
    else {
        $("#middleBar").removeClass("col-8");
        $("#middleBar").addClass(middleBarSize);
        $("#leftBar").css("display", "flex");
        $("#FixedLeft").css("display", "flex");
        $("#phoneMenuButton").css("display", "none");

        $("#settingbar").addClass("col-2");
        $("#settingbar").removeClass("col-4");
        
        $("#phoneSettingButton").css("display", "none");

        

        $("#FixedSetting").css({
            "left": "16.666667%",
            "width": "16.666667%"
        });
    }

    if (window.innerWidth <= settingBarBreakPoint) {
        $("#FixedSetting").css("display", "none");
        $("#settingbar").css("display", "none");
        
        $("#middleBar").addClass("col-12");
        $("#middleBar").removeClass("col-8");
    }
    else {
        $("#FixedSetting").css("display", "flex");
        $("#settingbar").css("display", "flex");
        
        $("#middleBar").removeClass("col-12");
        $("#middleBar").addClass("col-8");

        
    }

    if ($("#FixedLeft").width() < 155) {
        $("#FixedLeft>.leftSelectAble>.leftIconText").css("display", "none");
        $("#otherBar>.leftSelectAble>.leftIconText").css("display", "none");
    }
    else {
        $("#FixedLeft>.leftSelectAble>.leftIconText").css("display", "flex");
        $("#otherBar>.leftSelectAble>.leftIconText").css("display", "flex");
    }

    if (window.innerWidth >= settingBarBreakPoint && window.innerWidth <= leftBarBreakPoint ) {
        $("#FixedLeft").css("max-width", "33%");
    }
    else{
        $("#FixedLeft").css("max-width", "none");
    }



    document.removeEventListener("click", closephoneMenu);
}

onresize = () => {
    reloadPageSize();
};

reloadPageSize();

if (devMode == false) {
    console.log("%c等一下！", 'color: red; font-size: 48px; text-shadow: 0 0 5px #000000');
    console.log("%c如果有人叫您在這裡複製/貼上任何東西，您百分之百被騙了。", 'font-size: 16px;');
    console.log("%c在這裡貼上任何資訊，均有可能讓惡意攻擊者存取您的帳號。", 'font-size: 16px; color: red; font-weight:bold;');
}



//


$("body").append(`
<div id="phoneSettingButton" onclick="settingMenu()">
<i class="bi bi-gear"></i>
</div>
`);

$("body").append(`
<div id="popOverBar">

<a href="#" class="leftSelectAble">
    <div class="leftIcon">
        <i class="bi bi-gear-fill"></i>
    </div>
    <div class="leftIconText">設定</div>
</a>

</div>
`);
