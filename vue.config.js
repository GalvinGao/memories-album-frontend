module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000"
      }
    }
  },

  integrity: true,
  runtimeCompiler: true,

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
