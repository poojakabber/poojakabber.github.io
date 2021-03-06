var g_id = '6months';

function remove()
{
	var svg_elem = document.getElementsByTagName("svg");
	var n_svg = svg_elem.length;
	if(n_svg > 0){
	svg_elem[0].parentNode.removeChild(svg_elem[0]);}
		
	var q_elem = document.getElementById("question_div");
	if(q_elem > 0){
	q_elem.parentNode.removeChild(q_elem);}
}

function change(id = g_id)
{	

	remove();

	var analyst = $('input[name=measure]:checked', '.filter-items-list').attr('id');
	console.log(analyst);
	var checked = [];
	$.each($("input[name='MSFT']:checked"), function(){ checked.push($(this).attr('id')); });
	
	var json_url = '';
	var q_json_url = '';
	
	if (analyst == 'single_measure'){
		
		if (checked.includes("comp")){
			
			if (checked.includes("peer-chk"))
			{ 
				if (id == '6months') {g_id = id; json_url = 'https://poojakabber.github.io/data/heather_peer_6months.json'; q_json_url = 'https://poojakabber.github.io/data/heather_peer_6months_questions.json'; sunburst(json_url, q_json_url);}
				
				else if (id == '1year') {g_id = id; json_url = 'https://poojakabber.github.io/data/heather_peer_1year.json'; q_json_url = 'https://poojakabber.github.io/data/heather_peer_1year_questions.json'; sunburst(json_url, q_json_url);}
				
				else if (id == '2years') {g_id = id; json_url = 'https://poojakabber.github.io/data/heather_peer_2years.json'; q_json_url = 'https://poojakabber.github.io/data/heather_peer_2years_questions.json'; sunburst(json_url, q_json_url);}
				
			}
			
			else 
			{  
				if (id == '6months') {g_id = id; json_url = 'https://poojakabber.github.io/data/heather_6months.json'; q_json_url = 'https://poojakabber.github.io/data/heather_6months_questions.json'; sunburst(json_url, q_json_url);}
				
				else if (id == '1year') {g_id = id; json_url = 'https://poojakabber.github.io/data/heather_1year.json'; q_json_url = 'https://poojakabber.github.io/data/heather_1year_questions.json'; sunburst(json_url, q_json_url);}
				
				else if (id == '2years') {g_id = id; json_url = 'https://poojakabber.github.io/data/heather_2years.json'; q_json_url = 'https://poojakabber.github.io/data/heather_2years_questions.json'; sunburst(json_url, q_json_url);}
			
			}
			
		}
		
		else if (checked.includes("peer-chk")) 
		{
			if (id == '6months') {g_id = id; json_url = 'https://poojakabber.github.io/data/heather_peeronly_6months.json'; q_json_url = 'https://poojakabber.github.io/data/heather_peeronly_6months_questions.json'; sunburst(json_url, q_json_url);}
				
			else if (id == '1year') {g_id = id; json_url = 'https://poojakabber.github.io/data/heather_peeronly_1year.json'; q_json_url = 'https://poojakabber.github.io/data/heather_peeronly_1year_questions.json'; sunburst(json_url, q_json_url);}
				
			else if (id == '2years') {g_id = id; json_url = 'https://poojakabber.github.io/data/heather_peeronly_2years.json'; q_json_url = 'https://poojakabber.github.io/data/heather_peeronly_2years_questions.json'; sunburst(json_url, q_json_url);}
		}
	}
	
	else if (analyst == 'multiple_measure') {
		
		if (checked.includes("comp")){
			
			if (checked.includes("peer-chk"))
			{  
				if (id == '6months') {g_id = id; json_url = 'https://poojakabber.github.io/data/raimo_peer_6months.json'; q_json_url = 'https://poojakabber.github.io/data/raimo_peer_6months_questions.json'; sunburst(json_url, q_json_url);}
				
				else if (id == '1year') {g_id = id; json_url = 'https://poojakabber.github.io/data/raimo_peer_1year.json'; q_json_url = 'https://poojakabber.github.io/data/raimo_peer_1year_questions.json'; sunburst(json_url, q_json_url);}
				
				else if (id == '2years') {g_id = id; json_url = 'https://poojakabber.github.io/data/raimo_peer_2years.json'; q_json_url = 'https://poojakabber.github.io/data/raimo_peer_2years_questions.json'; sunburst(json_url, q_json_url);}
			}
			
			else 
			{  
				if (id == '6months') {g_id = id; json_url = 'https://poojakabber.github.io/data/raimo_6months.json'; q_json_url = 'https://poojakabber.github.io/data/raimo_6months_questions.json'; sunburst(json_url, q_json_url);}
				
				else if (id == '1year') {g_id = id; json_url = 'https://poojakabber.github.io/data/raimo_1year.json'; q_json_url = 'https://poojakabber.github.io/data/raimo_1year_questions.json'; sunburst(json_url, q_json_url);}
				
				else if (id == '2years') {g_id = id; json_url = 'https://poojakabber.github.io/data/raimo_2years.json'; q_json_url = 'https://poojakabber.github.io/data/raimo_2years_questions.json'; sunburst(json_url, q_json_url);}
			}
			
		}
		
		else if (checked.includes("peer-chk")) 
		{
			if (id == '6months') {g_id = id; json_url = 'https://poojakabber.github.io/data/raimo_peeronly_6months.json'; q_json_url = 'https://poojakabber.github.io/data/raimo_peeronly_6months_questions.json'; sunburst(json_url, q_json_url);}
				
			else if (id == '1year') {g_id = id; json_url = 'https://poojakabber.github.io/data/raimo_peeronly_1year.json'; q_json_url = 'https://poojakabber.github.io/data/raimo_peeronly_1year_questions.json'; sunburst(json_url, q_json_url);}
				
			else if (id == '2years') {g_id = id; json_url = 'https://poojakabber.github.io/data/raimo_peeronly_2years.json'; q_json_url = 'https://poojakabber.github.io/data/raimo_peeronly_2years_questions.json'; sunburst(json_url, q_json_url);}
		}
		
	}
	
}

