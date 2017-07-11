const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = require("bluebird");
const request = require('request');
const cheerio = require('cheerio');
const translate = require('google-translate-api');


var CEDict = require('../models/cedict');

var getResultCount = function(char) {
	return CEDict.aggregate(
		[
			{$match: {$or: [
				{simp: {$regex: char}},
				{trad: {$regex: char}},
				{definition: {$regex: char}},
				{pinyin: {$regex: char}}
			]}},
			{$count: "totalResults"}
		]
	);
};
var charQuerySorted = function(char, pagination) {
	return CEDict.aggregate(
		[
			{$match: {$or: [
				{simp: {$regex: char}},
				{trad: {$regex: char}},
				{definition: {$regex: char}},
				{pinyin: {$regex: char}}
			]}},
			{$project: {
				"simp": 1,
				"trad": 1,
				"pinyin": 1,
				"definition": 1,
				"simp_length": { $strLenCP: "$simp" }
			}},
			{$sort: {"simp_length": 1}},
			{$skip: ((pagination.page-1)*pagination.skip)},
			{$limit: parseInt(pagination.skip)},
			{$project: {"simp_length": 0}},
		]
	);
};

router.get('/cedict/:searchStr', (req, res) => {
	var searchStr = '.*'+req.params.searchStr+'.*';
	var page = req.query.page;
	var pageSize = req.query.pageSize;
	console.log("str: " + searchStr + ", page: " + page + ", size: " + pageSize);
	var results = charQuerySorted(new RegExp(searchStr), {page: page, skip: pageSize})
		.then(function(results){
			getResultCount(new RegExp(searchStr)).then(function(total){
				var totalResults = total[0] ? total[0].totalResults : 0;
				var numPages = Math.ceil(totalResults / pageSize);
				var pagination = {
					page: page,
					pageSize: pageSize,
					totalResults: totalResults,
					numPages: numPages,
					searchStr: req.params.searchStr
				};
				var resObj = {results: results, pagination: pagination};
				console.log(resObj);
				res.json(resObj);
			});
		})
		.catch(function(err) {
			throw err;
		});
});

router.get('/lookupVOA/:term', function(req, res){

	var term = req.params.term;

	url = 'http://www.voachinese.com/s?k='+encodeURIComponent(term);

	request(url, function(error, response, html){

		if(!error){
			var $ = cheerio.load(html);

			var title, release, rating;
			var json = { title : "", body : "", link : ""};

			var matchedArticles = $('div#content').find('ul#searchItems');
			var firstArticle = matchedArticles.children().first();
			json.title = firstArticle.find('.title').text();
			json.body = firstArticle.find('p').html();
			json.bodyText = firstArticle.find('p').text();
			json.link = 'https://www.voachinese.com' + firstArticle.find('a').attr('href');
			res.json(json);
		} else {
			console.log(error);
		}
	})
});

module.exports = router;
