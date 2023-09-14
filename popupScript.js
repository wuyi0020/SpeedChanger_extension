document.addEventListener("DOMContentLoaded", function () {
    // 載入先前記憶的速度
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tabId = tabs[0].id;
        chrome.storage.local.get(["speed_" + tabId], function (data) {
            if (data["speed_" + tabId]) {
                document.getElementById("speed-input").value = data["speed_" + tabId];
                buttonClickHandler(data["speed_" + tabId]);
            }
        });
    });

    function inputget(){
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tabId = tabs[0].id;
            chrome.storage.local.get(["speed_" + tabId], function (data) {
                if (data["speed_" + tabId]) {
                    document.getElementById("speed-input").value = data["speed_" + tabId];
                    buttonClickHandler(data["speed_" + tabId]);
                }
            });
        });
    }

    // 按鈕點擊事件處理函式
    function buttonClickHandler(speed) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    files: ["contentScript.js"],
                },
                function () {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "changeSpeed", speed: speed });
                }
            );
        });
    }

    // 左右調整按鈕點擊事件處理函式
    document.getElementById("decrease-speed").addEventListener("click", function () {
        var speedInput = document.getElementById("speed-input");
        var speed = parseFloat(speedInput.value) - 0.05;
        if (!isNaN(speed)) {
            speedInput.value = speed.toFixed(2);
            buttonClickHandler(speed);
            // 儲存調整後的速度
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                var tabId = tabs[0].id;
                chrome.storage.local.set({ ["speed_" + tabId]: speed.toFixed(2) });
            });
        }
    });

    document.getElementById("increase-speed").addEventListener("click", function () {
        var speedInput = document.getElementById("speed-input");
        var speed = parseFloat(speedInput.value) + 0.05;
        if (!isNaN(speed)) {
            speedInput.value = speed.toFixed(2);
            buttonClickHandler(speed);
            // 儲存調整後的速度
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                var tabId = tabs[0].id;
                chrome.storage.local.set({ ["speed_" + tabId]: speed.toFixed(2) });
            });
        }
    });

    // 監聽來自popup.js的訊息
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action === "changeSpeed") {
            var videos = document.querySelectorAll("video"); // 選取所有的video元素
            var speed = message.speed; // 從訊息中取得速度值
            for (var i = 0; i < videos.length; i++) {
                videos[i].playbackRate = speed; // 將播放速度設定為指定的速度值
            }
        }
    });

    // 監聽分頁切換事件
    chrome.tabs.onActivated.addListener(function (activeInfo) {
        chrome.tabs.get(activeInfo.tabId, function (tab) {
            var tabId = tab.id;
            chrome.storage.local.get(["speed_" + tabId], function (data) {
                if (data["speed_" + tabId]) {
                    chrome.tabs.sendMessage(tabId, { action: "changeSpeed", speed: data["speed_" + tabId] });
                }
            });
        });
    });

    // 輸入框值變更事件處理函式
    document.getElementById("speed-input").addEventListener("input", function () {
        var speedInput = document.getElementById("speed-input");
        var speed = parseFloat(speedInput.value);
        if (isNaN(speed)) {
            document.getElementById("error-message").textContent = "請輸入有效數字";
        } else {
            document.getElementById("error-message").textContent = "";
            buttonClickHandler(speed);
            // 儲存調整後的速度
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                var tabId = tabs[0].id;
                chrome.storage.local.set({ ["speed_" + tabId]: speed.toFixed(2) });
            });
        }
    });

    // 綁定固定數字按鈕點擊事件
    document.getElementById("btn-0.5").addEventListener("click", function () {
        buttonClickHandler(0.5);
        // 儲存調整後的速度
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tabId = tabs[0].id;
            chrome.storage.local.set({ ["speed_" + tabId]: "0.5" });
        });
        //把input改成按下的數字
        inputget();
    });
    document.getElementById("btn-0.75").addEventListener("click", function () {
        buttonClickHandler(0.75);
        // 儲存調整後的速度
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tabId = tabs[0].id;
            chrome.storage.local.set({ ["speed_" + tabId]: "0.75" });
        });
        //把input改成按下的數字
        inputget();
    });
    document.getElementById("btn-1.0").addEventListener("click", function () {
        buttonClickHandler(1.0);
        // 儲存調整後的速度
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tabId = tabs[0].id;
            chrome.storage.local.set({ ["speed_" + tabId]: "1.0" });
        });
        //把input改成按下的數字
        inputget();
    });
    document.getElementById("btn-1.25").addEventListener("click", function () {
        buttonClickHandler(1.25);
        // 儲存調整後的速度
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tabId = tabs[0].id;
            chrome.storage.local.set({ ["speed_" + tabId]: "1.25" });
        });
        //把input改成按下的數字
        inputget();
    });
    document.getElementById("btn-1.5").addEventListener("click", function () {
        buttonClickHandler(1.5);
        // 儲存調整後的速度
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tabId = tabs[0].id;
            chrome.storage.local.set({ ["speed_" + tabId]: "1.5" });
        });
        //把input改成按下的數字
        inputget();
    });
    document.getElementById("btn-1.75").addEventListener("click", function () {
        buttonClickHandler(1.75);
        // 儲存調整後的速度
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tabId = tabs[0].id;
            chrome.storage.local.set({ ["speed_" + tabId]: "1.75" });
        });
        //把input改成按下的數字
        inputget();
    });
    document.getElementById("btn-2.0").addEventListener("click", function () {
        buttonClickHandler(2.0);
        // 儲存調整後的速度
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tabId = tabs[0].id;
            chrome.storage.local.set({ ["speed_" + tabId]: "2.0" });
        });
        //把input改成按下的數字
        inputget();
    });
    document.getElementById("btn-3.0").addEventListener("click", function () {
        buttonClickHandler(3.0);
        // 儲存調整後的速度
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tabId = tabs[0].id;
            chrome.storage.local.set({ ["speed_" + tabId]: "3.0" });
        });
        //把input改成按下的數字
        inputget();
    });
});
