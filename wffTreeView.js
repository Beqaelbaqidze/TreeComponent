import { mainClass } from "./main.class.js";
import { SearchClass } from "./search.class.js";
import { CadTreeClass } from "./cadTree.class.js";

let vLable;
let vBaseUrl;
let vTreeLink;
let vIframLink;
let vSearchLink;
const mainRootElement = document.querySelectorAll('[WFFType="TreeView"]');

function mainHtml(tree, search, view, elemKey) {
  return ` ${
    search
      ? `<div class="searchDiv${elemKey}" id="searchContainer${elemKey}"></div>`
      : ""
  }
  <div class="section${elemKey}">
    ${
      tree
        ? `<div class="container${elemKey}" id="container${elemKey}"></div>`
        : ""
    }
    ${
      view
        ? `<div class="containterIframe${elemKey}" id="containterIframe${elemKey}"></div>`
        : ""
    }
  </div>`;
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

    // Added index parameter
    // Your existing code here

    // Now you can use the 'index' variable to access the index of each element
    console.log("Index of current element:", index);

    vLable = element.getAttribute("labels");
    vBaseUrl = element.getAttribute("baseUrl");
    vTreeLink = element?.getAttribute("treeLink");
    vIframLink = element?.getAttribute("viewLink");
    vSearchLink = element?.getAttribute("searchLink");
    element.classList.add("mainDivContainer" + index);
    element.innerHTML += mainHtml(vTreeLink, vSearchLink, vIframLink, index);

    const TreeView = {
      rootElement: `#container${index}`,
      index: RootElementNum,
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
    const custom1 = {
      rootElement: `#searchContainer${index}`,
      index: RootElementNum,
      url: vBaseUrl + vSearchLink,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      label: [vLable],
      icons: ["icon", "statusIcon"],
      changeIcons: ["iconSelected"],
      iconsUrl: vBaseUrl,
    };
    const custom2 = {
      rootElement: `#containterIframe${index}`,
      index: RootElementNum,
      url: vBaseUrl + vIframLink,
      method: "GET",
    };

    const vMainClass = new mainClass(TreeView);
    const vSearchClass = new SearchClass(custom1);
    const vCadTreeClass = new CadTreeClass(custom2);

    vCadTreeClass.inject({
      rootElement: custom2.rootElement,
      index: custom2.index,
      url: vBaseUrl + vIframLink,
    });
  }
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
  /* HTML5 display-role reset for older browsers */
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
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Adjust the values as needed */
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
.searchinput${index}{
height: 36px;
width: 100%;
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
opacity: 0.5; /* Example: reduce opacity to make it look disabled */
pointer-events: none; /* Prevent interaction */
}
.containterIframe${index}{
margin-left: 48px;
width: calc(100% - 48px);
z-index: -1;
}
.titleOfPage${index}{
display: flex;
flex-wrap: wrap;
justify-content: space-between;
align-items: center;
text-align: center;
padding: 0px 0px 24px 0px;
height: 44px;
cursor: pointer;
}
.pagesTitle${index}{
background-color: #fff;
place-self: center;
display: flex;
height: 40px;
margin-right: 20px;
border-radius: 8px;
flex: 1 0 0;
align-self: stretch;
text-align: center;
align-items: center;
justify-content: center;
color: #000;
font-feature-settings: "case" on;
font-family: "FiraGO";
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 18px */
letter-spacing: 0.24px;
cursor: pointer;
/* Add border and shadows */
border: 1px solid #ccc; /* Grey border */
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Grey shadow */
transition: background-color 0.3s ease; /* Add transition effect */
}

.pagesTitle${index}:hover{
background-color: #6c9eee; /* Change background color on hover */
color: #fff; /* Change text color on hover */
}

.forLink${index}{
border: #404853 1px solid;
height: calc(100vh - 204px);
border-radius: 8px;
}
.pagesHtml${index}{
width: 100%;
height: calc(100% - 36px);
border-radius: 8px;
}
.button-container${index}{
display: flex;
}

.button-container${index} button{
background-color: #fff;
color: #000;
border: 1px solid #ccc; /* Grey border */
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Grey shadow */
transition: background-color 0.3s ease; /* Add transition effect */
border: none;
padding: 2px 4px;
border-start-end-radius: 5px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
cursor: pointer;
transition: background-color 0.3s, box-shadow 0.3s;
}

.button-container${index} button:hover{
background-color: #6c9eee; /* Change background color on hover */
color: #fff; /* Change text color on hover */
}

.treeButtons${index}{
display: flex;
justify-content: end;
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
fill: #555; /* Default color */
transition: fill 0.3s ease; /* Smooth transition for hover effect */
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
 height: calc(100vh - 150px);
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
display: none; /* Hidden by default */
position: fixed; /* Stay in place */
z-index: 1; /* Sit on top */
left: 0;
top: 0;
width: 100%; /* Full width */
height: 100%; /* Full height */
overflow: auto; /* Enable scroll if needed */
background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content${index}{
background-color: #fefefe;
margin: 15% auto; /* 15% from the top and centered */
padding: 20px;
border: 1px solid #888;
width: 80%; /* Could be more or less, depending on screen size */
}
.contextMenu${index}{
position: absolute; /* Position the context menu */
background-color: white; /* Background color */
border: 1px solid #ccc; /* Border */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow */
z-index: 1000; /* Ensure it appears above other elements */
}

/* Define styles for the context menu items */
.contextMenu${index} ul{
list-style-type: none; /* Remove bullet points */
margin: 0; /* Remove default margin */
padding: 0; /* Remove default padding */
}

.contextMenu${index} li{
cursor: pointer; /* Cursor style */
padding: 8px 16px; /* Padding */
}

/* Define hover effect for context menu items */
.contextMenu${index} li:hover{
background-color: #f0f0f0; /* Background color on hover */
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

.selecTitle${index}{
background-color: #2c4cc9;
transition: 0.2s;
color: #fff;
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
