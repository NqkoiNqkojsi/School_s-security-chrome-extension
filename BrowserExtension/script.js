function onGot(historyItems) {
    for (const item of historyItems) {
      listHistoryItems.url = item.url;
      listHistoryItems.lastVisitTime = item.lastVisitTime;
      listHistoryItems.title = item.title;
      console.log(listHistoryItems)
    }
  }
chrome.history.search({text: "",startTime: 0,}).then(onGot);
const listHistoryItems = new Object();