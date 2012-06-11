/**
 *  Copyright 2012 Alma Madsen
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

goog.provide('bc.view.Stamp');

goog.require('bc.model.Stamp');
goog.require('bc.object');

/**
 * @param {bc.model.Stamp} model
 * @constructor
 */
bc.view.Stamp = function(model) {
	this.model = model;
	this.padding = 10;
	
	/** @type {?Object} */
	this.drawProperties = null;
	/** @type {?Object} */
	this.locationProperties = null;
	
	this.canvas = $('<canvas width="' + (this.model.w + 2*this.padding) + '" + height="' + (this.model.h + 2*this.padding) + '"></canvas>')
		.css({ 'position': 'absolute' });
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string=} color
 * @param {number=} lineWidth
 */
bc.view.Stamp.prototype.draw = function(ctx, color, lineWidth) {}

/**
 * @param {number=} pageScale
 */
bc.view.Stamp.prototype.updateLocation = function(pageScale) {
	pageScale = pageScale || 1;
	
	var scale = pageScale*this.model.scale,
		canvasWidth = Math.round(scale*this.model.w) + 2*this.padding,
		canvasHeight = Math.round(scale*this.model.h) + 2*this.padding;
	
	this.canvas.css({
		'left': Math.round(pageScale*this.model.x - canvasWidth/2) + 'px',
		'top': Math.round(pageScale*this.model.y - canvasHeight/2) + 'px'
	});
}

/**
 * @param {number=} pageScale
 * @param {boolean=} selected
 */
bc.view.Stamp.prototype.render = function(pageScale, selected) {
	pageScale = pageScale || 1;
	
	// get total scale (individual scale of stamp times page scale)
	var scale = pageScale*this.model.scale;
	
	var drawProperties = {
		w: this.model.w,
		h: this.model.h,
		color: this.model.color,
		alpha: this.model.alpha,
		scale: scale,
		selected: selected
	};
	
	var locationProperties = {
		x: this.model.x,
		y: this.model.y,
		w: this.model.w,
		h: this.model.h,
		scale: scale
	}
	
	// if something has changed since last rendering that will affect rendering, 
	// redraw the stamp
	if (!bc.object.areEqual(drawProperties, this.drawProperties)) {
		this.drawProperties = drawProperties;
		
		var ctx = this.canvas.get(0).getContext('2d'),
			canvasWidth = Math.round(scale*this.model.w) + 2*this.padding,
			canvasHeight = Math.round(scale*this.model.h) + 2*this.padding;
		
		ctx.canvas.width = canvasWidth;
		ctx.canvas.height = canvasHeight;
		
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		
		ctx.save();
		ctx.translate(this.padding, this.padding);
		ctx.scale(scale, scale);
		ctx.lineCap = 'round';
		
		if (selected) {
			ctx.save();
			this.draw(ctx, 'palegoldenrod', this.model.lineWidth + 10);
			ctx.restore();
		}
		else {
			ctx.save();
			this.draw(ctx, bc.color.highContrastWhiteOrBlack(this.model.color, .5), this.model.lineWidth + 2);
			ctx.restore();
		}
		
		this.draw(ctx);
		
		ctx.restore();
	}
	
	// if the location or size has changed, update the location
	if (!bc.object.areEqual(locationProperties, this.locationProperties)) {
		this.locationProperties = locationProperties;

		this.updateLocation(pageScale);
	}
}
