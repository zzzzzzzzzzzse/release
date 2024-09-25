const Path = require('path');
const Archiver = require('./node_modules/archiver');
const ChildProcess = require('child_process');
const Os = require('os');
const FileUtil = require('./utils/file-util');
const Fs = require('fs');
const uuidFileUtils = require('./uuid/uuidFileUtil');

const configFileDir = 'local';
const packageName = 'bundle-zip';
const configFileName = `${packageName}.json`;
/** 项目路径 */
let packagePath = '';
let pngquantPath = null;

module.exports = {
    load() {
        packagePath = Editor.url(`packages://${packageName}`);
        //Editor.log('[PAC]', 'packagePath', packagePath)
        // Editor.Builder.on('build-start', this.onBuildStart);
        // Editor.Builder.on('build-finished', this.startBundleZip);

    },

    unload() {
        // Editor.Builder.removeListener('build-start', this.onBuildStart);
        // Editor.Builder.removeListener('build-finished', this.startBundleZip);
    },

    messages: {
        'open-panel'() {
            Editor.Panel.open(packageName);
            //测试语句,直接调用压缩方法
            //this.startBundleZip({ dest: '/Users/sahilkhan/Documents/slot_main/build/jsb-default' }, null)
            // this.copyBundle();

            // let projectPath = Editor.Project.path || Editor.projectPath;
            // let url = Path.join(projectPath, 'assets', 'resources', 'hotloadRes');
            // // url = 'db://assets/bundles/luckyStar/res/texture/bg'
            // Editor.log('url:', url);
            // setMetaCompress(url, true);
        },

        'save-config'(event, config) {
            const configFilePath = saveConfig(config);
            Editor.log('[PAC]', '保存配置', configFilePath);
            event.reply(null, true);
        },

        'read-config'(event) {
            const config = getConfig();
            config ? Editor.log('[PAC]', '读取本地配') : Editor.log('[PAC]', '未找到本地配置文件222');
            const bundleNames = this.getBundleNames();
            event.reply(null, config, bundleNames);
        },

        'create-proto'() {
            this.createProto()
        },
        'copy-Bundle'(event, oldName, newName) {
            this.copyBundle(oldName, newName);
        },

        'set-meta-compress'(event, path, isCompress) {
            let projectPath = Editor.Project.path || Editor.projectPath;
            //let path = Path.join(projectPath, 'assets', 'resources', 'hotloadRes');
            Editor.log('set-meta-compress: ', path, isCompress);
            setMetaCompress(path, isCompress);
        },
    },

    copyBundle(oldName, newName) {
        Editor.log('[PAC]', `copyBundle oldName:${oldName} newName:${newName}`);
        const projectPath = Editor.Project.path || Editor.projectPath;
        // let oldName = 'panda';
        // let newName = 'pandaOx2';
        let bundleTemp = 'bundleTemp'
        var path = Path.join(projectPath, 'assets', 'bundles', oldName);
        //文件目录不存在,就打印日志
        if (Fs.existsSync(path) == false) {
            Editor.error('[PAC]', `老的bundle不存在`);
            return;
        }
        if (Fs.existsSync(Path.join(projectPath, 'assets', 'bundles', newName))) {
            Editor.error('[PAC]', `文件${newName}存在`);
            return;
        }
        //生成bundleTemp文件夹
        let tempPath = Path.join(projectPath, bundleTemp)
        uuidFileUtils.createMkdir(tempPath);
        let newBundlePath = Path.join(tempPath, newName)
        Editor.log("[PAC]", '拷贝文件到' + newBundlePath)
        FileUtil.copy(path, newBundlePath);
        FileUtil.copy(path + '.meta', newBundlePath + '.meta');
        uuidFileUtils.createUUIDlist(tempPath);
        uuidFileUtils.replaceUUID(tempPath);
        Editor.log('[PAC]', '拷贝和替换uuid完成');
        //把oldName的首字母变成大写
        let oldNameFirst = oldName.charAt(0).toUpperCase() + oldName.slice(1);
        let newNameFirst = newName.charAt(0).toUpperCase() + newName.slice(1);
        uuidFileUtils.replaceTsFileName(tempPath, oldNameFirst, newNameFirst);
        uuidFileUtils.replaceTSFileContent(tempPath, oldNameFirst, newNameFirst);
        Editor.log('[PAC]', '替换类名完成');
        //拷贝项目到assets/bundles目录下
        let newPath = Path.join(projectPath, 'assets', 'bundles');
        FileUtil.copy(tempPath, newPath);
        FileUtil.delete(tempPath);

        Editor.log('[PAC]', '拷贝完成,开始刷新creator');
        //刷新bundle对应的meta文件.
        //生成对应文件夹的meta文件
        let newMetaPath = Path.join(projectPath, 'assets', 'bundles', newName);
        let newDBPath = Editor.assetdb.fspathToUrl(newMetaPath);
        // Editor.log('[PAC]', 'newDBPath', newDBPath)
        Editor.assetdb.refresh(newDBPath, (err, results) => {
            //刷新meta文件
            if (err) {
                reject(err);
            } else {
                Editor.log('[PAC]', '刷新完成,路径:' + results[0].path);
            }
        });
    },

    /**
     * 执行pbjs命令,生成proto文件.替换生成后第一行文件.在放到项目的资源目录里.
     * windows系统需要把pbjs安装到全局里,否则无法执行
     * 
     * 生成proto文件的命令. 通过npm安装protobufjs和protobufjs-cli
        1.npm install -g protobufjs    
        2.npm install -g protobufjs-cli
        3.pbjs -t static-module -w commonjs -o js/slot.js proto/*.proto;    //slot.js为合成的唯一pbjs文件npm npm 
     */
    createProto() {
        //proto文件的路径 bundle-zip
        const projectPath = Editor.Project.path || Editor.projectPath;
        let protoPath = Path.join(projectPath, 'proto');
        let fileNames = ['slot', 'common', 'hall']
        for (const name of fileNames) {
            // Editor.log('[proto]', packagePath)
            let pbjs = Path.join(packagePath, 'node_modules', '.bin', 'pbjs')
            let pbts = Path.join(packagePath, 'node_modules', '.bin', 'pbts')
            //如果系统是winddows.
            if (Os.platform().indexOf('win') >= 0) {
                //windows系统需要把pbjs安装到全局里,否则无法执行
                pbjs = 'pbjs'
                pbts = 'pbts'
            }
            let jsPath = Path.join(protoPath, name)
            let command = `${pbjs} -t static-module -w commonjs -o ${jsPath}.js ${jsPath}.proto&&${pbts} -o ${jsPath}.d.ts ${jsPath}.js`
            // Editor.log('[proto]', 'command', command)
            //执行命令
            ChildProcess.exec(command, (error, stdout, stderr) => {
                if (error) {
                    Editor.log('[proto]', `create ${name}.proto fail,error info `, error);
                } else {
                    //读取文件
                    let jsPath = Path.join(protoPath, name + '.js')
                    let tsPath = Path.join(protoPath, name + '.d.ts')
                    let jsContent = Fs.readFileSync(jsPath, 'utf8')
                    //替换第一行  修改var $protobuf = require("protobufjs/minimal");成var $protobuf = protobuf;
                    jsContent = jsContent.replace('var $protobuf = require("protobufjs/minimal");', 'var $protobuf = protobuf;')
                    Fs.writeFileSync(jsPath, jsContent)
                    let destJsPath = Path.join(projectPath, 'assets', 'resources', 'proto', name + '.js')
                    let destTsPath = Path.join(projectPath, 'assets', 'resources', 'proto', name + '.d.ts')
                    Fs.copyFileSync(jsPath, destJsPath)
                    Fs.copyFileSync(tsPath, destTsPath)
                    Fs.unlinkSync(jsPath)
                    Fs.unlinkSync(tsPath)
                    Editor.log('[proto]', `生成${name}.proto文件成功！`);
                }
            });
        }
    },

    /**
    * 
    * @param {BuildOptions} options 
    * @param {Function} callback 
    */
    onBuildStart(options, callback) {
        const config = getConfig();
        if (config && config.enabled) {
            Editor.log('[PAC]', '将在构建完成后自动压缩 PNG 资源');

            // 取消编辑器资源选中
            const assets = Editor.Selection.curSelection('asset');
            for (let i = 0; i < assets.length; i++) {
                Editor.Selection.unselect('asset', assets[i]);
            }
        }

        callback();
    },

    getBundleNames() {
        //找到本地bundle的所有子bundle的名字,在通过vue生成checkbox,显示在网页上.
        let bundleNames = [];
        const projectPath = Editor.Project.path || Editor.projectPath;
        let bundlePath = Path.join(projectPath, 'assets', 'bundles');
        // Editor.log('[PAC]', 'bundlePath', bundlePath)
        let filesNames = Fs.readdirSync(bundlePath);
        // Editor.log('[PAC]', 'bundlePath', filesNames)
        for (let index = 0; index < filesNames.length; index++) {
            const fileName = filesNames[index];
            const excludeNames = ['resources']
            let bundleName = Path.join(bundlePath, fileName);
            // Editor.log('[PAC]', 'bundleName', bundleName)
            if (!Fs.statSync(bundleName).isDirectory() || excludeNames.indexOf(fileName) >= 0) {
                continue;
            }

            let metaName = bundleName + '.meta';
            // Editor.log('[PAC]', 'metaName', metaName)
            //读取meta文件,获取bundle的json属性
            if (Fs.existsSync(metaName)) {
                let meta = Fs.readFileSync(metaName, 'utf8');
                //Editor.log('[PAC]', 'meta', meta)
                let json = JSON.parse(meta);
                //Editor.log('[PAC]', 'json', json)
                let isBundle = json["isBundle"];
                //Editor.log('[PAC]', 'bundle', isBundle)
                if (isBundle) {
                    bundleNames.push(fileName);
                }
            }
        }

        bundleNames.push("none");
        bundleNames.push("core");
        //
        //Editor.log('[PAC]', 'bundleNames', bundleNames)
        return bundleNames;
    },

    /**
     * 我的目标是:读取assets目录下所有的bundle文件夹,填充到选择面板上,比如core,hall,common,一起其他的bundle名称.
     */
    async startBundleZip(options, callback) {
        //记得当前时间
        let startTime = new Date().getTime();
        //获取当前目录的assets
        Editor.log('[PAC]', '开始加压bundle资源,buildPath ' + options.dest);
        //bundle名字映射,因为有些bundle是多个文件夹组成的,比如core,有main,internal,resources
        const bundleMap = { 'core': ['main', 'internal', 'resources'], 'common': 'gameprefab', 'piggybank': 'pigbank' }
        //需要加压的bundle
        //const zipBundles = ['common', 'core', 'hall', 'newClassic', 'rock', 'beer', 'newClassicSpain', 'fuwa'];
        // const zipBundles = ['common', 'core', 'hall'];
        const zipBundles = ['common', 'core', 'hall'];

        //暂时先先加压大厅的文件夹.
        let task = []
        let assetsPath = Path.join(options.dest, 'assets')
        for (let i = 0; i < zipBundles.length; i++) {
            let bundles = bundleMap[zipBundles[i]] || zipBundles[i];
            Editor.log('[PAC]', '加压bundle ' + zipBundles[i]);
            //如果是数组
            if (Array.isArray(bundles)) {
                let resPathes = []
                bundles.forEach(bundle => {
                    resPathes.push(Path.join(assetsPath, bundle))
                })
                task.push(compressDirectory(resPathes, Path.join(assetsPath, zipBundles[i])))
            } else {
                let resPath = Path.join(assetsPath, bundles)
                task.push(compressDirectory([resPath], Path.join(assetsPath, zipBundles[i])))
            }
            //判断目录是否存在
            //const resPath = Path.join(options.dest, list[i]);
            //if (!Fs.existsSync(resPath)) continue;
        }
        await Promise.all(task);

        //打开assetspath目录,兼容mac win
        let command = `open ${assetsPath}`
        if (Os.platform() === 'win32') {
            command = `explorer ${assetsPath}`
        }
        ChildProcess.exec(command, (error, stdout, stderr) => {
            if (error) Editor.log('[PAC]', '打开目录失败！', error);
        });

        //计算压缩耗时
        let endTime = new Date().getTime();
        let time = (endTime - startTime) / 1000
        Editor.log('[PAC]', '加压bundle资源完成,耗时 ' + time + 's');

        callback && callback()
    },

    /**
     * 
     * @param {BuildOptions} options 
     * @param {Function} callback 
     */
    async onBuildFinished(options, callback) {
        const config = getConfig();
        if (config && config.enabled) {
            Editor.log('[PAC]', '准备压缩 PNG 资源');

            // 获取压缩引擎路径
            switch (Os.platform()) {
                case 'darwin': // MacOS
                    pngquantPath = Editor.url('packages://bundle-zip/pngquant/mac/pngquant');
                    break;
                case 'win32': // Windows
                    pngquantPath = Editor.url('packages://bundle-zip/pngquant/windows/pngquant');
                    break;
                default:
                    Editor.log('[PAC]', '压缩引擎不支持当前系统平台！');
                    callback();
                    return;
            }
            // Editor.log('[PAC]', '压缩引擎路径', pngquantPath);

            // 设置引擎文件执行权限（仅 MacOS）
            if (Os.platform() === 'darwin') {
                if (Fs.statSync(pngquantPath).mode != 33261) {
                    // 默认为 33188
                    Editor.log('[PAC]', '设置引擎文件执行权限');
                    // Fs.chmodSync(pngquantPath, 0755);
                    Fs.chmodSync(pngquantPath, 33261);
                }
                // 另外一个比较蠢的方案
                // let command = `chmod a+x ${pngquantPath}`;
                // await new Promise(res => {
                //   ChildProcess.exec(command, (error, stdout, stderr) => {
                //     if (error) Editor.log('[PAC]', '设置引擎文件执行权限失败！');
                //     res();
                //   });
                // });
            }

            // 设置压缩命令
            const qualityParam = `--quality ${config.minQuality}-${config.maxQuality}`;
            const speedParam = `--speed ${config.speed}`;
            const skipParam = '--skip-if-larger';
            const outputParam = '--ext=.png';
            const writeParam = '--force';
            const colorsParam = config.colors;
            const compressOptions = `${qualityParam} ${speedParam} ${skipParam} ${outputParam} ${writeParam} ${colorsParam}`;

            // 压缩日志
            let log = {
                succeedCount: 0,
                failedCount: 0,
                successInfo: '',
                failedInfo: '',
            };

            // 开始压缩
            Editor.log('[PAC]', '开始压缩 PNG 资源，请勿进行其他操作！');
            let tasks = [];
            const list = ['res', 'assets', 'subpackages', 'remote'];
            for (let i = 0; i < list.length; i++) {
                const resPath = Path.join(options.dest, list[i]);
                if (!Fs.existsSync(resPath)) continue;
                Editor.log('[PAC]', '压缩资源路径', resPath);
                compress(resPath, compressOptions, tasks, log);
            }
            await Promise.all(tasks);

            // 压缩完成
            Editor.log('[PAC]', `压缩完成（${log.succeedCount} 张成功 | ${log.failedCount} 张失败）`);
            const header = `\n # ${'Result'.padEnd(13, ' ')} | ${'Name / Path'.padEnd(50, ' ')} | ${'Size Before'.padEnd(13, ' ')} ->   ${'Size After'.padEnd(13, ' ')} | ${'Saved Size'.padEnd(13, ' ')} | ${'Compressibility'.padEnd(20, ' ')}`;
            Editor.log('[PAC]', '压缩日志 >>>' + header + log.successInfo + log.failedInfo);
        }

        callback();
    }

}

