const Fs = require('fs');

Editor.Panel.extend({

  style: Fs.readFileSync(Editor.url('packages://bundle-zip/panel/index.css'), 'utf8'),

  template: Fs.readFileSync(Editor.url('packages://bundle-zip/panel/index.html'), 'utf8'),

  ready() {
    const app = new window.Vue({
      el: this.shadowRoot,
      compressPath: '',

      data() {
        return {
          enabled: false,
          // configSaveDir: 'local',

          minQuality: 40,
          maxQuality: 80,
          colors: 256,
          speed: 3,

          isSaving: false,
          compressPath: require('path').join(Editor.Project.path || Editor.projectPath, 'assets'),
        }
      },

      methods: {

        /**
         * 保存配置
         */
        saveConfig() {
          if (this.isSaving) return;
          this.isSaving = true;
          this.isMetaCompress = true;

          const config = {
            enabled: this.enabled,

            minQuality: this.minQuality,
            maxQuality: this.maxQuality,
            colors: this.colors,
            speed: this.speed,
          };
          Editor.Ipc.sendToMain('bundle-zip:save-config', config, () => {
            this.isSaving = false;
          });
        },

        /**
         * 读取配置
         */
        readConfig() {
          Editor.Ipc.sendToMain('bundle-zip:read-config', (err, config, bundleNames) => {
            Editor.log('bundleNames', bundleNames);
            if (err || !config) return;
            for (const key in config) {
              this[key] = config[key];
            }
          });
        },

        createProto() {
          Editor.Ipc.sendToMain('bundle-zip:create-proto');
        },

        copyBundle() {
          //判断oldBundleName和newBundleName是否为空或者为undefined
          if (this.oldBundleName == undefined || this.oldBundleName == '' || this.newBundleName == undefined || this.newBundleName == '') {
            Editor.error('Bundle名不能为空,请填写bundle名');
            return
          }
          Editor.Ipc.sendToMain('bundle-zip:copy-Bundle', this.oldBundleName, this.newBundleName, () => {
            //执行完成的回调方法
            //Editor.log('回调完成');
          });
        },

        openMetaCompress() {
          //去掉路径中头尾的空白
          let path = this.compressPath.trim();
          Editor.log('openMetaCompress ', path);
          Editor.Ipc.sendToMain('bundle-zip:set-meta-compress', path, true);
        },
        closeMetaCompress() {
          let path = this.compressPath.trim();
          Editor.log('closeMetaCompress ', path);
          Editor.Ipc.sendToMain('bundle-zip:set-meta-compress', path, false);
        }
      }
    });

    app.readConfig();

  }

});