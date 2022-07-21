// @ts-nocheck

function setStatus(message) {
  if (message === "pending") {
    return "🟣";
  }
  if (message === "in progress") {
    return "🟡";
  }
  if (message === "fixes") {
    return "🔴";
  }
  if (message === "review") {
    return "🔵";
  }
  if (message === "tbd") {
    return "⚪️";
  }
  if (message === "approved") {
    return "🟢";
  } else return "⚫️";
}

export default setStatus;