function sunburst(json_url, q_json_url)
{
	console.log("in sunburst");
	
	const width = 1400,
            height = 920,
            maxRadius = (Math.min(width, height) / 2) - 5;
        const formatNumber = d3.format(',d');
        const x = d3.scaleLinear()
            .range([0, 2 * Math.PI])
            .clamp(true);
        const y = d3.scaleSqrt()
            .range([maxRadius*.1, maxRadius]);
        const color = d3.scaleOrdinal(d3.schemeCategory20);
        const partition = d3.partition();
        const arc = d3.arc()
            .startAngle(d => x(d.x0))
            .endAngle(d => x(d.x1))
            .innerRadius(d => Math.max(0, y(d.y0)))
            .outerRadius(d => Math.max(0, y(d.y1)));
        const middleArcLine = d => {
            const halfPi = Math.PI/2;
            const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
            const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
            const middleAngle = (angles[1] + angles[0]) / 2;
            const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
            if (invertDirection) { angles.reverse(); }
            const path = d3.path();
            path.arc(0, 0, r, angles[0], angles[1], invertDirection);
            return path.toString();
        };
        const textFits = d => {
            const CHAR_SPACE = 6;
            const deltaAngle = x(d.x1) - x(d.x0);
            const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
            const perimeter = r * deltaAngle;
            return d.data.name.length * CHAR_SPACE < perimeter;
        };
        const svg = d3.select('section').append('svg')
            .style('width', '60%')
            .style('height', '100%')
            .attr('viewBox', `${-width / 4} ${-height / 2} ${width / 2} ${height}`)
            .on('click', () => focusOn()); // Reset zoom on canvas click
			
		//$svg.css({top: 200, left: 200, position:'absolute'});
			
        d3.json(json_url, (error, root) => {
            if (error) throw error;
            root = d3.hierarchy(root);
            root.sum(d => d.size);
            const slice = svg.selectAll('g.slice')
                .data(partition(root).descendants());
            slice.exit().remove();
            const newSlice = slice.enter()
                .append('g').attr('class', 'slice')
                .on('click', d => {
                    d3.event.stopPropagation();
                    focusOn(d);
                    createDiv(d, q_json_url);
                });
            newSlice.append('title')
                .text(d => d.data.name + '\n' + formatNumber(d.value));
            newSlice.append('path')
                .attr('class', 'main-arc')
                .style('fill', d => color((d.children ? d : d.parent).data.name))
                .attr('d', arc);
            newSlice.append('path')
                .attr('class', 'hidden-arc')
                .attr('id', (_, i) => `hiddenArc${i}`)
                .attr('d', middleArcLine);
            const text = newSlice.append('text')
                .attr('display', d => textFits(d) ? null : 'none');
            // Add white contour
            text.append('textPath')
                .attr('startOffset','50%')
                .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
                .text(d => d.data.name)
                .style('fill', 'none')
                .style('stroke', '#fff')
                .style('stroke-width', 5)
                .style('stroke-linejoin', 'round');
            text.append('textPath')
                .attr('startOffset','50%')
                .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
                .text(d => d.data.name);
        });
		
		function focusOn(d = { x0: 0, x1: 1, y0: 0, y1: 1 }) {
            // Reset to top-level if no data point specified
	const transition = svg.transition()
		.duration(750)
		.tween('scale', () => {
			const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
				yd = d3.interpolate(y.domain(), [d.y0, 1]);
			return t => { x.domain(xd(t)); y.domain(yd(t)); };
		});
	
	transition.selectAll('path.main-arc')
		.attrTween('d', d => () => arc(d));
	transition.selectAll('path.hidden-arc')
		.attrTween('d', d => () => middleArcLine(d));
	transition.selectAll('text')
		.attrTween('display', d => () => textFits(d) ? null : 'none');
	moveStackToFront(d);
	//
	function moveStackToFront(elD) {
		svg.selectAll('.slice').filter(d => d === elD)
			.each(function(d) {
				this.parentNode.appendChild(this);
				if (d.parent) { moveStackToFront(d.parent); }
			})
	}
}
		
}

