import { Packet} from "../../../resources/proto/Packet";
import { EventBus } from "../../common/EventBus";
import { Constants } from "../../Constants";

/**
 * 集线器基类
 */
export class BaseHub {
    //事件分发
    protected m_eventBus: EventBus = null;
    //socket连接
    protected m_socket: WebSocket = null;
    //slot消息分发队列
    protected m_messageQueue: any[] = [];
    protected m_messageHandlers: Map<string, Function> = new Map();

    protected m_requestCount: number = 0;//请求次数
    protected m_requestTime: number = 0;//请求时间
    protected m_responseTime: number = 0;//请求结果时间
    protected m_requesting: boolean = false;//是否请求中
    protected m_lastRequestTime: number = 0;//最后请求时间
    protected m_heartbeatTimer: number = 0;//心跳定时器

    //socket数据处理
    protected m_protoProcessor: Packet = null;

    /**
     * 事件分发管理
     * @returns 
     */
    public get eventBus() {
        return this.m_eventBus;
    }

    /**
     * 获取socket连接
     */
    public get socket() {
        return this.m_socket;
    }

    /**
     * 获取请求次数
     */
    public get requestCount() {
        return this.m_requestCount;
    }
    /**
     * 添加请求次数
     */
    public addRequestCount() {
        this.m_requestCount++;
    }

    /**
     * 网络延迟
     */
    public networkLatency(): number {
        //请求间隔
        let latency = 0;
        //请求延迟
        let reqrestingLatency = 0;
        if (this.m_requesting) {
            reqrestingLatency = this.m_responseTime - this.m_lastRequestTime;
        } else {
            latency = this.m_responseTime - this.m_requestTime;
        }
        //封顶默认6000毫秒
        return Math.min(6000, Math.max(latency, reqrestingLatency))
    }

    /**
     * socket是否连接中
     * @returns 
     */
    public isConnecting(): boolean {
        if (!this.m_socket) {
            return false;
        }
        return this.m_socket.readyState === WebSocket.CONNECTING;
    }

    /**
     * socket是否重连中
     * @returns 
     */
    public isReconnecting(): boolean {
        return this.m_socket && this.m_socket.readyState === WebSocket.CONNECTING;
    }

    /**
     * socket是否连接结束
     * @returns 
     */
    public isConnected(): boolean {
        return this.m_socket != null && this.m_socket.readyState === WebSocket.OPEN;
    }


    public getonline(): boolean {
        let online: boolean = false;

        if (this.m_socket && this.m_socket.readyState === 1) online = true;
        return online;
    }
    /**
     * 构造方法
     * @param eventBus 
     */
    public constructor(eventBus: EventBus) {
        this.m_eventBus = eventBus;
        this.m_protoProcessor = new Packet();
    }

    /**
     * 连接socket
     * @param url socket的url
     */
     protected  connectSocket(url: string, onOpenCallBack: Function, onMessageCallBack: Function, onErrorCallBack: Function, onCloseCallBack: Function) {
        //存在连接先停止
        if (this.m_socket) {
            this.m_socket.close()
            this.m_socket.onopen = null
            this.m_socket.onmessage = null
            this.m_socket.onerror = null
            this.m_socket.onclose = null
            this.m_socket = null;
        }
        let success = false;
        try {
            if (url.indexOf("wss://") === 0) {
                let cacert = cc.url.raw('resources/cert.pem');
                if (cc.loader.md5Pipe) {
                    cacert = cc.loader.md5Pipe.transformURL(cacert)
                }
                this.m_socket = new WebSocket(url, null, cacert);
            } else {
                this.m_socket = new WebSocket(url);
            }
            this.m_socket.binaryType = 'arraybuffer';
            this.m_socket.onopen = (evt: Event) => onOpenCallBack(evt);
            this.m_socket.onmessage = (evt: MessageEvent) => onMessageCallBack(evt);
            this.m_socket.onerror = (evt: Event) => onErrorCallBack(evt);
            this.m_socket.onclose = (evt: Event) => onCloseCallBack(evt);
            success = true;
        } catch (e) {

        }
        return success;
    }

    /**
     * 销毁
     */
    public onDestroy() {
        Constants.getInstance().IsGameStart = false
        //关闭socket
        if (this.m_socket) {
            this.m_socket.close()
            this.m_socket.onopen = null
            this.m_socket.onmessage = null
            this.m_socket.onerror = null
            this.m_socket.onclose = null
            this.m_socket = null;
        }
    }


    /**
     * 格式转化
     * @param buffer 
     */
     protected parseProtoBufId(buffer: MessageEvent, callBack: Function) {
        const arrayBuffer: ArrayBuffer = buffer.data;
        let dataUnit8Array = new Uint8Array(arrayBuffer);
        const id = this.Uint8ArrayToInt(dataUnit8Array.slice(0, 2));
        const index = this.Uint8ArrayToInt(dataUnit8Array.slice(2, 6));
        dataUnit8Array = dataUnit8Array.slice(6);
        callBack(id, dataUnit8Array)
    }

    /**
     * Uint8Array[]转int
     * 相当于二进制加上4位。同时，使用|=号拼接数据，将其还原成最终的int数据
     * @param uint8Ary Uint8Array类型数组
     * @return int数字
     */
     protected Uint8ArrayToInt(uint8Ary: Uint8Array): number {
        let retInt = 0;
        for (let i = 0; i < uint8Ary.length; i++) {
            retInt |= (uint8Ary[i] << (8 * (uint8Ary.length - i - 1)));
        }
        return retInt;
    }
}