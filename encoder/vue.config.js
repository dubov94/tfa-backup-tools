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
                "'sha256-H0hALk5rjM4aGisbF9hx4t4yVUsKf0ZX1N28nouwAhI='",
                // https://github.com/parallax/jsPDF/blob/2d9a91916471f1fbe465dbcdc05db0cf22d720ec/src/jspdf.js#L3169
                "'sha256-cQ06adU3/uMUMHtBZsElkcA8pCtSaVI8ThTIFgr+348='"
              ].join(' '),
              // https://security.stackexchange.com/a/95011
              "font-src 'self' data:",
              // https://github.com/soldair/node-qrcode#todataurltext-options-cberror-url-1
              "img-src 'self' data:",
              // https://github.com/parallax/jsPDF/blob/2d9a91916471f1fbe465dbcdc05db0cf22d720ec/src/jspdf.js#L3086
              "frame-src data:"
            ].join('; ')
          }
          return parameters
        }
        return args
      })
  }
}
