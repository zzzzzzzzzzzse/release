'use strict';

module.exports = {
  // load() {
  //   //1.先判断扩展是否已经加载了
  //   console.log(this.isPackageInUsing() ? "已经加载" : "没有加载");
  //   if (this.isPackageInUsing()) {
  //     return;
  //   }
  //   let timer = setInterval(() => {
  //     //2.等找到主窗口的时候，开始加载任务
  //     if (Editor.Window && Editor.Window.main && Editor.Window.main.nativeWin) {
  //       Editor.Window.main.nativeWin.__main__ = true;
  //       let webContents = Editor.Window.main.nativeWin.webContents;
  //       if (webContents) {
  //         clearInterval(timer)
  //         //3.打开自己的插件
  //         Editor.Panel.open('add_component')
  //         let windows = electron.BrowserWindow.getAllWindows();
  //         windows.forEach((win) => {
  //           if (!win.__main__) {
  //             //4. 打开插件的同时，先隐藏掉插件，不然会很尬
  //             win.hide()
  //           }
  //         });
  //         //5.重点来了，由于贴靠插件需要在renderer进程，所以开始注入脚本，脚本内容「template-auto-dock.js」
  //         webContents.executeJavaScript(fs.readFileSync(path.join(__dirname, 'template-auto-dock.js'), 'utf-8'));
  //         // Editor.Ipc.sendToPanel('add_component', 'add_component:dock');
  //       }
  //     }
  //   }, 1000 / 30);
  // },

  // /**
  // * 判断扩展是否已经加载了，方法是，读取local://layout.editor.json
  // * 然后判断文件内是否有自己的插件名
  // **/
  // isPackageInUsing() {

  //   let localProfile = Editor.Profile.load("local://layout.editor.json");
  //   if (!localProfile) {
  //     return false;
  //   }

  //   function getLocalPath() { 
  //     let result;
  //     localProfile._chain.map((item) => {
  //       if (item && item.type === 'local') {
  //         result = item.path;
  //       }
  //     })
  //     return result;
  //   }

  //   let fs = require('fire-fs');
  //   let path = require('path')
  //   let localPath = getLocalPath();
  //   let fileName = localProfile._file;
  //   let wholePath = path.join(localPath, fileName)
  //   let has = fs.existsSync(wholePath)
  //   let content;
  //   if (!has) {
  //     return false
  //   } else {
  //     content = fs.readFileSync(wholePath, 'utf-8');
  //   }
  //   try {
  //     let data = JSON.parse(content);
  //     // 1.重点就是这一句
  //     if (!(data && data.windows && data.windows.main && data.windows.main.panels && data.windows.main.panels.indexOf('add_component') != -1)) {
  //       return false
  //     } else {
  //       return true;
  //     }
  //   } catch (error) { }
  // },

  load() {

  },

  unload() {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open'() {
      // open entry panel registered in package.json
      Editor.Panel.open('add_component');
    },
    'close'() {
      Editor.Panel.close('add_component');
    },
    // 'say-hello'() {
    //   Editor.log('Hello World!');
    //   // send ipc message to panel
    //   Editor.Ipc.sendToPanel('add_component', 'add_component:hello');
    // },
    // 'clicked'() {
    //   Editor.log('Button clicked!');
    // }
  },
};