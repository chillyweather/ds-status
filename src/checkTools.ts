// @ts-nocheck

export function checkTools() {
  const internalTools = figma.root.findOne((node) => {
    const result =
      node.name === "🧨 .DO NOT TOUCH!!! - internal tools" &&
      node.type === "PAGE";
    return result;
  });

  if (!internalTools) {
    figma.closePlugin();
    figma.notify('Please, add "🧨 .DO NOT TOUCH!!! - internal tools" page to your project')
    return;
  }
}
