export class Packet {

    public int32ToByte(num) {
        //只有int类型，小于256点1字节，大于256点两字节，所有只能返过来
        var bytes = [];

        bytes.push(num >> 24 & 0xff);
        bytes.push(num >> 16 & 0xff);
        bytes.push(num >> 8 & 0xff);
        bytes.push(num & 0xff);
        return bytes;
    }

    public int16ToByte(num) {
        //只有int类型，小于256点1字节，大于256点两字节，所有只能返过来
        var bytes = [];
        bytes.push(num >> 8 & 0xff);
        bytes.push(num & 0xff);
        return bytes;
    }

    public bytes2int16(arr) {
        return ((arr[0] & 0xFF) << 8) | (arr[1] & 0xFF);
    }

    public bytes2int32(arr) {
        //没有64位只能取后四位
        return ((arr[0] & 0xFF) << 24) | ((arr[1] & 0xFF) << 16) | ((arr[2] & 0xFF) << 8) | (arr[3] & 0xFF);
    }

    public encode(data: TransportData) {
        //包的总长度
        let all_length = 6 + data.sendData.byteLength;
        //返回的数组
        let myArray = new ArrayBuffer(all_length);
        //以byte形式的数组返回
        let resData = new Uint8Array(myArray);

        //主命令
        let cmd_byte = this.int16ToByte(data.cmd);
        for (let i = 0; i < cmd_byte.length; i++) {
            resData[i] = cmd_byte[i];

        }

        //session
        let sessionData_byte = this.int32ToByte(data.sessionData);
        for (let i = 0; i < sessionData_byte.length; i++) {
            resData[i + 2] = sessionData_byte[i];

        }

        //内容
        for (let i = 0; i < data.sendData.length; i++) {
            resData[i + 6] = data.sendData[i];

        }
        return myArray;
    }

    public decode(data: any) {
        let arr = new Uint8Array(data);
        let cmd = this.bytes2int16(arr.slice(0, 2));
        let sessionData = this.bytes2int32(arr.slice(2, 6));
        let sendData_byte = arr.slice(6);
        return {
            cmd: cmd,
            sessionData: sessionData,
            sendData_byte: sendData_byte,
        };
    }
}

export interface TransportData {
    cmd;
    sessionData;
    sendData;
}
