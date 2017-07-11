import { Component, OnInit, OnDestroy, NgZone, ElementRef } from '@angular/core';
import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';

@Component({
  selector: 'app-d3game',
  templateUrl: './d3game.component.html',
  styleUrls: ['./d3game.component.css']
})
export class D3gameComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private parentNativeElement: any;

  constructor(element: ElementRef, private ngZone : NgZone, d3Service: D3Service) {
	this.d3 = d3Service.getD3();
	this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
	// let self = this;
	// let d3 = this.d3;
	// let d3ParentElement: Selection<any, any, any, any>;
	// let idleTimeout: number | null;
	// let idleDelay: number;
	// var data = {
	// 	nodes: [
	// 		{id: 0, type: 'player'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'},
	// 		{id: 0, type: 'block'}
	// 	],
	// 	links: [
	//
	// 	]
	// };
	//
	// function ticked() {
	//   cx = parseFloat(dotty.attr("cx"));
	//   cy = parseFloat(dotty.attr("cy"));
	//
	//   link
	// 	.attr("x1", function(d) { return d.source.x; })
	// 	.attr("y1", function(d) { return d.source.y; })
	// 	.attr("x2", function(d) { return d.target.x; })
	// 	.attr("y2", function(d) { return d.target.y; });
	//
	//   dots
	// 	.attr("cx", function(d) { return d.x; })
	// 	.attr("cy", function(d) { return d.y; });
	//
	//   svg.transition().duration(50).call(zoom.transform, d3.zoomIdentity
	// 	  .translate(width / 2, height / 2)
	// 	  //.scale(8)
	// 	  .translate(-cx, -cy));
	//
	// }
	//
	// function zoomed() {
	//   view.attr("transform", d3.event.transform);
	// }
	//
	// function swallowNode() {
	//   var nodeIdx = data.links.pop();
	//   if (nodeIdx) {
	// 	console.log(nodeIdx);
	// 	console.log(nodeIdx.target.index);
	// 	var targX = nodeIdx.target.x;
	// 	var targY = nodeIdx.target.y;
	// 	data.nodes.splice(nodeIdx.target.index, 1);
	//
	// 	for (var i = 0; i < _.range(10).length; i++) {
	// 	  console.log(i);
	// 	  data.nodes.push({
	// 		id: 0,
	// 		type: 'block',
	// 		x: targX,
	// 		y: targY,
	// 	  });
	// 	}
	//   }
	//
	//   data.links = [];
	//
	//
	//   link = link.data(data.links);
	//   link.exit()
	//   .transition()
	// 	  .attr("stroke-opacity", 0)
	// 	  .attrTween("x1", function(d) { return function() { return d.source.x; }; })
	// 	  .attrTween("x2", function(d) { return function() { return d.target.x; }; })
	// 	  .attrTween("y1", function(d) { return function() { return d.source.y; }; })
	// 	  .attrTween("y2", function(d) { return function() { return d.target.y; }; })
	// 	.remove();
	//
	//   link = link.enter().append("line")
	// 	  .call(function(link) { link.transition().attr("stroke-opacity", 1); })
	// 	.merge(link);
	//
	//   dots = dots.data(data.nodes);
	//   dots.exit().transition().duration(2000).attr("cx", cx).attr("cy", cy).remove();
	//   dots = dots.enter()
	// 	  .append("circle")
	// 	  .attr("r", 10)
	// 	  .attr("cx", function(d) { return d.x; })
	// 	  .attr("cy", function(d) { return d.y; })
	// 	  .merge(dots);
	//
	//   simulation.nodes(data.nodes);
	//   simulation.force("link").links(data.links);
	//   simulation.alpha(0.1).restart();
	// }
	//
	// function transform() {
	//   console.log("called!");
	//   return d3.zoomIdentity
	// 	  .translate(width / 2, height / 2)
	// 	  .scale(8)
	// 	  .translate(-cx, -cy);
	// }
	//
	// function uniformRandomSampler(width, height, numSamplesMax) {
	//   var numSamples = 0;
	//   return function() {
	// 	if (++numSamples > numSamplesMax) return;
	// 	return [Math.random() * width, Math.random() * height];
	//   };
	// }
	//
	// function restart(point) {
	//
	//   pointsText.text(points)
	//   pointsText.append("span")
	// 	.style("vertical-align", "top")
	// 	.style("font-size", "15px")
	// 	.style("padding", "3px")
	// 	.text("POINTS");
	//
	//   // Apply the general update pattern to the links.
	//   link = link.data(data.links);
	//   link.exit().remove();
	//   link = link.enter().append("line").merge(link);
	//
	//    // Apply the general update pattern to the nodes.
	//   dots = dots.data(data.nodes);
	//   dots.exit().remove();
	//   dots = dots.enter().append("circle").attr("r", 10).merge(dots);
	//
	//   // Update and restart the simulation.
	//   simulation.nodes(data.nodes);
	//   simulation.force("link").links(data.links);
	//   simulation.alpha(1).restart();
	//   var invertPoint = transform.invert(point);
	//   console.log(transform.invert(invertPoint));
	//   //console.log("x: " + x + "y: " + y);
	//   //console.log("form: " + transform.translate(Math.floor(x), Math.floor(y)));
	// }
	//
	// if (this.parentNativeElement !== null) {
	//
	//   d3ParentElement = d3.select(this.parentNativeElement);
	//
	//   var width = 960,        // svg width
	// 	  height = 500,       // svg height
	// 	zoom = d3.zoom()
	// 			.on("zoom", zoomed)
	// 			.translateExtent([0,50])
	// 			.scaleExtent([[0,0],[10000, 10000]]),
	// 	  svg = d3ParentElement.append("svg")
	// 			.attr("height", height)
	// 			.call(zoom),
	// 	view = svg.append("g")
	// 		.attr("class", "view")
	// 		.attr("x", 0.5)
	// 		.attr("y", 0.5)
	// 		.attr("width", 10000)
	// 		.attr("height", 10000),
	// 	body = d3.select("body"),
	// 	speed = 100,
	// 	origCx,
	// 	origCy,
	// 	cx,
	// 	cy,
	// 	points = 0;
	//
	// 	var sample = uniformRandomSampler(10000, 10000, 50000);
	// 	var flip = true;
	//
	// 	for (var i = 0; i < 5000; ++i) {
	// 		var flip = !flip;
	// 		var randVal = Math.random();
	// 		var s = sample();
	// 		if (!s) break;
	// 		view.append("circle")
	// 			.attr("cx", s[0])
	// 			.attr("cy", s[1])
	// 			.attr("r", randVal * 5)
	// 			.style("opacity", randVal-0.05)
	// 			.style("fill", flip ? d3.interpolateMagma(randVal) : "#fff");
	// 	}
	//
	//
	// 	var link = view.append("g")
	// 		  .attr("class", "links")
	// 		.selectAll("line")
	// 		.data(data.links)
	// 		.enter().append("line")
	//
	// 	var dotsG = view.append("g")
	// 				.attr("class", "character");
	//
	// 	var dots = dotsG
	// 				.selectAll("circle")
	// 				.data(data.nodes)
	// 				.enter()
	// 				.append("circle")
	// 				.attr("r", "10")
	// 				.classed("player", function(d){ return d.type == 'player'; });
	//
	//
	//
	// 	var dotty = dotsG.select(d3.selector(".player"));
	// 	//var transform = d3.zoomTransform(svg.node());
	//
	// 	// document.addEventListener("keydown", move);
	//
	// 	// function move(e) {
	// 		// var cx = dotty.attr("cx");
	// 		// var cy = dotty.attr("cy");
	// 		// switch (e.keyCode) {
	// 			// case 37:
	// 				// dotty.attr("cx", cx -= 15);
	// 				// break;
	// 			// case 38:
	// 				// dotty.attr("cy", cy -= 15);
	// 				// break;
	// 			// case 39:
	// 				// cx = parseInt(cx);
	// 				// dotty.attr("cx", cx += 15);
	// 				// break;
	// 			// case 40:
	// 				// cy = parseInt(cy);
	// 				// dotty.attr("cy", cy += 15);
	// 				// break;
	// 			// default:
	// 				// break;
	// 				// // do nothing;
	// 		// }
	//
	// 	// }
	//
	//
	// 	var simulation = d3.forceSimulation(data.nodes);
	//
	// 	simulation.force("charge", d3.forceManyBody().strength(-50))
	// 				.force("center", d3.forceCenter(width /2, height /2))
	// 				.force("link", d3.forceLink().strength(0.01))
	// 				.on("tick", ticked);
	//
	// 	simulation.force("link").links(data.links);
	//
	// 	origCx = parseFloat(dotty.attr("cx"));
	// 	origCy = parseFloat(dotty.attr("cy"));
	//
	// 	var keysDown = {};
	//
	// 	document.addEventListener("keydown", function (e) {
	// 		keysDown[e.keyCode] = true;
	// 	}, false);
	//
	// 	document.addEventListener("keyup", function (e) {
	// 		keysDown[e.keyCode] = false;
	// 	  delete keysDown[e.keyCode];
	// 	}, false);
	//
	// 	var update = function(modifier) {
	// 		var cx = parseFloat(dotty.attr("cx"));
	// 		var cy = parseFloat(dotty.attr("cy"));
	// 		if (Object.keys(keysDown).length == 0) {
	// 			//do nothing;
	// 		}
	// 		if (keysDown[16]) {
	// 			if (keysDown[32]) {
	// 				swallowNode();
	// 			}
	// 		}
	// 		if (keysDown[37]) { // Player holding left
	// 			simulation.alphaTarget(0.3).restart();
	// 			//dotty.attr("cx", cx -= speed * modifier);
	// 			if (keysDown[32]) {
	// 				var hit = _.findIndex(data.nodes, function(o){ return (Math.abs(o.y - cy) <= 40) && (o.x < cx); });
	// 				if (hit > -1) {
	// 					if (data.links[0] && data.links[0].target != hit) points += 10;
	// 					data.links = []; data.links.push({source: 0, target: hit, value: 1});
	// 				}
	// 				console.log("orig: " + origCy + ", new: " + cy);
	// 				var yDiff = origCy - cy >= 0 ? origCy - cy : origCy + cy;
	// 				restart([origCx + cx, yDiff]);
	// 				origCx = cx;
	// 				origCy = cy;
	// 			}
	// 		}
	// 		if (keysDown[38]) { // Player holding up
	// 			simulation.alphaTarget(0.3).restart();
	// 			//dotty.attr("cy", cy -= speed * modifier);
	// 			if (keysDown[32]) {
	// 				var hit = _.findIndex(data.nodes, function(o){ return (Math.abs(o.x - cx) <= 40) && (o.y < cy); });
	// 				if (hit > -1) {
	// 					if (data.links[0] && data.links[0].target != hit) points += 10;
	// 					data.links = []; data.links.push({source: 0, target: hit, value: 1});
	// 				}
	// 				var xDiff = origCx - cx >= 0 ? origCx + cx : origCx - cx;
	// 				console.log(xDiff);
	// 				restart([xDiff, origCy + cy]);
	// 				origCx = cx;
	// 				origCy = cy;
	// 			}
	// 		}
	// 		if (keysDown[39]) { // Player holding right
	// 			simulation.alphaTarget(0.3).restart();
	// 			cx = parseFloat(cx);
	// 			//dotty.attr("cx", cx += speed * modifier);
	// 			if (keysDown[32]) {
	// 				var hit = _.findIndex(data.nodes, function(o){ return (Math.abs(o.y - cy) <= 40) && (o.x > cx); });
	// 				if (hit > -1) {
	// 					if (data.links[0] && data.links[0].target != hit) points += 10;
	// 					data.links = []; data.links.push({source: 0, target: hit, value: 1});
	// 				}
	// 				var yDiff = origCy - cy >= 0 ? origCy + cy : origCy - cy;
	// 				restart([cx, cy]);
	// 				origCx = cx;
	// 				origCy = cy;
	// 			}
	// 		}
	// 		if (keysDown[40]) { // Player holding down
	// 			simulation.alphaTarget(0.3).restart();
	// 			cy = parseFloat(cy);
	// 			//dotty.attr("cy", cy += speed * modifier);
	// 			if (keysDown[32]) {
	// 				var hit = _.findIndex(data.nodes, function(o){ return (Math.abs(o.x - cx) <= 40) && (o.y > cy); });
	// 				if (hit > -1) {
	// 					if (data.links[0] && data.links[0].target != hit) points += 10;
	// 					data.links = []; data.links.push({source: 0, target: hit, value: 1});
	// 				}
	// 				console.log("orig: " + origCy + ", new: " + cy);
	// 				var xDiff = origCx - cx >= 0 ? (origCx + cx + (width / 4)) : (origCx - cx - (width / 4));
	// 				var yDiff = origCy - cy - (width / 4);
	// 				console.log("xdiff: " + xDiff + ", yDiff: " + yDiff);
	// 				restart([xDiff, yDiff]);
	// 				origCx = cx;
	// 				origCy = cy;
	// 			}
	// 		}
	// 	};
	//
	//
	// 	var w = window;
	// 	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	//
	// 	// The main game loop
	// 	var main = function () {
	// 		var now = Date.now();
	// 		var delta = now - then;
	//
	// 		update(delta / 1000);
	//
	// 		then = now;
	//
	// 		// Request to do this again ASAP
	// 		simulation.tick();
	// 		requestAnimationFrame(main);
	// 	};
	//
	// 	// Let's play this game!
	// 	var then = Date.now();
	// 	main();
	//
	// 	var pointsText = body
	// 						.append("div")
	// 						.attr("class", "points")
	// 						.style("position", "absolute")
	// 						.style("top", "20px")
	// 						.style("left", "20px")
	// 						.text(points);
	// 	pointsText.append("span")
	// 			.style("vertical-align", "top")
	// 			.style("font-size", "15px")
	// 			.style("padding", "3px")
	// 			.text("POINTS");
	//
	//
	// }
  }

}
