'use strict';

const Hapi = require('hapi');
const request = require('request');
const cheerio = require('cheerio');

const URL = 'http://books.toscrape.com/';
const agoda = 'https://www.agoda.com/pages/agoda/default/DestinationSearchResult.aspx?city=9395&checkIn=2017-12-28&los=1&rooms=1&adults=1&children=0&cid=-1&pagetypeid=1&origin=TH&tag=&gclid=&aid=156801&userId=9cd2ea20-775b-4692-94d6-f647642c664d&languageId=1&storefrontId=3&currencyCode=THB&htmlLanguage=en-us&trafficType=User&cultureInfoName=en-US&checkOut=2017-12-29&childages=&priceCur=THB&hotelReviewScore=5&tabId=1&issearchfromhomepage=true&ckuid=9cd2ea20-775b-4692-94d6-f647642c664d';
const traveloka = 'https://www.traveloka.com/th-th/hotel/search?spec=28-12-2017.29-12-2017.1.1.HOTEL_GEO.10000045.Bangkok.1';
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8088
});

server.route({
  method: 'GET',
  path: '/scrap',
  handler: (req, reply) => {

    request(agoda, (err, response, body) => {

      if (!err && response.statusCode === 200) {
      	let q = [];
        let $ = cheerio.load(body);
        var s = body.match(/HotelDisplayName/g);
        var n = body.search("HotelDisplayName");

        //let title = $('.price_color').text().trim();
        //let name = $('._3GxXy').text().trim();
        //let hh	=	$('._1GuxN.DE9rG._2V6Hh.Dk2Ei').text().trim();
        let x = $('.step2-hotel-name').text();
        // let title = $('.document-title').text().trim();
        // let publisher = $('.document-subtitle.primary').text().trim();
        // let category = $('.document-subtitle.category').text().trim();
        // let score = $('.score-container > .score').text().trim();
        // let install = $('.meta-info > .content').eq(2).text().trim();
        // let version = $('.meta-info > .content').eq(3).text().trim();

        // reply({
        //   data: {
        //     title: title,
        //     publisher: publisher,
        //     category: category,
        //     score: score,
        //     install: install,
        //     version: version
        //   }
        // });

        reply({
        	// data: name,
        	// name: hh,
        	n: s.length,
        	q: x
        });

      } else {
        reply({
          message: `We're sorry, the requested ${URL} was not found on this server.`
        });
      }
    });

  }
});

server.start(err => {
  console.log(`Server running at ${server.info.uri}`);
});