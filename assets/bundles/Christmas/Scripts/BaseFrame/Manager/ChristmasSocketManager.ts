import { ConnectType } from "../Const/ChristmasCommonDefine";
import { ChristmasEventDefine } from "../Const/ChristmasEventDefine";
import ChristmasBaseMessageProtocol from "../Net/ChristmasBaseMessageProtocol";
import ChristmasMsgDispatch from "../Net/ChristmasMsgDispatch";
import ChristmasDialogManager from "./ChristmasDialogManager";
import ChristmasLockScreenManager from "./ChristmasLockScreenManager";
import ChristmasLogManager from "./ChristmasLogManager";
import ChristmasSlotEventManager from "./ChristmasSlotEventManager";
import ChristmasTimerManager from "./ChristmasTimerManager";

export default class ChristmasSocketManager {
    private static _instance: ChristmasSocketManager = null;
    private ws: WebSocket = null;//socket对象
    private _connected: boolean = false;//是否连接成功
    private _isAutoRetry: boolean = false;//是否自动重连
    private maxRetryCount: number = 5;//最大重连次数
    private retryCount: number = 0;//重连次数
    private url: string = '';//socket地址
    private token: string = '';//token
    private retryDelay: number = 2;//自动重连时间间隔
    private _loginType: ConnectType = ConnectType.NORMAL;//0登录，1重连
    private reconnectTimer: number;//自动重连的定时器
    private _showDialog: boolean = false;//当前是否显示关闭弹窗

    /**
     * 获取单例
     */
    public static get instance(): ChristmasSocketManager {
        if (!this._instance) {
            this._instance = new ChristmasSocketManager();
        }
        return this._instance;
    }

    /**
     * 连接socket
     * @param url 
     * @param token 
     */
    public connect(url: string, token: string): void {
        if (!url) {
            return;
        }
        this.release();
        this.url = url;
        this.token = token;
        ChristmasLogManager.instance.log('开始连接socket, 连接地址为: ' + this.url);
        this.ws = new WebSocket(this.url);
        this.ws.binaryType = 'arraybuffer';
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = this.onError.bind(this);
        this.ws.onclose = this.onClose.bind(this);
    }

    /**
     * socket连接成功
     */
    private onOpen(): void {
        ChristmasLogManager.instance.log('socket连接成功');
        this._connected = true;
        this._isAutoRetry = false;
        this.retryCount = 0;
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.SOCKET_CONNECT_SUCCESS);
        ChristmasDialogManager.instance.closeDialog('Prefabs/Common/CommonDialog', true);
    }


    /**
     * 发送二进制文件
     */
    public async sendBuffer(msgId: number, data: any, msgType: 'Hall' | 'Game' = 'Hall') {
        if (!this.ws || this.ws.readyState == WebSocket.CONNECTING) {
            return;
        }
        let buffer = await ChristmasBaseMessageProtocol.instance.encodeMsg(data, msgId, msgType);
        this.ws.binaryType = 'arraybuffer';
        this.ws.send(buffer);
    }

    /**
     * 收到服务器发送过来的消息
     */
    private async onMessage(event: any) {
        if (!this._connected) {
            return;
        }
        let data = event.data;
        const baseMessage = await ChristmasBaseMessageProtocol.instance.decodeMsg(data) as any;
        ChristmasMsgDispatch.instance.preDispatch(baseMessage.command, baseMessage.body);
    }

    /**
     * socket连接发生错误
     */
    private onError() {
        ChristmasLogManager.instance.log('socket连接发生错误');
        this._connected = false;
        this._loginType = ConnectType.RECONNECT;
        this.autoReconnect();
    }

    /**
     * socket连接关闭
     */
    private onClose() {
        ChristmasLogManager.instance.log(this.url + '的连接被关闭');
        this._connected = false;
        this._loginType = ConnectType.RECONNECT;
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.SOCKET_CLOSE);
        this.autoReconnect();
    }

    public set isAutoRetry(value: boolean) {
        this._isAutoRetry = value;
    }

    public get isAutoRetry(): boolean {
        return this._isAutoRetry;
    }

    /**
     * 自动重连方法
     */
    private autoReconnect(): void {
        if (!this.ws) {
            return;
        }
        this.reconnectTimer && ChristmasTimerManager.instance.clearTimeout(this.reconnectTimer);
        if (!this._isAutoRetry) {
            ChristmasLogManager.instance.log('当前为手动重连模式');
            this.showReconnectDialog();
            return;
        }
        if (this.retryCount > this.maxRetryCount) {
            ChristmasLogManager.instance.log('自动重连以达到最大限制次数: ' + this.maxRetryCount);
            this.showReconnectDialog();
            return;
        }
        ChristmasLogManager.instance.log(this.retryDelay + 's后开始自动重连');
        this.reconnectTimer = ChristmasTimerManager.instance.setTimeOut(() => {
            this.retryCount++;
            this.connect(this.url, this.token);
        }, this.retryDelay);
    }

    public showReconnectDialog(): void {
        ChristmasTimerManager.instance.setTimeOut(() => {
            if ((this._isAutoRetry && this.retryCount <= this.maxRetryCount) || this._connected || this._loginType == ConnectType.NORMAL) {
                return;
            }
            this._showDialog = true;
            ChristmasLockScreenManager.instance.unlockScreen();
            ChristmasDialogManager.instance.openCommonDialog('disconnect', () => {
                this._showDialog = false;
                this.reconnect();
            });
        }, 2);
    }

    /**
     * 手动重连
     */
    public reconnect(): void {
        this.connect(this.url, this.token);
    }

    public set loginType(value: ConnectType) {
        this._loginType = value;
    }

    public get loginType(): ConnectType {
        return this._loginType;
    }

    public get connected(): boolean {
        return this._connected;
    }

    public get showDialog(): boolean {
        return this._showDialog;
    }

    /**
     * 手动关闭socket
     */
    public close(type: ConnectType = ConnectType.RECONNECT): void {
        this._connected = false;
        this._loginType = type;
        ChristmasLogManager.instance.log('主动断开scoket');
        if (this.ws) {
            ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.SOCKET_CLOSE);
            if (this._loginType == ConnectType.RECONNECT) {
                this.ws.close();
            }
            //如果是被执行下线操作，需要清理当前socket
            if (this._loginType == ConnectType.NORMAL) {
                this.release();
            }
            return;
        }
    }

    /**
     * 释放socket
     */
    public release(): void {
        if (!this.ws) {
            return;
        }
        this.ws.onopen = null;
        this.ws.onclose = null;
        this.ws.onerror = null;
        this.ws.onmessage = null;
        this.ws = null;
    }

    public clearUrl(): void {
        this.url = '';
    }
}