function error_fn(error){

		alert(error);
}

function createDiv(d, q_json_url){

var data_name = d.data.name;
console.log(data_name);

$.ajax({
	url: q_json_url,
	type: 'GET',
	data_name_ajax: data_name,
	dataType: "json",
	success: function(json_data)
	{
		console.log("Inside success")
		var div_elem_exists = document.getElementById("question_div");
		if (div_elem_exists)
		{
			div_elem_exists.remove();
		}
	
		var div_elem = document.createElement("div");
		div_elem.setAttribute("id", "question_div");
		div_elem.style.width = "30vw";
		div_elem.style.height = "130vh";
		div_elem.style.fontSize = "15px";
		div_elem.style.float = "right";
		div_elem.style.position = "relative";
		div_elem.style.right = "10px";
		data_array = json_data.children;
		
		//console.log(data_array)
		
		for(var j = 0; j < data_array.length; j++){
			// console.log("Inside first loop of data array");
			// console.log(data_array[j].name, this.data_name_ajax);
			if (data_array[j].name == this.data_name_ajax){
					console.log("If they match")
					data_array_questions = data_array[j].children;
					
					var c_ul = document.createElement("ul");
					c_ul.style.listStyleType = "disc";
					c_ul.style.marginTop = "10px";
					// c_ul.setAttribute('id', 'c_ul');
					
					for (var k = 0; k < data_array_questions.length; k++)
					{
						var c_ul_name = document.createElement("li");
						c_ul_name.style.listStyleType = 'disc';
						c_ul_name.style.marginTop = "10px";
						c_ul_name.innerHTML = data_array_questions[k].name;
						c_ul.appendChild(c_ul_name);
						
						var q_ul = document.createElement("ul");
						q_ul.style.listStyleType = 'disc';
						q_ul.style.marginTop = "10px";
						// q_ul.setAttribute('id', 'q_ul');
						
						for (var l = 0; l < data_array_questions[k].questions.length; l++)
						{
							var q_ul_question = document.createElement("li");
							q_ul_question.style.listStyleType = 'disc';
							q_ul_question.style.marginTop = "10px";
							q_ul_question.innerHTML = data_array_questions[k].questions[l];
							q_ul.appendChild(q_ul_question);
						}
						c_ul.appendChild(q_ul);
					}
					div_elem.appendChild(c_ul);
					var section_elem = document.getElementById("right-content");
					section_elem.appendChild(div_elem);
				
			};
		
		};
	},
	error: error_fn
});

}

$(document).ready(function () {

	console.log("loaded");
	var json_url = 'https://poojakabber.github.io/data/heather_6months.json'; 
	var q_json_url = 'https://poojakabber.github.io/data/heather_6months_questions.json';
	sunburst(json_url, q_json_url); 
   
});
