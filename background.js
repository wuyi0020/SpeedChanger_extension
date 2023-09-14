// 監聽頁面跳轉事件
chrome.webNavigation.onCompleted.addListener(function (details) {
    // 檢查是否存在先前記憶的速度
	console.log("onCompleted");
    chrome.storage.local.get(["speed_" + details.tabId], function (data) {
        if (data["speed_" + details.tabId]) {
            var speed = parseFloat(data["speed_" + details.tabId]);
            if (!isNaN(speed)) {
                // 執行速度設定
                chrome.scripting.executeScript(
                    {
                        target: { tabId: details.tabId },
                        files: ["contentScript.js"],
                    },
                    function () {
                        chrome.tabs.sendMessage(details.tabId, { action: "changeSpeed", speed: speed });
                    }
                );
            }
        }
    });
});
chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
    // 檢查是否存在先前記憶的速度
	console.log("onDOMContentLoaded");
    chrome.storage.local.get(["speed_" + details.tabId], function (data) {
        if (data["speed_" + details.tabId]) {
            var speed = parseFloat(data["speed_" + details.tabId]);
            if (!isNaN(speed)) {
                // 執行速度設定
                chrome.scripting.executeScript(
                    {
                        target: { tabId: details.tabId },
                        files: ["contentScript.js"],
                    },
                    function () {
                        chrome.tabs.sendMessage(details.tabId, { action: "changeSpeed", speed: speed });
                    }
                );
            }
        }
    });
});
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    // 檢查是否存在先前記憶的速度
	console.log("onHistoryStateUpdated");
	console.log(details);
    chrome.storage.local.get(["speed_" + details.tabId], function (data) {
        if (data["speed_" + details.tabId]) {
            var speed = parseFloat(data["speed_" + details.tabId]);
            if (!isNaN(speed)) {
                // 執行速度設定
                chrome.scripting.executeScript(
                    {
                        target: { tabId: details.tabId },
                        files: ["contentScript.js"],
                    },
                    function () {
                        chrome.tabs.sendMessage(details.tabId, { action: "changeSpeed", speed: speed });
                    }
                );
            }
        }
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // 檢查是否存在先前記憶的速度
	console.log(`tabId:${tabId}  changeInfo${JSON.stringify(changeInfo)} tab${JSON.stringify(tab)}`);
	
    chrome.storage.local.get(["speed_" + tabId], function (data) {
        if (data["speed_" + tabId]) {
            var speed = parseFloat(data["speed_" + tabId]);
            if (!isNaN(speed)) {
                // 執行速度設定
                chrome.scripting.executeScript(
                    {
                        target: { tabId: tabId },
                        files: ["contentScript.js"],
                    },
                    function () {
                        chrome.tabs.sendMessage(tabId, { action: "changeSpeed", speed: speed });
                    }
                );
            }
        }
    });
});

chrome.webNavigation.onTabReplaced.addListener(function (details) {
    // 檢查是否存在先前記憶的速度
	console.log("onTabReplaced");
    chrome.storage.local.get(["speed_" + details.tabId], function (data) {
        if (data["speed_" + details.tabId]) {
            var speed = parseFloat(data["speed_" + details.tabId]);
            if (!isNaN(speed)) {
                // 執行速度設定
                chrome.scripting.executeScript(
                    {
                        target: { tabId: details.tabId },
                        files: ["contentScript.js"],
                    },
                    function () {
                        chrome.tabs.sendMessage(details.tabId, { action: "changeSpeed", speed: speed });
                    }
                );
            }
        }
    });
});



// 監聽擴充功能載入事件
chrome.runtime.onInstalled.addListener(function (details) {
    console.log(".onInstalled.");
    // 檢查是否存在先前記憶的速度
    chrome.storage.local.get(["speed_" + details.tabId], function (data) {
        if (data.speed) {
            var speed = parseFloat(data.speed);
            if (!isNaN(speed)) {
                // 應用速度設定到所有當前的標籤頁
                chrome.tabs.query({}, function (tabs) {
                    tabs.forEach(function (tab) {
                        chrome.tabs.sendMessage(tab.id, { action: "changeSpeed", speed: speed }, function (response) {
                            // 確認訊息已成功傳送
                            if (chrome.runtime.lastError) {
                                console.error(chrome.runtime.lastError);
                            }
                        });
                    });
                });
            }
        }
    });
});
