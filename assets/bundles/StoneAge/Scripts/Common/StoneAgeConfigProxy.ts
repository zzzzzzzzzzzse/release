/**
 * 配置表数据代理
 */
export default class StoneAgeConfigProxy {
    private static _instance: StoneAgeConfigProxy = null;
    private configMap: any = {};

    /**
     * 获取单例
     */
    public static get instance(): StoneAgeConfigProxy {
        if (!this._instance) {
            this._instance = new StoneAgeConfigProxy();
        }
        return this._instance;
    }

    /**
     * 
     * @param configName 配置表名
     * @param configData 配置表数据
     * 添加配置表数据
     */
    public addConfigData(configName: string, configData: any): void {
        this.configMap[configName] = configData;
    }

    /**
     * 
     * @param configName 配置表名
     * @returns 获取配置表数据
     */
    public getConfigData(configName: string): any {
        return this.configMap[configName];
    }
}
