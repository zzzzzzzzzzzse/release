
// var GameType = require("GameType")

var GameRootNodeType = {
    Bottom: 1,   // 最底层ＵＩ
    Nomal: 5,   // 普通UI的父节点类型
    Tips: 10,   // tipsUI的父节点类型
    Notice: 20,  // 公告的父节点类型
}

class _UIManager {

    private m_uiList = null
    private m_uiRootNodeList = null

    init() {
        cc.log("UIManager Init")
        this.m_uiList = {}
        this.createGameRootLayer()
    }

    /**@description 打开Prefab界面
     *@example 
        var msg = {
            name: "UITipLayer",
            bResize: true,
            bundleIndex: GameType.GAME_ID.hall,
            update:true,
            content: ,
        }
        UIManager.openUI(msg)
     */

    openUI(msg: { name: string; bResize?: boolean; update?: boolean; scrname?: string; uiType?: Number; zorder?: any; afterLoaded?: Function; bundleIndex?: string; rootnode?: cc.Node; siblingIndex?: number;code?:number }) {
        var _uiName: string = msg.name //预制体名
        var _uiscrName: string = msg.scrname//脚本名
        var _bUpdate: boolean = msg.update//是否更新UI
        var _uiLayerType: Number = msg.uiType || 1//层级
        var _willZIndex = msg.zorder
        var siblingIndex: number = msg.siblingIndex;
        var bResize = null//偏移
        var _afterLoaded: Function = msg.afterLoaded//回调函数
        var _bIsLoadFinish = this.isLoadFinish(_uiName)
        // var bundleIndex = msg.bundleIndex || 0//当前bundle
        let bundleIndex: string = msg.bundleIndex || ""
        let _rootnode = msg.rootnode || null

        if (!_bIsLoadFinish) {
            cc.log("finish", _uiName)
            return
        }
        var _bOpen = this.isOpen(_uiName)
        // UI已经打开
        if (_bOpen) {
            this.openUIOtherArgsHandler(msg)
            var _gameScene = cc.director.getScene()
            var _uiNode = this.FindNodeByName(_gameScene, _uiName)
            if (_uiNode) {
                // 更新UI
                if (_bUpdate) {
                    var _uiComponent = null
                    if (_uiscrName) {
                        _uiComponent = _uiNode.getComponent(_uiscrName)
                    } else {
                        _uiComponent = _uiNode.getComponent(_uiName)
                    }
                    // var _uiComponent = _uiNode.getComponent(_uiName)
                    if (_uiComponent) {
                        cc.log('update ui data :%s', _uiName)
                        if (_uiComponent.updateUIData) {
                            _uiComponent.updateUIData(msg)
                        }

                    } else {
                        cc.log("not find ui node component :%s", _uiName)
                    }
                    this.setNodeZIndex(_uiNode, _uiLayerType, _willZIndex)
                    // 显示UI
                } else {
                    this.showUIByNode(_uiNode, true)
                }
                if (typeof _afterLoaded == "function") {
                    _afterLoaded(_uiNode);
                }
            } else {
                cc.log("not find ui node :%s", _uiName)
            }

            // 创建一个新的UI
        } else {
            var self = this
            var _msg = msg
            var _prefabPath = "prefabs/" + _uiName
            if (!self.m_uiList[_uiName]) {
                self.m_uiList[_uiName] = {}
            }
            self.m_uiList[_uiName].name = _msg.name
            self.m_uiList[_uiName].loadFinish = false
            // let bundleNmae = GameType.bundlePackName[bundleIndex]
            let bundleNmae = bundleIndex
            if (bundleNmae) {
                cc.assetManager.loadBundle(bundleNmae, (err, bundle) => {
                    bundle.load(_prefabPath, cc.Prefab, function (err, prefab: cc.Prefab) {
                        var _newUIRoot = self.createUI(prefab, _msg)
                        if (_newUIRoot) {
                            self.addToUIRoot(_newUIRoot, _uiLayerType, _willZIndex, bResize, _rootnode, siblingIndex)
                            if (self.m_uiList[_uiName]) {
                                self.m_uiList[_uiName].name = _msg.name
                                self.m_uiList[_uiName].uiType = _uiLayerType
                                // 加载完成的标记
                                self.m_uiList[_uiName].loadFinish = true
                            } else {
                                cc.log("self.m_uiList[_uiName] nil")
                            }
                            if (typeof _afterLoaded == "function") {
                                _afterLoaded(_newUIRoot);
                            }
                        } else {
                            cc.log("load ui prefab fail :%s", _prefabPath)
                        }
                        self.openUIOtherArgsHandler(_msg)
                    })
                });
            }

        }
    }

