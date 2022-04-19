const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: false
      }
    }
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        const constructTemplateParameters = args[0].templateParameters
        args[0].templateParameters = (...args) =>{
          const parameters = constructTemplateParameters(...args)
          parameters.CSP = ''
          // https://cli.vuejs.org/guide/mode-and-env.html
          if (process.env.NODE_ENV === 'production') {
            parameters.CSP = [
              "default-src 'none'",
              "script-src 'self'",
              [
                'style-src',
                "'self'",
                // `vuetify.Theme.genStyleElement`
                "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
                // `vuetify.Theme.css`
                "'sha256-H0hALk5rjM4aGisbF9hx4t4yVUsKf0ZX1N28nouwAhI='"
              ].join(' '),
              // https://security.stackexchange.com/a/95011
              "font-src 'self' data:"
            ].join('; ')
          }
          return parameters
        }
        return args
      })
  }
})
