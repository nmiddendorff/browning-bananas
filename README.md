# 🍌 browning-bananas

This browser extension is a simple way to visualize when DOM elements were created by a server.

## Installation
1. Download the chrome extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/browning-bananas/lljgjgjgjgjgjgjgjgjgjgjgjgjgjgjg)
1. Add the necessary fields to your app's HTML 
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
![NextJS example](http://url/to/img.png)