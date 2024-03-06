// 記得要讓href去撈資料庫


// 清空mainPage的postContent內貼文
$("#postContent").empty();
// 重製輪播與生成輪播
$("#carouselContainer").empty();

//生成貼文
let postPage = 1;
let setLimit = 10;
let lastNum;
$(async function() {

	let datas = await $.get(`./MainPagePost/${setLimit}/${postPage}`);



	//	動態生成貼文
	if (datas.data != null) {
		datas.data.map((ele) => {
			let postTime = Date.now() - ((ele.edittime != null) ? Date.parse(ele.edittime) : Date.parse(ele.createtime));
			let postDate = new Date((ele.edittime != null) ? ele.edittime : ele.createtime);
			let toDate = postDate.getFullYear() + "年" + (postDate.getMonth() + 1) + "月" + postDate.getDate() + "日";
			let dayTime = postTime / 1000 < 60
				? "剛剛"
				: postTime / (60 * 1000) - 5 <= 0
					? "幾分鐘前"
					: postTime / (60 * 1000) > 0 && postTime / (60 * 1000) < 60
						? Math.floor(postTime / (60 * 1000)) + "分鐘前"
						: postTime / (60 * 60 * 1000) < 24 && postTime / (60 * 60 * 1000) > 0
							? Math.floor(postTime / (60 * 60 * 1000)) + "小時前"
							: postTime / (60 * 60 * 1000 * 24) < 7 && postTime / (60 * 60 * 1000 * 24) > 0
								? Math.floor(postTime / (60 * 60 * 1000 * 24)) + "天前"
								: toDate;
			let cCount = (ele.commentCount == 0) ? "" : ele.commentCount + "個留言";
			let toUserPage = (ele.accountUser == ele.id) ? './personalPage' : `./personalPageForOthers-${ele.userAccount}`
			let isLikes = (ele.isLiked) ? "bi-heart-fill" : "bi-heart";
			let isCollects = (ele.isCollected) ? "bi-bookmark-fill" : "bi-bookmark";
			$("#postContent").append(`
					<div class="con">
	      				<div class="d-flex">
	        				<a class="user_head" href="${toUserPage}"><img src="${ele.usericon}" alt=""></a>
	        				<div class="user_font">
	          				<a class="user_name" href="${toUserPage}">@${ele.userAccount}</a> <br>
	          				${ele.username}
	        				</div>
	        				<div class="timeLine">
	        					${dayTime}
	        				</div >
	      				</div >
	      			<div class="pic_pos">
	        		<div id="pop${ele.postId}" class="pic_screen postBlock" data-pop-id = ${ele.postId}>
	          			<img class="pic_size " src="${ele.imgURL}" >
	        		</div>
	      		</div>
	      		<div class="info ">
	        		<div class="icon_pos d-flex" style="margin-top: -20px;">
	          	<form action="">
	            <i id="poppostlike${ele.postId}" class="bi ${isLikes} commentIcon doLike"  style="font-size: 25px;" data-postLike-id = ${ele.postId}></i>
	            <i id="poppostshare" class="bi bi-box-arrow-right commentIcon" style="font-size: 25px;"></i>
	            <i id="poppostcollect${ele.postId}" class="bi ${isCollects} commentIcon doCollect" style="font-size: 25px;" data-postCollect-id = ${ele.postId}></i>
	          </form>
	        </div>
	        <div class="context">
	          <p id="truncateId${ele.postId}" class=" truncate_text">${filterXSS(ele.posttext)}</p>
	          <div id="truncateIdDiv${ele.postId}">
	            <a onclick="toggleTruncate('truncateId${ele.postId}')">更多</a>
	          </div>
	          <button id="likes${ele.postId}" class="likeList" data-post-id="${ele.postId}" data-bs-toggle="modal" data-bs-target="#myModal">
	             <b id = "totallikes${ele.postId}">${ele.likeCount}個讚</b>
	          </button>
	        </div>
	        <div class="convert">
	          <div>
	            <button id="commentCount${ele.postId}" class="postBlock" data-bs-toggle="modal" data-bs-target="#exampleModal" data-pop-id = ${ele.postId}>
	              ${cCount}
	            </button>
	          </div>
	        </div>
	        <div class="input_pos ">
	          <div class="commentbox" >
	            <textarea id = "comment${ele.postId}" class="comment" type="text" data-doComments-id = ${ele.postId} placeholder="留言..."></textarea>
	          </div>
	        </div>
	        <div class="endLine"></div>
	      </div>
	    </div >
		`);

			// 刪除不必要的 toggleTruncate
			if ($(`#truncateId${ele.postId}`).height() <= 100) {
				$(`#truncateIdDiv${ele.postId}`).remove();
			}



		});

		//	動態生成輪播
		if (datas.data != null) {
			datas.data.map((ele) => {

				$("#carouselContainer").append(`
			<div class= "postBlock user_content" data-pop-id = ${ele.postId}>
      			<div class="user_head"><img src="${ele.usericon}"></div>
      			<div class="userName"><div class="textlimit">@${ele.userAccount}</div></div>
    		</div>
			`);
			})

			$(document).ready(function() {

				// 可調整參數
				$('#carouselLeftBtn').hide();
				$('#carouselRightBtn').hide();
				// 輪播內容物的顯示數量
				const contentToShow = 5;

				// 選取會使用的element，querySelector 會選取第一個使用此 class OR ID 的元素標籤
				const carousel = document.querySelector(".user_carousel");
				const container = document.querySelector(".user_container");
				const allContent = document.querySelectorAll(".user_content");
				const content = document.querySelector(".user_content");
				const prevBtn = document.querySelector(".prevBtn");
				const nextBtn = document.querySelector(".nextBtn");
				const contentComputeStyle = getComputedStyle(content);

				// 取得輪播內容物個數
				const contentAmount = document.querySelectorAll(".user_content").length;
				let distanceBetweenContent;

				// 輪播容器之位置
				let position = 0;

				const setContentWidth = function() {
					const carouselWidth = carousel.offsetWidth;

					// 可藉由給予輪播內容物margin-right屬性來設定內容物間的間隔
					const gap = parseInt(contentComputeStyle["margin-right"]);

					// 基於內容物的顯示數量，計算各內容物所需的大小
					const contentWidth = (carouselWidth - gap * Math.ceil(contentToShow - 1)) / contentToShow;



					allContent.forEach((el) => (el.style.width = `${contentWidth}px`));

					// 設定完內容物寬度後
					// 設定內容物間x軸之差，此為容器移動1單位之距離
					distanceBetweenContent = content.nextElementSibling.offsetLeft - content.offsetLeft;
				};

				const setContentHeight = function() {
					// 基於內容物的高度來設定容器高度
					carousel.style.height = contentComputeStyle.height;
				};

				// 按鈕初始化
				const defaultCarouselBtn = function() {
					if (contentAmount > contentToShow) {
						$('#carouselRightBtn').show();
					}
				};

				// 更新位置
				const move = function(step) {
					// 向右邏輯
					if ((contentAmount - step + position) < step) {
						var toRight = contentAmount - step + position;
						position -= toRight;
					}
					// 向左邏輯
					else if (position - step > 0) {
						position -= position;
					}
					// 在中間的時候左右都可以移動
					else {
						position -= step;
					}
					if (contentAmount > contentToShow) {
						if (position == 0) {
							$('#carouselLeftBtn').hide();
							$('#carouselRightBtn').show();
						} else if (position == - (contentAmount - step)) {
							$('#carouselLeftBtn').show();
							$('#carouselRightBtn').hide();
						} else {
							$('#carouselLeftBtn').show();
							$('#carouselRightBtn').show();
						}
					}
					return container.style.transform = `translateX(${distanceBetweenContent * position}px`;
				};
				prevBtn.addEventListener("click", function() {
					move(-5);
				});
				nextBtn.addEventListener("click", function() {
					move(5);
				});

				setContentWidth();
				setContentHeight();

				defaultCarouselBtn();
			});

		}
		$(".postBlock").on("click", popitout);
		$(".doLike").on("click", async function() {
			let likes = {}
			let getlikeandcollect = null;
			likes.postContextId = $(this).data("postlike-id");
			getlikeandcollect = datas.data;
			let targetPost = getlikeandcollect.find(post => post.postId == likes.postContextId);


			if (targetPost.isLiked) {

				let datas = $.ajax({
					url: "./morganpopoutliked",
					type: "DELETE",
					contentType: "application/json",
					data: JSON.stringify(likes),
					success: async function() {
						let updatedData = await $.get(`/morganpopoutliked/${likes.postContextId}`);
						$(`#totallikes${targetPost.postId}`).text(`${updatedData.data[0][0]}個讚`);
					}
				})
				targetPost.isLiked = 0;

				$(`#poppostlike${targetPost.postId}`).addClass("bi-heart").removeClass("bi-heart-fill");

			} else {
				let datas = $.ajax({
					url: "./morganpopoutliked",
					type: "POST",
					contentType: "application/json",
					data: JSON.stringify(likes),
					success: async function() {
						let newtotal = await $.get(`/morganpopoutliked/${likes.postContextId}`);
						$(`#totallikes${targetPost.postId}`).text(`${newtotal.data[0][0]}個讚`);
					}
				})
				targetPost.isLiked = 1;
				$(`#poppostlike${targetPost.postId}`).addClass("bi-heart-fill").removeClass("bi-heart");

			}
		});

		$(".doCollect").on("click", async function() {
			let collects = {};
			let getlikeandcollect = null;
			collects.postId = $(this).data("postcollect-id");
			getlikeandcollect = datas.data;
			let targetPost = getlikeandcollect.find(post => post.postId == collects.postId);
			if (targetPost.isCollected) {
				let datas = $.ajax({
					url: "./morganpopoutcollected",
					type: "DELETE",
					contentType: "application/json",
					data: JSON.stringify({
						postID: collects.postId})
					
				})

				targetPost.isCollected = 0;

				$(`#poppostcollect${targetPost.postId}`).addClass("bi-bookmark").removeClass("bi-bookmark-fill");

			} else {
				let datas = $.ajax({
					url: "./morganpopoutcollected",
					type: "POST",
					contentType: "application/json",
					data: JSON.stringify({
						postID: collects.postId})
					

				})
				targetPost.isCollected = 1;
				$(`#poppostcollect${targetPost.postId}`).addClass("bi-bookmark-fill").removeClass("bi-bookmark");

			}
		});

		//	按讚清單popup動態生成
		$(".likeList").on("click", async function() {
			$("#likesBlock").empty();
			let followingList = {}
			const postContextId = $(this).data("post-id");
			let follows = await $.get(`/followingList`)
			let likesdatas = await $.get(`/LikeUsers/${postContextId}`);
			
//			<div class="user_font">
//			            	<a class="user_name" href="">${ele.useraccount}</a>
//			           		<a class="user_name" href="">${ele.username}</a>
//			       		</div>
			likesdatas.data.map((ele) => {
			let toUserPage = (follows.data[0].id == ele.userLikedId) ? './personalPage' : `./personalPageForOthers-${ele.useraccount}`
			console.log(toUserPage)
				const isFollowing = follows.data.some((follow) => follow.followingUserID === ele.userLikedId);
				const isSelf = (follows.data[0].id === ele.userLikedId);
				$("#likesBlock").append(`
					<div class="d-flex users">
			        	<a class="user_head" href="${toUserPage}"><img src="${ele.usericon}" ></a>
			        	<div class="mapMidUsername">
          					<a href="${toUserPage}">@${ele.useraccount}</a>
          					<a href="${toUserPage}">${ele.username}</a>
        				</div>
			            
			       		${isSelf ? "" : `
				       		<button id = "follow${ele.userLikedId}" data-follow-id="${ele.userLikedId}" class=" btn following ${isFollowing ? "bg-success" : "bg-primary"} text-center text-white ms-auto ">
				       			${isFollowing ? "追蹤中" : "追蹤"}
			    	   		</button>
			       		`}
			       </div>
					`)
			})
			// 追蹤功能


			$(".following").on("click", async function() {
				//const followingUserID = $(this).data("follow-id");
				const isFollowing = $(this).hasClass('bg-success');
				followingList.followingUserID = $(this).data("follow-id")

				if (isFollowing) {
					const res = $.ajax({
						url: "/deleteFollowingList",
						type: "DELETE",
						contentType: "application/json",
						data: JSON.stringify(followingList),
					});
					$(this).toggleClass('bg-success bg-primary').text("追蹤");
				} else {
					const res = $.ajax({
						url: "/insertFollowingList",
						type: "POST",
						contentType: "application/json",
						data: JSON.stringify(followingList),
					});
					$(this).toggleClass('bg-success bg-primary').text("追蹤中");
				}



			});

		})

		$(".comment").on("keypress", async function(e) {

			let comment = {};
			let getcomment = null;
			comment.postContextId = $(this).data("docomments-id");
			getcomment = datas.data;
			let targetPost = getcomment.find(post => post.postId === comment.postContextId);
			if (e.key == "Enter") {

				e.preventDefault();
				if ($(this).val() != "") {
					reply = await $.ajax({
						url: "./morganpopoutcomment",
						type: "POST",
						contentType: "application/json",
						data: JSON.stringify({
							comments: $(this).val(),
							postContextId: targetPost.postId
						}),
						success: async function() {
							$(`#comment${targetPost.postId}`).val("");
							$(`#comment${targetPost.postId}`).css("height", 35.625);
							let getCommentCount = await $.get(`./MainPagePost`);
							let getCount = getCommentCount.data
							let targetComment = getCount.find(post => post.postId === comment.postContextId);
							// console.log(targetComment);
							$(`#commentCount${targetComment.postId}`).text(`${targetComment.commentCount}個留言`);
						}
					})
				}

			}
		})

		$(".comment").on("input", function(e) {
			this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
			this.style.height = 0;
			this.style.height = (this.scrollHeight) + 1.625 + "px";
		})
	}

})


