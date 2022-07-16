// @ts-nocheck
figma.showUI(__html__);
figma.ui.resize(250, 500);

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

function changeProjectStatus(status: string) {
  const page = figma.currentPage;
  const statusNodes = page.findAll((node) => node.name === ".DS-status");

  const statusList = [
    "pending",
    "in progress",
    "fixes",
    "review",
    "tbd",
    "approved",
  ];

  statusNodes.forEach((node) => {
    node.setProperties({ "Property 1": `${status}` });
  });

  const regex = /['🟣🟡⚪️🟢🔴🔵⚫️🟠']/u;

  page.name = page.name.replace(regex, setStatus(status));
}

figma.ui.onmessage = (msg) => {
  changeProjectStatus(msg.type);

  figma.closePlugin();
};
