const fs = require('fs');
const path = require('path');

//使用方法:切换到当前目录后: 开启 node setAstc.js d:/test/assets 1; 关闭: node setAstc.js d:/test/assets 0
//使用方法2:切换到项目根目录: 开启 node setAstc.js ./assets 1; 关闭: node setAstc.js ./assets 0
const compressSettings = {
    // "android": {
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
let sourcePath = process.argv[2];
let isCompress = parseInt(process.argv[3]);

let lookupDir = function (url) {
    if (!fs.existsSync(url)) {
        return;
    }
    fs.readdir(url, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach((file) => {
            let curPath = path.join(url, file);
            let stat = fs.statSync(curPath);
            if (stat.isDirectory()) {
                lookupDir(curPath); // 遍历目录
            } else {
                if (file.indexOf('.meta') >= 0) {
                    fs.readFile(curPath, (err, data) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        let obj = JSON.parse(data);
                        if (obj && obj.platformSettings) {
                            obj.platformSettings = isCompress ? compressSettings : {}; // 设置压缩纹理
                            let wrdata = JSON.stringify(obj, null, 2);
                            fs.writeFile(curPath, wrdata, (err) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                            });
                        }
                    });
                }
            }
        });
    });
}

if (!path.isAbsolute(sourcePath)) {
    sourcePath = path.join(__dirname, sourcePath)
}
lookupDir(sourcePath);