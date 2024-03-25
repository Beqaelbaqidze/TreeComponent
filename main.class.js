import { HttpClass } from "./http.class.js";

export class mainClass {
  htmlULTpl = (id, value, icons, changeIcons, textTitle, hasChildren) => {
    return `<li class="node${this.index} nodeTreeLi${
      this.index
    }" data-id="${id}" data-text="${textTitle}">
    <div class="nodeContainerParent${
      this.index
    }" data-id="${id}" data-text="${textTitle}">
    <button data-id="${id}" data-text="${textTitle}" class="nodebtn${
      this.index
    } btnTree${this.index} ${
      hasChildren ? "" : `hideArrow${this.index}`
    }"><svg class="arrow${
      this.index
    }" xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 5 10" fill="none">
      <path d="M4.29289 5L0.5 8.79289V1.20711L4.29289 5Z" fill="#1C1B1F" stroke="black"/>
    </svg></button>

  
    <div class="nodeContainer${
      this.index
    }" data-id="${id}" data-text="${textTitle}">
      
      ${changeIcons}
      ${icons}
      <p class="nodeText${
        this.index
      }" data-id="${id}" data-text="${textTitle}">${value}</p>
      </div>
      </div>
      <ul class="children${this.index} nodeTreeUl${
      this.index
    }" data-id="${id}"></ul>
      
    </li>`;
  };

  #httpClient;
  searchedIds = [];

