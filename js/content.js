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

const createTooltip = (element, elementTTL, createdTime, secondsLeft) => {
  const div = document.createElement("div");
  // set the position and style of the div element because we don't want to force position relative on parent
  // div.style.top = element.offsetTop + "px";
  // div.style.left = element.offsetLeft + "px";
  div.classList.add("tooltip");
  const mainText = `(${elementTTL}s) Rendered: ${convertEpochToCurrentTime(
    createdTime
  )}`;

  // create the circle_box container
  const circleBoxDiv = document.createElement("div");
  circleBoxDiv.className = "circle_box";

  // create the svg_box container
  const svgBoxDiv = document.createElement("div");
  svgBoxDiv.className = "svg_box";

  // create the SVG element
  const svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElem.setAttribute("viewBox", "0 0 200 200");

  // create the two circles in the SVG
  const circle1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle1.setAttribute("cx", "100");
  circle1.setAttribute("cy", "100");
  circle1.setAttribute("r", "95");
  const circle2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle2.setAttribute("cx", "100");
  circle2.setAttribute("cy", "100");
  circle2.setAttribute("r", "95");

  // create the span element for the number inside the circles
  const numberSpan = document.createElement("span");
  numberSpan.innerText = elementTTL;

  // add the circles and span to the SVG container
  svgElem.appendChild(circle1);
  svgElem.appendChild(circle2);

  // add the SVG container to the svg_box container
  svgBoxDiv.appendChild(svgElem);
  svgBoxDiv.appendChild(numberSpan);

  // create the time span
  const timeSpan = document.createElement("span");
  timeSpan.className = "time";
  timeSpan.innerText = mainText;

  // add the circle_box and time span to the tooltip container
  circleBoxDiv.appendChild(svgBoxDiv);
  div.appendChild(circleBoxDiv);
  div.appendChild(timeSpan);

  let toolTipExists = element.querySelector(".tooltip");
  if (toolTipExists) {
    toolTipExists.replaceWith(div);
  } else {
    element.appendChild(div);
  }
};

setInterval(function () {
  var selects = document.querySelectorAll("[data-created-date-time]");
  for (var i = 0; i < selects.length; i++) {
    const element = selects[i];

    const elementTTL = element.getAttribute("data-ttl");
    const currentTime = Date.now();

    const iso8601Value = element.getAttribute("data-created-date-time");
    const createdTime = Date.parse(iso8601Value);

    const expiresTime = createdTime + elementTTL * 1000;
    const secondsLeft = (expiresTime - currentTime) / 1000;

    if (expiresTime) {
      if (element) {
        const elapsedTime = currentTime - createdTime;
        const totalTime = expiresTime - createdTime;
        const percentage = Math.min(elapsedTime / totalTime, 1);

        element.style.setProperty("--progressValue", `${percentage * 100}`);

        const colorMap = {
          0: { background: "#EDD648", text: "black", percentage: 0 },
          0.1: { background: "#D8C343", text: "black", percentage: 10 },
          0.2: { background: "#C4AF3F", text: "black", percentage: 20 },
          0.3: { background: "#AF9C3A", text: "whitesmoke", percentage: 30 },
          0.4: { background: "#9B8836", text: "whitesmoke", percentage: 40 },
          0.5: { background: "#867531", text: "whitesmoke", percentage: 50 },
          0.6: { background: "#72612D", text: "whitesmoke", percentage: 60 },
          0.7: { background: "#5D4E28", text: "whitesmoke", percentage: 70 },
          0.8: { background: "#493A24", text: "whitesmoke", percentage: 80 },
          0.9: { background: "#34271F", text: "whitesmoke", percentage: 90 },
          1: { background: "#19130F", text: "whitesmoke", percentage: 100 },
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

        if (percentage < 1 || elementTTL === "0") {
          createTooltip(element, elementTTL, createdTime, secondsLeft);
        }
      }
    }
  }
}, 1000);
