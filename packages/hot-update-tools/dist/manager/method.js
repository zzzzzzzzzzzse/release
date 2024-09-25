const fs = require('fs');
const path = require('path');
var JSZIP = require("jszip");
var rootDir = 'hotupdate';
var outPut = 'ZipDiffList';
var rootVerPath = path.join(rootDir, 'game-assets');
var zipListPath = outPut;
var rootDiffPath = path.join(rootDir, 'diff-ver-files');
var configFile = path.join(rootDir, 'config', 'compare_ver.txt');
var bundleArr = []
var bundleArrNew = []
var curindex = 0
var __dirname = Editor.Project.path;
var resDirs = [];
var _isDoCreate = true
var isUseManifest = false;
var userCache = {
    /**@description 主包版本号 */
    version: "",
    /**@description 当前服务器地址 */
    serverIP: "",
    /**@description 服务器历史地址 */
    historyIps: [],
    historySelectedUrl: "",
    /**@description 构建项目目录 */
    buildDir: "",
    /**@description 各bundle的版本配置 */
    bundles: {},
    /**@description 远程服务器地址 */
    remoteUrl: "",
    /**@description 远程各bundle的版本配置 */
    remoteBundleUrls: {},
    /**@description 远程服务器所在目录 */
    remoteDir: "",
};
const Method = {
    /**@description 生成manifest版本文件 */
    onCreateManifest: function () {
        this.readCache()
        userCache.version = 10000
        userCache.buildDir = path.join(__dirname, 'build', 'jsb-default');
        userCache.serverIP = "https://global-static"
        isUseManifest = false;
        if (userCache.isUseManifest != null) {
            isUseManifest = userCache.isUseManifest;
        }
        var version = userCache.version;
        var buildDir = userCache.buildDir;
        buildDir = buildDir.replace(/\\/g, "/");
        var manifestDir = this.getManifestDir(buildDir);
        manifestDir = manifestDir.replace(/\\/g, "/");
        var serverUrl = userCache.serverIP;
        var subBundles = []
        var content = fs.readFileSync(path.join(Editor.Project.path, "/packages/hot-update-tools/config/bundles.json"), "utf-8");
        let _config = JSON.parse(content);
        for (let i = 0; i < bundleArr.length; i++) {
            for (let j = 0; j < _config.bundles.length; j++) {
                //判断文件是否存在
                let bundle = _config.bundles[j].name;
                let cachebundleName = bundleArr[i]
                let cacheBundlePath = path.join(buildDir, "assets/" + cachebundleName)
                //Editor.log('bundlePath ', cacheBundlePath)
                //Editor.log('cacheBundle exists', fs.existsSync(cacheBundlePath))
                if (fs.existsSync(cacheBundlePath) && bundle == cachebundleName) {
                    subBundles.push(bundle)
                    break;
                }
            }
        }
        if (subBundles.length == 0 || !Array.isArray(subBundles)) {
            Editor.log("没有需要生成的bundle")
            return;
        }
        Editor.log("需要自动发包的bundle", JSON.stringify(subBundles))
        var manifest = {
            version: version,
            packageUrl: serverUrl,
            remoteManifestUrl: "",
            remoteVersionUrl: "",
            assets: {},
            searchPaths: [],
        };
        if (!this.isDoCreate()) {
            Editor.log("终止执行")
            return;
        }
        //删除旧的版本控件文件
        if (fs.existsSync(manifestDir)) {
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
        delete manifest.assets;
        delete manifest.searchPaths;
        fs.writeFileSync(versionManifestPath, JSON.stringify(manifest));
        //生成各bundles版本文件
        const filteredSubBundles = subBundles.filter(item => !item.includes("core"))
        for (var i = 0; i < filteredSubBundles.length; i++) {
            var key = filteredSubBundles[i];
            // Editor.log("\u6B63\u5728\u751F\u6210:" + key);
            manifest.version = 10000;
            manifest.remoteVersionUrl = "";
            manifest.remoteManifestUrl = "";
            manifest.assets = {};
            manifest.searchPaths = [];
            this.readDir(path.join(buildDir, "assets/" + key), manifest.assets, buildDir);
            projectManifestPath = path.join(manifestDir, key + "_project.manifest");
            versionManifestPath = path.join(manifestDir, key + "_version.manifest");
            fs.writeFileSync(projectManifestPath, JSON.stringify(manifest));
            delete manifest.assets;
            delete manifest.searchPaths;
            fs.writeFileSync(versionManifestPath, JSON.stringify(manifest));
        }
        const { hasCore, filteredArray } = this.filterAndCheckCore(subBundles);
        bundleArrNew = filteredArray
        Editor.log("bundleArrNew ", JSON.stringify(bundleArrNew))
        setTimeout(() => {
            if (!this.isDoCreate()) {
                Editor.log("终止执行")
                return;
            }
            if (hasCore) {
                this.oncreateVer102("core")
            } else {
                if (!bundleArrNew[curindex]) {
                    Editor.log("执行完成!!")
                    return;
                }
                this.oncreatebutton2(bundleArrNew[curindex])
                curindex++
            }
        }, 1000);
    },

    oncreatebutton2: function (key) {
        Editor.log(key + " 请稍等...")
        var buildSrcPathassets = path.join(__dirname, '/build/jsb-default/assets');
        var buildSrcPathassetsfest = path.join(__dirname, '/build/jsb-default/manifest');
        var rootVerPathRootPath = path.join(__dirname, 'hotupdate', isUseManifest ? 'game-assets-release' : 'game-assets', key);
        var checkpreVerDir = path.join(rootVerPathRootPath, 'ver_' + '1.0.1');
        if (!fs.existsSync(checkpreVerDir)) {
            Editor.log('没有上一个版本的对比文件,请先生成上一个版本的对比文件')
            return
        }
        if (!this.isDoCreate()) {
            Editor.log("终止执行")
            return;
        }
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
            if (!this.isDoCreate()) {
                Editor.log("终止执行")
                return;
            }
            this.oncreatebutton3(key);
        }, 2000);
    },

    oncreatebutton3: async function (key) {
        let updateDirstr = path.join(__dirname, rootDir, isUseManifest ? 'game-assets-release' : 'game-assets');
        let updateDir = path.join(updateDirstr, key);
        this.readConfig();
        let curVer = resDirs[0];
        let destDirstr = path.join(__dirname, zipListPath);
        let destDir = path.join(destDirstr, key);
        this.deleteFolder(destDir);
        var checkpreVerDir = path.join(updateDir, 'ver_' + resDirs[1] + '/');
        if (!fs.existsSync(checkpreVerDir)) {
            Editor.log('没有上一个版本的对比文件,请先生成上一个版本的对比文件')
            return
        }
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        if (!this.isDoCreate()) {
            Editor.log("终止执行")
            return;
        }

        for (let index = 1; index < resDirs.length; index++) {
            var preVer = resDirs[index];
            var preVerDir = path.join(updateDir, 'ver_' + preVer + '/');
            var curVerDir = path.join(updateDir, 'ver_' + curVer + '/');

            var preAssets = this.readMainfestDirbundle(preVerDir, key);
            var curAssets = this.readMainfestDirbundle(curVerDir, key);
            var diffAssets = this.compareAssets(curAssets, preAssets);
            if (diffAssets == null) {
                Editor.log('两个版本没有差异...');
                continue;
            }
            var diffDirs = this.makeDiffFiles(curVer, preVer, curVerDir, diffAssets, key);
            for (let j = 0; j < diffDirs.length; j++) {
                const diffDir = diffDirs[j];
                let zipFilepath = await this.zipDiffFilesbundle(key, destDir, diffDir, j + 1);
                Editor.log(key + `生成成功!!!!!`, zipFilepath);
            }
        }
        this.packageZipbundle(key)
    },

    zipDiffFilesbundle: async function (key, destDir, diffDir, index) {
        var zip = new JSZIP();
        var tarDir = diffDir;
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
    },

    readMainfestDirbundle: function (dir, key) {
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
    },

    packageZipbundle: function (bundleName) {
        if (!this.isDoCreate()) {
            Editor.log("终止执行")
            return;
        }

        var _loop_1 = async function () {
            var zipname = bundleName
            if (zipname == 'gameprefab') {
                zipname = 'common'
            } else if (zipname == 'pigbank') {
                zipname = 'piggybank'
            }
            let destDirstr = path.join(__dirname, zipListPath);
            let destDir = path.join(destDirstr, bundleName);

            var zip = new JSZIP();
            var tarDir = path.join(__dirname, 'hotupdate', isUseManifest ? 'game-assets-release' : 'game-assets', bundleName, 'ver_1.0.2');
            let destFile = path.join(destDir, zipname + `.zip`);
            if (fs.existsSync(destFile)) {
                fs.unlinkSync(destFile);
            }
            Editor.log("生成整包成功", destFile)
            this_1.readZipDir(zip, tarDir);
            await zip.generateAsync({
                type: "nodebuffer",
                compression: "DEFLATE",
                compressionOptions: {
                    level: 9
                }
            }).then(function (content) {
                fs.writeFileSync(destFile, content, 'utf-8');
                return destFile;
            });
            if (!this_1.isDoCreate()) {
                Editor.log("终止执行")
                return;
            }
            if (bundleArrNew[curindex]) {
                this_1.oncreatebutton2(bundleArrNew[curindex])
            } else {
                Editor.log("执行完成!!")
                this_1.onfinish();
            }
            curindex++;
        };
        var this_1 = this;
        _loop_1();
    },

    onfinish: function () {
        let diffDir = path.join(__dirname, rootDiffPath);
        this.deleteFolder(diffDir);
        for (var i = 0; i < bundleArr.length; i++) {
            var rootVerPathRootPath = path.join(__dirname, 'hotupdate', 'game-assets', bundleArr[i]);
            var rootVerPathRootPath2 = path.join(__dirname, 'hotupdate', isUseManifest ? 'game-assets-release' : 'game-assets', bundleArr[i]);
            var destFileDir = path.join(rootVerPathRootPath, 'ver_' + '1.0.2');
            if (fs.existsSync(destFileDir)) {
                this.deleteFolder(destFileDir);
            }
            var destFileDir2 = path.join(rootVerPathRootPath2, 'ver_' + '1.0.2');
            if (fs.existsSync(destFileDir2)) {
                this.deleteFolder(destFileDir2);
            }
        }
        var destFileDircore = path.join(__dirname, 'hotupdate', 'game-assets', "core", 'ver_' + '1.0.2');
        var destFileDircore2 = path.join(__dirname, 'hotupdate', isUseManifest ? 'game-assets-release' : 'game-assets', "core", 'ver_' + '1.0.2');
        if (fs.existsSync(destFileDircore)) {
            this.deleteFolder(destFileDircore);
        }
        if (fs.existsSync(destFileDircore2)) {
            this.deleteFolder(destFileDircore2);
        }
    },

    filterAndCheckCore: function (arr) {
        const filteredArray = arr.filter(str => !str.includes("core"));
        const hasCore = filteredArray.length !== arr.length;
        return { hasCore, filteredArray };
    },

    oncreateVer102: function (key) {
        Editor.log(key + " 请稍等...")
        var buildSrcPath = path.join(__dirname, 'build', 'jsb-default');			//打包之后资源所在的路径
        var buildSrcPathassets = path.join(__dirname, 'build', 'jsb-default', 'assets');
        var buildSrcPathassetsfest = path.join(__dirname, 'build', 'jsb-default', 'manifest');
        var rootVerPathRootPath = path.join(__dirname, 'hotupdate', isUseManifest ? 'game-assets-release' : 'game-assets', key);
        this.mkdirSync(rootVerPathRootPath);
        var destFileDir = path.join(rootVerPathRootPath, 'ver_' + '1.0.2');
        if (fs.existsSync(destFileDir)) {
            this.delDir(destFileDir);
        }
        this.mkdirSync(destFileDir);
        this.mkdirSync(path.join(destFileDir, 'src'));
        this.mkdirSync(path.join(destFileDir, 'assets'));
        var str1 = path.join(destFileDir, 'assets');
        this.copySourceDirToDesDir(path.join(buildSrcPath, 'src'), path.join(destFileDir, 'src'));
        this.copySourceDirToDesDir(path.join(buildSrcPathassets, 'internal'), path.join(str1, 'internal'));
        this.copySourceDirToDesDir(path.join(buildSrcPathassets, 'main'), path.join(str1, 'main'));
        this.copySourceDirToDesDir(path.join(buildSrcPathassets, 'resources'), path.join(str1, 'resources'));
        var srcPath = path.join(buildSrcPathassetsfest, "project.manifest")
        var tarPath = path.join(destFileDir, "project.manifest")
        var srcPathver = path.join(buildSrcPathassetsfest, "version.manifest")
        var tarPathver = path.join(destFileDir, "version.manifest")
        fs.copyFileSync(srcPath, tarPath);
        fs.copyFileSync(srcPathver, tarPathver);
        setTimeout(() => {
            if (!this.isDoCreate()) {
                Editor.log("终止执行")
                return;
            }
            this.oncreateDiff(key)
        }, 2000);
    },

    copySourceDirToDesDir: function (source, dest) {
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
                        }
                        else {
                            stats.isDirectory() && makeDir(sourcePath, destPath, copyFile);
                        }
                    });
                });
            });
        };
        makeDir(source, dest, copyFile);
    },

    addProgress: function () {

    },

    oncreateDiff: async function (key) {
        let updateDirstr = path.join(__dirname, rootDir, isUseManifest ? 'game-assets-release' : 'game-assets');
        let updateDir = path.join(updateDirstr, key);
        this.readConfig();
        let curVer = resDirs[0];
        let destDirstr = path.join(__dirname, zipListPath);
        let destDir = path.join(destDirstr, key);
        this.deleteFolder(destDir);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        for (let index = 1; index < resDirs.length; index++) {
            var preVer = resDirs[index];
            var preVerDir = path.join(updateDir, 'ver_' + preVer + '/');
            var curVerDir = path.join(updateDir, 'ver_' + curVer + '/');

            var preAssets = this.readMainfestDir(preVerDir, key);

            var curAssets = this.readMainfestDir(curVerDir, key);
            var diffAssets = this.compareAssets(curAssets, preAssets);

            if (diffAssets == null) {
                Editor.log('两个版本没有差异...');
                continue;
            }
            var diffDirs = this.makeDiffFiles(curVer, preVer, curVerDir, diffAssets, key);
            for (let j = 0; j < diffDirs.length; j++) {
                const diffDir = diffDirs[j];
                let zipFilepath = await this.zipDiffFiles(destDir, diffDir, j + 1);
                Editor.log(`生成成功!!!!!`, zipFilepath);
            }
        }
        //读出主包资源，生成主包版本
        this.packageZipbundle(key)
    },

    zipDiffFiles: async function (destDir, diffDir, index) {
        var zip = new JSZIP();
        var tarDir = diffDir;
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
    },

    readZipDir: function (zip, npath) {
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
    },

    makeDiffFiles: function (curVer, preVer, curVerDir, diffAssets, key) {
        let index = 1;
        let maxSize = 1024 * 1024 * 150;
        let total = 0;
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
    },

    copyFileSync: function (srcPath, tarPath) {
        fs.writeFileSync(tarPath, fs.readFileSync(srcPath));
    },

    checkFileDir: function (filePath) {
        var parentPath = path.dirname(filePath);
        if (!fs.existsSync(parentPath)) {
            fs.mkdirSync(parentPath, { recursive: true });
        }
    },

    compareAssets: function (curAssets, preAssets) {
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
    },

    readMainfestDir: function (dir, key) {
        let manifest = {};
        let mainfestPath = path.join(dir, 'project.manifest');
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
    },

    packageDir: function (dir, jszip) {
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
    },

    deleteFolder: function (folderPath) {
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
    },

    readConfig: function () {
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
    },

    getManifestDir: function (buildDir) {
        if (buildDir && buildDir.length > 0) {
            return path.join(buildDir, 'manifest');
        }
        else {
            return "";
        }
    },

    /** 生成文件的md5 */
    readDir: function (dir, obj, source) {
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
    },

    mkdirSync: function (dir) {
        try {
            fs.mkdirSync(dir);
        }
        catch (e) {
            if ("EEXIST" !== e.code)
                throw e;
        }
    },

    delDir: function (sourceDir, isRemoveSourceDir) {
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
    },

    /**@description 返回需要添加到主包版本的文件目录 */
    getMainBundleIncludes: function () {
        return [
            "assets/internal",
            "assets/main",
            "assets/resources",
        ];
    },

    /**@description 读取本地缓存 */
    readCache: function () {
        curindex = 0
        var userCachePath = path.join(__dirname + "/packages/hot-update-tools/config/userCache.json")
        if (fs.existsSync(userCachePath)) {
            var data = fs.readFileSync(userCachePath, "utf-8");
            userCache = JSON.parse(data);
            bundleArr = userCache.bundles
            Editor.log("userCache bundle ", JSON.stringify(bundleArr));
        }
        else {
            Editor.log("\u751F\u5B58\u9ED8\u8BA4\u7F13\u5B58 : ", this.userCache);
        }
    },

    /**
     * @description 是否可以创建
     * @returns
     */
    isDoCreate: function () {
        if (!_isDoCreate) {
            Editor.log("停止执行");
        }
        return _isDoCreate;
    },

    setDoCreate: function (bol) {
        _isDoCreate = bol
    },
}

module.exports = Method;