import { HttpClass } from "./http.class.js";

export class PaneView {
  HtmlDivs = (id, value, hasChildren) =>
    `<span class="paneItem${this.index}" data-id=${id}>${
      hasChildren
        ? `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"/></svg>`
    }<p class="paneNodeLabel${this.index}" data-id=${id}>${value}</p></span>`;

  #httpClient;
  constructor(options) {
    this.options = options;
    this.label = options.label;
    this.index = options.index;
    this.treeRootElement = options.vRootElement;
    this.#httpClient = new HttpClass();
    this.inject(options);
  }
  inject(options) {
    const { rootElement, vRootElement } = options;
    console.log(options.vRootElement);
    if (vRootElement) {
      const treeRootElement = document.querySelector(vRootElement);
      if (treeRootElement) {
        treeRootElement.addEventListener(
          "click",
          this.handleNodeClick.bind(this)
        );
      } else {
        console.error(`Root element "${vRootElement}" not found.`);
      }
    } else {
      this.#httpClient.request({ url: options.url }).then((data) => {
        const assembledHTML = this.buildPaneHtml(data);
        const selector = rootElement || "body";
        document.querySelector(selector).innerHTML = assembledHTML;
      });
    }
  }

  handleNodeClick(event) {
    const target = event.target;
    if (
      document.querySelector(".nodeText" + this.index) ||
      document
        .querySelector(".nodeContainer" + this.index)
        .classList.contains(`selected${this.index}`)
    ) {
      const vTr = target.getAttribute("data-id");
      this.#httpClient
        .request({ url: this.options.url + "=" + vTr })
        .then((data) => {
          const assembledHTML = this.buildPaneHtml(data);
          const selector = this.options.rootElement || "body";
          document.querySelector(selector).innerHTML = assembledHTML;
        });
    }
  }

  buildPaneHtml(data) {
    let vHTML = `<div class="paneItemContainer">`;
    for (const item of data) {
      const labels = this.label.map((label) => item[label]).join(", ");
      const hasChildren = item.children && item.children.length > 0;
      vHTML += this.HtmlDivs(item.id, labels, item.hasChildren);
    }
    vHTML += `</div>`;
    return vHTML;
  }
}
