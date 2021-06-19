
/**
 * Console for Color
 */
 export default class ColorConsole {

    /**
     * For Plugin
     *
     * @type function
     */
    public static install;

    /**
     * @type string
     */
    public static readonly ERROR: string = 'error';

    /**
     * @type string
     */
    public static readonly INFO: string = 'info';

    /**
     * @type string
     */
    public static readonly LIGHT: string = 'light';

    /**
     * @type string
     */
    public static readonly LOG: string = 'log';

    /**
     * @type string
     */
    public static readonly PASSIVE: string = 'passive';

    /**
     * @type string
     */
    public static readonly ROUTER: string = 'router';

    /**
     * @type string
     */
    public static readonly SUCCESS: string = 'success';

    /**
     * @type string
     */
    public static readonly TRACE: string = 'trace';

    /**
     * @type string
     */
    public static readonly WARN: string = 'warn';

    /**
     * @type string
     */
    public static readonly VIDEO: string = 'video';

    /**
     * Dictionary of available styles
     *
     * @type {object}
     */
    static readonly COLORS: any = {
        error: 'background: #f8d7da; color: #721c24;',
        info: 'background: #d1ecf1; color: #0c5460;',
        light: 'background: #fefefe; color: #818182;',
        log: 'background: #f0f0f0; color: #333333;',
        passive: 'background: #fafafa; color: #cacaca;',
        page: 'background: #F7EE95; color: #7E5904;',
        success: 'background: #d4edda; color: #155724;',
        trace: 'background: #f0f0f0; color: #7E5904;',
        warn: 'background: #fff3cd; color: #856404;',
        router: 'background: #945485; color: #DEB1D6;',
    };

    /**
     * Disable output
     */
    public static disabled: boolean = false;

    /**
     * Current time, slimmed down
     *
     * @return string
     */
    public static get time(): string {
        return (Date.now() / 1000 + '').substr(-8);
    }

    /**
     * Any
     *
     * @param {string} msg [description]
     */
    public static any(type: string, ...params: any[]) {
        const msg: string = this.formatLog(params, ' ⚪️ ');

        this.sendToConsole(type, msg, params);
    }

    /**
     * Error
     *
     * @param {string} msg [description]
     */
    public static error(...params: any[]) {
        const msg: string = this.formatLog(params, '');

        this.sendToConsole(ColorConsole.ERROR, msg, params);
    }

    /**
     * Light
     *
     * @param {string} msg [description]
     */
    public static light(...params: any[]) {
        const msg: string = this.formatLog(params, ' ⚪️ ');

        this.sendToConsole(ColorConsole.LIGHT, msg, params);
    }

    /**
     * Log
     *
     * @param {string} msg [description]
     */
    public static log(...params: any[]) {
        const msg: string = this.formatLog(params, ' ⚪️ ');

        this.sendToConsole(ColorConsole.LOG, msg, params);
    }

    /**
     * Info
     *
     * @param {string} msg [description]
     */
    public static info(...params: any[]) {
        const msg: string = this.formatLog(params, ' 💬 ');

        this.sendToConsole(ColorConsole.INFO, msg, params);
    }

    /**
     * Passive
     *
     * @param {string} msg [description]
     */
    public static passive(...params: any[]) {
        const msg: string = this.formatLog(params, ' ⚪️ ');

        this.sendToConsole(ColorConsole.PASSIVE, msg, params);
    }

    /**
     * Router
     *
     * Special log type
     *
     * @param {string} msg [description]
     */
    public static router(...params: any[]) {
        const msg: string = this.formatLog(params, ' ⚫ ');

        this.sendToConsole(ColorConsole.ROUTER, msg, params);
    }

    /**
     * Success
     *
     * @param {string} msg [description]
     */
    public static success(...params: any[]) {
        const msg: string = this.formatLog(params, ' ✅ ');

        this.sendToConsole(ColorConsole.SUCCESS, msg, params);
    }

    /**
     * Trace
     *
     * @param {string} msg [description]
     */
    public static trace(...params: any[]) {
        const msg: string = this.formatLog(params);

        this.sendToConsole(ColorConsole.TRACE, msg, params);
    }

    /**
     * Warn
     *
     * @param {string} msg [description]
     */
    public static warn(...params: any[]) {
        const msg: string = this.formatLog(params, '');

        this.sendToConsole(ColorConsole.WARN, msg, params);
    }

    /**
     * Video
     *
     * @param {string} msg [description]
     */
    public static video(...params: any[]) {
        const msg: string = this.formatLog(params, ' ⚫ ');

        this.sendToConsole(ColorConsole.VIDEO, msg, params);
    }

    /**
     * Run log function
     *
     * @param string type   info, log, warn, etc
     * @param string msg    info, log, warn, etc
     * @param any    params
     */
    public static sendToConsole(type: string, msg: string, params: any[]): void {
        // Check for color
        if (msg.indexOf('%c') < 0) {
            msg = '%c' + msg;
        }

        // Send nothing
        if (this.disabled) {
            return;
        }

        // Formatted style
        const style: string = this.formatStyle(type);
        const objects: object[] = this.formatObjects(params);
        const consoleParams: any = [msg, style];

        if (objects && objects.length) {
            consoleParams.push(objects);
        }

        // Different log types
        switch (type) {
            case 'error':
                (console['_error'] || console.error).apply(this, consoleParams);
                break;

            case 'info':
                (console['_info'] || console.info).apply(this, consoleParams);
                break;

            case 'trace':
                (console['_trace'] || console.trace).apply(this, consoleParams);
                break;

            case 'warn':
                (console['_warn'] || console.warn).apply(this, consoleParams);
                break;

            default:
            case 'log':
                (console['_log'] || console.log).apply(this, consoleParams);
                break;
        }
    }

    /**
     * Format the log string
     *
     * @param  any    params
     * @param  string prefix
     * @param  string suffix
     * @return string
     */
    protected static formatLog(params: any[], prefix: string = '', suffix: string = ''): any {
        const [strings, objects] = this.separateLogInformation.apply(this, params);
        const stringLog: string = [
            prefix,
            '%c ', this.time, ' : ',
            strings.join('  —  '),
            suffix,
        ].join('');

        return stringLog;
    }

    /**
     * Format the objects
     *
     * @param  any      params
     * @return object[]
     */
    protected static formatObjects(params: any[]): object[] {
        const [strings, objects] = this.separateLogInformation.apply(this, params);
        return objects;
    }

    /**
     * Return a formatted style
     *
     * @return string
     */
    protected static formatStyle(type: string = ''): string {
        // Base styles
        let style: string = [
            'padding: 2px 20px 2px 2px',
            'width: 100%',
            'display:block',
        ].join(';');

        // Add styles
        style += ';' + (ColorConsole.COLORS[type] || '');

        return style;
    }

    /**
     * Separate objects from logs
     *
     * @param any ...params
     */
    protected static separateLogInformation(...params: any[]): any {
        const strings: string[] = [];
        const objects: object[] = [];

        // Iterate through params
        params.forEach((value: any) => {
            const type: string = typeof(value);

            if (type === 'object') {
                objects.push(value);
            }
            else {
                strings.push(value.toString());
            }
        });

        return [
            strings.length ? strings : null,
            objects.length ? objects : null,
        ];
    }
}

/**
 * Plugin
 */
ColorConsole.install = function(Vue, options) {
    // 1. add global method or property
    Vue.Console = function () {
        return ColorConsole;
    };

    // 2. add a global asset
    Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
            // some logic ...
        }
    });

    // 3. inject some component options
    Vue.mixin({
        created: function () {
            // some logic ...
        }
    });

    // 4. add an instance method
    Vue.prototype.$console = ColorConsole;
};
