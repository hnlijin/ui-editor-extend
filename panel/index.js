Editor.Panel.extend({
  template: `
    <h3>ClientRes Path:</h3>
    <ui-input value="{{clientResPath}}"></ui-input>
    <ui-button @confirm="onChoosePath">...</ui-button>
    <ui-button>{{txtOpen}}</ui-button>
  `,

  ready () {
    new window.Vue({
      el: this.shadowRoot,
      data: {
        txtOpen: 'Open',
        clientResPath: '',
      },
      methods: {
        onChoosePath: function() {
          Editor.log("choose path.");
          let res = Editor.Dialog.openFile({
            properties: ['openDirectory']
          });
          if (res && res[0]) {
            this.clientResPath = res[0];
          }
        }
      }
    });
  },
});