import { mainClass } from "./tree.class.js";
import { PaneView } from "./pane.class.js";

let vLable;
let vBaseUrl;
let vTreeLink;
let vPaneLink;

const mainRootElement = document.querySelectorAll('[WFFType="TreeView"]');
const paneRootElement = document.querySelectorAll('[WFFType="PaneView"]');

function mainHtml(tree, elemKey) {
  return `
    ${
      tree
        ? `<div class="container${elemKey}" id="container${elemKey}"></div>`
        : ""
    }
  `;
}

function paneHtml(pane, elemKey) {
  return `
    ${
      pane
        ? `<div class="paneContainer${elemKey}" id="paneContainer${elemKey}"></div>`
        : ""
    }
  `;
}

const styleElement = document.createElement("style");
document.head.appendChild(styleElement);

mainRootElement.forEach((element, index) => {
  const RootElementNum = element.getAttribute("WFFNumber");

  console.log(RootElementNum);
  index = RootElementNum;
  if (RootElementNum) {
    if (element.getAttribute("vStyle") !== "false") {
      styleElement.innerHTML += variableStyle(index);
    }

    vLable = element.getAttribute("labels");
    vBaseUrl = element.getAttribute("baseUrl");
    vTreeLink = element?.getAttribute("treeLink");
    element.classList.add("mainDivContainer" + index);
    element.innerHTML += mainHtml(vTreeLink, index);

    const TreeView = {
      rootElement: `#container${index}`,
      index: RootElementNum,
      functions: element.getAttribute("onSelect")
        ? element.getAttribute("onSelect")
        : "",
      url: vBaseUrl + vTreeLink,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      label: [vLable],
      icons: ["icon", "statusIcon"],
      changeIcons: ["iconSelected"],
      iconsUrl: vBaseUrl,
    };
    const vMainClass = new mainClass(TreeView);
  }
});

paneRootElement.forEach((element, index) => {
  const paneRootElementNum = element.getAttribute("WFFNumber");
  if (!styleElement) {
    if (element.getAttribute("vStyle") !== "false") {
      styleElement.innerHTML += variableStyle(index);
    }
  }

  index = paneRootElementNum;
  vLable = element.getAttribute("labels");
  vBaseUrl = element.getAttribute("baseUrl");
  vPaneLink = element?.getAttribute("paneLink");
  element.innerHTML += paneHtml(vPaneLink, index);
  const paneView = {
    rootElement: `#paneContainer${index}`,
    index: paneRootElementNum,
    url: vBaseUrl + vPaneLink,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    label: [vLable],
    iconsUrl: vBaseUrl,
    vRootElement: mainRootElement ? `#container${index}` : "",
  };
  const vPaneClass = new PaneView(paneView);
});

function variableStyle(index) {
  return `html,
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
  .shadowed-div${index}{
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
  }
  .paneItem${index}{
    display:flex;
    height: 30px;
    align-items: center;
    cursor: pointer;
  }
  .paneItem${index} svg{
    margin-right: 8px;
  }
  .paneContainer${index}{
    width: 300px;
  }
  .paneNodeLabel${index}{
    cursor: pointer;
  }
  .paneItemContainer{
    height: calc(100vh - 90px);
    overflow-y: scroll;
    margin-top: 48px;
  }
  .searchBtn${index}{
  cursor: pointer;
  margin-left: 16px;
  border: 0;
  border-radius: 4px;
  background: #2c4cc9;
  height: 56px;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  }
  .mainDivContainer${index}{
  padding: 12px 24px;
  height: 100%;
  background: #fafafa;
  }
  .searchDiv${index}{
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .customContainer${index}{
  position: absolute;
  top: 100px;
  padding: 8px;
  border-radius: 2px;
  background: #fafafa;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
  scroll-behavior: smooth;
  max-width: 100%;
  right: 23px;
  left: 24px;
  bottom: 16px;
  z-index: 1;
  transition: left 0.5s ease;
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
  .containterIframe${index}{
  margin-left: 48px;
  width: calc(100% - 48px);
  z-index: -1;
  }
  .button-container${index}{
  display: flex;
  }
  .paneDivContainer${index}{
    overflow-y: scroll;
    height: calc(100vh - 100px);
    margin-top: 48px;
    width: 20%;
  }
  .paneText${index}{
    margin-bottom: 16px;
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
  .slidTree${index}{
  cursor: pointer;
  fill: #555; 
  transition: fill 0.3s ease; 
  width: 24px;
  height: 24px;
  transition: transform 0.5s ease-in-out;
  }
  .slidTree${index}:hover{
  fill: #007bff;
  }
  .sideBarShow${index}{
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  position: absolute;
  left: 6px;
  top: 124px;
  transform: translateY(-50%);
  width: 24px;
  height: 36px;
  margin: 0;
  background-color: #007bff;
  color: #fff;
  border: none;
  outline: none;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  }
  
  .sideBarShow${index}:hover{
  background-color: #0056b3;
  }
  
  .sideBarShow${index}::before{
  content: "";
  position: absolute;
  
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  width: 12px;
  height: 12px;
  border-style: solid;
  border-width: 2px;
  border-color: #fff;
  border-left: none;
  border-top: none;
  }
  
  @media (min-width: 768px){
  .button-container${index}{
   z-index: 1;
  }
  .customContainer${index}{
   position: relative;
   top: 0;
   right: 0;
   left: 0;
   overflow-y: scroll;
   height: calc(100vh - 100px);
   margin-right: 12px;
  }
  .section${index}{
   display: flex;
  }
  .containterIframe${index}{
   margin: 0;
   z-index: 0;
  }
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
  .parentNode${index}{
  margin: 0 -8px;
  }
  .changePosition${index}{
  left: 0;
  top: 0;
  position: relative;
  }
  `;
}
