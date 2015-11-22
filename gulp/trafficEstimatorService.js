var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap'),
  uuid = require('uuid');

gulp.task(
  'adWords:trafficEstimatorService:get',
  'gets Google AdWords traffic estimates',
  function(cb) {
    var argv = require('yargs')
      .default(
        'clientCustomerId',
        process.env.ADWORDS_CLIENT_CUSTOMER_ID,
        'clientCustomerId of account'
      )
      .default('validateOnly', false, 'validate only')
      .argv;

    var AdWords = require('..');

    var service = new AdWords.TrafficEstimatorService()
      .setValidateOnly(argv.validateOnly);

    var selector = new AdWords.Selector.model({
      campaignEstimateRequests: [
        {
          adGroupEstimateRequests: [
            {
              keywordEstimateRequests: [
                {
                  keyword: {
                    'cm:text': 'homes',
                    'cm:matchType': 'PHRASE'
                  },
                  maxCpc: {'cm:microAmount': 10000000}
                }
              ]
            }
          ]
        }
      ]
    });

    service.get(argv.clientCustomerId, selector, function(err, results) {
      if (err) console.log(err);
      else console.log(JSON.stringify(results, null, 2));
      cb(err);
    });
  }
);
