/**
 * socket slot游戏登录
 */
export class SocketReqSlotLogin {
    //玩家id
    public m_pid: string;
    //slot登录token
    public m_token: string;
    //游戏id
    public m_gameId: number;
    //游戏版本
    public m_version: string;
    //掩码
    public m_maskingKey: number;
}