  constructor(options) {
    this.options = options;
    this.functions = options.functions;
    this.label = options.label;
    this.icons = options.icons;
    this.index = options.index;
    this.changeIcons = options.changeIcons;
    this.iconsUrl = options.iconsUrl;
    this.#httpClient = new HttpClass();
    this.#httpClient.request({ url: options.url }).then((data) => {
      this.inject(options, data);
    });
  }
  //   <svg class="clearSelection"
  //   id="clearSelection"
  //   xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  // <path fill="none" stroke="#000000" stroke-width="2" d="M10,4 C10,2.8954305 10.8954305,2 12,2 C13.1045695,2 14,2.8954305 14,4 L14,10 L20,10 L20,14 L4,14 L4,10 L10,10 L10,4 Z M4,14 L20,14 L20,22 L12,22 L4,22 L4,14 Z M16,22 L16,16.3646005 M8,22 L8,16.3646005 M12,22 L12,16.3646005"/>
  // <title>
  // მონიშნული მონაცემების გაუქმება</title>
  // <text class="tooltiptext">
  // მონიშვნის გაუქმება</text>
  // </svg>
  inject(options, data) {
    const { rootElement } = options;
    const assembledHTML = `<div class="treeButtons${this.index}">
   
    <svg
      class="treeReload${this.index}"
      id="treeReload${this.index}"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path
        d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"
      />
      <title>
  მონიშნული მონაცემის განახლება</title>
  <text class="tooltiptext${this.index}">
  მონიშნული მონაცემის განახლება</text>
    </svg>
    <svg class="slidTree${
      this.index
    }" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m680-280-56-56 103-104H520v-80h207L624-624l56-56 200 200-200 200Zm-400 0L80-480l200-200 56 56-103 104h207v80H233l103 104-56 56Z"/>
    <title>
  დახურვა</title>
  <text class="tooltiptext${this.index}">
  დახურვა</text>
    </svg></div><div class="customContainer${this.index}" id="customContainer${
      this.index
    }">${this.buildHTML(data)}</div>`;
    const selector = rootElement || "body";
    document.querySelector(selector).innerHTML = assembledHTML;

    const customContainer = document.querySelector(
      `.customContainer${this.index}`
    );
    document
      .querySelector(`.slidTree${this.index}`)
      .addEventListener("click", () => {
        customContainer.classList.toggle(`hideSideTree${this.index}`);
        document
          .querySelector(`.treeReload${this.index}`)
          .classList.toggle(`none${this.index}`);

        document
          .querySelector(`.treeButtons${this.index}`)
          .classList.toggle(`changePosition${this.index}`);
        document.querySelector(`.treeButtons${this.index}`).style.marginLeft =
          "-4px";
      });

    this.bindEvents();
  }

  bindEvents() {
    const container = document.querySelector(this.options.rootElement);

    container.addEventListener("click", this.handleButtonClick.bind(this));
    container.addEventListener("click", this.selectObj.bind(this));

    container.addEventListener(
      `contextmenu${this.index}`,
      this.handleContextMenu.bind(this)
    );
    document
      .querySelector(`.treeReload${this.index}`)
      .addEventListener("click", this.reloadNode.bind(this));
  }
  handleContextMenu(event) {
    const existingContextMenu = document.querySelector(
      `.contextMenu${this.index}`
    );
    if (existingContextMenu) {
      document.body.removeChild(existingContextMenu);
    }

    const target = event.target.closest(`.nodeContainer${this.index}`);
    if (target) {
      event.preventDefault();
      const vTr = target.getAttribute("data-id");
      const vTrText = target.getAttribute("data-text");

      const secondIcons = document.querySelectorAll(
        `.${this.changeIcons}[data-id='${vTr}']`
      );
      const sameIcons = document.querySelectorAll(
        `.${this.icons[0]}[data-id='${vTr}']`
      );
      const allNodeTextElements = document.querySelectorAll(
        `.nodeContainer${this.index}`
      );
      const allChngIconElements = document.querySelectorAll(
        `.${this.changeIcons}`
      );
      const allIconElements = document.querySelectorAll(`.${this.icons}`);
      allChngIconElements.forEach((elem) => {
        elem.classList.add(`none${this.index}`);
      });
      allIconElements.forEach((elemn) => {
        elemn.classList.remove(`none${this.index}`);
      });
      allNodeTextElements.forEach((element) => {
        element.classList.remove(`selected${this.index}`);
      });
      secondIcons.forEach((icon) => icon.classList.remove(`none${this.index}`));
      sameIcons.forEach((icon) => icon.classList.add(`none${this.index}`));
      target
        .closest(`.nodeContainer${this.index}`)
        .classList.add(`selected${this.index}`);
      document.getElementById(`searchInput${this.index}`).value = vTrText;
      const contextMenu = document.createElement("div");
      contextMenu.classList.add(`contextMenu${this.index}`);
      contextMenu.innerHTML = `
            <ul>
                <li>Reload</li>
            </ul>
        `;

      contextMenu.style.top = `${event.clientY}px`;
      contextMenu.style.left = `${event.clientX}px`;

      document.body.appendChild(contextMenu);

      const closeContextMenu = () => {
        document.body.removeChild(contextMenu);
        document.removeEventListener("click", closeContextMenu);
      };
      document.addEventListener("click", closeContextMenu);

      contextMenu.querySelectorAll("li").forEach((option) => {
        option.addEventListener("click", () => {
          const action = option.innerText.toLowerCase();
          switch (action) {
            case "reload":
              this.reloadNode();
              break;
            default:
              break;
          }

          closeContextMenu();
        });
      });
    }
  }

  buildHTML(data) {
    let vHTML = `<ul class="mainNode${this.index}">`;

    for (const item of data) {
      const labels = this.label.map((label) => item[label]).join(", ");
      const chngIcons = this.changeIcons
        .map(
          (
            chngIcons
          ) => `<svg class= "none${this.index} nodeChangeSvg${this.index} ${chngIcons}" data-id="${item.id}" style="width: 18px; margin-right: 8px;height: 18px; z-index: -1; xmlns="http://www.w3.org/2000/svg">
      <image href="${this.iconsUrl}${item[chngIcons]}" class="nodeIcon${this.index} ${chngIcons}" data-id="${item.id}" style="width: 18px; height: 18px; cursor: pointer;" />
      </svg>`
        )
        .join("");

      const icons = this.icons
        .map(
          (
            icons
          ) => `<svg class= "${icons} nodeSvg${this.index}" data-id="${item.id}" style="width: 18px; margin-right: 8px;height: 18px; z-index: -1;xmlns="http://www.w3.org/2000/svg">
      <image href="${this.iconsUrl}${item[icons]}" class="nodeIcon${this.index} ${icons}" data-id="${item.id}" style="width: 18px; height: 18px; cursor: pointer;" />
      </svg>`
        )
        .join("");

      const hasChildren = item.children && item.children.length > 0;
      vHTML += this.htmlULTpl(
        item.id,
        labels,
        icons,
        chngIcons,
        item.text,
        item.hasChildren
      );

      if (hasChildren) {
        vHTML += this.buildHTML(item.children);
      }
    }
    vHTML += "</ul>";
    return vHTML;
  }
  async selectObj(event) {
    const target = event.target;

    const vTr = target.getAttribute("data-id");
    // const vTrText = target.getAttribute("data-text");
    // const titleElement = document.querySelector(`title${this.index}`);

    const secondIcons = document.querySelectorAll(
      `.${this.changeIcons}[data-id='${vTr}']`
    );
    const sameIcons = document.querySelectorAll(
      `.${this.icons[0]}[data-id='${vTr}']`
    );
    if (
      target.classList.contains(`nodeText${this.index}`) ||
      target.classList.contains(`nodeContainer${this.index}`)
    ) {
      eval(this.functions);
      const allNodeTextElements = document.querySelectorAll(
        `.nodeContainer${this.index}`
      );
      const allChngIconElements = document.querySelectorAll(
        `.${this.changeIcons}`
      );
      const allIconElements = document.querySelectorAll(`.${this.icons}`);
      allChngIconElements.forEach((elem) => {
        elem.classList.add(`none${this.index}`);
      });
      allIconElements.forEach((elemn) => {
        elemn.classList.remove(`none${this.index}`);
      });
      allNodeTextElements.forEach((element) => {
        element.classList.remove(`selected${this.index}`);
      });
      secondIcons.forEach((icon) => icon.classList.remove(`none${this.index}`));
      sameIcons.forEach((icon) => icon.classList.add(`none${this.index}`));
      target
        .closest(`.nodeContainer${this.index}`)
        .classList.add(`selected${this.index}`);
      // document.getElementById(`searchInput${this.index}`).value = vTrText;
      // titleElement.innerHTML = `${vTrText}`;

      // await new Promise((resolve) => setTimeout(resolve, 200));

      // document
      //   .querySelectorAll(`.pagesTitle${this.index}.selecTitle${this.index}`)
      //   .forEach((elem) => {
      //     elem.click();
      //   });
    }
  }

  async handleButtonClick(event) {
    const target = event.target;

    if (
      target.classList.contains(`nodebtn${this.index}`) ||
      target.classList.contains(`arrow${this.index}`)
    ) {
      event.preventDefault();

      // Change cursor to 'wait' while fetching
      document.body.style.cursor = "wait";

      const parent = target.closest(`.node${this.index}`);
      const pBtn = target.closest(`.nodebtn${this.index}`);
      const children = parent.querySelector(`.children${this.index}`);

      if (!children.classList.contains(`loaded${this.index}`)) {
        const parentId = parent.getAttribute("data-id");
        if (!pBtn.classList.contains(`rotated${this.index}`)) {
          pBtn.classList.toggle(`rotated${this.index}`);
        }
        const requestConfig = {
          url: `${this.options.url}=${parentId}`,
        };

        try {
          const response = await this.#httpClient.request(requestConfig);
          if (response.length > 0) {
            const childrenHTML = this.buildHTML(response);
            children.innerHTML = childrenHTML;
          }
          children.classList.add(`loaded${this.index}`);
        } catch (error) {
          console.error(error);
        }
      } else {
        pBtn.classList.toggle(`rotated${this.index}`);
      }
      if (!pBtn.classList.contains(`rotated${this.index}`)) {
        children.classList.toggle(`hidden${this.index}`);
      } else {
        children.classList.remove(`hidden${this.index}`);
      }

      // Revert cursor back to default after fetch request completes
      document.body.style.cursor = "default";
    }
  }
  reloadNode() {
    let foundSelected = false;

    document.querySelectorAll(".nodeContainer" + this.index).forEach((elem) => {
      if (elem.classList.contains("selected" + this.index)) {
        elem
          .closest(".nodeTreeLi" + this.index)
          .querySelector(".nodeTreeUl" + this.index).innerHTML = "";
        elem
          .closest(".nodeTreeLi" + this.index)
          .querySelector(".nodeTreeUl" + this.index)
          .classList.remove("loaded" + this.index);
        elem
          .closest(".nodeTreeLi" + this.index)
          .querySelector(".nodebtn" + this.index)
          .classList.remove("rotated" + this.index);

        foundSelected = true;
      }
    });
    if (!foundSelected) {
      if (confirm("გსურთ ყველა მონაცემის განახლება?")) {
        document
          .querySelectorAll(".nodeContainer" + this.index)
          .forEach((elem) => {
            elem
              .closest(".nodeTreeLi" + this.index)
              .querySelector(".nodeTreeUl" + this.index).innerHTML = "";
            elem
              .closest(".nodeTreeLi" + this.index)
              .querySelector(".nodeTreeUl" + this.index)
              .classList.remove("loaded" + this.index);
            elem
              .closest(".nodeTreeLi" + this.index)
              .querySelector(".nodebtn" + this.index)
              .classList.remove("rotated" + this.index);
          });
      }
    }
  }
}
