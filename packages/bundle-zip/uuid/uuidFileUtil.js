var fs = require("fs");
var path = require('path');
var uuidUtils = require('./uuidUtils')
var uuidlist = {};
var Reg_Uuid = /^[0-9a-fA-F-]{36}$/;
module.exports = {
    readFileSync: function (path) {
        return fs.readFileSync(path, 'utf-8');
    },
    writeFile: function (_path, _msg) {
        fs.writeFile(_path, _msg, function (err) {
            if (err) throw err;
        })
    },
    writeFileSync: function (_path, _msg) {
        fs.writeFileSync(_path, _msg)
    },
    cleanFile: function (_path) {
        fs.unlink(_path, function (err) {
            if (err) throw err;
        })
    },
    cleanFileSync: function (_path) {
        fs.unlinkSync(_path); // Sync 表示是同步方法
    },
    deleteall: function (path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    deleteall(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    },
    //创建目录
    createMkdir: function (_path) {
        console.log('createMkdir:' + _path);
        if (!fs.existsSync(_path)) {
            try {
                fs.mkdirSync(_path);
            } catch (e) {
                if (e.code != 'EEXIST') throw e;
            }
        }
    },
    isPath: function (path) {
        return fs.existsSync(path);
    },

    //更新uuid
    createUUIDlist: function (dir) {
        var stat = fs.statSync(dir);
        if (!stat.isDirectory()) {
            return;
        }
        var subpaths = fs.readdirSync(dir);
        var subpath;
        for (var i = 0; i < subpaths.length; ++i) {
            if (subpaths[i][0] === '.') {
                continue;
            }
            subpath = path.join(dir, subpaths[i]);
            stat = fs.statSync(subpath);
            if (stat.isDirectory()) {
                this.createUUIDlist(subpath);
            }
            else if (stat.isFile()) {
                // Size in Bytes
                var metastr = subpath.substr(subpath.length - 5, 5)
                if (metastr == '.meta') {
                    var jstr = this.readFileSync(subpath);
                    var json = JSON.parse(jstr);
                    if (uuidUtils.isUuid(json['uuid'])) {
                        this._upUUIDList(json);
                        if (json['subMetas'] && typeof json['subMetas'] == 'object') {
                            for (var bb in json['subMetas']) {
                                this._upUUIDList(json['subMetas'][bb]);
                            }
                        }
                    }
                }
            }
        }
    },
    //更新uuid列表
    _upUUIDList: function (json) {
        if (uuidUtils.isUuid(json['uuid']) && !uuidlist[json['uuid']]) {
            uuidlist[json['uuid']] = {
                uuid: uuidUtils.uuidv4(),
            }
            if (uuidUtils.isUuid(json['rawTextureUuid'])) {
                uuidlist[json['rawTextureUuid']] = {
                    uuid: uuidUtils.uuidv4(),
                }
            }
        }
    },
    //获取uuid列表
    getUUIDList: function () {
        return uuidlist;
    },
    //替换uuid
    replaceUUID: function (dir) {
        var stat = fs.statSync(dir);
        if (!stat.isDirectory()) {
            return;
        }
        var subpaths = fs.readdirSync(dir), subpath;
        for (var i = 0; i < subpaths.length; ++i) {
            if (subpaths[i][0] === '.') {
                continue;
            }
            subpath = path.join(dir, subpaths[i]);
            stat = fs.statSync(subpath);
            if (stat.isDirectory()) {
                this.replaceUUID(subpath);
            }
            else if (stat.isFile()) {
                if (this._isReplaceFile(subpath)) {
                    var jstr = this.readFileSync(subpath);
                    var json;
                    try {
                        json = JSON.parse(jstr);
                    } catch (error) {
                        console.log(subpath);
                    }
                    if (json) {
                        this._replacePrefabFileUUID(json);
                        this.writeFileSync(subpath, JSON.stringify(json, null, 2));
                    }
                }
            }
        }
    },
    _isReplaceFile: function (subpath) {
        let conf = [
            '.anim',
            '.prefab',
            '.fire',
            '.meta',
        ]
        for (let i = 0; i < conf.length; i++) {
            let count = conf[i].length;
            if (subpath.substr(subpath.length - count, count) == conf[i]) {
                return true;
            }
        }
        return false;
    },
    //替换文件meta文件uuid 
    _replaceMetaFileUUID: function (json) {
        if (json && typeof json == 'object') {
            if (Object.prototype.toString.call(json) === '[object Array]') {
                for (var prebidx = 0; prebidx < json.length; prebidx++) {
                    if (json[prebidx] && typeof json[prebidx] == 'object') {
                        this._replaceMetaFileUUID(json[prebidx]);
                    }
                }
            } else if (Object.prototype.toString.call(json) === '[object Object]') {
                for (var prebidx in json) {
                    if (json[prebidx] && typeof json[prebidx] == 'object') {
                        this._replaceMetaFileUUID(json[prebidx]);
                    }
                }
            }
        }
    },
    _replacePrefabFileUUID: function (json) {
        if (json && typeof json == 'object') {
            if (json['uuid'] && uuidUtils.isUuid(json['uuid'])) {
                json['uuid'] = uuidlist[json['uuid']].uuid;
            }
            if (json['rawTextureUuid'] && uuidUtils.isUuid(json['rawTextureUuid'])) {
                json['rawTextureUuid'] = uuidlist[json['rawTextureUuid']].uuid;
            }
            if (json['textureUuid'] && uuidUtils.isUuid(json['textureUuid'])) {
                json['textureUuid'] = uuidlist[json['textureUuid']].uuid;
            }
            var __type__ = json['__type__'];
            if (__type__ && uuidUtils.isUuid(__type__)) {
                if (Reg_Uuid.test(__type__)) {
                    if (uuidlist[__type__]) {
                        json['__type__'] = uuidlist[__type__].uuid;
                    }
                } else {
                    var de__type__ = uuidUtils.decompressUuid(__type__);
                    if (uuidlist[de__type__]) {
                        json['__type__'] = uuidUtils.compressUuid(uuidlist[de__type__].uuid, false);
                    }
                }
            }

            //检查componentId
            var _componentId = json['_componentId'];
            if (_componentId && uuidUtils.isUuid(_componentId)) {
                if (Reg_Uuid.test(_componentId)) {
                    if (uuidlist[_componentId]) {
                        json['_componentId'] = uuidlist[_componentId].uuid;
                    }
                } else {
                    var de_componentId = uuidUtils.decompressUuid(_componentId);
                    if (uuidlist[de_componentId]) {
                        json['_componentId'] = uuidUtils.compressUuid(uuidlist[de_componentId].uuid, false);
                    }
                }
            }

            var __uuid__ = json['__uuid__'];
            if (__uuid__ && uuidUtils.isUuid(__uuid__)) {
                if (Reg_Uuid.test(__uuid__)) {
                    if (uuidlist[__uuid__]) {
                        json['__uuid__'] = uuidlist[__uuid__].uuid;
                    }
                } else {
                    var __uuid__ = uuidUtils.decompressUuid(__uuid__);
                    if (uuidlist[__uuid__]) {
                        json['__uuid__'] = UuidUtils.compressUuid(uuidlist[__uuid__], false);
                    }
                }
            }
            if (Object.prototype.toString.call(json) === '[object Array]') {
                for (var prebidx = 0; prebidx < json.length; prebidx++) {
                    if (json[prebidx] && typeof json[prebidx] == 'object') {
                        this._replacePrefabFileUUID(json[prebidx]);
                    }
                }
            } else if (Object.prototype.toString.call(json) === '[object Object]') {
                for (var prebidx in json) {
                    if (json[prebidx] && typeof json[prebidx] == 'object') {
                        this._replacePrefabFileUUID(json[prebidx]);
                    }
                }
            }
        }
    },
    
    //查找所有的ts文件,把文件名里的newClassic替换成newClassicSpain,  把ts文件里的 newClassic替换成newClassicSpain.
    replaceTsFileName: function (dir, oldName, newName) {
        var stat = fs.statSync(dir);
        //获取dir的完整路径
        console.log('dir:' + dir);

        if (!stat.isDirectory()) {
            return;
        }

        var subpaths = fs.readdirSync(dir), subpath;
        for (var i = 0; i < subpaths.length; ++i) {
            if (subpaths[i][0] === '.') {
                continue;
            }
            subpath = path.join(dir, subpaths[i]);
            stat = fs.statSync(subpath);
            if (stat.isDirectory()) {
                this.replaceTsFileName(subpath, oldName, newName);
            }
            else if (stat.isFile() && subpath.indexOf('.') != -1) {
                var index = subpath.indexOf('.');
                var extname = subpath.substring(index);
                var filename = path.basename(subpath);
                console.log('extname is %s,oldName %s,fileName %s', extname, oldName, filename);
                if ((extname == '.ts' || extname == ".ts.meta") && filename.indexOf(oldName) != -1) {
                    console.log("filename is :" + filename);
                    //替换oldName为newName
                    var newfilename = filename.replace(oldName, newName);
                    console.log("newfilename:" + newfilename);
                    //修改文件名
                    fs.rename(subpath, path.join(dir, newfilename), function (err) {
                        if (err) {
                            console.log('修改%s失败 error%s', subpath, err);
                        }
                    })
                }
            }
        }
    },

    //查找所有的ts文件, 把ts文件里的 newClassic替换成newClassicSpain.
    replaceTSFileContent: function (dir, oldStr, newStr) {
        var stat = fs.statSync(dir);
        if (!stat.isDirectory()) {
            return;
        }

        var subpaths = fs.readdirSync(dir), subpath;
        for (var i = 0; i < subpaths.length; ++i) {
            if (subpaths[i][0] === '.') {
                continue;
            }
            subpath = path.join(dir, subpaths[i]);
            stat = fs.statSync(subpath);
            if (stat.isDirectory()) {
                this.replaceTSFileContent(subpath, oldStr, newStr);
            }
            else if (stat.isFile() && this.isTSFile(subpath)) {
                //把ts文件里的oldStr替换成newStr.
                var jstr = this.readFileSync(subpath);
                //替换jsstr里的所有的oldStr
                var newjstr = jstr.replace(new RegExp(oldStr, 'g'), newStr);
                this.writeFileSync(subpath, newjstr);
            }
        }
    },

    //判断是否是ts文件
    isTSFile: function (subPath) {
        var extname = path.extname(subPath);
        if (extname == '.ts' || extname == '.js' || extname == '.TS') {
            return true;
        }
        return false;

    }
}