//	PopOutPostFunction
let page = 0;
let likes = {}
let collects = {}
let popoutpostdata = null;
async function popitout() {
	likes.postContextId = $(this).data("pop-id");
	collects.postID = likes.postContextId;
	let res = await $.get(`/morganpopout/${likes.postContextId}`);
	popoutpostdata = res.data;
	if (popoutpostdata.postimg.length > 1) {
		$("#poppostrightarr").css("visibility", "visible");
	}
	$("#postaccount").attr("href", `/personalPageForOthers-${popoutpostdata.accountname}`)
	$("#postblockimg").prop("src", popoutpostdata.postimg[page]);
	$("#poppostaccountimg").prop("src", popoutpostdata.acconticon);
	$("#poppostaccountname").text(`@${popoutpostdata.accountname}`);
	$("#popposterimg").prop("src", popoutpostdata.acconticon);
	$("#popposteraccount").text(`@${popoutpostdata.accountname}`);
	$("#poppostertext").html(`${filterXSS(popoutpostdata.posttext)}`);
	let minbefore = (new Date() - new Date(popoutpostdata.posttime)) / (1000 * 60);
	$("#poppostertime").text(`${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
		Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
			Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
				Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
					Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
						Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}`);
	popoutpostdata.postMessage.map((ele) => {
		if (ele.commentuicon != null) {
			minbefore = (new Date() - new Date(ele.commenttime)) / (1000 * 60);
			$("#posttextblock").append(
				`<li class="posttextblockcontext dynamiccomments">
    <a href="/personalPageForOthers-${ele.commentaccount}" class="posttextimgblock">
                            <img class="posttextimg"
                                src="${ele.commentuicon}">
                        </a	>
                        <div class="posttextaccount">
                            <a href="/personalPageForOthers-${ele.commentaccount}" role="link" tabindex="0">@${ele.commentaccount}</a>
                        </div>
                        <div class="posttextpost">
                            <span>${filterXSS(ele.comment)}</span>
                            <br>
                            <span class="posttextposttime">${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
					Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
						Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
							Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
								Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
									Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}</span>
                            <hr>
                        </div>
    </li>    
    `
			)
		}

	})
	$("#poppostlike").addClass(popoutpostdata.liked ? "bi-heart-fill" : "bi-heart").removeClass(popoutpostdata.liked ? "bi-heart" : "bi-heart-fill");
	$("#poppostcollect").addClass(popoutpostdata.collected ? "bi-bookmark-fill" : "bi-bookmark").removeClass(popoutpostdata.collected ? "bi-bookmark" : "bi-bookmark-fill");
	$("#popposttotallike").text(`${popoutpostdata.totallike}人說讚`);
	$("body").css("overflow-y", 'hidden'); // 把右邊滾輪隱藏
	minbefore = (new Date() - new Date(popoutpostdata.latestliketime)) / (1000 * 60);
	if (popoutpostdata.latestliketime != null) {
		$("#poppostlatestlikettime").text(`${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
			Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
				Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
					Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
						Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
							Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}`);
	} else {
		$("#poppostlatestlikettime").text("");
	}

	// 後端也會檔，所以前端檔的比較粗略
	if ($("#userName").text() == $("#popposteraccount").text()) {
		$("#popposterdelete").show();
	}
	else {
		$("#popposterdelete").hide();
	}

	$("#postbackground").show();

	if ($("#inform").hasClass("show")) {
		$("#inform").offcanvas("hide");
		$("#postbackground").one("click", function() {
			$("#inform").offcanvas("show");
		});
	}

	// 重新綁定刪除貼文的按鈕
	$(`#popposterdelete`).off('click');
	$(`#popposterdelete`).on('click', function() {


		$.ajax({
			type: "delete",
			url: `/morgandeletepost/${likes.postContextId}`,
			success: function(res) {
				if (res.flag) {
					$("#postbackground").click();
					location.reload();
				}
				else {
					alert("這不是你的貼文！");
				}
			},
			error: function() {
				alert("無法刪除貼文！請檢查網路。");
			}
		})


	});

}



