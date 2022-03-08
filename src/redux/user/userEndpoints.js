export let endpoints;

if (
  window.location.hostname === "edeskio.com" ||
  window.location.hostname === "www.edeskio.com"
) {
  endpoints = {
    userInfo: "https://graph.microsoft.com/v1.0/me",
  };
}
else if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === ""
) {
  endpoints = {
    userInfo: "https://graph.microsoft.com/v1.0/me",
  };
} else {
  endpoints = {
    userInfo: "https://graph.microsoft.com/v1.0/me",
  };
}
