/*
 * @Author: dogking18 (dogking18@163.com) 
 * @Date: 2022-10-28 11:21 
 * @Last Modified by: dogking18 (dogking18@163.com) 
 * @Last Modified time: 2022-10-28 11:21
 */
class ComponentOption {
    nodeUuids = [];
    comName = "";
};

class InputMatch {
    input = "";
    index = -1;
    origin = "";
};

module.exports = {
    'add-component': function (event, comName) {
        let comOpt = new ComponentOption();
        comOpt.comName = comName;
        if (Editor.Selection.curSelection("node")) {
            Editor.Selection.curSelection("node").forEach(uuid => {
                let node = this.getNodeByUuid(uuid);
                node.addComponent(comName);
                Editor.log(`小可: 为节点：${node.name} 添加组件 ${comName}`);
                comOpt.nodeUuids.push(node.uuid);
            });
        }
        Editor.Ipc.sendToPanel('add_component', 'add_component:res-add-component', comOpt);
    },
    'add-node': function (event, comNames) {
        if (Editor.Selection.curSelection("node")) {
            Editor.Selection.curSelection("node").forEach(uuid => {
                let node = this.getNodeByUuid(uuid);
                let newNode = new cc.Node();
                if (comNames && comNames.length > 0) {
                    comNames.forEach(comName => {
                        newNode.addComponent(comName);
                        if (comNames['0'] == "cc.Button") {
                            newNode.name = 'btn'
                        } else if (comNames['0'] == "cc.Label") {
                            //目前不知道如何为font赋值,后期研究
                            newNode.name = 'lb'
                            let label = newNode.getComponent(cc.Label);
                            label.fontSize = 30;

                            // label.font = new cc.Font();
                            // label.font.name = 'Nacelle Heavy';
                            // //设置成指定路径的fnt字体
                            // // label.font._nativeAsset = "db://assets/resources/font/Nacelle Heavy";
                            // label.font.name = 'Nacelle Heavy';
                        } else if (comNames == "cc.LabelOutLine") {
                            //属性设置没有生效
                            let labelOutline = newNode.getComponent(cc.LabelOutline);
                            labelOutline.color = new cc.Color(0, 0, 0, 255);
                            labelOutline.width = 2;
                        } else if (comNames['0'] == "cc.Layout") {
                            newNode.name = 'lyt'
                        } else {
                            newNode.name = 'nd'
                        }
                        Editor.log(`小可: 为节点：${node.name} 添加节点 ${comName}`);
                    })
                }
                node.addChild(newNode);
                // comOpt.nodeUuids.push(newNode.uuid);
            });
        }
        // Editor.Ipc.sendToPanel('add_component', 'add_component:res-add-node', comOpt);
    },
    'del-component': function (event, comOpt) {
        comOpt.nodeUuids.forEach(uuid => {
            let node = this.getNodeByUuid(uuid);
            let com = node.getComponent(comOpt.comName);
            if (com) {
                com.destroy();
            }
        });
        Editor.Ipc.sendToPanel('add_component', 'add_component:res-del-component', comOpt.comName);
    },
    'list-current-components': function (event) {
        let comOptionCol = {};
        if (!Editor.Selection.curSelection("node")) {
            return;
        }
        //找出相同的组件名
        Editor.Selection.curSelection("node").forEach(uuid => {
            let node = this.getNodeByUuid(uuid);
            node._components.forEach(com => {
                let className = cc.js.getClassName(com.constructor);
                let co = comOptionCol[className];
                if (!co) {
                    co = new ComponentOption();
                    co.comName = className;
                    co.comName = cc.js.getClassName(com.constructor);
                    comOptionCol[co.comName] = co;
                }
                co.nodeUuids.push(node.uuid);
            });
        });
        Editor.Ipc.sendToPanel('add_component', 'add_component:res-list-current-components', comOptionCol);

    },
    'input-query': function (event, handle) {
        let comName = handle.comName;
        let matchs = [];
        if (comName.length > 0) {
            for (let key in cc.js._registeredClassNames) {
                if (cc.js.isChildClassOf(cc.js._registeredClassNames[key], cc.Component)) {
                    let res = key.toLowerCase().match(comName.toLowerCase());
                    if (res) {
                        let inputMatch = new InputMatch();
                        inputMatch.input = res[0];
                        inputMatch.origin = key;
                        inputMatch.index = res.index || -1;
                        matchs.push(inputMatch);
                    }
                }
            }
        }
        Editor.Ipc.sendToPanel('add_component', 'add_component:res-input-query', matchs);
    },

    getNodeByUuid(uuid) {
        let found = null;
        let _find = (node) => {
            node.children.forEach(child => {
                if (child.uuid == uuid) {
                    found = child;
                    return;
                }
                if (child.children.length > 0) {
                    _find(child);
                }
            });
        };

        _find(cc.director.getScene());
        return found;
    },
    // 'create-node': function (event, param) {
    //   let selected = Editor.Selection.curSelection('node');
    //   if (selected.length > 0) {
    //     param.parentId = selected[0];
    //   }

    //   insertNode(param, (error, node) => {
    //     if (node) {
    //       // select new node
    //       Editor.Selection.select('node', node.uuid);
    //       // Editor.log(`'${node.name}' created`);
    //     }

    //     if (event.reply) {
    //       event.reply(error);
    //     }
    //   });
    // }
};