import { Injectable, ConsoleLogger } from '@nestjs/common';
import { appendFile } from 'fs';

const LOG_PATH = 'dev.log';

@Injectable()
export class FileLogger extends ConsoleLogger {
    constructor() {
        super();
    }
    error(message: string, stack?: string, context?: string) {
        appendFile(LOG_PATH, `${(new Date()).toISOString()} ERROR ${context ? '[' + context + '] ' : ''} ${message} - ${stack}\n`, error => {
            if (error) {
                console.error(error);
            }
        })

        super.error(message, stack, context);
    }

    log(message: any, context?: string) {
        appendFile(LOG_PATH, `${(new Date()).toISOString()}   LOG ${context ? '[' + context + '] ' : ''}${message}\n`, error => {
            if (error) {
                console.error(error);
            }
        });

        super.log(message, context);
    }
}