$("#postpopblock").on("click", function(event) {
	event.stopPropagation();
});

$("#postbackground").on("click", function() {
	document.getElementById("posttext").scrollTop = 0;
	$("#poppostrightarr").css("visibility", "hidden");
	$("#poppostleftarr").css("visibility", "hidden");
	$("body").css("overflow-y", "auto");	// 把右邊滾輪回復回去
	page = 0;
	popoutpostdata = null;
	$(".dynamiccomments").remove();
	$("#postbackground").hide();
});
$("#poppostrightarr").click(function() {
	if (page < popoutpostdata.postimg.length - 1) {
		page += 1;
		$("#postblockimg").prop("src", popoutpostdata.postimg[page]);
		if (page == popoutpostdata.postimg.length - 1) {
			$("#poppostrightarr").css("visibility", "hidden")
		} else {
			$("#poppostrightarr").css("visibility", "visible")
		}
		if (page == 0) {
			$("#poppostleftarr").css("visibility", "hidden")
		} else {
			$("#poppostleftarr").css("visibility", "visible")
		}
	}
})
$("#poppostleftarr").click(function() {
	if (page > 0) {
		page -= 1;
		$("#postblockimg").prop("src", popoutpostdata.postimg[page]);
		if (page == 0) {
			$("#poppostleftarr").css("visibility", "hidden")
		} else {
			$("#poppostleftarr").css("visibility", "visible")
		}
		if (page == popoutpostdata.postimg.length - 1) {
			$("#poppostrightarr").css("visibility", "hidden")
		} else {
			$("#poppostrightarr").css("visibility", "visible")
		}
	}
})