    addToUIRoot(node, layerType, willZIndex, bResize, rootnode, siblingIndex) {
        console.log("addToUIRoot", node, layerType, rootLayer, willZIndex, bResize, rootnode, siblingIndex);
        if (node) {
            var _uiLayerType = layerType || 1
            var rootLayer = this.getRootLayerByType(_uiLayerType)
            if (rootLayer) {
                if (rootnode) {
                    node.parent = rootnode
                    node.setPosition(0, 0)
                    if (siblingIndex) {
                        node.setSiblingIndex(siblingIndex);
                    }
                } else {
                    node.parent = rootLayer
                    node.setPosition(0, 0)
                    if (bResize) {
                        this.resize(node)
                    }
                    this.setNodeZIndex(node, _uiLayerType, willZIndex)
                }

            }
        }
    }

    resize(node) {
        // if (cc.sys.isBrowser) {
        //     this.getOffSetY()   // 有些网页会变动
        // }
        // node.y = GameType.offSetY * 0.5
    }

    // 根据UI类型获取父节点
    getRootLayerByType(layerType) {
        var _layerType = layerType || 1
        return this.m_uiRootNodeList[_layerType] ? this.m_uiRootNodeList[_layerType].node : null
    }

    createUI(prefab: cc.Prefab, msg: any) {
        var _newUIRoot = cc.instantiate(prefab)
        var _uiName: string = msg.name
        var _uiscrName: string = msg.scrname//脚本名
        if (_newUIRoot) {
            _newUIRoot.name = _uiName
            var _uiComponent = null
            if (_uiscrName) {
                _uiComponent = _newUIRoot.getComponent(_uiscrName)
            } else {
                _uiComponent = _newUIRoot.getComponent(_uiName)
            }

            // var _uiComponent = _newUIRoot.getComponent(_uiName)
            if (_uiComponent) {
                if (typeof _uiComponent.init === 'undefined') {
                    cc.log("get ui component init function fail, not find :%s", _uiName)
                } else {
                    _uiComponent.init(msg)
                }
            } else {
                cc.log("get ui component fail", _uiName)
            }
            return _newUIRoot
        }
        return null
    }

    setNodeZIndex(uiNode, layerType, willZIndex) {
        if (uiNode) {
            if (willZIndex) {
                uiNode.zIndex = willZIndex
            } else {
                var _zindex = this.getRootLayerChildZIndex(layerType)
                uiNode.zIndex = _zindex
                this.increaseRootLayerZIndex(layerType)
            }
        }
    }

    // 把当前节点Z值增加一
    increaseRootLayerZIndex(layerType) {
        this.setLayerZIndex(layerType, 1)
    }

    setLayerZIndex(type, factor) {
        var _layerType = type || 1
        if (this.m_uiRootNodeList[_layerType]) {
            this.m_uiRootNodeList[_layerType].zIndex += factor
            if (this.m_uiRootNodeList[_layerType].zIndex < 1) {
                this.m_uiRootNodeList[_layerType].zIndex = 1
            }
        }
    }

    // 根据UI类型获取父节点的当前子节点的Z值
    getRootLayerChildZIndex(layerType) {
        var _layerType = layerType || 1
        return this.m_uiRootNodeList[_layerType] ? this.m_uiRootNodeList[_layerType].zIndex : 0
    }

    // 关闭所有的界面,除了uiNameList
    closeAllNOTUI(uiNameList) {
        for (var _uiName in this.m_uiList) {
            if (this.m_uiList[_uiName]) {
                if (uiNameList) {
                    if (uiNameList[_uiName]) {
                        continue
                    }
                }
                if (this.m_uiList[_uiName] && this.m_uiList[_uiName].name) {
                    this.closeUI(this.m_uiList[_uiName])
                }
            }
        }
    }

    // 关闭所有的界面
    closeAllUI() {
        for (var _uiName in this.m_uiList) {
            if (this.m_uiList[_uiName]) {

                if (this.m_uiList[_uiName] && this.m_uiList[_uiName].name) {
                    this.closeUI(this.m_uiList[_uiName])
                }
            }
        }
    }

    openUIOtherArgsHandler(msg) {
        if (msg.closeMsg) {
            this.closeUI(msg.closeMsg)
        }
        if (msg.hideMsg) {
            this.showUIByName(msg.hideMsg.name, msg.hideMsg.bShow)
        }
    }

