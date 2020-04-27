/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs': 'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ng2-modal': 'node_modules/ng2-modal',
      "ng2-tag-input": 'node_modules/ng2-tag-input',
      "ng2-ckeditor": "npm:ng2-ckeditor",
      "ng2-select": "node_modules/ng2-select",
      'angular2-color-picker': 'node_modules/angular2-color-picker',
      'ng2-dnd': 'node_modules/ng2-dnd/bundles/ng2-dnd.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      "ng2-modal": { "main": "index.js", "defaultExtension": "js" },
      "ng2-tag-input": { "main": "index.ts", "defaultExtension": "ts" },
      'angular2-color-picker': {main:'index.js', defaultExtension: 'js'},
      'ng2-dnd': {main:'ng2-dnd.umd.js', defaultExtension: 'js'},
      
        "ng2-ckeditor": {
          "main": "lib/index.js",
          "defaultExtension": "js",
        },
        "ng2-select": {
          "main": "index.js",
          "defaultExtension": "js"
        },

      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
