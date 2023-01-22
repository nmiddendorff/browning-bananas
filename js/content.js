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
          0: { background: "#EDD648", text: "black" },
          0.1: { background: "#D8C343", text: "black" },
          0.2: { background: "#C4AF3F", text: "black" },
          0.3: { background: "#AF9C3A", text: "whitesmoke" },
          0.4: { background: "#9B8836", text: "whitesmoke" },
          0.5: { background: "#867531", text: "whitesmoke" },
          0.6: { background: "#72612D", text: "whitesmoke" },
          0.7: { background: "#5D4E28", text: "whitesmoke" },
          0.8: { background: "#493A24", text: "whitesmoke" },
          0.9: { background: "#34271F", text: "whitesmoke" },
          1: { background: "#19130F", text: "whitesmoke" },
        };

        Object.keys(colorMap).forEach((key) => {
          if (percentage >= key) {
            element.style.setProperty(
              "--dynamicBananaColor",
              `${colorMap[key].background}`
            );

            element.style.setProperty(
              "--dynamicBananaText",
              `${colorMap[key].text}`
            );
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