$("#poppostlike").click(async function() {
	if (popoutpostdata.liked) {
		let res = $.ajax({
			url: "/morganpopoutliked",
			type: "DELETE",
			contentType: "application/json",
			data: JSON.stringify(likes),
			success: async function() {
				let datas = await $.get(`/morganpopoutliked/${likes.postContextId}`);

				$(`#poppostlike${likes.postContextId}`).addClass('bi-heart');
				$(`#poppostlike${likes.postContextId}`).removeClass('bi-heart-fill');
				$(`#totallikes${likes.postContextId}`).text(`${datas.data[0][0]}個讚`);
				
				$("#popposttotallike").text(`${datas.data[0][0]}人說讚`);
				$(`#heart${likes.postContextId}`).html(`<i class="bi bi-heart"></i> ${datas.data[0][0]}`);
				//				console.log(`heart${likes.postContextId}`);
				minbefore = (new Date() - new Date(datas.data[0][1])) / (1000 * 60);
				if (datas.data[0][1] != null) {
					$("#poppostlatestlikettime").text(`${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
						Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
							Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
								Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
									Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
										Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}`);
				} else {
					$("#poppostlatestlikettime").text("");
				}

			}
		});
		popoutpostdata.liked = 0;
	} else {
		let res = $.ajax({
			url: "/morganpopoutliked",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(likes),
			success: async function() {
				let datas = await $.get(`/morganpopoutliked/${likes.postContextId}`);

				$(`#poppostlike${likes.postContextId}`).removeClass('bi-heart');
				$(`#poppostlike${likes.postContextId}`).addClass('bi-heart-fill');
				$(`#totallikes${likes.postContextId}`).text(`${datas.data[0][0]}個讚`);
				
				$("#popposttotallike").text(`${datas.data[0][0]}人說讚`);
				$(`#heart${likes.postContextId}`).html(`<i class="bi bi-heart"></i> ${datas.data[0][0]}`);
				minbefore = (new Date() - new Date(datas.data[0][1])) / (1000 * 60);
				if (datas.data[0][1] != null) {
					$("#poppostlatestlikettime").text(`${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
						Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
							Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
								Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
									Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
										Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}`);
				} else {
					$("#poppostlatestlikettime").text("");
				}
			}
		});

		popoutpostdata.liked = 1;
	}

	$("#poppostlike").addClass(popoutpostdata.liked ? "bi-heart-fill" : "bi-heart").removeClass(popoutpostdata.liked ? "bi-heart" : "bi-heart-fill");
})
$("#poppostcollect").click(function() {
	if (popoutpostdata.collected) {
		let res = $.ajax({
			url: "/morganpopoutcollected",
			type: "DELETE",
			contentType: "application/json",
			data: JSON.stringify(collects)
		});
		popoutpostdata.collected = 0;
	} else {
		let res = $.ajax({
			url: "/morganpopoutcollected",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(collects)
		});
		popoutpostdata.collected = 1;
	}
	$(`#poppostcollect${likes.postContextId}`).addClass(popoutpostdata.collected ? "bi-bookmark-fill" : "bi-bookmark").removeClass(popoutpostdata.collected ? "bi-bookmark" : "bi-bookmark-fill");
	$("#poppostcollect").addClass(popoutpostdata.collected ? "bi-bookmark-fill" : "bi-bookmark").removeClass(popoutpostdata.collected ? "bi-bookmark" : "bi-bookmark-fill");
})


