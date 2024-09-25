/**
 * 加密
 */
export class CrptyConfig {
    
    //aes静态加密key
    public static m_clientKey: string = "aYOCxRlMAVnIvR5TQxjR5ujdi3stc7rL";
 
    //偏移量(16位)
    public static m_iv = "5Sg5QrH2FHHGvPai";
 
    //登录后偏移量(16位)
    public static m_Loginiv = "8tyYm2qm1v6GwX8W";
 
    //aes会话加密key
    public static m_clientSessionKey: string = "";
}