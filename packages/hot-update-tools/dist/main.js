// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.messages = exports.unload = exports.load = void 0;

var fs = require("fs");
var path = require("path");
var JSZIP = require("jszip");
const Method = require('./manager/method');

var bundlesArr = []
var projectPath = Editor.Project.path;
var bundlesFilePath = path.join(Editor.Project.path, 'packages', 'hot-update-tools', 'config', 'bundles.json');

if (!Editor.__Menu__) {
    Editor.__Menu__ = Editor.Menu;
};
module.exports = {
    load() {
        Editor.log("[HotUpdateTools] load");
        Editor.Menu = CustomMenu;//应用自定义菜单
        //Editor.Builder.on('build-start', this.onBuildStart);
        Editor.Builder.on('build-finished', this.onBuildFinish);
    },
    unload() {
        Editor.log("[HotUpdateTools] unload");
        Editor.Menu = Editor.__Menu__;
        //Editor.Builder.removeListener('build-start', this.onBuildStart);
        Editor.Builder.removeListener('build-finished', this.onBuildFinish);
    },

    onBuildStart(t) {
    },

    onBuildFinish(options, callback) {
        Editor.log("[HotUpdateTools] build platform:" + options.platform);
        if ("win32" === options.platform || "android" === options.platform || "ios" === options.platform || "mac" === options.platform) {
            var dest = path.normalize(options.dest);
            var mainJSPath_1 = path.join(dest, "main.js");
            fs.readFile(mainJSPath_1, "utf8", function (error, content) {
                if (error)
                    throw error;
                content = content.replace(/if\s*\(\s*window.jsb\)\s*\{/g, "if (window.jsb) {\nvar hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');\nif (hotUpdateSearchPaths) {\njsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));\n}");
                fs.writeFile(mainJSPath_1, content, function (error) {
                    if (error)
                        throw error;
                    Editor.log("[HotUpdateTools] SearchPath updated in built main.js for hot update");
                });
            });
        }
        else {
            Editor.log("[HotUpdateTools] don't need update main.js, platform:");
        }

        startDiffZip()
        callback && callback();
    },

    messages: {
        showPanel: function () {
            getBundleNames()
            Editor.Panel.open("hot-update-tools", Editor.argv);
        },
        'set-meta-compress'(event, p, isCompress) {
            //let pp = path.join(p, 'assets', 'resources', 'hotloadRes');
            Editor.log('set-meta-compress: ', p, isCompress);
            setMetaCompress(p, isCompress);
        },

        readconfig: function (event) {
            event.reply(bundlesArr);
        },

        'active'() {
            Editor.Menu = CustomMenu;
            Editor.log("已启用自定义上下文菜单");
        },

        'disactive'() {
            Editor.Menu = Editor.__Menu__;
            Editor.log("已停用自定义上下文菜单");
        },
    }
};

/**@description 读取本地缓存,把json文件写到obj对象里. */
function readCache() {
    //结构体:{ isBuildFinishZip: string, }
    //Editor.log('[PAC]', "userCachePath");
    var userCachePath = path.join(projectPath, "packages/hot-update-tools/config/userCache.json")
    if (fs.existsSync(userCachePath)) {
        var data = fs.readFileSync(userCachePath);
        var userCache = JSON.parse(data);
        //Editor.log('[PAC]', "userCache bundle ", JSON.stringify(userCache));
        return userCache;
    } else {
        Editor.log("usercache not exist ", this.userCache);
    }
}

/** 发布完成以后,对大厅,通用,pigbank,压缩成一个zip文件,并且删除原有的文件.   邮票,vages待定 */
function buildFinishAddZip() {
    let cache = readCache();
    Editor.log('[PAC]', 'buildFinishAddZip start');
    if (cache.isBuildFinishZip == true) {
        let destPath = path.join(projectPath, 'build', 'jsb-default', 'assets');
        Editor.log('[PAC]', 'destPath: ' + destPath);
        //需要加压的文件夹
        let zipFileNames = ['hall', 'gameprefab', 'pigbank', 'wheel'];
        let bundleZip = new JSZIP();
        for (let index = 0; index < zipFileNames.length; index++) {
            const zipFileName = zipFileNames[index];
            let zipFilePath = path.join(destPath, zipFileName);
            //Editor.log('[PAC]', 'zipFilePath: ', zipFilePath, fs.existsSync(zipFilePath));
            if (fs.existsSync(zipFilePath)) {
                processDirectory(zipFilePath, bundleZip, zipFileName);
            }
            //fs.rmdirSync(zipFilePath, { recursive: true });
        }
        Editor.log('[PAC]', 'start write zip file');
        bundleZip.generateAsync({
            type: "nodebuffer",
            compression: "DEFLATE",
            compressionOptions: {
                level: 9
            }
        }).then(function (content) {
            Editor.log('[PAC]', 'build finish add zip finish');
            fs.writeFileSync(path.join(destPath, 'bundles.zip'), content);
        });
    }

    function processDirectory(directory, zip, root) {
        fs.readdirSync(directory).forEach((file) => {
            const filePath = path.join(directory, file);
            if (fs.lstatSync(filePath).isDirectory()) {
                // 如果是文件夹，递归处理
                //Editor.log('[PAC]', 'Processing directory: ' + filePath);
                processDirectory(filePath, zip, path.join(root, file));
            } else {
                // 如果是文件，添加到zip
                //Editor.log('[PAC]', 'Adding file: ' + filePath);
                const fileData = fs.readFileSync(filePath);
                zip.file(path.join(root, file), fileData);
            }
        });
    }
}

function startDiffZip() {
    Method.onCreateManifest()
    buildFinishAddZip()
}

function getBundleNames() {
    //找到本地bundle的所有子bundle的名字,在通过vue生成checkbox,显示在网页上.
    let bundleNames = [];
    const projectPath = Editor.Project.path || Editor.projectPath;
    let bundlePath = path.join(projectPath, 'assets', 'bundles');
    // Editor.log('[PAC]', 'bundlePath', bundlePath)
    let filesNames = fs.readdirSync(bundlePath);
    // Editor.log('[PAC]', 'bundlePath', filesNames)
    for (let index = 0; index < filesNames.length; index++) {
        const fileName = filesNames[index];
        const excludeNames = ['resources']
        let bundleName = path.join(bundlePath, fileName);
        // Editor.log('[PAC]', 'bundleName', bundleName)
        if (!fs.statSync(bundleName).isDirectory() || excludeNames.indexOf(fileName) >= 0) {
            continue;
        }

        let metaName = bundleName + '.meta';
        // Editor.log('[PAC]', 'metaName', metaName)
        //读取meta文件,获取bundle的json属性
        if (fs.existsSync(metaName)) {
            let meta = fs.readFileSync(metaName, 'utf8');
            let json = JSON.parse(meta);
            let isBundle = json["isBundle"];
            if (isBundle) {
                bundleNames.push(fileName);
            }
        }
    }
    bundlesArr = bundleNames
    // bundleNames.push("none");
    // bundleNames.push("core");

    const filteredArr = bundlesArr.filter(bundle => !bundle.includes("test"));
    bundlesArr = filteredArr
    fs.readFile(bundlesFilePath, 'utf8', (err, data) => {
        if (err) {
            return;
        }
        try {
            const bundlesData = JSON.parse(data);
            bundlesData.bundles = filteredArr.map((bundle, index) => ({
                id: index.toString(),
                name: bundle,
                dir: bundle,
                version: "1",
                includeApk: false
            }));
            const updatedData = JSON.stringify(bundlesData, null, 4);
            fs.writeFile(bundlesFilePath, updatedData, 'utf8', (err) => {
                if (err) {
                    Editor.log('写入文件失败:', err);
                    return;
                }
            });
        } catch (error) {
            Editor.log('解析 JSON 数据失败:', error);
        }
    });
}


//astc相关设置
const compressSettings = {
    //astc压缩
    "android": {
        "formats": [
            {
                "name": "astc_6x6",
                "quality": "medium"
            }
        ]
    },
    "ios": {
        "formats": [
            {
                "name": "astc_6x6",
                "quality": "medium"
            }
        ]
    }
};

/**
 * meta设置压缩
 * @param {*} url 文件路径
 * @param {*} isCompress 是否压缩
 * @returns void
 */
async function setMetaCompress(url, isCompress, isRoot = true) {
    if (!fs.existsSync(url)) {
        Editor.error('路径不存在:', url);
        return;
    }

    let files = fs.readdirSync(url);
    let promises = []; // 用于存储所有的 Promise
    let startTime = Date.now(); // 记录开始时间

    for (const file of files) {
        let curPath = path.join(url, file);
        let stat = fs.statSync(curPath);
        if (stat.isDirectory()) {
            promises.push(setMetaCompress(curPath, isCompress, false)); // 遍历目录
        } else {
            //如果文件名称包含.png.meta,.jpg.meta,.pac.meta,就修改meta文件里的platformSettings属性.
            if (curPath.endsWith('.png.meta') || curPath.endsWith('.jpg.meta') || curPath.endsWith('.pac.meta')) {
                promises.push((async () => {
                    let metaString = await fs.readFileSync(curPath, 'utf8');
                    //Editor.log('curPath :', curPath);
                    let dbPath = Editor.assetdb.fspathToUrl(curPath);
                    //Editor.log('dbPath:', dbPath);
                    let imgPath = dbPath.replace('.meta', '');
                    //路径转uuid,备用
                    // let uuid = Editor.assetdb.urlToUuid(imgPath);
                    // Editor.log('uuid:', uuid);

                    let jsonObj = JSON.parse(metaString);
                    jsonObj['platformSettings'] = isCompress ? compressSettings : {}; // 设置压缩纹理
                    let writeData = JSON.stringify(jsonObj, null, "\t");
                    const data = new Uint8Array(Buffer.from(writeData));
                    //存储,也可以用下面的方法
                    await fs.writeFileSync(curPath, data, 'utf8');
                    //Editor.log('writeData:', writeData);

                    // let assetInfo = Editor.assetdb.assetInfo(imgPath);
                    // Editor.log('assetInfo:', JSON.stringify(assetInfo));
                    // Editor.log('curPath2:', curPath);
                    // 存储,也可以用下面的方法
                    // Editor.assetdb.saveMeta(jsonObj.uuid, writeData, (err, results) => {
                    //     //刷新meta文件
                    //     //Editor.log('saveMeta success:', results);
                    // })
                    return new Promise((resolve, reject) => {
                        Editor.assetdb.refresh(imgPath, (err, results) => {
                            //刷新meta文件
                            if (err) {
                                reject(err);
                            } else {
                                Editor.log('refresh success:', results[0].path);
                                resolve();
                            }
                        });
                    });
                })());
            }
        }
    }

    await Promise.all(promises); // 等待所有 Promise 完成
    if (isRoot) {
        let endTime = Date.now(); // 记录结束时间
        let elapsedTime = (endTime - startTime) / 1000; // 计算耗时，单位为秒
        // Editor.log('setMetaCompress success:', url);
        Editor.log('设置完成,耗时:', elapsedTime, '秒');
    }
}

//自定义菜单
//https://docs.cocos.com/creator/2.4/api/zh/editor/main/menu.html
class CustomMenu extends Editor.__Menu__ {
    constructor(template, webContent) {
        //打印编辑器默认菜单数据
        //Editor.log(template);
        let menuLocation;//菜单所在区域
        //判断是哪种菜单，暂时没有找到很优雅的办法
        if (template.length > 0) {
            let first = template[0];
            //Editor.log(JSON.stringify(first));
            if (first.label == "新建" || first?.label == "Create")//asset右键菜单
                menuLocation = "asset";
            // if (first.label == "创建节点")//场景节点右键菜单
            // menuLocation = "node";
            // else if (first.label == "新建")//asset右键菜单
            // menuLocation = "asset";
            // else if (first.label == "Remove")//脚本组件菜单
            // menuLocation = "component";
            // else if (first.path && first.path.startsWith("渲染组件"))//添加组件菜单
            // menuLocation = "addcomponent";
            //还有其他区域的菜单比如控制台面板菜单，就不再列举了
        }

        if (menuLocation == "asset") {
            //TODO 在这里插入asset右键菜单
            let assetInfo = getSelectedFirstAssetInfo();
            //Editor.log(assetInfo);
            template.push({ type: "separator" });
            template.push({
                label: '开启ASTC', click: () => {
                    Editor.log("open astc path: " + assetInfo.path);
                    setMetaCompress(assetInfo.path, true);
                }
            });
            template.push({
                label: '复制资源 UUID', click: () => {
                    const clipboard = Editor.require('electron').clipboard;
                    clipboard.writeText(assetInfo.uuid);
                    Editor.log(assetInfo.uuid);
                }
            });
            template.push({
                label: '复制资源路径', click: () => {
                    const clipboard = Editor.require('electron').clipboard;
                    clipboard.writeText(assetInfo.path);
                    Editor.log(assetInfo.path);
                }
            });
        }
        else if (menuLocation == "node") {
            //在这里插入场景节点右键菜单
            let node_selection = Editor.Selection.curSelection("node");
            let insertIndex = 1;
            template.splice(insertIndex++, 0, { type: "separator" });
            template.splice(insertIndex++, 0, { label: "创建Sprite（精灵）", click: template[0].submenu[1].submenu[0].click });
            template.splice(insertIndex++, 0, { type: "separator" });

            let groupMenuEnable = true;
            let groupMenu = { label: "测试二级菜单", enabled: true, submenu: [] };
            template.splice(insertIndex++, 0, groupMenu);
            groupMenu.submenu.push({
                label: "测试二级菜单1", enabled: groupMenuEnable, click: () => {
                    Editor.log("测试二级菜单1");
                }
            });
            groupMenu.submenu.push({
                label: "测试二级菜单2", enabled: groupMenuEnable, click: () => {
                    Editor.log("测试二级菜单2");
                }
            });

        }
        else if (menuLocation == "component") {
            //在这里插入组件菜单，可传递节点uuid，
            let params = template[0].params;
            //Editor.log(params);
            template.push({ type: "separator" });
            template.push({
                label: '测试组件脚本菜单', enabled: true, click: () => {
                    Editor.log("测试组件脚本菜单");
                }
            });
        }
        else if (menuLocation == "addcomponent") {
            //在这里插入添加组件菜单，可传递节点uuid
            let params = template[0].params;
            let nodeUuid = params[0];

            //添加选中节点的同名脚本
            template.unshift({ type: "separator" });
            template.unshift({
                label: '测试添加脚本菜单', enabled: true, click: () => {
                    Editor.log("测试添加脚本菜单");
                }
            });
        }

        super(template, webContent);
    }
}

/**
* 获取资源管理器中选中的第一个资源
* @returns 
*/
function getSelectedFirstAssetInfo() {
    let asset_selection = Editor.Selection.curSelection("asset");
    if (asset_selection == null || asset_selection.length == 0) {
        return null;
    }

    let info = Editor.assetdb.assetInfoByUuid(asset_selection[0]);

    return info;
}