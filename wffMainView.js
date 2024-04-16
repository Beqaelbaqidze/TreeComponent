import { mainClass } from "./tree.class.js";
import { PaneView } from "./pane.class.js";

let vLable;
let vBaseUrl;
let vTreeLink;
let vPaneLink;
let vExButtons;
let vTreeContainerStyle;
let vPaneContainerStyle;
const mainRootElement = document.querySelectorAll('[WFFType="TreeView"]');
const paneRootElement = document.querySelectorAll('[WFFType="PaneView"]');
function mainHtml(tree, elemKey) {
  return `
    ${
      tree
        ? `<div class="customContainer${elemKey}" id="customContainer${elemKey}"></div>`
        : ""
    }
  `;
}

function paneHtml(pane, elemKey) {
  return `
    ${
      pane
        ? `<div class="paneItemContainer${elemKey}" id="paneItemContainer${elemKey}"></div>`
        : ""
    }
  `;
}

const styleElement = document.createElement("style");
document.head.appendChild(styleElement);

mainRootElement.forEach((element, index) => {
  styleElement.innerHTML = mainStyle(index + 1);
  const RootElementNum = element.getAttribute("WFFNumber");
  vTreeContainerStyle = element.getAttribute("treeContainerStyle");

  console.log(RootElementNum);
  index = RootElementNum;
  if (RootElementNum) {
    if (element.getAttribute("vStyle") !== "false") {
      styleElement.innerHTML += treeStyle(index);
    }

    vLable = element.getAttribute("labels");
    vBaseUrl = element.getAttribute("baseUrl");
    vTreeLink = element?.getAttribute("treeLink");
    vExButtons = element?.getAttribute("exButtons");
    element.classList.add("mainDivContainer" + index);
    element.innerHTML += mainHtml(vTreeLink, index);
    console.log(vExButtons);
    const TreeView = {
      rootElement: `#customContainer${index}`,
      index: RootElementNum,
      functions: element.getAttribute("onSelect")
        ? element.getAttribute("onSelect")
        : "",
      url: vBaseUrl + vTreeLink,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      label: vLable.split(","),
      icons: ["icon", "statusIcon"],
      changeIcons: ["iconSelected"],
      iconsUrl: vBaseUrl,
      containerButtons: vExButtons,
    };
    const vMainClass = new mainClass(TreeView);
  }
});

