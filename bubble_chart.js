// closure - fn encapsulates all variables of the graph and sets the default values
function bubbleChart() {
	var width = 1960,
	height = 1960,
	marginTop = 96,
	minRadius = 12,
	maxRadius = 45,
	columnForColors = "category",
	columnForTitle = "title",
	columnForRadius = "views",
	forceApart = -250,
	unitName="times",
	customColors=false,
	customRange,
	customDomain,
	chartSelection,
	chartSVG,
	showTitleOnCircle=true;

	/**
	 * The command to actually render the chart after setting the settings.
	 * @public
	 * @param {string} selection - The div ID that you want to render in 
	 */
	function getTextWidth(text, font) {
		// re-use canvas object for better performance
		var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
		var context = canvas.getContext("2d");
		context.font = font;
		var metrics = context.measureText(text);
		return metrics.width;
	}

	function chart(selection) {
		var data = selection.datum();
		chartSelection=selection;
		var div = selection,
		svg = div.selectAll('svg');
		svg.attr('width', width).attr('height', height);
		chartSVG=svg;

		// defines tooltip and its attributes
		var tooltip = selection
		.append("div")
		.style("position", "absolute")
		.style("visibility", "hidden")
		.style("color", "white")
		.style("padding", "8px")
		.style("background-color", "#626D71")
		.style("border-radius", "6px")
		.style("text-align", "center")
		.style("font-family", "monospace")
		.style("width", "400px")
		.text("");


		// forceApart determines how far apart the circle will be. A positive value causes the circles to attract each other and negative value causes the circles to repel each other.
		// d3.forceX and d3.forceY have 0 or nothing as parameters so the circles don't spread over the whole svg space.
		// the force layout runs asynchronously. When force.start() is called, it starts doing its computations that determine the position of the nodes in parallel in the background.
		// d3.forceManyBody() keeps updating the x and y position of each node, and the the ticked() function updates the DOM with these values (the cx and cy attributes)
		var simulation = d3.forceSimulation(data)
		.force("charge", d3.forceManyBody().strength([forceApart]))
		.force("x", d3.forceX())
		.force("y", d3.forceY())
		.on("tick", ticked);

		function ticked(e) {
			node.attr("transform",function(d) {
				console.log('DATA D: ', d);
				console.log('D.X: ', d.x);
				console.log('D.Y: ', d.y);
				return "translate(" + [d.x+(width / 2), d.y+((height+marginTop) / 2)] +")";
			});
		}

		var colorCircles;
		if (!customColors) {
			colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
		} 
		else {
			colorCircles = d3.scaleOrdinal()
			.domain(customDomain)
			.range(customRange);
		}
	
		// the size of the circle is proportional to the views/times column. To get the min and max value of that column,
		// the + is a unary operator used to convert the following expression to a number
		var minRadiusDomain = d3.min(data, function(d) {
			return +d[columnForRadius];
		});
		var maxRadiusDomain = d3.max(data, function(d) {
			return +d[columnForRadius];
		});

		// domain takes the min and max values of the views/times column 
		// range determines the min and max values that the circle radii can be, that is the output values of the scale.
		var scaleRadius = d3.scaleLinear()
		.domain([minRadiusDomain, maxRadiusDomain])
		.range([minRadius, maxRadius])

		// creates the circles
		// Here it says, I want as many circles as the number of elements in data and enter returns the selection (of divs) with the data bound to them and this selection is added to the DOM using append
		// transform moves the circle to the middle of the svg, half the width and height.
		var node = svg.selectAll("circle")
		.data(data)
		.enter()
		.append("g")
		.attr('transform', 'translate(' + [width / 2, height / 2] + ')')
		.style('opacity',1);
			
		node.append("circle")
		.attr("id",function(d,i) {
			return i;
		})
		.attr('r', function(d) {
			return scaleRadius(d[columnForRadius]);
		})
		.style("fill", function(d) {
			return colorCircles(d[columnForColors]);
		})
		.on("mouseover", function(d) {
			tooltip.html(d[columnForTitle] + "<br/>" + d[columnForColors] + "<br/>" + d[columnForRadius] + " "+ unitName);
			return tooltip.style("visibility", "visible");
		})
		//The mousemove follows the cursor when the mouse is moving. d3.event.pageX and d3.event.pageY return the mouse coordinates
		.on("mousemove", function() {
			return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
		})
		.on("mouseout", function() {
			return tooltip.style("visibility", "hidden");
		});
		node.append("clipPath")
		.attr("id",function(d,i) {
			return "clip-"+i;
		})
		.append("use")
		.attr("xlink:href",function(d,i) {
			return "#" + i;
		});
		if (showTitleOnCircle) {
			node.append("text")
			.attr("clip-path",function(d,i) {
				return "url(#clip-" + i + ")"
			})
			.attr("text-anchor", "middle")
			.append("tspan")
			.attr("x",function(d) {
				return 0;//-1*scaleRadius(d[columnForRadius])/3;
			})
			.attr("y",function(d) {
				return ".3em";//scaleRadius(d[columnForRadius])/4;
			})
			.text(function(d) {
				var text_width = getTextWidth(d[columnForColors], "bold 6px arial");
				console.log('Before if statement text_width: '+text_width+' radius: '+scaleRadius(d[columnForRadius]));
				if (text_width < scaleRadius(d[columnForRadius])) {
					console.log('In if statement text_width: '+text_width+' radius: '+scaleRadius(d[columnForRadius]));
					return d[columnForColors];
				}
				return;
			})
			.on("mouseover", function(d) {
				tooltip.html(d[columnForTitle] + "<br/>" + d[columnForColors] + "<br/>" + d[columnForRadius] + " "+ unitName);
				return tooltip.style("visibility", "visible");
			})
			.on("mousemove", function() {
				return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
			})
			.on("mouseout", function() {
				return tooltip.style("visibility", "hidden");
			});
		}

		svg.append('text')
			.attr('x',width/2).attr('y',marginTop)
			.attr("text-anchor", "middle")
			.attr("font-size","1.8em");
			// .text(title);
	}

	// properties set to accessors
	chart.width = chartWidth;
	chart.height = chartHeight;
	chart.columnForColors = chartColForColors;
	chart.columnForRadius = chartColForRadius;
	chart.columnForTitle = chartColForTitle;
	chart.minRadius = chartMinRadius;
	chart.maxRadius = chartMaxRadius;
	chart.forceApart = chartForceApart;
	chart.unitName = chartUnitName;
	chart.customColors = chartCustomColors;
	chart.showTitleOnCircle = chartShowTitleOnCircle;
	chart.title=chartTitle;
	chart.remove = chartRemove;

	/**
	 * Get/set the height of the chart
	 * Use 'chart.width' to get or set. 
	 * @example
	 * chart.columnForColors(960);	// Sets the width of the SVG to 960
	 * chart.columnForColors();	// returns 960
	 * 
	 * @public
	 * @param {number} [value] - The width of the chart 
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartWidth(value) {
		if (!arguments.length) {
			return width;
		}
		width = value;
		return chart;
	};

	/**
	 * Get/set the height of the chart.
	 * Use 'chart.height' to get or set. 
	 * @example
	 * chart.height(960);	// Sets the height of the SVG to 960
	 * chart.height();		// returns 960
	 * 
	 * @public
	 * @param {number} [value] - The height of the chart
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartHeight(value) {
		if (!arguments.length) {
			return height;
		}
		height = value;
		marginTop=0.05*height;
		return chart;
	};


	/**
	 * Get/set the property used to determine the colors of the bubbles. 
	 * Use 'chart.columnForColors' to get or set. 
	 * @example
	 * chart.columnForColors("Sex");	// Sets the column to birthCount
	 * chart.columnForColors();	// returns "Sex"
	 * @public
	 * @param {string} [value] - Property name to bind the bubble color to.
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartColForColors(value) {
		if (!arguments.length) {
			return columnForColors;
		}
		columnForColors = value;
		return chart;
	};
	
	/**
	 * Get/set the property to determine the titles of the bubbles.
	 * Use 'chart.columnForTitle' to get or set. 
	 * @example
	 * chart.columnForTitle("Name");	// Sets the column to birthCount
	 * chart.columnForTitle();		// returns "Name"
	 * 
	 * @param {string} [value] - Property name to bind the bubble title to.
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartColForTitle(value) {
		if (!arguments.length) {
			return columnForTitle;
		}
		columnForTitle = value;
		return chart;
	};

	/**
	 * Get/set the property to determine the radii of the bubbles.
	 * Use 'chart.columnForRadius' to get or set. 
	 * 
	 * @example
	 * chart.columnForRadius("birthCount");	// Sets the column to birthCount
	 * chart.columnForRadius();		// returns "birthCount"
	 * @public
	 * @param {string} [value] - Property name to bind the bubble radius to. Requires a numerical property.
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartColForRadius (value) {
		if (!arguments.length) {
			return columnForRadius;
		}
		columnForRadius = value;
		return chart;
	};
	
	/**
	 * Get/set the minimum radius of the bubbles.
	 * Use 'chart.minRadius' to get or set. 
	 * @example
	 * 	chart.columnForColors(3); 	// Sets the column to birthCount
	 *  chart.columnForColors();	// returns 3
	 * 
	 * @param {number} [value] - The minimum radius for the width of the bubbles
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartMinRadius(value) {
		if (!arguments.length) {
			return minRadius;
		}
		minRadius = value;
		return chart;
	};
	
	/**
	 * Get/set the maximum radius of the bubbles.
	 * Use 'chart.maxRadius' to get or set.
	 * 
	 * @public
	 * @param {number} [value] - The maximum radius of the bubbles for the largest value in the dataset
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartMaxRadius(value) {
		if (!arguments.length) {
			return maxRadius;
		}
		maxRadius = value;
		return chart;
	};
	
	/**
	 * Get/set the unit name for the property the is represented by the radius of the bubbles. 
	 * Used in the tooltip of the bubbles.
	 * Use 'chart.unitName' to get or set.
	 * @example
	 * chart.unitName(" babies");	// Sets the column to birthCount
	 * chart.unitName();		// returns " babies"
	 * 
	 * @public
	 * @param {any} [value] - The unit name to display on the tooltip when hovering over a bubble
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartUnitName(value) {
		if (!arguments.length) {
			return unitName;
		}
		unitName = value;
		return chart;
	};
	
	/**
	 * Get/set the force the separates and pushes together the bubbles on loading of the chart
	 * Use 'chart.forceApart' to get or set.
	 * @example
	 * chart.forceApart(150);	// Sets the column to birthCount
	 * chart.forceApart();	// returns 150
	 * 
	 * @public
	 * @param {any} [value] - Determines the force to separate the bubbles from each other when loading the chart
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartForceApart(value) {
		if (!arguments.length) {
			return forceApart;
		}
		forceApart = value;
		return chart;
	};
	
	/**
	 * Get/set the property that determines if we show or hide the title of the data on the bubbles.
	 * Use 'chart.showTitleOnCircle' to get or set.
	 * @example
	 * chart.showTitleOnCircle(true); 	
	 * chart.forceApart();	// returns true
	 * 
	 * @public
	 * @param {boolean} [value] - Determines whether to show or hide the title of the data on the bubbles
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartShowTitleOnCircle(value) {
		if (!arguments.length) {
			return showTitleOnCircle;
		}
		showTitleOnCircle = value;
		return chart;
	};
	
	/**
	 * Set the domain and range of the colors used for the bubbles. This is only needed if you want to use custom colors in the chart.
	 * Use 'chart.customColors' to set.
	 * @example
	 * chart.customColors(["M","F"], ["#70b7f0","#e76486"]); 	// Sets the custom colors domain and range
	 * 
	 * @param {any[]} domain - The domain. This is the set of categories used for binding the colors.
	 * @param {string[]} range - The range. This is an array of color codes that you want to represent each category in the domain.
	 * 							 Note: The length of the array must perfectly match the length of the domain array.
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartCustomColors(domain,range) {
		customColors=true;
		customDomain=domain;
		customRange=range;
		return chart;
	};
	
	/**
	 * Get/set the property that determines the title of the chart.
	 * Use 'chart.title' to get or set.
	 * @example
	 * chart.title("Birth Count in the U.S. in 2016"); // Sets the chart title
	 * chart.title();	// returns "Birth Count in the U.S. in 2016"
	 * @public
	 * @param {string} value - The title of the chart
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartTitle(value) {
		if (!arguments.length) {
			return title;
		}
		title = value;
		return chart;
	}
	
	/**
	 * Animate the removal of data from the chart (and the title)
	 * @public
	 * @param {function} [callback] - At the end of each node animation call this function for each node
	 * @returns function - Chart, allowing chaining of commands
	 */
	function chartRemove(callback) {
		chartSVG.selectAll("text")
		.style("opacity",1)
		.transition()
		.duration(500)
		.style("opacity", "0")
		.remove();	
		if (!arguments.length) {	
			chartSVG.selectAll("g")
			.style("opacity",1)
			.transition()
			.duration(500)
			.style("opacity", "0")
			.remove();		
		}
		else {			
			chartSVG.selectAll("g")
			.style("opacity",1)
			.duration(500)
			.style("opacity", "0")
			.remove()
			.on("end", callback);
		}
		return chart;
	}

	return chart;
}
