module.exports = {
  elements: {
    pluginsPageAssert: {
      selector: '#plugin-create-page',
    },
    selectPlugin: {
      selector: '#add-plugin-dropdown',
    },
    selectPluginIdempotency: {
      selector: '#add-plugin-dropdown li[data-select-name="idempotency"]',
    },
    selectPluginACL: {
      selector: '#add-plugin-dropdown li[data-select-name="acl"]',
    },
    selectPluginProxy: {
      selector: '#add-plugin-dropdown li[data-select-name="proxy"]',
    },
    selectPluginJWT: {
      selector: '#add-plugin-dropdown li[data-select-name="jwt"]',
    },
    selectPluginIPrestriction: {
      selector: '#add-plugin-dropdown li[data-select-name="ip_restriction"]',
    },
    selectPluginValidation: {
      selector: '#add-plugin-dropdown li[data-select-name="validator"]',
    },
    confirmLeaveButton: {
      selector: '#confirm-leave button[name="popup-confirm-ok"]',
    },
    cancelLeaveButton: {
      selector: '#confirm-leave button[name="popup-confirm-cancel"]',
    },
    addPluginButton: {
      selector: '#plugins-button-add',
    },
    deletePluginButton: {
      selector: '#plugins-button-delete',
    },
    confirmDeletePluginButton: {
      selector: '#confirm-delete-plugin button[name="popup-confirm-ok"]',
    },
    cancelDeletePluginButton: {
      selector: '#confirm-delete-plugin button[name="popup-confirm-cancel"]',
    },
    aclPOSTMethodSelect: {
      selector: '#acl-plugin-chechboxes0 label:nth-child(1)',
    },
    aclPathInput: {
      selector: 'input[name="settings.rules[0].path"]',
    },
    scopesSelect: {
      selector: '#acl-plugin-scopes0 label:nth-child(1)',
    },
    proxyHostInput: {
      selector: 'input[name="settings.upstream.host"]',
    },
    proxyPortInput: {
      selector: 'input[name="settings.upstream.port"]',
    },
    proxyPathInput: {
      selector: 'input[name="settings.upstream.path"]',
    },
    ipAdressInput: {
      selector: 'input[name="settings.whitelist[0]"]',
    },
    jwtSignatureInput: {
      selector: 'input[name="settings.signature"]',
    },
    selectIPFieldInput: {
      selector: '#plugin-ip-restriction-form button[type="button"]',
    },
    validationMethodCheckboxPost: {
      selector: '#validation-methods-0 label:nth-child(1) ',
    },
    validationPathInput: {
      selector: 'input[name="settings.rules[0].path"]',
    },
  },
  commands: [{
    assertPluginsPage() {
      return this
        .waitForElementPresent('@pluginsPageAssert')
        .assert.visible('@pluginsPageAssert');
    },
    selectPlugins(plugin) {
      return this
        .waitForElementPresent('@selectPlugin')
        .click('@selectPlugin')
        .waitForElementPresent('@selectPluginProxy')
        .click(`@selectPlugin${plugin}`);
    },
    enableIdempotencyPlugin() {
      return this
        .waitForElementPresent('@addPluginButton')
        .waitForElementVisible('@addPluginButton')
        .click('@addPluginButton');
    },
    deletePlugins() {
      return this
        .waitForElementPresent('@deletePluginButton')
        .click('@deletePluginButton');
    },
    confirmDeletePlugins() {
      return this
        .waitForElementPresent('@confirmDeletePluginButton')
        .waitForElementVisible('@cancelDeletePluginButton')
        .click('@confirmDeletePluginButton');
    },
    enableACLPlugin(path) {
      return this
        .waitForElementPresent('@addPluginButton')
        .waitForElementVisible('@addPluginButton')
        .click('@addPluginButton')
        .waitForElementPresent('@aclPOSTMethodSelect')
        .click('@aclPOSTMethodSelect')
        .setValue('@aclPathInput', path)
        .click('@scopesSelect')
        .click('@addPluginButton');
    },
    enableProxyPlugin({ host, port, path }) {
      return this
        .waitForElementPresent('@proxyHostInput')
        .waitForElementVisible('@proxyHostInput')
        .setValue('@proxyHostInput', host)
        .setValue('@proxyPortInput', port)
        .setValue('@proxyPathInput', path)
        .waitForElementPresent('@addPluginButton')
        .click('@addPluginButton');
    },
    enableJWTPlugin(signature) {
      return this
        .waitForElementPresent('@addPluginButton')
        .waitForElementVisible('@addPluginButton')
        .setValue('@jwtSignatureInput', signature)
        .waitForElementPresent('@addPluginButton')
        .click('@addPluginButton');
    },
    enableJWTPluginWithoutSave(signature) {
      return this
        .waitForElementPresent('@addPluginButton')
        .click('@addPluginButton')
        .waitForElementPresent('@addPluginButton')
        .waitForElementVisible('@addPluginButton')
        .setValue('@jwtSignatureInput', signature);
    },
    enableIPPlugin(ip) {
      return this
        .waitForElementPresent('@addPluginButton')
        .waitForElementVisible('@addPluginButton')
        .click('@selectIPFieldInput')
        .setValue('@ipAdressInput', ip)
        .waitForElementPresent('@addPluginButton')
        .click('@addPluginButton');
    },
    enableValidationPlugin(path) {
      return this
        .waitForElementPresent('@validationMethodCheckboxPost')
        .waitForElementVisible('@validationMethodCheckboxPost')
        .click('@validationMethodCheckboxPost')
        .setValue('@validationPathInput', path);
    },
    submitValidationPlugin() {
      return this
        .waitForElementPresent('@addPluginButton')
        .click('@addPluginButton');
    },
    assertPluginsPopup() {
      return this
        .waitForElementPresent('@confirmLeaveButton')
        .waitForElementPresent('@cancelLeaveButton')
        .click('@confirmLeaveButton');
    },
  }],
};
