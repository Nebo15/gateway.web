module.exports = {
  url() {
    return `${this.api.launchUrl}/404`;
  },
  elements: {
    error404Assert: {
      selector: '#not-found-page',
    },
  },
  commands: [{
    assert404Page(url) {
      return this
        .waitForElementPresent('@error404Assert')
        .assert.visible('@error404Assert')
        .assert.urlContains(url || '404');
    },
  }],
};
