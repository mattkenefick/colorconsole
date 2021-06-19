export default class ColorConsole {
    static install;
    static ERROR = 'error';
    static INFO = 'info';
    static LIGHT = 'light';
    static LOG = 'log';
    static PASSIVE = 'passive';
    static ROUTER = 'router';
    static SUCCESS = 'success';
    static TRACE = 'trace';
    static WARN = 'warn';
    static VIDEO = 'video';
    static COLORS = {
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
    static disabled = false;
    static get time() {
        return (Date.now() / 1000 + '').substr(-8);
    }
    static any(type, ...params) {
        const msg = this.formatLog(params, ' ⚪️ ');
        this.sendToConsole(type, msg, params);
    }
    static error(...params) {
        const msg = this.formatLog(params, '');
        this.sendToConsole(ColorConsole.ERROR, msg, params);
    }
    static light(...params) {
        const msg = this.formatLog(params, ' ⚪️ ');
        this.sendToConsole(ColorConsole.LIGHT, msg, params);
    }
    static log(...params) {
        const msg = this.formatLog(params, ' ⚪️ ');
        this.sendToConsole(ColorConsole.LOG, msg, params);
    }
    static info(...params) {
        const msg = this.formatLog(params, ' 💬 ');
        this.sendToConsole(ColorConsole.INFO, msg, params);
    }
    static passive(...params) {
        const msg = this.formatLog(params, ' ⚪️ ');
        this.sendToConsole(ColorConsole.PASSIVE, msg, params);
    }
    static router(...params) {
        const msg = this.formatLog(params, ' ⚫ ');
        this.sendToConsole(ColorConsole.ROUTER, msg, params);
    }
    static success(...params) {
        const msg = this.formatLog(params, ' ✅ ');
        this.sendToConsole(ColorConsole.SUCCESS, msg, params);
    }
    static trace(...params) {
        const msg = this.formatLog(params);
        this.sendToConsole(ColorConsole.TRACE, msg, params);
    }
    static warn(...params) {
        const msg = this.formatLog(params, '');
        this.sendToConsole(ColorConsole.WARN, msg, params);
    }
    static video(...params) {
        const msg = this.formatLog(params, ' ⚫ ');
        this.sendToConsole(ColorConsole.VIDEO, msg, params);
    }
    static sendToConsole(type, msg, params) {
        if (msg.indexOf('%c') < 0) {
            msg = '%c' + msg;
        }
        if (this.disabled) {
            return;
        }
        const style = this.formatStyle(type);
        const objects = this.formatObjects(params);
        const consoleParams = [msg, style];
        if (objects && objects.length) {
            consoleParams.push(objects);
        }
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
    static formatLog(params, prefix = '', suffix = '') {
        const [strings, objects] = this.separateLogInformation.apply(this, params);
        const stringLog = [
            prefix,
            '%c ', this.time, ' : ',
            strings.join('  —  '),
            suffix,
        ].join('');
        return stringLog;
    }
    static formatObjects(params) {
        const [strings, objects] = this.separateLogInformation.apply(this, params);
        return objects;
    }
    static formatStyle(type = '') {
        let style = [
            'padding: 2px 20px 2px 2px',
            'width: 100%',
            'display:block',
        ].join(';');
        style += ';' + (ColorConsole.COLORS[type] || '');
        return style;
    }
    static separateLogInformation(...params) {
        const strings = [];
        const objects = [];
        params.forEach((value) => {
            const type = typeof (value);
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
ColorConsole.install = function (Vue, options) {
    Vue.Console = function () {
        return ColorConsole;
    };
    Vue.directive('my-directive', {
        bind(el, binding, vnode, oldVnode) {
        }
    });
    Vue.mixin({
        created: function () {
        }
    });
    Vue.prototype.$console = ColorConsole;
};
//# sourceMappingURL=ColorConsole.js.map