$(".postmessginput").on("keypress", async function(e) {
	let reply
	if (e.which == 13) {
		reply = await $.ajax({
			url: "/morganpopoutcomment",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify({
				comments: $(".postmessginput").val(),
				postContextId: likes.postContextId,
			}),
			success: function(data) {
				return data;
			},
		});
		let getCommentCount = await $.get(`./MainPagePost`);
		let getCount = getCommentCount.data
		let targetComment = getCount.find(post => post.postId === likes.postContextId);
		$(".postmessginput").val("");
		$(".dynamiccomments").remove();
		$(`#mesg${likes.postContextId}`).html(`<i class="bi bi-chat-dots"> ${reply.data.length}`);
		$(`#commentCount${likes.postContextId}`).text(`${targetComment.commentCount}個留言`);
		reply.data.map((ele) => {
			if (ele.commentuicon != null) {
				minbefore = (new Date() - new Date(ele.commenttime)) / (1000 * 60);
				$("#posttextblock").append(
					`<li class="posttextblockcontext dynamiccomments">
    <div class="posttextimgblock">
                            <img class="posttextimg"
                                src="${ele.commentuicon}">
                        </div>
                        <div class="posttextaccount">
                            <a href="#" role="link" tabindex="0">@${ele.commentaccount}</a>
                        </div>
                        <div class="posttextpost">
                            <span>${filterXSS(ele.comment)}</span>
                            <br>
                            <span class="posttextposttime">${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
						Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
							Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
								Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
									Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
										Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}</span>
                            <hr>
                        </div>
    </li>    
    `
				)
			}
		})
		document.getElementById("posttext").scrollTop = document.getElementById("posttext").scrollHeight;

	}
})

