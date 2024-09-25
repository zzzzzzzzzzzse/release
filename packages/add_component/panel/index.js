

// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
  // css style for panel
  style: `
    :host { }
    
    .container {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      justify-content: center;
    }
    
    .row {
      width: 100%;
      align-self: flex-start;
      display: inline-flex;
    }

    .ctex {
      font-wegiht: bolb;
      font-size: 1.2em;
      color: #fd942b;
    } 
  `,


  // html template for panel
  template: `
    <!-- <div>State: <span id="label">--</span></div> -->
    <style type="text/css">input,input:focus{color:#fd942b}:host{display:inline-block;position:relative;box-sizing:border-box;width:auto;margin:0 .25em 0 0;outline:0;cursor:default;overflow:hidden;border-radius:3px;border:1px solid #171717}:host(:last-child){margin-right:0}input{font-family:Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,'Segoe UI',Oxygen,Ubuntu,Cantarell,'Open Sans',SourceHanSansCN-Normal,sans-serif;border:none;margin:0;padding:.16666667em .5em;width:100%;display:inline-block;outline:0;background:#262626}input::-webkit-input-placeholder{font-style:italic;color:#595959}input::selection{color:#fff;background:#09f}:host(:hover){border-color:#888}:host([focused]){border-color:#fd942b}:host([unnavigable]){border:none;border-bottom:1px solid rgba(255,255,255,.23)}:host([is-disabled]){pointer-events:none}:host([is-disabled]) input{color:#636363;background:#3a3a3a}:host(.mini) input{font-size:.66666667rem;height:initial}:host(.tiny) input{font-size:.83333333rem;height:initial}:host(.small) input{font-size:.91666667rem;height:initial}:host input{font-size:1rem;height:19px}:host(.large) input{font-size:1.16666667rem;height:initial}:host(.big) input{font-size:1.33333333rem;height:initial}:host(.huge) input{font-size:1.5rem;height:initial}:host(.massive) input{font-size:1.83333333rem;height:initial}
//# sourceURL=theme://elements/input.css</style>
    <div id="main" class="container" >
      <div class="row" id="coms">
      </div>
      <div class="row">
        <input id="com_name" style="height:2em;" placeholder="输入要添加的组件名" type="">
        <ui-button style="width:50px" id="btn">
          <span style="width: 50px;">
            <i class="icon-plus"></i>
          </span>
        </ui-button>
      </div>
      增加组件
      <div id="list1" style="border:1px dashed gray; width:100%">
        <ui-button style="width:80px" id="blockEvent">blockEvent</ui-button>
        <ui-button style="width:50px" id="button">button</ui-button>
        <ui-button style="width:65px" id="buttonEx">buttonEx</ui-button>
        <ui-button style="width:50px" id="label">label</ui-button>
        <ui-button style="width:80px" id="labelOutline">labelOutline</ui-button>
        <ui-button style="width:50px" id="addSprite">sprite</ui-button>
        <ui-button style="width:50px" id="addLayout">layout</ui-button>
        <ui-button style="width:50px" id="addWidget">widget</ui-button>
      </div>
      增加节点
      <div id="list1" style="border:1px dashed gray; width:100%">
        <ui-button style="width:65px" id="ndWidget">ndWidget</ui-button>
        <ui-button style="width:50px" id="button2">button</ui-button>
        <ui-button style="width:65px" id="btnEx">buttonEx</ui-button>
        <ui-button style="width:70px" id="btnLabel">btnLabel</ui-button>
        <ui-button style="width:50px" id="label2">label</ui-button>
        <ui-button style="width:70px" id="labelOutline2">lbOutLine</ui-button>
        <ui-button style="width:50px" id="addLayout2">layout</ui-button>
      </div>

      <div id="list" style="border:1px dashed gray; width:100%">
      </div>
    </div>
    <div id="tip">请选择节点</div>
  `,

  // element and variable binding
  $: {
    btn: '#btn',
    button: '#button',
    buttonEx: '#buttonEx',
    label: '#label',
    labelOutline: '#labelOutline',
    addSprite: '#addSprite',
    addLayout: '#addLayout',
    addWidget: '#addWidget',
    blockEvent: '#blockEvent',
    ndWidget: '#ndWidget',
    button2: '#button2',
    btnEx: '#btnEx',
    btnLabel: '#btnLabel',
    label2: '#label2',
    labelOutline2: '#labelOutline2',
    addLayout2: '#addLayout2',
    eb: "#com_name",
    list: "#list",
    main: "#main",
    tip: "#tip",
    curComs: "#coms",
  },

  curMatchs: [],
  // method executed when template and styles are successfully loaded and initialized
  ready() {
    this.$main.onkeydown = (e) => {
      console.log("keydown", e.keyCode);
    };
    this.$eb.oninput = this.onInput2.bind(this);
    this.$eb.onkeydown = (e) => {
      if (e.keyCode == 13) {
        if (this.curMatchs.length > 0) {
          this.addCom(this.curMatchs[0].origin);
        }
      }
    };
    this.$btn.addEventListener('confirm', () => {
      if (this.curMatchs.length > 0) {
        this.addCom(this.curMatchs[0].origin);
      }
    });
    this.$blockEvent.addEventListener('confirm', () => {
      this.addCom('cc.BlockInputEvents');
      Editor.log(`增加完毕`);
    });
    this.$button.addEventListener('confirm', () => {
      this.addCom('cc.Button');
      Editor.log(`增加完毕`);
    });
    this.$buttonEx.addEventListener('confirm', () => {
      this.addCom('ButtonEx');
      Editor.log(`增加完毕`);
    });
    this.$label.addEventListener('confirm', () => {
      this.addCom('cc.Label');
      Editor.log(`增加完毕`);
    });
    this.$labelOutline.addEventListener('confirm', () => {
      this.addCom('cc.LabelOutline');
      Editor.log(`增加完毕`);
    });
    this.$addSprite.addEventListener('confirm', () => {
      this.addCom('cc.Sprite');
      Editor.log(`增加完毕`);
    });
    this.$addLayout.addEventListener('confirm', () => {
      this.addCom('cc.Layout');
      Editor.log(`增加完毕`);
    });
    this.$addWidget.addEventListener('confirm', () => {
      this.addCom('cc.Widget');
      Editor.log(`增加完毕`);
    });
    this.$ndWidget.addEventListener('confirm', () => {
      this.addNode(['cc.Widget']);
      Editor.log(`增加完毕`);
    });
    this.$button2.addEventListener('confirm', () => {
      this.addNode(['cc.Button', 'cc.Sprite']);
      Editor.log(`增加完毕`);
    });
    this.$btnEx.addEventListener('confirm', () => {
      this.addNode(['ButtonEx']);
      Editor.log(`增加完毕`);
    });
    this.$btnLabel.addEventListener('confirm', () => {
      this.addNode(['cc.Button', 'cc.Label']);
      Editor.log(`增加完毕`);
    });
    this.$label2.addEventListener('confirm', () => {
      this.addNode(['cc.Label']);
      Editor.log(`增加完毕`);
    });
    this.$labelOutline2.addEventListener('confirm', () => {
      this.addNode(['cc.Label', 'cc.LabelOutline']);
      Editor.log(`增加完毕`);
    });
    this.$addLayout2.addEventListener('confirm', () => {
      this.addNode(['cc.Layout']);
      Editor.log(`增加完毕`);
    });

    this.refresh();
    Editor.log(`小可：初始化完毕，等待主人的任务♥`);

  },

  onInput2() {
    this.curMatchs = [];
    let comName = this.$eb.value;

    let handle = {
      comName: comName,
      res: null
    };

    Editor.Scene.callSceneScript('add_component', 'input-query', handle, (err) => {
      if (err) {
        return;
      }
    });
  },

  addNode(comNames) {
    Editor.log(`addNode comName:${comNames}`);
    Editor.Scene.callSceneScript('add_component', 'add-node', comNames, (err) => {
      if (err) {
        return;
      }
    });
  },

  addCom(comName) {
    Editor.log(`comName:${comName}`);
    //检查当前节点的所有组件

    Editor.Scene.callSceneScript('add_component', 'add-component', comName, (err) => {
      if (err) {
        return;
      }
    });
  },

  refresh() {
    if (Editor.Selection.curSelection("node").length > 0) {
      this.$main.style.display = "";
      this.$tip.style.display = "none";

      this.$curComs.style.display = "";
      this.refreshCurComs();
    }
    else {
      this.$main.style.display = "none";
      this.$tip.style.display = "";

      this.$curComs.style.display = "none";
      this.$curComs.innerHTML = "";
    }
  },
  refreshCurComs() {
    Editor.Scene.callSceneScript('add_component', 'list-current-components', {}, (err) => {
      if (err) {
        console.log("list-current-components, err:", err);
        return;
      }
    });
  },
  confirmDelete(comOpt) {
    let electron = require("electron");
    var template = [
      {
        label: '删除', click: () => {
          Editor.Scene.callSceneScript('add_component', 'del-component', comOpt, (err) => {
            if (err) {
              console.log("del-component, err:", err);
              return;
            }
          });
        }
      },
      { label: '取消' },
      // { ... }
    ];
    let menu = electron.remote.Menu.buildFromTemplate(template);
    menu.popup();
  },

  // register your ipc messages here
  messages: {
    "add_component:dock"(event, type) {
      console.log("panel:dock");
    },
    "selection:selected"(event, type) {
      if (type == "node") {
        this.refresh();
      }
    },
    "selection:unselected"(event, type) {
      if (type == "node") {
        this.refresh();
      }
    },
    "add_component:res-input-query"(event, matchs) {
      console.log("query-res", matchs);
      this.$list.innerHTML = "";
      if (matchs.length > 20) {
        matchs = matchs.slice(0, 20);
      }
      console.log("match:", matchs);
      matchs.forEach(match => {
        let ctex = match.input; //spr
        let index = match.index; //3

        let html = "";
        for (let i = 0; i < match.origin.length; i++) {
          //文字变色加粗
          if (i == index) {
            html += `< span class= "ctex" > ${match.origin.substring(i, index + ctex.length)}</span > `;
            i += ctex.length;
          }
          if (i < match.origin.length) {
            html += match.origin[i];
          }
          console.log("html:", html, "ctex", ctex);
        }

        let handle = document.createElement("ui-button");
        handle.innerHTML = html;
        handle.onclick = () => {
          this.addCom(match.origin);
        }
        this.$list.appendChild(handle);
      });
      this.curMatchs = matchs.slice();
    },
    "add_component:res-list-current-components"(event, comOptionCol) {
      this.$curComs.innerHTML = "";
      //生成UI
      for (let key in comOptionCol) {
        let co = comOptionCol[key];
        // console.log(co.comName, co);
        let handle = document.createElement("ui-button");
        handle.setAttribute("name", co.comName);
        // style = "width:80px"
        // handle.setAttribute('style', "width:100px")
        handle.style.background = "#b54344";
        handle.innerHTML = `${co.nodeUuids.length > 1 ? `<span class="ctex">${co.nodeUuids.length}</span>|` : ""}${co.comName}`;
        handle.onclick = () => {
          this.confirmDelete(co);
        };
        this.$curComs.appendChild(handle);
      }
    },
    "add_component:res-add-component"(event, comOpt) {
      Editor.log(`小可: 主人的任务已经全部完成♥`);
      this.refresh();
    },
    "add_component:res-del-component"(event, comName) {
      console.log(this.$curComs);
      let handles = this.$curComs.querySelectorAll("ui-button");
      for (let i = 0; i < handles.length; i++) {
        let handle = handles[i];
        if (handle.getAttribute("name") == comName) {
          handle.remove();
          break;
        }
      }
      Editor.log(`小可: 主人的任务已经全部完成♥`);
    }
  }
});