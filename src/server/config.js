// @flow
export class Config {
    port: number;
    staticDir: string;
    isProduction: boolean;

    constructor(port: number, staticDir: string, isProduction: boolean) {
        this.port = port;
        this.staticDir = staticDir;
        this.isProduction = isProduction;
    }
}

export function loadConfig(env: Object): Config {
    return new Config(
        env.PORT || 3000,
        env.STATIC_DIR || 'static',
        env.NODE_ENV === 'production' ? true : false
    );
}
