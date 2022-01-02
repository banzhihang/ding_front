const path = require('path')
module.exports = {
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import "${path.join(__dirname,'./src/restLess.less')}";`,
                },
            },
        },
    },
    configureWebpack: {
        module: {
            rules: [
                // 配置读取 *.md 文件的规则
                {
                    test: /\.md$/,
                    use: [
                        { loader: "html-loader" },
                        { loader: "markdown-loader", options: {} }
                    ]
                }
            ]
        },
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    productionSourceMap: false,
}

