/*

API:
https://developers.google.com/adwords/api/docs/reference/v201506
/CampaignService.Campaign

*/

var Backbone = require('backbone');

var Campaign = Backbone.Model.extend({});

var CampaignCollection = Backbone.Collection.extend({
  model: Campaign,
});

module.exports = {
  collection: CampaignCollection,
  model: Campaign
};