paneRootElement.forEach((element, index) => {
  const paneRootElementNum = element.getAttribute("WFFNumber");
  vPaneContainerStyle = element.getAttribute("paneContainerStyle");
  console.log(vPaneContainerStyle);

  if (element.getAttribute("vStyle") !== "false") {
    styleElement.innerHTML += paneStyle(index + 1);
  }

  index = paneRootElementNum;
  vLable = element.getAttribute("labels");
  vBaseUrl = element.getAttribute("baseUrl");
  vPaneLink = element?.getAttribute("paneLink");
  element.innerHTML += paneHtml(vPaneLink, index);
  const paneView = {
    rootElement: `#paneItemContainer${index}`,
    index: paneRootElementNum,
    url: vBaseUrl + vPaneLink,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    label: vLable.split(","),
    iconsUrl: vBaseUrl,
    vRootElement: mainRootElement ? `#customContainer${index}` : "",
  };
  const vPaneClass = new PaneView(paneView);
});
function paneStyle(index) {
  return `
  .paneItem${index}{
    display:flex;
    height: 20px;
    align-items: center;
    cursor: pointer;
    padding: 4px;
    z-index:1;
  }
  .paneItem${index} svg{
    margin-right: 8px;
  }
 .paneItem${index}:hover{
  background-color: #e7eaf6;
 }
  .paneNodeLabel${index}{
    cursor: pointer;
  }
  .paneItemContainer${index}{
    ${vPaneContainerStyle}
    overflow-y: scroll;
    resize: horizontal;
  }`;
}
function treeStyle(index) {
  return `
  .shadowed-div${index}{
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
  }
  .customContainer${index}{
  ${vTreeContainerStyle}
  overflow-y: scroll;
  resize: horizontal;
  }
  .customContainer${index} p{
  font-family: "NotoSansGeorgianMedium";
    font-size: 16px;
    -moz-font-feature-settings: 'case';
    -webkit-font-feature-settings: 'case';
    font-feature-settings: 'case' on;
  }
  .nodeTreeLi${index}{
  margin-left: 12px;
 
  }
  .nodeContainerParent${index},
  .nodeContainer${index}{
  display: flex;
  align-items: center;
  flex-direction: row;
  }
  .nodeContainer${index}{
  width: 100%;
  margin: 8px;
  padding: 4px;
  cursor: pointer;
  }
  .btnTree${index}{
  padding: 8px;
  display: flex;
  background-color: inherit;
  border: 0;
  cursor: pointer;
  z-index: 1;
  }
  .arrow${index}{
  z-index: -1;
  }
  svg.disabled{
  opacity: 0.5; 
  pointer-events: none; 
  }

  .button-container${index}{
  display: flex;
  }
 
  .button-container${index} button{
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc; 
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); 
  transition: background-color 0.3s ease;
  border: none;
  padding: 2px 4px;
  border-start-end-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  }
  
  .button-container${index} button:hover{
  background-color: #6c9eee;
  color: #fff; 
  }
  
  .treeButtons${index}{
  display: flex;
  align-items: center;
  padding: 4px 0;
  margin-right: 36px;
  }
  .tooltip${index}{
  position: relative;
  display: inline-block;
  }
  
  .tooltip${index} .tooltiptext${index}{
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.6s;
  }
  
  .tooltip${index}:hover .tooltiptext${index}{
  visibility: visible;
  opacity: 1;
  }
  
  .treeButtons${index} svg{
  margin-left: 12px;
  cursor: pointer;
  }
  
  .treeReload${index}{
  cursor: pointer;
  }
  .treeButtons${index} svg:hover{
  fill: #007bff;
  }
  * {
  scrollbar-width: thin;
  scrollbar-color: grey;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px; /* width of the entire scrollbar */
}
  .parentNode${index}{
    margin: 0 -8px;
    }
  `;
}
function mainStyle(index) {
  return `
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
    display: block;
    }
    body {
    line-height: 1;
    }
    ol,
    ul {
    list-style: none;
    }
    blockquote,
    q {
    quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
    content: "";
    content: none;
    }
    table {
    border-collapse: collapse;
    border-spacing: 0;
    }
.close${index}{
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  }
  
  .close${index}:hover,
  .close${index}:focus{
  color: black;
  text-decoration: none;
  cursor: pointer;
  }
  .modal${index}{
  display: none; 
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgba(0, 0, 0, 0.4); 
  }
  
  
  .modal-content${index}{
  background-color: #fefefe;
  margin: 15% auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 80%; 
  }
  .contextMenu${index}{
  position: absolute; 
  background-color: white; 
  border: 1px solid #ccc; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  z-index: 1000; 
  }
  
  
  .contextMenu${index} ul{
  list-style-type: none; 
  margin: 0; 
  padding: 0; 
  }
  
  .contextMenu${index} li{
  cursor: pointer; 
  padding: 8px 16px; 
  }
  
  
  .contextMenu${index} li:hover{
  background-color: #f0f0f0; 
  }
  .hidden${index}{
  display: none;
  }
  .rotated${index}{
  transform: rotate(90deg);
  transition: transform 0.3s ease-in-out;
  }
  
  .highlight${index}{
  opacity: 0.5;
  transition: background-color 0.2s ease;
  }
  
  .none${index}{
  display: none;
  }
  
  .inline-block${index}{
  display: inline-block;
  }
  
  .selected${index}{
  border-radius: 4px;
  border: 1px solid #6c9eee;
  }
  
  .slidebtn${index}{
  width: 56px;
  margin-right: 12px;
  }
  .slidebtn${index}{
  height: 56px;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 2px;
  background: #2c4cc9;
  }
  .hideTree${index}{
  transition: left 0.5s ease-in;
  display: none;
  visibility: hidden;
  transform-origin: right;
  }
  .hideArrow${index}{
  visibility: hidden;
  }
  .rotateSideBtn${index}{
  transform: rotate(180deg);
  transition: transform 0.5s ease-in-out;
  }
  .hideSideTree${index}{
  width: 24px;
  overflow: hidden;
  }
  .hideSideTree${index} ul{
  display: none;
  }
 
  .changePosition${index}{
  left: 0;
  top: 0;
  position: relative;
  }
  .paneSelected${index}{
    background-color: #a2a8d3;
    color: white;
  }`;
}
