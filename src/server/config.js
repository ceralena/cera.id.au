// @flow
export class Config {
    port: number;
    staticDir: string;
    isProduction: boolean;
    appVersion: string;

    constructor(port: number, staticDir: string, isProduction: boolean, appVersion: ?string) {
        this.port = port;
        this.staticDir = staticDir;
        this.isProduction = isProduction;
        this.appVersion = appVersion;
    }
}

export function loadConfig(env: Object): Config {
    return new Config(
        env.PORT || 3000,
        env.STATIC_DIR || 'static',
        env.NODE_ENV === 'production' ? true : false,
        env.APP_VERSION || 'dev'
    );
}
