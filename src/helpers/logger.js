class LoggerStyles {
    constructor() {
        this.DEFAULT = "display: block; padding: 10px; font-size: 12px;";
    }

    appendStyles({title:titleBlock, style:styleBlock}) {
        if (!titleBlock || !styleBlock) {
            return;
        }

        Object.defineProperty(this, titleBlock.toUpperCase(), {
            configurable: true,
            enumerable: true,
            get: function() {
                return (message) => {
                    console.log(`%c ${message}`, `${this.DEFAULT} ${styleBlock}`);
                }
            },
        })
    }
}

const logger = new LoggerStyles();
try {
    logger.appendStyles({});
    logger.appendStyles({title: 'SUCCESS', style: 'background: #2d1; color: #242;'});
    logger.appendStyles({title: 'ERROR', style: 'background: #faa; color: #511;'});
    logger.appendStyles({title: 'WARN', style: 'background: #fda; color: #551;'});
    logger.appendStyles({title: 'CHANGED', style: 'background: lightblue; color: blue;'});
} catch (err) {
    console.log(err);
}

export default logger;