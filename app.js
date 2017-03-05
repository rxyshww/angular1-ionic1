/**
 * Created by xiangge on 2017/3/1.
 */

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.join(__dirname, 'www')));

app.use('/api/books', function(req, res) {
  console.log(req.query)
  var qs = {
    start: req.query.start,
    count: req.query.count,
    q: req.query.q
  };
  var url = 'https://api.douban.com/v2/book/search';
  req.pipe(request({url: url, qs: qs})).pipe(res);

});

// 搜索音乐
app.use('/api/music', function(req, res) {
  var qs = {
    type: req.query.type,
    s: req.query.s,
    limit: req.query.count,
    offset: req.query.start,
    br: req.query.br,
    id: req.query.id,
    search_type: req.query.search_type
  }
  var url = 'https://api.imjad.cn/cloudmusic/';
  req.pipe(request({url: url, qs: qs})).pipe(res);
});


app.listen(3000, () => {
  console.log("It's running on port 3000");
});
