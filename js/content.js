function convertEpochToCurrentTime(epochTime) {
  let date = new Date(Number(epochTime));
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// HTML element with 2 attributes:
// data-ttl - Time to live in seconds
// data-created-date-time - ISO 8601 format
// data-created-date-time="2023-01-22T16:10:31.380Z" data-ttl="60"

setInterval(function () {
  var selects = document.querySelectorAll("[data-created-date-time]");
  for (var i = 0; i < selects.length; i++) {
    const element = selects[i];

    const elementTTL = element.getAttribute("data-ttl");
    const currentTime = Date.now();

    const expiresTime = Number(Date.now()) + elementTTL * 1000;
    const iso8601Value = element.getAttribute("data-created-date-time");
    const createdTime = Date.parse(iso8601Value);

    if (expiresTime) {
      if (element) {
        const elapsedTime = currentTime - createdTime;
        const totalTime = expiresTime - createdTime;
        const percentage = elapsedTime / totalTime;

        const colorMap = {
          0: "#EDD648",
          0.1: "#D8C343",
          0.2: "#C4AF3F",
          0.3: "#AF9C3A",
          0.4: "#9B8836",
          0.5: "#867531",
          0.6: "#72612D",
          0.7: "#5D4E28",
          0.8: "#493A24",
          0.9: "#34271F",
          1: "#19130F",
        };

        Object.keys(colorMap).forEach((key) => {
          if (percentage >= key) {
            element.style.backgroundColor = colorMap[key];
          }
        });

        element.setAttribute(
          "data-before",
          `🍌 (${elementTTL}s) Last Rendered: ${convertEpochToCurrentTime(
            createdTime
          )}`
        );
      }
    }
  }
}, 1000);
