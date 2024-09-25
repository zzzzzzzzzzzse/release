// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

import { ILogger, LogLevel } from "./ILogger";

/** A logger that does nothing when log messages are sent to it. */
export class NullLogger implements ILogger {
    /** The singleton instance of the {@link @microsoft/signalr.NullLogger}. */
    public static instance: ILogger = new NullLogger();

    private constructor() {}
    debug(message: string): void {
        throw new Error("Method not implemented.");
    }
    info(message: string): void {
        throw new Error("Method not implemented.");
    }
    warn(message: string): void {
        throw new Error("Method not implemented.");
    }
    error(message: string): void {
        throw new Error("Method not implemented.");
    }

    /** @inheritDoc */
    // tslint:disable-next-line
    public log(_logLevel: LogLevel, _message: string): void {
    }
}
