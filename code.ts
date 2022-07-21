// @ts-nocheck
import nameCleaner from "./src/utils.ts";

figma.showUI(__html__);
figma.ui.resize(250, 520);

function isBalls(reg, text) {
  return reg.test(text);
}

function nameCleaner(name) {
  return name.replace(/[\W_]+/g, " ").trim();
}

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

//^ change status of one frame only
function changePageStatus(status: string, frameName) {
  const page = figma.currentPage;
  const pageNode = page.findOne((node) => node.name === frameName);
  const statusNode = pageNode.findOne((node) => node.name === ".DS-status");
  statusNode.setProperties({ status: `${status}` });
}

//^ change status of the page
function changeProjectStatus(status: string) {
  const page = figma.currentPage;
  const statusNodes = page.findAll((node) => node.name === ".DS-status");

  statusNodes.forEach((node) => {
    if (node.parent.parent.name === nameCleaner(page.name)) {
      node.setProperties({ status: `${status}` });
    }
  });

  const regex = /['🟣🟡⚪️🟢🔴🔵⚫️🟠']/u;

  if (isBalls(regex, page.name)) {
    page.name = page.name.replace(regex, setStatus(status));
  }
}

function currentSelection() {
  const result = {};
  const sel = figma.currentPage.selection;
  if (sel.length != 0) {
    result.length = sel.length;
    result.type = sel[0].type;
    result.name = sel[0].name;
    result.parent = sel[0].parent;
    result.content = sel;
    return result;
  } else {
    return false;
  }
}

const selection = currentSelection();

figma.ui.onmessage = (msg) => {
  if (!selection || selection.name === nameCleaner(figma.currentPage.name)) {
    changeProjectStatus(msg.type);
  }
  if (selection.length > 1) {
    selection.content.forEach((node) => {
      changePageStatus(msg.type, node.name);
    });
  }
  if (selection.name === "QA" || selection.name === "Documentation") {
    changePageStatus(msg.type, selection.name);
  }

  figma.closePlugin();
};
