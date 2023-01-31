# 🍌 browning-bananas

This browser extension is a simple way to visualize when DOM elements were created by a server.

## Installation Options
### (1) Chrome web Store
1. Add [Browning Bananas Extension](https://chrome.google.com/webstore/detail/browning-bananas-extensio/pgoddcbpnbdmoaokpmadjdomleldjjki)

### (2) Manual
1. Clone this repo
2. chrome://extensions/
3. Click Load unpacked and select the browning-bananas directory
4. Add the necessary fields to your app's HTML 
## Usage

| attribute   |      type      |  Description | Example |
|----------|:-------------:|------|------|
| `data-ttl` |  number | Time to live in seconds. (For frameworks like NextJS this is your revalidate value) | 60 |
| `data-created-date-time` |  string | ISO 8601 creation date time stamp | 2023-01-22T16:10:31.380Z |

example:
```jsx
<div data-ttl="60" data-created-date-time={new Date().toISOString()}></div>
```

## Screenshots
![NextJS example](https://raw.githubusercontent.com/nmiddendorff/browning-bananas/main/readme-images/next-screenshot.png)