// 加載貼文
async function loadPost() {

	let sh = document.documentElement.scrollHeight;
	let st = document.documentElement.scrollTop || document.body.scrollTop;
	let ch = document.documentElement.clientHeight;

	if (st + ch >= sh - 1) {
		window.removeEventListener("wheel", loadPost);
		let uploads
		uploads = await $.get(`./MainPagePost/${setLimit}/${postPage + 1}`);

		if (uploads.data.length < 10) {
			lastNum = uploads.data.length; //紀錄最後一筆data數
			uploads = await $.get(`./MainPagePost/${lastNum}/${postPage + 1}`);
		}
		postPage++;

		// 貼上貼文圖片及喜歡和留言數
		if (uploads.data.length != 0) {
			uploads.data.map((ele) => {
				let postTime = Date.now() - ((ele.edittime != null) ? Date.parse(ele.edittime) : Date.parse(ele.createtime));
				let postDate = new Date((ele.edittime != null) ? ele.edittime : ele.createtime);
				let toDate = postDate.getFullYear() + "年" + (postDate.getMonth() + 1) + "月" + postDate.getDate() + "日";
				let dayTime = postTime / 1000 < 60
					? "剛剛"
					: postTime / (60 * 1000) - 5 <= 0
						? "幾分鐘前"
						: postTime / (60 * 1000) > 0 && postTime / (60 * 1000) < 60
							? Math.floor(postTime / (60 * 1000)) + "分鐘前"
							: postTime / (60 * 60 * 1000) < 24 && postTime / (60 * 60 * 1000) > 0
								? Math.floor(postTime / (60 * 60 * 1000)) + "小時前"
								: postTime / (60 * 60 * 1000 * 24) < 7 && postTime / (60 * 60 * 1000 * 24) > 0
									? Math.floor(postTime / (60 * 60 * 1000 * 24)) + "天前"
									: toDate;
				let cCount = (ele.commentCount == 0) ? "" : ele.commentCount + "個留言";
				let toUserPage = (ele.accountUser == ele.id) ? './personalPage' : `./personalPageForOthers-${ele.userAccount}`
				let isLikes = (ele.isLiked) ? "bi-heart-fill" : "bi-heart";
				let isCollects = (ele.isCollected) ? "bi-bookmark-fill" : "bi-bookmark";
				$("#postContent").append(`
					<div class="con">
	      				<div class="d-flex">
	        				<a class="user_head" href="${toUserPage}"><img src="${ele.usericon}" alt=""></a>
	        				<div class="user_font">
	          				<a class="user_name" href="${toUserPage}">${ele.userAccount}</a> <br>
	          				${ele.username}
	        				</div>
	        				<div class="timeLine">
	        					${dayTime}
	        				</div >
	      				</div >
	      			<div class="pic_pos">
	        		<div id="pop${ele.postId}" class="pic_screen postBlock" data-pop-id = ${ele.postId}>
	          			<img class="pic_size " src="${ele.imgURL}" >
	        		</div>
	      		</div>
	      		<div class="info ">
	        		<div class="icon_pos d-flex" style="margin-top: -20px;">
	          	<form action="">
	            <i id="poppostlike${ele.postId}" class="bi ${isLikes} commentIcon doLike"  style="font-size: 25px;" data-postLike-id = ${ele.postId}></i>
	            <i id="poppostshare" class="bi bi-box-arrow-right commentIcon" style="font-size: 25px;"></i>
	            <i id="poppostcollect${ele.postId}" class="bi ${isCollects} commentIcon doCollect" style="font-size: 25px;" data-postCollect-id = ${ele.postId}></i>
	          </form>
	        </div>
	        <div class="context">
	          <p id="truncateId${ele.postId}" class=" truncate_text">${filterXSS(ele.posttext)}</p>
	          <div id="truncateIdDiv${ele.postId}">
	            <a onclick="toggleTruncate('truncateId${ele.postId}')">更多</a>
	          </div>
	          <button id="likes${ele.postId}" class="likeList" data-post-id="${ele.postId}" data-bs-toggle="modal" data-bs-target="#myModal">
	             <b id = "totallikes${ele.postId}">${ele.likeCount}個讚</b>
	          </button>
	        </div>
	        <div class="convert">
	          <div>
	            <button id="commentCount${ele.postId}" class="postBlock" data-bs-toggle="modal" data-bs-target="#exampleModal" data-pop-id = ${ele.postId}>
	              ${cCount}
	            </button>
	          </div>
	        </div>
	        <div class="input_pos ">
	          <div class="commentbox" >
	            <textarea id = "comment${ele.postId}" class="comment" type="text" data-doComments-id = ${ele.postId} placeholder="留言..."></textarea>
	          </div>
	        </div>
	        <div class="endLine"></div>
	      </div>
	    </div >
		`);

				// 刪除不必要的 toggleTruncate
				if ($(`#truncateId${ele.postId}`).height() <= 80) {
					$(`#truncateIdDiv${ele.postId}`).remove();
				}
			});
			if (uploads.data.length != 0) {
				uploads.data.map((ele) => {

					$("#carouselContainer").append(`
			<div class= "postBlock user_content" data-pop-id = ${ele.postId}>
      			<div class="user_head"><img src="${ele.usericon}"></div>
      			<div class="userName"><div class="textlimit">@${ele.username}</div></div>
    		</div>
			`);
				})

				$(document).ready(function() {

					// 可調整參數
					$('#carouselLeftBtn').hide();
					$('#carouselRightBtn').hide();
					// 輪播內容物的顯示數量
					const contentToShow = 5;

					// 選取會使用的element，querySelector 會選取第一個使用此 class OR ID 的元素標籤
					const carousel = document.querySelector(".user_carousel");
					const container = document.querySelector(".user_container");
					const allContent = document.querySelectorAll(".user_content");
					const content = document.querySelector(".user_content");
					const prevBtn = document.querySelector(".prevBtn");
					const nextBtn = document.querySelector(".nextBtn");
					const contentComputeStyle = getComputedStyle(content);

					// 取得輪播內容物個數
					const contentAmount = document.querySelectorAll(".user_content").length;
					let distanceBetweenContent;

					// 輪播容器之位置
					let position = 0;

					const setContentWidth = function() {
						const carouselWidth = carousel.offsetWidth;

						// 可藉由給予輪播內容物margin-right屬性來設定內容物間的間隔
						const gap = parseInt(contentComputeStyle["margin-right"]);

						// 基於內容物的顯示數量，計算各內容物所需的大小
						const contentWidth = (carouselWidth - gap * Math.ceil(contentToShow - 1)) / contentToShow;



						allContent.forEach((el) => (el.style.width = `${contentWidth}px`));

						// 設定完內容物寬度後
						// 設定內容物間x軸之差，此為容器移動1單位之距離
						distanceBetweenContent = content.nextElementSibling.offsetLeft - content.offsetLeft;
					};

					const setContentHeight = function() {
						// 基於內容物的高度來設定容器高度
						carousel.style.height = contentComputeStyle.height;
					};

					// 按鈕初始化
					const defaultCarouselBtn = function() {
						if (contentAmount > contentToShow) {
							$('#carouselRightBtn').show();
						}
					};

					// 更新位置
					const move = function(step) {
						// 向右邏輯
						if ((contentAmount - step + position) < step) {
							var toRight = contentAmount - step + position;
							position -= toRight;
						}
						// 向左邏輯
						else if (position - step > 0) {
							position -= position;
						}
						// 在中間的時候左右都可以移動
						else {
							position -= step;
						}
						if (contentAmount > contentToShow) {
							if (position == 0) {
								$('#carouselLeftBtn').hide();
								$('#carouselRightBtn').show();
							} else if (position == - (contentAmount - step)) {
								$('#carouselLeftBtn').show();
								$('#carouselRightBtn').hide();
							} else {
								$('#carouselLeftBtn').show();
								$('#carouselRightBtn').show();
							}
						}
						return container.style.transform = `translateX(${distanceBetweenContent * position}px`;
					};
					prevBtn.addEventListener("click", function() {
						move(-5);
					});
					nextBtn.addEventListener("click", function() {
						move(5);
					});

					setContentWidth();
					setContentHeight();

					defaultCarouselBtn();
				});

			}
			window.addEventListener("wheel", loadPost);
			$(".postBlock").off("click", popitout);
			$(".postBlock").on("click", popitout);
			$(".doLike").on("click", async function() {
				let likes = {}
				let getlikeandcollect = null;
				likes.postContextId = $(this).data("postlike-id");
				getlikeandcollect = uploads.data;
				let targetPost = getlikeandcollect.find(post => post.postId == likes.postContextId);


				if (targetPost.isLiked) {

					let uploads = $.ajax({
						url: "./morganpopoutliked",
						type: "DELETE",
						contentType: "application/json",
						data: JSON.stringify(likes),
						success: async function() {
							let updatedData = await $.get(`./morganpopoutliked/${likes.postContextId}`);
							$(`#totallikes${targetPost.postId}`).text(`${updatedData.data[0][0]}個讚`);
						}
					})
					targetPost.isLiked = 0;

					$(`#poppostlike${targetPost.postId}`).addClass("bi-heart").removeClass("bi-heart-fill");

				} else {
					let uploads = $.ajax({
						url: "./morganpopoutliked",
						type: "POST",
						contentType: "application/json",
						data: JSON.stringify(likes),
						success: async function() {
							let newtotal = await $.get(`./morganpopoutliked/${likes.postContextId}`);
							$(`#totallikes${targetPost.postId}`).text(`${newtotal.data[0][0]}個讚`);
						}
					})
					targetPost.isLiked = 1;
					$(`#poppostlike${targetPost.postId}`).addClass("bi-heart-fill").removeClass("bi-heart");

				}
			});

			$(".doCollect").on("click", async function() {
				let collects = {}
				let getlikeandcollect = null;
				collects.postId = $(this).data("postcollect-id");
				getlikeandcollect = uploads.data;
				let targetPost = getlikeandcollect.find(post => post.postId == collects.postId);

				if (targetPost.isCollected) {
					let uploads = $.ajax({
						url: "./morganpopoutcollected",
						type: "DELETE",
						contentType: "application/json",
						data: JSON.stringify({
							postID: collects.postId})

					})

					targetPost.isCollected = 0;

					$(`#poppostcollect${targetPost.postId}`).addClass("bi-bookmark").removeClass("bi-bookmark-fill");

				} else {
					let uploads = $.ajax({
						url: "./morganpopoutcollected",
						type: "POST",
						contentType: "application/json",
						data: JSON.stringify({
							postID: collects.postId})

					})
					targetPost.isCollected = 1;
					$(`#poppostcollect${targetPost.postId}`).addClass("bi-bookmark-fill").removeClass("bi-bookmark");

				}
			});

			//	按讚清單popup動態生成
			$(".likeList").on("click", async function() {
				$("#likesBlock").empty();
				let followingList = {}
				const postContextId = $(this).data("post-id");
				let follows = await $.get(`./followingList`)
				let likesdatas = await $.get(`./LikeUsers/${postContextId}`);
				likesdatas.data.map((ele) => {
					const isFollowing = follows.data.some((follow) => follow.followingUserID === ele.userLikedId);
					const isSelf = (follows.data[0].id === ele.userLikedId);
					$("#likesBlock").append(`
					<div class="d-flex users">
			        	<a class="user_head" href=""><img src="${ele.usericon}" alt=""></a>
			            <div class="user_font">
			           		<a class="user_name" href="../Personal Page/PersonalPageForOthers.html">${ele.username}</a>
			       		</div>
			       		${isSelf ? "" : `
				       		<button id = "follow${ele.userLikedId}" data-follow-id="${ele.userLikedId}" class=" btn following ${isFollowing ? "bg-success" : "bg-primary"} text-center text-white ms-auto ">
				       			${isFollowing ? "追蹤中" : "追蹤"}
			    	   		</button>
			       		`}
			       </div>
					`)
				})
				// 追蹤功能


				$(".following").on("click", async function() {
					//			const followingUserID = $(this).data("follow-id");
					const isFollowing = $(this).hasClass('bg-success');
					followingList.followingUserID = $(this).data("follow-id")

					if (isFollowing) {
						const res = $.ajax({
							url: "./deleteFollowingList",
							type: "DELETE",
							contentType: "application/json",
							data: JSON.stringify(followingList),
						});
						$(this).toggleClass('bg-success bg-primary').text("追蹤");
					} else {
						const res = $.ajax({
							url: "./insertFollowingList",
							type: "POST",
							contentType: "application/json",
							data: JSON.stringify(followingList),
						});
						$(this).toggleClass('bg-success bg-primary').text("追蹤中");
					}



				});

			})

			$(".comment").on("keypress", async function(e) {

				let comment = {};
				let getcomment = null;
				comment.postContextId = $(this).data("docomments-id");
				getcomment = uploads.data;
				let targetPost = getcomment.find(post => post.postId === comment.postContextId);
				if (e.key == "Enter") {
					e.preventDefault();
					if ($(this).val() != "") {
						reply = await $.ajax({
							url: "./morganpopoutcomment",
							type: "POST",
							contentType: "application/json",
							data: JSON.stringify({
								comments: $(this).val(),
								postContextId: targetPost.postId
							}),
							success: async function() {
								$(`#comment${targetPost.postId}`).val("");
								$(`#comment${targetPost.postId}`).css("height", 35.625);
								let getCommentCount = await $.get(`./MainPagePost`);
								let getCount = getCommentCount.data
								let targetComment = getCount.find(post => post.postId === comment.postContextId);
								// console.log(targetComment);
								$(`#commentCount${targetComment.postId}`).text(`${targetComment.commentCount}個留言`);
							}
						})
					}
				}
			})

			$(".comment").on("input", function(e) {
				this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
				this.style.height = 0;
				this.style.height = (this.scrollHeight) + 1.625 + "px";
			})
		}
		
	} 
}
window.addEventListener("wheel", loadPost);

// let 與const 在外面宣告就會成為全域變數，在裡面就只能使用於 function 內部
// const 宣告完變數就不會再改變