    closeUI(msg) {
        var _gameScene = cc.director.getScene()
        var _uiName = msg.name
        var _bInList = this.m_uiList[_uiName]
        var bool = false;
        if (_bInList && this.isLoadFinish(_uiName)) {
            var uiType = _bInList.uiType
            if (uiType) {
                this.decreaseRootLayerZIndex(uiType)
            }
            this.m_uiList[_uiName] = null
            delete this.m_uiList[_uiName]
            var _uiNode = this.FindNodeByName(_gameScene, _uiName)
            if (_uiNode) {
                _uiNode.destroy()
                cc.log("<<<<<<<<< close ui : %s >>>>>>>>>>", _uiName)
                bool = true;
            } else {
                cc.log("close ui fail, not find :%s", _uiName)
                bool = false;
            }
        }

        if (msg.hideMsg) {
            this.showUIByName(msg.hideMsg.name, msg.hideMsg.bShow)
        }
        return bool
    }

    FindNodeByName(nodeParent: any, name) {
        var _name = name + ""

        if (!nodeParent) {
            cc.error("nodeParent is null")
            return
        }

        if (nodeParent.name == _name) {
            return nodeParent
        }

        var _children = nodeParent.children
        if (_children) {
            for (var i = 0, len = _children.length; i < len; i++) {
                var node = _children[i]
                var _findNode = this.FindNodeByName(node, _name)
                if (_findNode) {
                    return _findNode
                }
            }
        } else {
            cc.error("the node children is null")
        }

        return null
    }

    showUIByName(uiName: any, bShow) {
        var _uiNode = this.getUIByName(uiName)
        if (_uiNode) {
            cc.log("UI:", uiName, bShow)
            this.showUIByNode(_uiNode, bShow)
        } else {
            cc.log("show ui fail, not find the ui:%s", uiName)
        }
    }

    removeUIName(uiName) {
        if (this.m_uiList) {
            this.m_uiList[uiName] = null
        }
    }

    getUIByName(uiName) {
        var _gameScene = cc.director.getScene()
        var _uiNode = this.FindNodeByName(_gameScene, uiName)
        if (_uiNode) {
            return _uiNode
        } else {
            cc.log("get ui fail :%s", uiName)
        }
    }

    showUIByNode(uiNode: any, bShow: any) {
        if (uiNode) {
            // var _uiShowComponent = uiNode.getComponent("UIShow")
            // if (_uiShowComponent) {
            //     if (bShow) {
            //         _uiShowComponent.showUI()
            //     } else {
            //         _uiShowComponent.hideUI()
            //     }

            // } else {
            //     cc.error("not find <UIShow> %s", uiNode.name)
            // }
        } else {
            cc.log("showUI fail uiNode is null")
        }
    }

    // 把当前的节点的Z值减一
    decreaseRootLayerZIndex(layerType) {
        //this.setLayerZIndex(layerType, -1)
    }

    isOpen(uiName) {
        if (this.m_uiList[uiName]) {
            var _uiName = this.m_uiList[uiName].name
            if (_uiName === uiName) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    isLoadFinish(uiName) {
        if (this.m_uiList && this.m_uiList[uiName]) {
            return this.m_uiList[uiName].loadFinish
        }
        return true
    }

    // 创建游戏的父节点层
    createGameRootLayer() {
        this.m_uiRootNodeList = {}
        var GameRootNodeTypeList = GameRootNodeType
        if (GameRootNodeTypeList) {
            for (var uiRootType in GameRootNodeTypeList) {
                var rootNode = new cc.Node()
                if (rootNode) {
                    var _gameScene = cc.director.getScene()
                    cc.log("_gameScene == ", _gameScene.name)
                    var _canvas = cc.find("Canvas", _gameScene)
                    if (_canvas) {
                        rootNode.zIndex = GameRootNodeTypeList[uiRootType]
                        rootNode.setPosition(0, 0)
                        rootNode.width = _canvas.width
                        rootNode.height = _canvas.height
                        rootNode.parent = _canvas
                        var key = GameRootNodeTypeList[uiRootType]
                        this.m_uiRootNodeList[key] = {}
                        this.m_uiRootNodeList[key].node = rootNode
                        this.m_uiRootNodeList[key].zIndex = key
                    }
                }
            }
        } else {
            cc.log("error")
        }
    }




    // update (dt) {}

    onDestroy() {
        cc.log("destory UIManager Ok")
    }
}

export const UIManagernew = new _UIManager()