const compressSettings = {
    // "android": {
    //     "formats": [
    //         {
    //             "name": "etc2",
    //             "quality": "fast"
    //         }
    //     ]
    // },
    // "ios": {
    //     "formats": [
    //         {
    //             "name": "etc2",
    //             "quality": "fast"
    //         }
    //     ]
    // },
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

const fs = require('fs');
const path = require('path');
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

/**
 * 压缩指定目录到一个 ZIP 文件。
 * @param {string} sourceDir - 需要压缩的目录,数组。
 * @param {string} outputZip - 输出的 ZIP 文件路径。
 */
function compressDirectory(sourceDir, outputZip) {
    return new Promise((resolve, reject) => {
        // 创建文件写入流
        outputZip = outputZip + '.zip'
        //Editor.log('[PAC]', 'outputZip ' + outputZip)
        const output = Fs.createWriteStream(outputZip);
        const archive = Archiver('zip', {
            zlib: { level: 9 } // 设置压缩级别
        });

        // 提取 ZIP 文件名作为内部目录名
        const outputzipName = Path.basename(outputZip, Path.extname(outputZip));
        // 监听关闭事件和错误事件
        output.on('close', () => {
            //计算出压缩后是多少M
            const sizeAfter = Math.floor(Fs.statSync(outputZip).size / 1024 / 1024)
            Editor.log('[PAC]', `${outputzipName}压缩完成，总大小：${sizeAfter}M`);
            resolve();
        });
        archive.on('error', () => {
            Editor.log('[PAC]', `${outputzipName}压缩出现错误`);
            reject();
        });

        // 开始归档并指定要压缩的目录
        archive.pipe(output);
        sourceDir.forEach(path => {
            //获取path最后一个/后面的字符串
            const zipName = Path.basename(path)
            //Editor.log('[PAC]', 'zipName ' + zipName)
            archive.directory(path, `assets/${zipName}`);
        });
        archive.finalize();
    })
}

/**
 * 保存配置
 * @param {object} config 
 */
function saveConfig(config) {
    // 查找目录
    const projectPath = Editor.Project.path || Editor.projectPath;
    const configDirPath = Path.join(projectPath, configFileDir);
    if (!Fs.existsSync(configDirPath)) Fs.mkdirSync(configDirPath);
    const configFilePath = Path.join(projectPath, configFileDir, configFileName);
    // 读取本地配置
    let object = {};
    if (Fs.existsSync(configFilePath)) {
        object = JSON.parse(Fs.readFileSync(configFilePath, 'utf8'));
    }
    // 写入配置
    for (const key in config) { object[key] = config[key]; }
    Fs.writeFileSync(configFilePath, JSON.stringify(object, null, 2));
    return configFilePath;
}

/**
 * 读取配置
 */
function getConfig() {
    const projectPath = Editor.Project.path || Editor.projectPath;
    const configFilePath = Path.join(projectPath, configFileDir, configFileName);
    let config = null;
    if (Fs.existsSync(configFilePath)) {
        config = JSON.parse(Fs.readFileSync(configFilePath, 'utf8'));
    }
    return config;
}

/**
 * 压缩
 * @param {string} srcPath 文件路径
 * @param {string} compressOptions 文件路径
 * @param {Promise[]} queue 压缩任务队列
 * @param {object} log 日志对象
 */
function compress(srcPath, compressOptions, queue, log) {
    FileUtil.map(srcPath, (filePath, stats) => {
        if (Path.extname(filePath) === '.png') {
            queue.push(new Promise(res => {
                const sizeBefore = stats.size / 1024;
                // pngquant $OPTIONS -- "$FILE"
                const command = `"${pngquantPath}" ${compressOptions} -- "${filePath}"`;
                ChildProcess.exec(command, (error, stdout, stderr) => {
                    if (!error) {
                        // 成功
                        log.succeedCount++;
                        const fileName = Path.basename(filePath);
                        const sizeAfter = Fs.statSync(filePath).size / 1024;
                        const savedSize = sizeBefore - sizeAfter;
                        const savedRatio = savedSize / sizeBefore * 100;
                        log.successInfo += `\n + ${'Successful'.padEnd(13, ' ')} | ${fileName.padEnd(50, ' ')} | ${(sizeBefore.toFixed(2) + ' KB').padEnd(13, ' ')} ->   ${(sizeAfter.toFixed(2) + ' KB').padEnd(13, ' ')} | ${(savedSize.toFixed(2) + ' KB').padEnd(13, ' ')} | ${(savedRatio.toFixed(2) + '%').padEnd(20, ' ')}`;
                    } else {
                        // 失败
                        log.failedCount++;
                        log.failedInfo += `\n - ${'Failed'.padEnd(13, ' ')} | ${filePath.replace(Editor.Project.path || Editor.projectPath, '')}`;
                        switch (error.code) {
                            case 98:
                                log.failedInfo += `\n ${''.padEnd(10, ' ')} - 失败原因：压缩后体积增大（已经不能再压缩了）`;
                                break;
                            case 99:
                                log.failedInfo += `\n ${''.padEnd(10, ' ')} - 失败原因：压缩后质量低于已配置最低质量`;
                                break;
                            case 127:
                                log.failedInfo += `\n ${''.padEnd(10, ' ')} - 失败原因：压缩引擎没有执行权限`;
                                break;
                            default:
                                log.failedInfo += `\n ${''.padEnd(10, ' ')} - 失败原因：code ${error.code}`;
                                break;
                        }
                    }
                    res();
                });
            }));
        }
    });
}


