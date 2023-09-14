// 監聽來自彈出視窗的訊息請求
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "changeSpeed") {
        changeVideoSpeed(request.speed);
    }
});

// 調整影片速度的函式
function changeVideoSpeed(speed) {
    var videos = document.querySelectorAll("video");
    videos.forEach(function (video) {
        video.playbackRate = speed;
    });
}
