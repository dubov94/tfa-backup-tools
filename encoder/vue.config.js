module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        const constructTemplateParameters = args[0].templateParameters
        args[0].templateParameters = (...args) =>{
          const parameters = constructTemplateParameters(...args)
          parameters.CSP = ''
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
              "font-src 'self' data:"
            ].join('; ')
          }
          return parameters
        }
        return args
      })
  }
}
