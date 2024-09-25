"use strict";
var fs = require("fs");
var path = require("path");
var JSZIP = require("jszip");
var imageSize = require("image-size");
var crypto = require("crypto")

var resDirs = [];
var isdel = true
var __dirname = Editor.Project.path
const Method = require('../manager/method')

var rootDir = 'hotupdate';
var outPut = 'ZipDiffList';
var rootVerPath = path.join(rootDir, 'game-assets');
var zipListPath = outPut;
var rootDiffPath = path.join(rootDir, 'diff-ver-files');
var configFile = path.join(rootDir, 'config', 'compare_ver.txt');
var bundlesNames = []
var curkey = '';
var _Helper = /** @class */ (function () {
    function _Helper() {
        this.elements = {
            /**@description 主包版本号 */
            version: "#version",
            /**@description 构建目录 */
            buildDir: "#buildDir",
            /**@description Manifest输出目录 */
            manifestDir: "#manifestDir",
            /**@description 远程主包地址 */
            remoteUrl: "#remoteUrl",
            /**@description 日志 */
            logView: "#logView",
            /**@description 生成原始对比文件 */
            createVer101: "#createVer101",
            /**@description 生成当前需要对比文件 */
            createVer102: "#createVer102",
            /** compressPath */
            compressPathInput: "#compressPathInput",
            /** openMetaCompress */
            openMetaCompress: '#openMetaCompress',
            /** closeMetaCompress */
            closeMetaCompress: '#closeMetaCompress',
            /**是否发布正式服 */
            isUseManifest: "#isUseManifest",
            /**是否发布完加压 */
            isBuildFinishZip: "#isBuildFinishZip",

        };
        /**@description 保存读取成功的Html */
        this.view = null;
        this.userCache = {
            /**@description 主包版本号 */
            version: "",
            /**@description 当前服务器地址 */
            serverIP: "",
            /**@description 服务器历史地址 */
            historyIps: [],
            historySelectedUrl: "",
            /**@description 构建项目目录 */
            buildDir: "",
            /**@description 各bundle缓存 */
            bundles: [],
            /**@description 远程服务器地址 */
            remoteUrl: "",
            /**@description 远程各bundle的版本配置 */
            remoteBundleUrls: {},
            /** compressPath */
            compressPath: '',
            /** 是否发布正式服 */
            isUseManifest: false,
            /**是否发布完加压 */
            isBuildFinishZip: false,
        };
        this.bundles = [];
        this._isDoCreate = false;
        this._config = null;
        this._template = null;
    }
    Object.defineProperty(_Helper.prototype, "userCachePath", {
        get: function () {
            return path.join(Editor.Project.path + "/packages/hot-update-tools/config/userCache.json");
        },
        enumerable: false,
        configurable: true
    });
    _Helper.prototype.getManifestDir = function (buildDir) {
        if (buildDir && buildDir.length > 0) {
            return path.join(buildDir, 'manifest');
        }
        else {
            return "";
        }
    };

    /** 获取当前用户设置 */
    _Helper.prototype.getUserCache = function () {
        var userCache = null;
        if (fs.existsSync(this.userCachePath)) {
            var cacheString = fs.readFileSync(this.userCachePath, 'utf8');
            userCache = JSON.parse(cacheString);
        }
        return userCache;
    };

    /**@description 保存当前用户设置 */
    _Helper.prototype.saveUserCache = function () {
        this.userCache.compressPath = this.view.compressPathInput.value;
        this.userCache.isUseManifest = this.view.isUseManifest.value;
        this.userCache.isBuildFinishZip = this.view.isBuildFinishZip.value;
        var cacheString = JSON.stringify(this.userCache);
        Editor.log('saveUserCache', cacheString)
        fs.writeFileSync(this.userCachePath, cacheString);
    };

    /**@description 生成默认缓存 */
    _Helper.prototype.generateDefaultUseCache = function () {
        this.userCache.version = this.config.version;
        this.userCache.buildDir = "";
        this.userCache.bundles = this.bundles;
        this.userCache.remoteUrl = "-";
        this.userCache.compressPath = path.join(__dirname, 'assets');
        this.userCache.isUseManifest = false;
        this.userCache.isBuildFinishZip = false;
        //Editor.log('this.userCache.compressPath ', path.join(__dirname, 'assets'))
    };
    /**@description 初始化UI数据 */
    _Helper.prototype.initUIDatas = function () {
        var _this = this;
        this.view.version.value = this.userCache.version;
        setTimeout(() => {
            if (_this.userCache.historySelectedUrl = "") {
                _this.userCache.historySelectedUrl = _this.userCache.historyIps[0];
            }
        }, 10);

        this.view.buildDir.value = path.join(__dirname, 'build', 'jsb-default');
        this.view.manifestDir.value = path.join(__dirname, 'build', 'jsb-default', 'manifest');

        //读取本地配置
        let compressPath = path.join(__dirname, 'assets');
        let isUseManifest = false;
        let isBuildFinishZip = false;
        let userCache = this.getUserCache();
        if (userCache) {
            compressPath = userCache.compressPath;
            if (userCache.isUseManifest != null) {
                isUseManifest = userCache.isUseManifest;
            }
            if (userCache.isBuildFinishZip != null) {
                isBuildFinishZip = userCache.isBuildFinishZip;
            }
        }
        //打印userCache
        //Editor.log('this.userCache.initUIDatas11 ', JSON.stringify(userCache));
        this.view.compressPathInput.value = compressPath;
        this.view.isUseManifest.value = isUseManifest;
        this.view.isBuildFinishZip.value = isBuildFinishZip;

    };
    /**@description 返回远程显示地址+版本号 */
    _Helper.prototype.getShowRemoteString = function (bundleName) {
        if (bundleName) {
            return "[" + this.userCache.bundles[bundleName].version + "] : " + this.userCache.remoteBundleUrls[bundleName];
        }
        else {
            return "[" + this.userCache.version + "] : " + this.userCache.remoteUrl;
        }
    };
    /**@description 初始化数据 */
    _Helper.prototype.initDatas = function () {
        this._isDoCreate = false;
        this.initUIDatas();
    };
    /**@description 绑定界面事件 */
    _Helper.prototype.bindingEvents = function () {
        var _this = this;
        var view = this.view;
        var keys = bundlesNames;

        // /Users/sahilkhan/Documents/slot_main/assets/resources/hotloadRes1.0 

        //对比101
        this.view.createVer101.addEventListener("confirm", this.oncreateVer101.bind(this, 'core'));
        //对比102
        this.view.createVer102.addEventListener("confirm", this.oncreateVer102.bind(this, "core"));
        //开启压缩
        this.view.openMetaCompress.addEventListener("confirm", this.openMetaCompress.bind(this));
        //关闭压缩
        this.view.closeMetaCompress.addEventListener("confirm", this.closeMetaCompress.bind(this));
        keys.forEach(function (key) {
            view["button1" + key].addEventListener("confirm", _this.oncreatebutton1.bind(_this, key));
            view["button2" + key].addEventListener("confirm", _this.oncreatebutton2.bind(_this, key));
        });

    };

    _Helper.prototype.openMetaCompress = function () {
        //去掉路径中头尾的空白
        // Editor.log('openMetaCompress open ',);
        let path = this.view.compressPathInput.value.trim();
        // Editor.log('openMetaCompress ', path);
        Editor.Ipc.sendToMain('hot-update-tools:set-meta-compress', path, true);
    };
    _Helper.prototype.closeMetaCompress = function () {
        // Editor.log('openMetaCompress close ',);
        let path = this.view.compressPathInput.value.trim();
        // Editor.log('closeMetaCompress ', path);
        Editor.Ipc.sendToMain('hot-update-tools:set-meta-compress', path, false);
    };


    _Helper.prototype.oncreatebutton3 = async function (key) {
        let updateDirstr = path.join(__dirname, rootDir, this.view.isUseManifest.value ? 'game-assets-release' : 'game-assets');
        let updateDir = path.join(updateDirstr, key);
        this.readConfig();
        let curVer = resDirs[0];
        let destDirstr = path.join(__dirname, zipListPath);
        let destDir = path.join(destDirstr, key);
        this.deleteFolder(destDir);
        var checkpreVerDir = path.join(updateDir, 'ver_' + resDirs[1] + '/');
        if (!fs.existsSync(checkpreVerDir)) {
            this.addLog('没有上一个版本的对比文件,请先生成上一个版本的对比文件')
            return
        }
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        for (let index = 1; index < resDirs.length; index++) {
            var preVer = resDirs[index];
            this.addLog(`开始对比版本差异`);
            var preVerDir = path.join(updateDir, 'ver_' + preVer + '/');
            var curVerDir = path.join(updateDir, 'ver_' + curVer + '/');
            var preAssets = this.readMainfestDirbundle(preVerDir, key);
            var curAssets = this.readMainfestDirbundle(curVerDir, key);
            var diffAssets = this.compareAssets(curAssets, preAssets);
            if (diffAssets == null) {
                this.addLog('两个版本没有差异...');
                continue;
            }
            var diffDirs = this.makeDiffFiles(curVer, preVer, curVerDir, diffAssets, key);
            for (let j = 0; j < diffDirs.length; j++) {
                const diffDir = diffDirs[j];
                let zipFilepath = await this.zipDiffFilesbundle(key, destDir, diffDir, j + 1);
                this.addLog(key + `生成成功!!!!!`, zipFilepath);
            }
        }
        this.packageZipbundle(key)
    };

    _Helper.prototype.zipDiffFilesbundle = async function (key, destDir, diffDir, index) {
        var zip = new JSZIP();
        var tarDir = diffDir;
        var self = this;
        if (key == "gameprefab") {
            key = 'common'
        } else if (key == "pigbank") {
            key = 'piggybank'
        }
        let destFile = path.join(destDir, key + `_diff.zip`);
        if (fs.existsSync(destFile)) {
            fs.unlinkSync(destFile);
        }
        this.readZipDir(zip, tarDir);
        return await zip.generateAsync({
            type: "nodebuffer",
            compression: "DEFLATE",
            compressionOptions: {
                level: 9
            }
        }).then(function (content) {
            fs.writeFileSync(destFile, content, 'utf-8');
            return destFile;
        });
    };

    _Helper.prototype.oncreatebutton2 = function (key) {
        if (this.isDoCreate())
            return;

        this.addLog(key + " 请稍等...")
        var buildSrcPathassets = path.join(__dirname, '/build/jsb-default/assets');
        var buildSrcPathassetsfest = path.join(__dirname, '/build/jsb-default/manifest');
        var rootVerPathRootPath = path.join(__dirname, 'hotupdate', this.view.isUseManifest.value ? 'game-assets-release' : 'game-assets', key);
        var checkpreVerDir = path.join(rootVerPathRootPath, 'ver_' + '1.0.1');

        if (!fs.existsSync(path.join(buildSrcPathassets, key))) {
            this.addLog("\u672A\u627E\u5230" + path.join(buildSrcPathassets, key));
            return;
        }
        if (!fs.existsSync(checkpreVerDir)) {
            this.addLog('没有上一个版本的对比文件,请先生成上一个版本的对比文件')
            return
        }
        if (isdel) {
            isdel = false
            this.bundles = []
            this.generateDefaultUseCache()
            this.saveUserCache()
        }
        if (!this.bundles.includes(key)) {
            this.bundles.push(key);
        }
        this.generateDefaultUseCache()
        this.saveUserCache()
        this.mkdirSync(rootVerPathRootPath);
        var destFileDir = path.join(rootVerPathRootPath, 'ver_' + '1.0.2');
        if (fs.existsSync(destFileDir)) {
            this.delDir(destFileDir);
        }
        this.mkdirSync(destFileDir);
        this.mkdirSync(path.join(destFileDir, 'assets'));
        var str1 = path.join(destFileDir, 'assets');

        this.copySourceDirToDesDir(path.join(buildSrcPathassets, key), path.join(str1, key));
        var srcPath = path.join(buildSrcPathassetsfest, key + "_project.manifest")
        var tarPath = path.join(destFileDir, key + "_project.manifest")
        var srcPathver = path.join(buildSrcPathassetsfest, key + "_version.manifest")
        var tarPathver = path.join(destFileDir, key + "_version.manifest")
        fs.copyFileSync(srcPath, tarPath);
        fs.copyFileSync(srcPathver, tarPathver);
        setTimeout(() => {
            this.oncreatebutton3(key);
        }, 2000);
    };

    _Helper.prototype.oncreatebutton1 = function (key) {
        if (this.isDoCreate())
            return;
        this.addLog(key);
        curkey = key
        Editor.Panel.open('confirm_create');
    };

    _Helper.prototype.oncreateVer101 = function (key) {
        if (this.isDoCreate())
            return;
        this.addLog(key)
        curkey = key
        Editor.Panel.open('confirm_create');
    };

    _Helper.prototype.onconfirm_create101 = function (key) {
        var buildSrcPath = path.join(__dirname, 'build', 'jsb-default');			//打包之后资源所在的路径
        var buildSrcPathassets = path.join(__dirname, 'build', 'jsb-default', 'assets');
        var buildSrcPathassetsfest = path.join(__dirname, 'build', 'jsb-default', 'manifest');
        var rootVerPathRootPath = path.join(__dirname, 'hotupdate', this.view.isUseManifest.value ? 'game-assets-release' : 'game-assets', curkey);
        const folderPath = path.join(__dirname, 'hotupdate', 'game-assets-release');
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        this.mkdirSync(rootVerPathRootPath);

        var destFileDir = path.join(rootVerPathRootPath, 'ver_' + '1.0.1');
        if (fs.existsSync(destFileDir)) {
            this.delDir(destFileDir);
        }
        this.mkdirSync(destFileDir);
        if (curkey == "core") {
            this.mkdirSync(path.join(destFileDir, 'src'));
        }
        this.mkdirSync(path.join(destFileDir, 'assets'));
        var str1 = path.join(destFileDir, 'assets');
        // var str2 = path.join(str1, 'internal');
        var srcPath = path.join(buildSrcPathassetsfest, "project.manifest")
        var tarPath = path.join(destFileDir, "project.manifest")
        var srcPathver = path.join(buildSrcPathassetsfest, "version.manifest")
        var tarPathver = path.join(destFileDir, "version.manifest")

        if (curkey == "core") {
            this.copySourceDirToDesDir(path.join(buildSrcPath, 'src'), path.join(destFileDir, 'src'));
            this.copySourceDirToDesDir(path.join(buildSrcPathassets, 'internal'), path.join(str1, 'internal'));
            this.copySourceDirToDesDir(path.join(buildSrcPathassets, 'main'), path.join(str1, 'main'));
            this.copySourceDirToDesDir(path.join(buildSrcPathassets, 'resources'), path.join(str1, 'resources'));
        } else {
            this.copySourceDirToDesDir(path.join(buildSrcPathassets, curkey), path.join(str1, curkey));
            srcPath = path.join(buildSrcPathassetsfest, curkey + "_project.manifest")
            tarPath = path.join(destFileDir, curkey + "_project.manifest")
            srcPathver = path.join(buildSrcPathassetsfest, curkey + "_version.manifest")
            tarPathver = path.join(destFileDir, curkey + "_version.manifest")
        }

        fs.copyFileSync(srcPath, tarPath);
        fs.copyFileSync(srcPathver, tarPathver);
        this.addLog("生成上一个版本的对比文件 生成完成")
    };

    _Helper.prototype.oncreateVer102 = function (key) {
        if (this.isDoCreate())
            return;
        if (isdel) {
            isdel = false
            this.bundles = []
            this.generateDefaultUseCache()
            this.saveUserCache()
        }
        if (!this.bundles.includes(key)) {
            this.bundles.push(key);
        }
        this.generateDefaultUseCache()
        this.saveUserCache()

        var buildSrcPath = path.join(__dirname, 'build', 'jsb-default');			//打包之后资源所在的路径
        var buildSrcPathassets = path.join(__dirname, 'build', 'jsb-default', 'assets');
        var buildSrcPathassetsfest = path.join(__dirname, 'build', 'jsb-default', 'manifest');
        var rootVerPathRootPath = path.join(__dirname, 'hotupdate', this.view.isUseManifest.value ? 'game-assets-release' : 'game-assets', key);
        this.mkdirSync(rootVerPathRootPath);
        var destFileDir = path.join(rootVerPathRootPath, 'ver_' + '1.0.2');
        if (fs.existsSync(destFileDir)) {
            this.delDir(destFileDir);
        }
        this.mkdirSync(destFileDir);
        this.mkdirSync(path.join(destFileDir, 'src'));
        this.mkdirSync(path.join(destFileDir, 'assets'));
        var str1 = path.join(destFileDir, 'assets');
        // var str2 = path.join(str1, 'internal');
        this.copySourceDirToDesDir(path.join(buildSrcPath, 'src'), path.join(destFileDir, 'src'));
        this.copySourceDirToDesDir(path.join(buildSrcPathassets, 'internal'), path.join(str1, 'internal'));
        this.copySourceDirToDesDir(path.join(buildSrcPathassets, 'main'), path.join(str1, 'main'));
        this.copySourceDirToDesDir(path.join(buildSrcPathassets, 'resources'), path.join(str1, 'resources'));
        // this.copySourceDirToDesDir(path.join(buildSrcPathassetsfest, 'project'), path.join(destFileDir, 'project'));
        var srcPath = path.join(buildSrcPathassetsfest, "project.manifest")
        var tarPath = path.join(destFileDir, "project.manifest")
        var srcPathver = path.join(buildSrcPathassetsfest, "version.manifest")
        var tarPathver = path.join(destFileDir, "version.manifest")
        fs.copyFileSync(srcPath, tarPath);
        fs.copyFileSync(srcPathver, tarPathver);
        // this.addLog(" 生成当前需要对比文件 生成完成")
        setTimeout(() => {
            this.oncreateDiff(key)
        }, 2000);
    };

    _Helper.prototype.readConfig = function () {
        resDirs = []
        let filepath = path.join(__dirname, configFile);
        let text = fs.readFileSync(filepath, 'utf8');
        let array = text.split(/[\r\n\t]/);
        for (let index = 0; index < array.length; index++) {
            const text = array[index];
            if (text.length > 0 && text[0] != '#') {
                let array2 = text.split('#');
                resDirs.push(array2[0]);
            }
        }
    };

    _Helper.prototype.deleteFolder = function (folderPath) {
        var files = [];
        var self = this;
        if (fs.existsSync(folderPath)) {
            files = fs.readdirSync(folderPath);
            files.forEach(function (file, index) {
                var curPath = path.join(folderPath, file);
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    self.deleteFolder(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(folderPath);
        }
    };

    _Helper.prototype.readMainfestDirbundle = function (dir, key) {
        let manifest = {};
        let mainfestPath = path.join(dir, key + '_project.manifest');
        var stat = fs.statSync(mainfestPath);
        if (!stat.isFile()) {
            console.log(mainfestPath + ' is not file.');
            return null;
        }
        let textData = fs.readFileSync(mainfestPath, "utf8");
        let assets = JSON.parse(textData);
        for (const key in assets.assets) {
            if (Object.hasOwnProperty.call(assets.assets, key)) {
                manifest[key] = assets.assets[key];
            }
        }
        return manifest;
    };

    _Helper.prototype.readMainfestDir = function (dir, key) {
        let manifest = {};
        let mainfestPath = path.join(dir, 'project.manifest');
        var stat = fs.statSync(mainfestPath);
        if (!stat.isFile()) {
            this.addLog(mainfestPath + ' is not file.');
            return null;
        }
        let textData = fs.readFileSync(mainfestPath, "utf8");
        let assets = JSON.parse(textData);
        for (const key in assets.assets) {
            if (Object.hasOwnProperty.call(assets.assets, key)) {
                manifest[key] = assets.assets[key];
            }
        }
        return manifest;
    };

    _Helper.prototype.checkFileDir = function (filePath) {
        var parentPath = path.dirname(filePath);
        if (!fs.existsSync(parentPath)) {
            fs.mkdirSync(parentPath, { recursive: true });
        }
    };

    _Helper.prototype.makeDiffFiles = function (curVer, preVer, curVerDir, diffAssets, key) {
        let index = 1;
        let diffDir = path.join(__dirname, rootDiffPath);
        this.mkdirSync(diffDir);
        let dirname = `res-${key}_${curVer}_${preVer}-${index}`;
        diffDir = path.join(diffDir, dirname);
        this.deleteFolder(diffDir);
        this.mkdirSync(diffDir);
        let diffDirs = [];
        diffDirs.push(diffDir);
        for (const key in diffAssets) {
            if (Object.hasOwnProperty.call(diffAssets, key)) {
                var decodedFilePath = decodeURIComponent(key);
                let asset = diffAssets[decodedFilePath];
                let filePath = path.join(diffDir, decodedFilePath); // use decodedFilePath
                this.checkFileDir(filePath);
                let scrFile = path.join(curVerDir, decodedFilePath); // use decodedFilePath
                let tarFile = path.join(diffDir, decodedFilePath); // use decodedFilePath
                this.copyFileSync(scrFile, tarFile);


            }

        }
        return diffDirs;
    };

    _Helper.prototype.copyFileSync = function (srcPath, tarPath) {
        fs.writeFileSync(tarPath, fs.readFileSync(srcPath));
    };

    _Helper.prototype.compareAssets = function (curAssets, preAssets) {
        let isdiff = false;
        let diffAssets = {};
        for (const key in curAssets) {
            if (Object.hasOwnProperty.call(curAssets, key)) {
                const asset = curAssets[key];
                const preAsset = preAssets[key];
                if (preAsset == null || preAsset.size != asset.size || preAsset.md5 != asset.md5) {
                    diffAssets[key] = asset;
                    isdiff = true;
                }
            }
        }
        if (isdiff) {
            return diffAssets;
        }
        return null;
    };

    _Helper.prototype.readZipDir = function (zip, npath) {
        let files = fs.readdirSync(npath);
        let self = this
        files.forEach(function (filename, index) {
            let filepath = path.join(npath, filename);
            let file = fs.statSync(filepath);
            if (file.isDirectory()) {
                let dirlist = zip.folder(filename);
                self.readZipDir(dirlist, filepath);
            } else {
                zip.file(filename, fs.readFileSync(filepath));
            }
        });
    };

    _Helper.prototype.zipDiffFiles = async function (destDir, diffDir, index) {
        var zip = new JSZIP();
        var tarDir = diffDir;
        var self = this;
        let destFile = path.join(destDir, `core_diff.zip`);
        if (fs.existsSync(destFile)) {
            fs.unlinkSync(destFile);
        }
        this.readZipDir(zip, tarDir);
        return await zip.generateAsync({
            type: "nodebuffer",
            compression: "DEFLATE",
            compressionOptions: {
                level: 9
            }
        }).then(function (content) {
            fs.writeFileSync(destFile, content, 'utf-8');
            return destFile;
        });
    };

    _Helper.prototype.oncreateDiff = async function (key) {
        let updateDirstr = path.join(__dirname, rootDir, this.view.isUseManifest.value ? 'game-assets-release' : 'game-assets');
        let updateDir = path.join(updateDirstr, key);
        this.readConfig();
        let curVer = resDirs[0];
        var zipArray = [];
        // this.addLog('updateDir: ' + updateDir);
        let destDirstr = path.join(__dirname, zipListPath);
        let destDir = path.join(destDirstr, key);
        // this.addLog('destDir: ' + destDir);
        this.deleteFolder(destDir);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        for (let index = 1; index < resDirs.length; index++) {
            var preVer = resDirs[index];
            this.addLog(`开始对比版本差异`);

            var preVerDir = path.join(updateDir, 'ver_' + preVer + '/');
            var curVerDir = path.join(updateDir, 'ver_' + curVer + '/');
            var preAssets = this.readMainfestDir(preVerDir, key);
            var curAssets = this.readMainfestDir(curVerDir, key);
            var diffAssets = this.compareAssets(curAssets, preAssets);
            if (diffAssets == null) {
                this.addLog('两个版本没有差异...');
                continue;
            }
            var diffDirs = this.makeDiffFiles(curVer, preVer, curVerDir, diffAssets, key);
            let item = { ver: preVer, assets: [] };
            // this.addLog(`diffDirs11=`, diffDirs);
            for (let j = 0; j < diffDirs.length; j++) {
                const diffDir = diffDirs[j];
                let zipFilepath = await this.zipDiffFiles(destDir, diffDir, j + 1);
                this.addLog(`生成成功!!!!!`, zipFilepath);
            }
        }
        //读出主包资源，生成主包版本
        if (key == 'core') {
            this.packageZipbundle(key)
        }
    };

    _Helper.prototype.packageZipbundle = function (bundleName) {
        var _loop_1 = function () {
            var zipname = bundleName
            if (zipname == 'gameprefab') {
                zipname = 'common'
            } else if (zipname == 'pigbank') {
                zipname = 'piggybank'
            }
            let destDirstr = path.join(__dirname, zipListPath);
            let destDir = path.join(destDirstr, bundleName);

            var zip = new JSZIP();
            var tarDir = path.join(__dirname, 'hotupdate', this_1.view.isUseManifest.value ? 'game-assets-release' : 'game-assets', bundleName, 'ver_1.0.2');
            let destFile = path.join(destDir, zipname + `.zip`);
            if (fs.existsSync(destFile)) {
                fs.unlinkSync(destFile);
            }
            this_1.addLog("生成整包成功", destFile)
            this_1.readZipDir(zip, tarDir);
            zip.generateAsync({
                type: "nodebuffer",
                compression: "DEFLATE",
                compressionOptions: {
                    level: 9
                }
            }).then(function (content) {
                fs.writeFileSync(destFile, content, 'utf-8');
                var rootVerPathRootPath = path.join(__dirname, 'hotupdate', 'game-assets', bundleName);
                var rootVerPathRootPath2 = path.join(__dirname, 'hotupdate', Helper.view.isUseManifest.value ? 'game-assets-release' : 'game-assets', bundleName);
                var destFileDir = path.join(rootVerPathRootPath, 'ver_' + '1.0.2');
                if (fs.existsSync(destFileDir)) {
                    Helper.deleteFolder(destFileDir);
                }
                var destFileDir2 = path.join(rootVerPathRootPath2, 'ver_' + '1.0.2');
                if (fs.existsSync(destFileDir2)) {
                    Helper.deleteFolder(destFileDir2);
                }
                return destFile;
            });
        };
        var this_1 = this;
        _loop_1();
    };

    _Helper.prototype.zipDiffFilesAll = async function (destDir, diffDir, index) {
        // this.addLog("zipDiffFiles1")
        var zip = new JSZIP();
        var tarDir = diffDir;
        let destFile = path.join(destDir, `core.zip`);
        if (fs.existsSync(destFile)) {
            fs.unlinkSync(destFile);
        }
        this.readZipDir(zip, tarDir);
        return await zip.generateAsync({
            type: "nodebuffer",
            compression: "DEFLATE",
            compressionOptions: {
                level: 9
            }
        }).then(function (content) {
            fs.writeFileSync(destFile, content, 'utf-8');
            return destFile;
        });
    };

    //初始化
    _Helper.prototype.init = function (view) {
        Method.setDoCreate(false)
        this.view = view;
        this.initDatas();
        this.onReadConfig();
    };

    _Helper.prototype.addProgress = function () {

    };
    _Helper.prototype.copySourceDirToDesDir = function (source, dest) {
        var self = this;
        var makeDir = function (_source, _dest, _copyFileCb) {
            fs.exists(_dest, function (isExist) {
                isExist ? _copyFileCb(_source, _dest) : fs.mkdir(_dest, function () {
                    self.addProgress(), _copyFileCb(_source, _dest);
                });
            });
        };
        var copyFile = function (_source, _dest) {
            fs.readdir(_source, function (err, files) {
                if (err)
                    throw err;

                files.forEach(function (filename) {
                    var readStream;
                    var writeStram;
                    var sourcePath = path.join(_source, filename);
                    var destPath = path.join(_dest, filename);
                    fs.stat(sourcePath, function (err, stats) {
                        if (err)
                            throw err;
                        if (stats.isFile()) {
                            readStream = fs.createReadStream(sourcePath);
                            writeStram = fs.createWriteStream(destPath);
                            readStream.pipe(writeStram);
                            self.addProgress();
                        }
                        else {
                            stats.isDirectory() && makeDir(sourcePath, destPath, copyFile);
                        }
                    });
                });
            });
        };
        makeDir(source, dest, copyFile);
    };
    _Helper.prototype.getFileCount = function (dir) {
        var count = 0;
        var counter = function (dir) {
            var readdir = fs.readdirSync(dir);
            for (var i in readdir) {
                count++;
                var fullPath = path.join(dir, readdir[i]);
                fs.statSync(fullPath).isDirectory() && counter(fullPath);
            }
        };
        return counter(dir), count;
    };
    /**@description 返回需要添加到主包版本的文件目录 */
    _Helper.prototype.getMainBundleIncludes = function () {
        return [
            "assets/internal",
            "assets/main",
            "assets/resources",
        ];
    };

    _Helper.prototype.onReadConfig = function () {
        Editor.Ipc.sendToMain('hot-update-tools:readconfig', (bundleNames) => {
            bundlesNames = bundleNames
            this.onCreateManifest();
            this.bindingEvents();
        });
    };

    /**@description 生成manifest版本文件 */
    _Helper.prototype.onCreateManifest = function () {
        if (this.isDoCreate())
            return;
        this._isDoCreate = true;
        this.userCache.version = 10000
        this.userCache.buildDir = path.join(__dirname, 'build', 'jsb-default');
        this.userCache.serverIP = "https://global-static"
        var version = this.userCache.version;
        var buildDir = this.userCache.buildDir;
        buildDir = buildDir.replace(/\\/g, "/");
        var manifestDir = this.getManifestDir(buildDir);
        manifestDir = manifestDir.replace(/\\/g, "/");
        var serverUrl = this.userCache.serverIP;
        var subBundles = bundlesNames;
        var manifest = {
            version: version,
            packageUrl: serverUrl,
            remoteManifestUrl: "",
            remoteVersionUrl: "",
            assets: {},
            searchPaths: [],
        };
        //删除旧的版本控件文件
        if (fs.existsSync(manifestDir)) {
            // this.addLog("存在旧的，删除掉");
            this.delDir(manifestDir);
        }
        this.mkdirSync(manifestDir);
        //读出主包资源，生成主包版本
        var mainIncludes = this.getMainBundleIncludes();
        for (var i = 0; i < mainIncludes.length; i++) {
            this.readDir(path.join(buildDir, mainIncludes[i]), manifest.assets, buildDir);
        }
        //生成project.manifest
        var projectManifestPath = path.join(manifestDir, "project.manifest");
        var versionManifestPath = path.join(manifestDir, "version.manifest");
        fs.writeFileSync(projectManifestPath, JSON.stringify(manifest));
        this.addLog("\u751F\u6210" + projectManifestPath + "\u6210\u529F");
        delete manifest.assets;
        delete manifest.searchPaths;
        fs.writeFileSync(versionManifestPath, JSON.stringify(manifest));
        this.addLog("\u751F\u6210" + versionManifestPath + "\u6210\u529F");
        //生成各bundles版本文件
        for (var i = 0; i < subBundles.length; i++) {
            var key = subBundles[i];
            this.addLog("\u6B63\u5728\u751F\u6210:" + key);
            manifest.version = 10000;
            manifest.remoteVersionUrl = "";
            manifest.remoteManifestUrl = "";
            manifest.assets = {};
            manifest.searchPaths = [];
            if (!fs.existsSync(path.join(buildDir, "assets/" + key))) {
                this.addLog("\u672A\u627E\u5230" + path.join(buildDir, "assets/" + key));
                continue;
            }
            this.readDir(path.join(buildDir, "assets/" + key), manifest.assets, buildDir);
            projectManifestPath = path.join(manifestDir, key + "_project.manifest");
            versionManifestPath = path.join(manifestDir, key + "_version.manifest");
            fs.writeFileSync(projectManifestPath, JSON.stringify(manifest));
            this.addLog("\u751F\u6210" + projectManifestPath + "\u6210\u529F");
            delete manifest.assets;
            delete manifest.searchPaths;
            fs.writeFileSync(versionManifestPath, JSON.stringify(manifest));
            this.addLog("\u751F\u6210" + versionManifestPath + "\u6210\u529F");
        }
        this.addLog("生成完成,可以开始更新操作")
        this._isDoCreate = false;
    };
    _Helper.prototype.packageDir = function (dir, jszip) {
        if (!fs.existsSync(dir)) {
            return;
        }
        var readDirs = fs.readdirSync(dir);
        for (var i = 0; i < readDirs.length; i++) {
            var file = readDirs[i];
            var fullPath = path.join(dir, file);
            var stat = fs.statSync(fullPath);
            if (stat.isFile()) {
                jszip.file(file, fs.readFileSync(fullPath));
            }
            else {
                stat.isDirectory() && this.packageDir(fullPath, jszip.folder(file));
            }
        }
    };

    _Helper.prototype.delDir = function (sourceDir, isRemoveSourceDir) {
        if (isRemoveSourceDir === void 0) { isRemoveSourceDir = false; }
        var delFile = function (dir) {
            if (!fs.existsSync(dir))
                return;
            var readDir = fs.readdirSync(dir);
            for (var i in readDir) {
                var fullPath = path.join(dir, readDir[i]);
                fs.statSync(fullPath).isDirectory() ? delFile(fullPath) : fs.unlinkSync(fullPath);
            }
        };
        var delDir = function (dir) {
            if (!fs.existsSync(dir))
                return;
            var readDir = fs.readdirSync(dir);
            if (readDir.length > 0) {
                for (var i in readDir) {
                    var fullPath = path.join(dir, readDir[i]);
                    delDir(fullPath);
                }
                (dir !== sourceDir || isRemoveSourceDir) && fs.rmdirSync(dir);
            }
            else {
                (dir !== sourceDir || isRemoveSourceDir) && fs.rmdirSync(dir);
            }
        };
        delFile(sourceDir);
        delDir(sourceDir);
    };
    _Helper.prototype.delFile = function (filePath) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    };
    _Helper.prototype.mkdirSync = function (dir) {
        try {
            fs.mkdirSync(dir);
        }
        catch (e) {
            if ("EEXIST" !== e.code)
                throw e;
        }
    };

    /** 基于图片属性生成md5 */
    _Helper.prototype.generateMD5withoutColorDepth = function (filePath) {
        // 解析文件类型（后缀名）
        const fileType = filePath.split('.').pop();
        //如果是图片png,jgp,astc格式就走这个方法
        if (fileType == 'png' || fileType == 'jpg' || fileType == 'astc') {
            // 获取文件大小
            const fileSize = fs.statSync(filePath).size;
            // 获取图片尺寸
            const dimensions = imageSize(filePath);
            // 将所有属性（除颜色深度外）转换为字符串
            const dataString = `Size: ${fileSize} bytes, Width: ${dimensions.width}, Height: ${dimensions.height}, Type: ${fileType}`;
            // 使用MD5算法生成哈希值
            const md5Hash = crypto.createHash('md5').update(dataString).digest("hex");
            console.log(`MD5 hash with image properties (without color depth): ${md5Hash}`);
            return md5Hash;
        } else {
            let md5Hash = crypto.createHash('md5').update(fs.readFileSync(filePath)).digest("hex");
            return md5Hash;
        }
    }

    /**生成MD5 2024.5.29 */
    _Helper.prototype.readDir = function (dir, obj, source) {
        var stat = fs.statSync(dir);
        if (!stat.isDirectory()) {
            return;
        }
        var subpaths = fs.readdirSync(dir), subpath, size, md5, compressed, relative;
        for (var i = 0; i < subpaths.length; ++i) {
            if (subpaths[i][0] === '.') {
                continue;
            }
            subpath = path.join(dir, subpaths[i]);
            stat = fs.statSync(subpath);
            if (stat.isDirectory()) {
                this.readDir(subpath, obj, source);
            }
            else if (stat.isFile()) {
                // Size in Bytes
                size = stat['size'];
                const ext = path.extname(subpath);
                // if (ext === '.txt' || ext === '.js' || ext === '.json' || ext === '.atlas') {
                //     let fileContent = fs.readFileSync(subpath, 'utf8');
                //     fileContent = fileContent.toString();
                //     // fileContent = fileContent.replace(/\r\n/g, '\n');
                //     //如果路径包含0be9cfb7-4331-4fd7-9cd8-599c227e5f3b,就打印日志
                //     if (subpath.indexOf('0be9cfb7-4331-4fd7-9cd8-599c227e5f3b.json') != -1) {
                //         Editor.log('fileContent before:', fs.readFileSync(subpath, 'utf8'));

                //         let rawFileContent = JSON.stringify(fileContent);  // 转成原始字符串
                //         Editor.log('00000000000001:', rawFileContent.indexOf('\\r\\n'));
                //     }

                //     fileContent = fileContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                //     md5 = crypto.createHash('md5').update(fileContent).digest('hex');

                //     if (subpath.indexOf('0be9cfb7-4331-4fd7-9cd8-599c227e5f3b.json') != -1) {
                //         Editor.log('fileContent before:', fileContent);
                //         // Editor.log('fileContent md5:', md5);
                //     }
                // }
                md5 = require("crypto").createHash('md5').update(fs.readFileSync(subpath)).digest('hex');
                compressed = path.extname(subpath).toLowerCase() === '.zip';
                relative = path.relative(source, subpath);
                relative = relative.replace(/\\/g, '/');
                relative = encodeURI(relative);
                obj[relative] = {
                    'size': size,
                    'md5': md5
                };
                if (compressed) {
                    obj[relative].compressed = true;
                }
            }
        }
    };

    /**
     * @description 是否正在创建
     * @returns
     */
    _Helper.prototype.isDoCreate = function () {
        if (this._isDoCreate) {
            this.addLog("\u6B63\u5728\u6267\u884C\u751F\u6210\u64CD\u4F5C\uFF0C\u8BF7\u52FF\u64CD\u4F5C");
        }
        return this._isDoCreate;
    };
    /**
     * @description 添加日志
     * @param {*} message
     * @param {*} obj
     * @returns
     */
    _Helper.prototype.addLog = function (message, obj) {
        var _this = this;
        if (typeof obj == "function") {
            return;
        }
        if (obj) {
            console.log(message, obj);
        }
        else {
            console.log(message);
        }
        var text = "";
        if (obj == null) {
            text = message;
        }
        else if (typeof obj == "object") {
            text = message + JSON.stringify(obj);
        }
        else {
            text = message + obj.toString();
        }
        var temp = this.view.logView.value;
        if (temp.length > 0) {
            this.view.logView.value = temp + "\n" + text;
        }
        else {
            this.view.logView.value = text;
        }
        setTimeout(function () {
            _this.view.logView.scrollTop = _this.view.logView.scrollHeight;
        }, 10);
    };
    Object.defineProperty(_Helper.prototype, "indexHtmlContent", {
        /**@description 获取index.html的内容 */
        get: function () {
            var content = fs.readFileSync(path.join(Editor.Project.path, "/packages/hot-update-tools/dist/panel/index.html"), "utf-8");
            return content;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_Helper.prototype, "config", {
        get: function () {
            if (this._config) {
                return this._config;
            }
            var content = fs.readFileSync(path.join(Editor.Project.path, "/packages/hot-update-tools/config/bundles.json"), "utf-8");
            this._config = JSON.parse(content);
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_Helper.prototype, "style", {
        get: function () {
            var content = fs.readFileSync(path.join(Editor.Project.path, "/packages/hot-update-tools/dist/panel/index.css"), "utf-8");
            return content;
        },
        enumerable: false,
        configurable: true
    });
    _Helper.prototype.generateTemplate = function () {

        var _template = this.indexHtmlContent;
        //生成子游戏版本控制界面
        //生成子游戏测环境版本号
        var _subGameServerVersionView = "";
        var _subGameVersionView = "";
        for (var i = 0; i < this.config.bundles.length; i++) {
            var gameInfo = this.config.bundles[i];
            if (gameInfo.dir && gameInfo.dir.length > 0) {
                _subGameVersionView += `
                    <ui-prop name="${gameInfo.name}(${gameInfo.dir})">
                        <div class="flex-1 layout horizontal center">
                            
                            <ui-button class="self-end red" id="button1${gameInfo.dir}">上一个版本的对比文件</ui-button>
                            <ui-button class="self-end green" id="button2${gameInfo.dir}">生成差异文件</ui-button>
                        </div>
                    </ui-prop>
                `;

                this.elements[`button1${gameInfo.dir}`] = `#button1${gameInfo.dir}`;
                this.elements[`button2${gameInfo.dir}`] = `#button2${gameInfo.dir}`;

                _subGameServerVersionView += `
                    <ui-prop name="${gameInfo.name}(${gameInfo.dir})">
                        <div class="flex-1 layout horizontal center">
                            <ui-input disabled="disabled" id="${gameInfo.dir}remoteUrl" class="flex-2"></ui-input>
                            <ui-button class="end-justified" id="refresh${gameInfo.dir}Version"><i class="icon-arrows-cw"></i></ui-button>
                        </div>
                    </ui-prop>
                `;

                this.elements[`${gameInfo.dir}remoteUrl`] = `#${gameInfo.dir}remoteUrl`;
                this.elements[`refresh${gameInfo.dir}Version`] = `#refresh${gameInfo.dir}Version`;
            }
        }
        var templateReplaceManifest = function templateReplace() {
            return arguments[1] + _subGameVersionView + arguments[3];
        };
        //添加子游戏版本配置
        _template = _template.replace(/(<!--subgame start-->)([\s\w\S]*)(<!--subgame end-->)/g, templateReplaceManifest);
        var templateReplaceTestManifest = function templateReplace() {
            return arguments[1] + _subGameServerVersionView + arguments[3];
        };
        //添加子游戏版本号
        _template = _template.replace(/(<!--subgame test start-->)([\s\w\S]*)(<!--subgame test end-->)/g, templateReplaceTestManifest);
        return _template;
    };
    Object.defineProperty(_Helper.prototype, "template", {
        get: function () {
            if (this._template) {
                return this._template;
            }
            this._template = this.generateTemplate();
            return this._template;
        },
        enumerable: false,
        configurable: true
    });
    return _Helper;
}());
var Helper = new _Helper();
Editor.Panel.extend({
    style: Helper.style,
    template: Helper.template,
    $: Helper.elements,
    ready: function () {
        var _this = this;
        var view = {};
        Object.keys(Helper.elements).forEach(function (key) {
            view[key] = _this["$" + key];
        });
        Helper.init(view);
    },
    close: function () {
        let diffDir = path.join(__dirname, rootDiffPath);
        Helper.deleteFolder(diffDir);
        for (var i = 0; i < bundlesNames.length; i++) {
            var rootVerPathRootPath = path.join(__dirname, 'hotupdate', 'game-assets', bundlesNames[i]);
            var rootVerPathRootPath2 = path.join(__dirname, 'hotupdate', Helper.view.isUseManifest.value ? 'game-assets-release' : 'game-assets', bundlesNames[i]);
            var destFileDir = path.join(rootVerPathRootPath, 'ver_' + '1.0.2');
            if (fs.existsSync(destFileDir)) {
                Helper.deleteFolder(destFileDir);
            }
            var destFileDir2 = path.join(rootVerPathRootPath2, 'ver_' + '1.0.2');
            if (fs.existsSync(destFileDir2)) {
                Helper.deleteFolder(destFileDir2);
            }
        }
        var destFileDircore = path.join(__dirname, 'hotupdate', 'game-assets', "core", 'ver_' + '1.0.2');
        var destFileDircore2 = path.join(__dirname, 'hotupdate', Helper.view.isUseManifest.value ? 'game-assets-release' : 'game-assets', "core", 'ver_' + '1.0.2');
        if (fs.existsSync(destFileDircore)) {
            Helper.deleteFolder(destFileDircore);
        }
        if (fs.existsSync(destFileDircore2)) {
            Helper.deleteFolder(destFileDircore2);
        }
        Helper.saveUserCache()
        Method.setDoCreate(true)
    },
    messages: {
        'hot-update-tools:onconfirm_create': function () {
            Helper.onconfirm_create101();
        }
    }
});
