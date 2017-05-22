module.exports = {
  'apis ssr test': (client) => {
    client.page.apisPage().navigate().apisList();
  },
  'create ssr test': (client) => {
    client.page.createPage().navigate().createApiSSR();
  },
  'requests ssr test': (client) => {
    client.page.requestsPage().navigate().requestsListSSR();
  },
  '404 page ssr test': (client) => {
    client.page.page404Page().navigate().assert404Page();
    client.url().refresh();
    client.page.page404Page().assert404Page();
    client.url(`${client.launchUrl}/fsdffss`);
    client.page.page404Page().assert404Page('fsdffss');
  },
  after: (client) => {
    client.end();
  },
};
