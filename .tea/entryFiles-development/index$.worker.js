if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        


function success() {
require('../../app');
require('../../pages/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/supplier/supplier?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/supplier/add-supplier/add-supplier?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/supplier/edit-supplier/edit-supplier?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/product/product?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/product/add-product/add-product?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/product/edit-product/edit-product?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/stock/stock?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/shipment/shipment?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/stock/add-stock/add-stock?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/stock/edit-stock/edit-stock?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/shipment/add-shipment/add-shipment?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/shipment/edit-shipment/edit-shipment?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/setting/setting?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/setting/type/type?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/project/project?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/inventory/inventory?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/project/add-project/add-project?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/project/edit-project/edit-project?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/inventory/understock/understock?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/check/check?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/check/detail/detail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/check/add-check/add-check?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/statistics/statistics?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/statistics/detail/detail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/product/search/search?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}