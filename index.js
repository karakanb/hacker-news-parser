var cheerio = require('cheerio')

function parseHn(hackerNewsHtml) {
  var $ = cheerio.load(hackerNewsHtml)
  var items = []
  $('.athing').each(function (i, elem) {

    // Retrieve base items.
    var item = $(this);
    var commentLine = item.next()
    var link = item.find('.storylink');

    // Retrieve the useful DOM elements.
    var commentCount = commentLine.find('a').last();
    var hasCommentCount = commentCount.text().trim() !== 'hide';
    var hnUser = commentLine.find('.hnuser');

    // Append the element information to the list.
    items[i] = {
      title: link.text().trim() ? link.text().trim() : null,
      link: link.attr('href') ? link.attr('href') : null,
      siteString: item.find('.sitestr').text().trim() || null,
      score: commentLine.find('.score').text().trim() || null,
      user: {
        name: hnUser.text().trim() || null,
        link: hnUser.attr('href') || null
      },
      age: commentLine.find('.age').text().trim() || null,
      commentCount: hasCommentCount ? commentCount.text().trim() : null,
      threadLink: hasCommentCount ? commentCount.attr('href') : null
    }
  });

  return items;
}

exports.parse = function (hackerNewsHtml) {
  return parseHn(hackerNewsHtml)
}

exports.parseAsync = function (hackerNewsHtml, callback) {
  callback(parseHn(hackerNewsHtml))
}


