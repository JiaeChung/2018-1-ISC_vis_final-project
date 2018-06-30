d3.select('#final_project1').append('h4').text('Human Capital Index and Global Gender Gap Index')
  .attr('class', 'subtitle')


d3.select('#final_project1').append('p').text('우선적으로 인적 자본 지수(Human Capital Index)와 성 격차 지수(Global Gender Gap Index) 간의 상관관계를 보고자 한다. 이를 통해, 전세계적으로 인적 자본 지수와 성 격차 지수 간에 높은 상관관계가 있음을 확인할 수 있으며, 지역별 상관관계가 상이하게 나타남을 알 수 있다. 왼쪽 그래프의 각각의 원은 국가를 나타내며 GDP는 국가별 GDP의 크기를 나타낸다. 오른쪽 그래프는 국가별 인적 자본 지수와 성 격차 지수 순위 간의 상관관계를 나타낸다. 색상은 지역 구분을 나타내며, legend를 클릭시 지역별 보기가 가능하다.')
  .attr('class', 'contents')

  

/* button */
var buttonGroup = d3.select('#final_project1').append('g').attr('class', 'buttonGoup')
buttonGroup.append('div')
  .text('Show All')
  .attr('class', 'subButton')
  .attr('id', 'all')
buttonGroup.append('div')
  .text('MIDDLE EAST AND NORTH AFRICA')
  .attr('class', 'subButton')
  .attr('id', 'MENA')
buttonGroup.append('div')
  .text('WESTERN EUROPE')
  .attr('class', 'subButton')
  .attr('id', 'WE')
buttonGroup.append('div')
  .text('EAST ASIA AND THE PACIFIC')
  .attr('class', 'subButton')
  .attr('id', 'EAP')
buttonGroup.append('div')
  .text('NORTH AMERICA')
  .attr('class', 'subButton')
  .attr('id', 'NA')
buttonGroup.append('div')
  .text('EASTERN EUROPE AND CENTRAL ASIA')
  .attr('class', 'subButton')
  .attr('id', 'EECA')
buttonGroup.append('div')
  .text('LATIN AMERICA AND THE CARIBBEAN')
  .attr('class', 'subButton')
  .attr('id', 'LAC')
buttonGroup.append('div')
  .text('SUB-SAHARAN AFRICA')
  .attr('class', 'subButton')
  .attr('id', 'SSA')
buttonGroup.append('div')
  .text('SOUTH ASIA')
  .attr('class', 'subButton')
  .attr('id', 'SA')


  //왼쪽 그래프의 각각의 원은 국가를 나타내며 GDP는 국가별 GDP의 크기를 나타낸다. 오른쪽 그래프는 국가별 인적 자본 지수와 성 격차 지수 순위 간의 상관관계를 나타낸다. 색상은 지역 구분을 나타내며, legend를 클릭시 지역별 보기가 가능하다.

d3.csv('WEF_global_final_in.csv', row)
  .then(callback)

function row(d) {
    for(var k in d) {
      if(d.hasOwnProperty(k) && k !== 'Region' && k !== 'country') d[k] = +d[k];
    }
    return d;
}

function callback(data) {
  var w = 500, h = 500;
  var margin = {top:20, right:30, bottom: 20, left: 20};
  var innerW = w - margin.right - margin.left,
      innerH = h - margin.top - margin.bottom;
  var svg = d3.select('#final_project1').append('svg')
    .attr('width', w)
    .attr('height', h)
    .append('g')
    .attr('transform', 'translate('+ [margin.left, margin.top] + ')');
  
  /* scale */  
  var xDomain = [30, 90];
  var yDomain = [0.4, 1]

  var x = d3.scaleLinear().domain(xDomain).range([0, innerW])
  var y = d3.scaleLinear().domain(yDomain).range([innerH, 0])
  
  //color
  var regionDomain = []
  data.forEach(function(d) {
    if(regionDomain.indexOf(d.Region) < 0) regionDomain.push(d.Region);
  })
  var colorRange = []
  var color = d3.scaleOrdinal().domain(regionDomain)
    .range([d3.rgb("#f6bc41"),d3.rgb("#babc31"),d3.rgb("#559f3e"),d3.rgb("#188659"),d3.rgb("#1e93a8"),d3.rgb("#25659d"),d3.rgb("#483ca3"),d3.rgb("#7b3ca3")]);
  console.log(regionDomain)

  //radius
  var rDomain = d3.extent(data, function(d){return d.GDP});
  console.log(rDomain)
  var r = d3.scaleLinear().domain(rDomain).range([3,25]);

  var xy = d3.local();

  /* transition */
  var t = d3.transition()
    .duration(800)
    .ease(d3.easeElastic);

  /* axis */
  var xAxis = d3.axisBottom(x)
  .ticks(5)
  .tickSizeInner(-innerH);
  svg.append('g')
    .attr('class', 'x axis')
    .call(xAxis)
    .attr('transform', 'translate('+[margin.left, innerH]+')') ////안짤리도록 조정
  .append('text')
    .attr('class', 'label')
    .attr('x', innerW)
    .attr('y', -margin.left/4)
    .style('text-anchor', 'end')
    .text('Human Capital Index(0-100 scale)')
    .style('fill', 'black') 

  var yAxis = d3.axisLeft(y)
    .tickSizeOuter(0)
    .ticks(5)
    .tickSizeInner(-innerW);
  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .attr('transform', 'translate('+[margin.left, 0]+')') ////안짤리도록 조정
  .append('text')
    .attr('class', 'label')
    .attr('transform', 'rotate(-90)')
    .attr('y', 10)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Global Gender Gap Index(0.0-1.0 scale)')
    .style('fill', 'black') 
  
  var circle = svg.selectAll('circle')
    .data(data)
    .enter().append('g')
    .attr('class', 'circle')
  
  circle.append('circle')
    .attr('r', function(d){return r(d.GDP)})
    .style('fill', function(d){return color(d.Region)})
    .style('stroke', 'black')
    .style('stroke-width', 0.4+'px')
    .attr('transform', 'translate('+[margin.left, 0]+')'); //안짤리도록 조정
  
  circle.each(function(d) {
    xy.set(this, [x(d.OVERALL_INDEX_HC), y(d.OVERALL_INDEX_GGI)]);
  })
  .attr('transform', function(d) {
    var pos = xy.get(this)
    return 'translate(' + pos + ')'
  })


  
  /* Parallel Coordinates */
  var wPC = 350, hPC = 500;
  var marginPC = {top:20, right:200, bottom: 20, left: 50};
  var innerWPC = wPC - marginPC.right - marginPC.left,
    innerHPC = hPC - marginPC.top - marginPC.bottom;

  var xAxisPC = d3.axisBottom().tickSize(0).tickPadding(-8);
  var yAxisPC = d3.axisLeft();

  var xPC = d3.scalePoint().range([0, innerWPC]).padding(0.04);
  var yPC = {} // yscale

  var line = d3.line()
    .x(function(d){return d.x})
    .y(function(d){return d.y;});
  var svgPC = d3.select('#final_project1').append('svg')
    .attr('class', 'svgPC')
    .attr('width', wPC)
    .attr('height', hPC)
  .append('g')
    .attr('transform', 'translate('+ [marginPC.left, marginPC.top] + ')');
  
  var headers = data.columns.slice(3,5);
  headers = headers.map(function(h) {
    var domain = d3.extent(data, function(d){return d[h];});
    return {name:h, domain:domain};
  });
  
  console.log(headers)


  headers.forEach(function(h) {
    yPC[h.name] = d3.scaleLinear().domain(h.domain).range([0, innerHPC]);
  });
  xPC.domain(headers.map(function(d){return d.name;}));
  
  function series(d) {
    return xPC.domain().map(function(h) {
      return {x:xPC(h), y:yPC[h](d[h])}
    });
  }
  
  svgPC.selectAll('.series')
    .data(data)
    .enter().append('g')
    .attr('class', 'series')
    .style('stroke', function(d){return color(d.Region)})
    .selectAll('path')
    .data(function(d){return [series(d)]})
    .enter().append('path')
    .attr('d', line)
    .style('stroke-width', 0.7+'px')

  svgPC.selectAll('.y.axisPC')
    .data(headers, function(d){return d.name})
    .enter().append('g')
    .attr('class', 'y axisPC')
    .attr('transform', function(d) {return 'translate(' + [xPC(d.name), 0] + ')';}) //축을 x 스케일을 이용해 이동
    .each(function(d) {
      yAxisPC.scale(yPC[d.name]);
      d3.select(this).call(yAxisPC);
    })
  xAxisPC.scale(xPC);
  svgPC.append('g')
    .attr('class', 'x axisPC')
    .call(xAxisPC);



  /* legend */
  var chipHeight = 12;
  var chipPadding = 2;
  var legendHeight = 16;
  var legendPadding = 4;
  var legend = svgPC.append('g')
    .attr('class', 'legend-g')
    .attr('transform', 'translate('+ [innerWPC + legendHeight, legendHeight] + ')')
    .selectAll('.legend')
    .data(color.domain())
    .enter().append('g')
    .attr('transform', function(d,i){
    return 'translate(' + [0, i *(legendHeight + legendPadding)]+ ')'
    })
  legend.append('rect')
    .attr('y', chipPadding)
    .attr('width', chipHeight).attr('height', chipHeight)
    .style('fill', function(d){return color(d)})
  legend.append('text')
    .attr('x', chipPadding + chipHeight)
    .attr('y', chipPadding)
    .attr('dy', '.9em')
    .style('font-size', legendHeight-7 + 'px')
    .text(function(d){return d})

  /*legend interaction*/
  var filterValues = regionDomain;
  legend.selectAll('rect').on('click', function(e) {
    var hide = false;
    var newFilters = [];
    filterValues.forEach(function(f) {
      if (f === e) {
        hide = true;
      } else {
        newFilters.push(f);
      }
    });
    if(hide) {
      d3.select(this).style('opacity', 0.1);
      filterValues = newFilters;
      console.log(filterValues)
      d3.selectAll('circle')
        .filter(function(j) {return filterValues.indexOf(j.Region) < 0})
        .attr('opacity', 0.1)
      d3.selectAll('.series')
        .filter(function(j){return filterValues.indexOf(j.Region) < 0})
        .attr('opacity', 0.1)
    } else {
      newFilters.push(e);
      d3.select(this).style('opacity', 1);
      filterValues = newFilters;
      console.log(filterValues)
      d3.selectAll('circle')
      .filter(function(j) {return filterValues.indexOf(j.Region) >= 0})
      .attr('opacity', 1)
      d3.selectAll('.series')
        .filter(function(j){return filterValues.indexOf(j.Region) >= 0})
        .attr('opacity', 1)
    }
  })
  
  /* scatter plot tooltip */ 
  circle.on('mouseenter', function(d) {
    var hoverNot = circle.filter(function(p) {return d.OVERALL_INDEX_HC === p.OVERALL_INDEX_HC && d.OVERALL_INDEX_GGI === p.OVERALL_INDEX_GGI})
    .classed('hoverNot', true)
    var hover = circle.filter(function(p) {return d.OVERALL_INDEX_HC != p.OVERALL_INDEX_HC || d.OVERALL_INDEX_GGI != p.OVERALL_INDEX_GGI})
    .classed('hover', true);
    var valueLine = svg.append('g')
      .data(hoverNot.data())
    valueLine.append('line')
      .attr('class', 'valueLine')
      .attr('x1', x(d.OVERALL_INDEX_HC))
      .attr('x2', x(d.OVERALL_INDEX_HC))
      .attr('y1', y(d.OVERALL_INDEX_GGI)+r(d.GDP)+1.2)
      .attr('y2', innerH)
      .style('stroke', 'black')
      .style("stroke-dasharray", ("3, 3"))
      .attr('transform', 'translate('+[margin.left, 0]+')') ////안짤리도록 조정
    valueLine.append('text')
      .attr('class', 'valueLine')
      .attr('x', x(d.OVERALL_INDEX_HC)-14)
      //.attr('dx', '.35em')
      .attr('y', innerH+10)
      .style('visibility', 'visible')
      .text(function(d){return d.OVERALL_INDEX_HC})
      .style('font-size', legendHeight-5 + 'px')
      .style('font-weight', 400)
      .attr('transform', 'translate('+[margin.left, 0]+')') ////안짤리도록 조정

      
    var valueLine2 = svg.append('g')  
      .data(hoverNot.data())
    valueLine2.append('line')
      .attr('class', 'valueLine2')
      .attr('x1', margin.left)
      .attr('x2', x(d.OVERALL_INDEX_HC)+margin.left-r(d.GDP)-1.2)
      .attr('y1', y(d.OVERALL_INDEX_GGI))
      .attr('y2', y(d.OVERALL_INDEX_GGI))
      .style('stroke', 'black')
      .style("stroke-dasharray", ("3, 3"))
    valueLine2.append('text')
      .attr('class', 'valueLine2')
      .attr('x', margin.left-5)
      .attr('dx', '.25em')
      .attr('y', y(d.OVERALL_INDEX_GGI))
      .style('visibility', 'visible')
      .text(function(d){return d.OVERALL_INDEX_GGI})
      .style('font-size', legendHeight-5 + 'px')
      .style('font-weight', 400)
      .style('text-anchor', 'end')


    var tooltip = svg.append('g')
      .data(hoverNot.data())
    tooltip.append('circle')
      .attr('class', 'tooltipOutCircle')
      .attr('cx', function(d){return x(d.OVERALL_INDEX_HC)})
      .attr('cy', function(d){return y(d.OVERALL_INDEX_GGI)})
      .attr('r', function(d){return r(d.GDP)+6})
      .style('stroke', function(d){return color(d.Region)})
      .style('stroke-width', 5)
      .style('fill', 'none')
      .attr('transform', 'translate('+[margin.left, 0]+')'); //안짤리도록 조정
    tooltip.append('circle')
      .attr('class', 'tooltipOutCircle')
      .attr('cx', function(d){return x(d.OVERALL_INDEX_HC)})
      .attr('cy', function(d){return y(d.OVERALL_INDEX_GGI)})
      .attr('r', function(d){return r(d.GDP)})
      .style('stroke', function(d){return color(d.Region)})
      .style('fill', 'none')
      .attr('transform', 'translate('+[margin.left, 0]+')'); //안짤리도록 조정
    tooltip.append('text')
      .attr('class', 'tooltip')
      .attr('x', function(d){return x(d.OVERALL_INDEX_HC)+margin.left-2})
      .attr('dx', '.35em')
      .attr('y', function(d){return y(d.OVERALL_INDEX_GGI)-r(d.GDP)-2})
      .style('visibility', 'visible')
      .text(function(d){return d.country})
      .style('font-size', legendHeight-3 + 'px')
      .style('font-weight', 200)
    
    /* parallel coordinates tooltip interaction */
    var hoverNotLine = d3.selectAll('.series').filter(function(p) {return d.OVERALL_INDEX_HC === p.OVERALL_INDEX_HC && d.OVERALL_INDEX_GGI === p.OVERALL_INDEX_GGI})
    .classed('hoverNot', true)
    .style('stroke-width', 1+'px')

    var hoverLine = d3.selectAll('.series').filter(function(p) {return d.OVERALL_INDEX_HC != p.OVERALL_INDEX_HC || d.OVERALL_INDEX_GGI != p.OVERALL_INDEX_GGI})
    .classed('hover', true)

    var tooltipLine = svgPC.append('g')
      .data(hoverNot.data())
      .attr('class', 'tooltipLine')
    tooltipLine.append('rect')
      .attr('x', innerWPC + legendHeight)
      .attr('y', 200)
      .attr('width', legendHeight*8 + legendPadding*3)
      .attr('height', legendHeight*4 + legendPadding*3)
      .attr('fill', '#f1f1f1')
      .style('opacity', 1)
      .style('stroke-width', 1+'px')
      .style("stroke-dasharray", ("3, 3"))

    tooltipLine.append('text')
      .attr('x', innerWPC + legendHeight+2)
      .attr('y', 200+legendHeight*1)
      //.attr('y', function(d){return (yHCTooltipLine(d.GGGI)+yHCTooltipLine(d.HUMANCAPITAL))/2-10-3*(legendHeight)})
      .attr('dy', '.9em')
      .style('font-size', legendHeight-3 + 'px')
      .text(function(d){return d.country})
      .style('font-weight', 700)
    tooltipLine.append('text')
      .attr('x', innerWPC + legendHeight+2)
      .attr('y', 200+legendHeight*2)
      //.attr('y', function(d){return (yHCTooltipLine(d.GGGI)+yHCTooltipLine(d.HUMANCAPITAL))/2-10-(legendHeight)})
      .attr('dy', '.9em')
      .style('font-size', legendHeight-5 + 'px')
      .text(function(d){return 'Human Capital RANK : ' + d.HUMANCAPITAL})
      .style('font-weight', 400)
    tooltipLine.append('text')
      .attr('x', innerWPC + legendHeight+2)
      .attr('y', 200+legendHeight*3)
      //.attr('y', function(d){return (yHCTooltipLine(d.GGGI)+yHCTooltipLine(d.HUMANCAPITAL))/2-10-2*(legendHeight)})
      .attr('dy', '.9em')
      .style('font-size', legendHeight-5 + 'px')
      .text(function(d){return 'GGGI RANK : ' + d.GGGI})
      .style('font-weight', 400)

          
  }).on('mouseleave', function() {
    var hover = circle.filter(function(){return d3.select(this).classed('hover')})
    .classed('hover', false)
    var hoverLine = d3.selectAll('.series').filter(function(){return d3.selectAll('.series').classed('hover')})
    .classed('hover', false)
    .style('stroke-width', 1+'px')


    svg.selectAll('.tooltip')
      .style('visibility', 'hidden')
    svg.selectAll('.tooltipOutCircle')
      .style('visibility', 'hidden')
    svg.selectAll('.valueLine')
      .style('visibility', 'hidden')
    svg.selectAll('.valueLine2')
      .style('visibility', 'hidden') 
    svgPC.selectAll('.tooltipLine')
      .style('visibility', 'hidden') 
  })

  legend.selectAll('rect').on('click', function(e) {
    var hide = false;
    var newFilters = [];
    filterValues.forEach(function(f) {
      if (f === e) {
        hide = true;
      } else {
        newFilters.push(f);
      }
    });
    if(hide) {
      d3.select(this).style('opacity', 0.1);
      filterValues = newFilters;
      console.log(filterValues)
      d3.selectAll('circle')
        .filter(function(j) {return filterValues.indexOf(j.Region) < 0})
        .attr('opacity', 0)
      d3.selectAll('.series')
        .filter(function(j){return filterValues.indexOf(j.Region) < 0})
        .attr('opacity', 0)
    } else {
      newFilters.push(e);
      d3.select(this).style('opacity', 1);
      filterValues = newFilters;
      console.log(filterValues)
      d3.selectAll('circle')
      .filter(function(j) {return filterValues.indexOf(j.Region) >= 0})
      .attr('opacity', 1)
      d3.selectAll('.series')
        .filter(function(j){return filterValues.indexOf(j.Region) >= 0})
        .attr('opacity', 1)
    }
  })
  /* circle click */
  var clickBase = []
  data.forEach(function(d) {
    clickBase.push(d)
  })
  circle.on('click', function(d) {
    var clickFilters = [];
    hideClick = false;
    clickBase.forEach(function(f) {
      if(f===d) {
        hideClick = true;
      } else {
        clickFilters.push(f)
      }
    });
    if(hideClick) {
      clickBase = clickFilters;
      d3.selectAll('circle').filter(function(j){return clickBase.indexOf(j) >= 0})
        .attr('opacity', 0)
      var clickCircle = d3.selectAll('circle').filter(function(j){return clickBase.indexOf(j) < 0})
        .attr('opacity', 1)
        .append('text')
        .classed('clickCircle', true)
      d3.selectAll('.series').filter(function(j){return clickBase.indexOf(j) >= 0})
        .attr('opacity', 0)
      d3.selectAll('.series').filter(function(j){return clickBase.indexOf(j) < 0})
        .attr('opacity', 1)

      var tooltipClick = svg.append('g')
        .data(clickCircle.data())
        .attr('x', function(d){return x(d.OVERALL_INDEX_HC)+margin.left-2})
        .attr('dx', '.35em')
        .attr('y', function(d){return y(d.OVERALL_INDEX_GGI)-r(d.GDP)-2})
        .style('visibility', 'visible')
        .text(function(d){return d.country})
        .style('font-size', legendHeight-3 + 'px')
        .style('font-weight', 200)
            
    } else {
      clickFilters.push(d.country);
      clickBase = clickFilters;
      d3.selectAll('circle').filter(function(j){return clickBase.indexOf(j.country) >= 0})
        .attr('opacity', 0)
      d3.selectAll('circle').filter(function(j){return clickBase.indexOf(j.country) < 0})
        .attr('opacity', 1)
      d3.selectAll('.series').filter(function(j){return clickBase.indexOf(j.country) >= 0})
        .attr('opacity', 0)
    }
  })

  //button interaction
  d3.select('#all').on('click', function() {
    x.domain(xDomain)
    y.domain(yDomain)
    yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickSizeOuter(0)
      .tickSizeInner(-innerW);
    svg.select('.y.axis')
      .transition(t)
      .call(yAxis)
    xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickSizeInner(-innerH);
    svg.select('.x.axis')
      .transition(t)
      .call(xAxis)
    d3.selectAll('circle') //show all
      .attr('visibility', 'visible') 
    circle.each(function(d) {
        xy.set(this, [x(d.OVERALL_INDEX_HC), y(d.OVERALL_INDEX_GGI)]);
    })
      .transition(t)
      .attr('transform', function(d) {
        var pos = xy.get(this);
        return 'translate(' + pos + ')'
    })   

  })
  ///// mena
  d3.select('#MENA').on('click', function() {
    y.domain([0.4, 0.8])
    x.domain([30,75])
    yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickSizeOuter(0)
      .tickSizeInner(-innerW);
    svg.select('.y.axis')
      .transition(t)
      .call(yAxis)
    xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickSizeInner(-innerH);
    svg.select('.x.axis')
      .transition(t)
      .call(xAxis)    
    d3.selectAll('circle')
      .filter(function(d) {return d.Region != "MIDDLE EAST AND NORTH AFRICA"})
      .attr('visibility', 'hidden')
    d3.selectAll('circle')
      .filter(function(d) {return d.Region === "MIDDLE EAST AND NORTH AFRICA"})
      .attr('visibility', 'visible')
    circle.each(function(d) {
      xy.set(this, [x(d.OVERALL_INDEX_HC), y(d.OVERALL_INDEX_GGI)]);
    })
    .transition(t)
    .attr('transform', function(d) {
      var pos = xy.get(this);
      return 'translate(' + pos + ')'
    })    
  })
  ///// WE
  d3.select('#WE').on('click', function() {
    y.domain([0.65, 0.85])
    x.domain([60,80])
    yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickSizeOuter(0)
      .tickSizeInner(-innerW);
    svg.select('.y.axis')
      .transition(t)
      .call(yAxis)
    xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickSizeInner(-innerH);
    svg.select('.x.axis')
      .transition(t)
      .call(xAxis)    
    d3.selectAll('circle')
      .filter(function(d) {return d.Region != "WESTERN EUROPE"})
      .attr('visibility', 'hidden')
    d3.selectAll('circle')
      .filter(function(d) {return d.Region === "WESTERN EUROPE"})
      .attr('visibility', 'visible')
    circle.each(function(d) {
      xy.set(this, [x(d.OVERALL_INDEX_HC), y(d.OVERALL_INDEX_GGI)]);
    })
    .transition(t)
    .attr('transform', function(d) {
      var pos = xy.get(this);
      return 'translate(' + pos + ')'
    })    
  })
  ///// EAP
  d3.select('#EAP').on('click', function() {
    y.domain([0.62, 0.81])
    x.domain([55,75])
    yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickSizeOuter(0)
      .tickSizeInner(-innerW);
    svg.select('.y.axis')
      .transition(t)
      .call(yAxis)
    xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickSizeInner(-innerH);
    svg.select('.x.axis')
      .transition(t)
      .call(xAxis)    
    d3.selectAll('circle')
      .filter(function(d) {return d.Region != "EAST ASIA AND THE PACIFIC"})
      .attr('visibility', 'hidden')
    d3.selectAll('circle')
      .filter(function(d) {return d.Region === "EAST ASIA AND THE PACIFIC"})
      .attr('visibility', 'visible')
    circle.each(function(d) {
      xy.set(this, [x(d.OVERALL_INDEX_HC), y(d.OVERALL_INDEX_GGI)]);
    })
    .transition(t)
    .attr('transform', function(d) {
      var pos = xy.get(this);
      return 'translate(' + pos + ')'
    })    
  })
  ///// NA
  d3.select('#NA').on('click', function() {
    y.domain([0.65, 0.80])
    x.domain([60,80])
    yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickSizeOuter(0)
      .tickSizeInner(-innerW);
    svg.select('.y.axis')
      .transition(t)
      .call(yAxis)
    xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickSizeInner(-innerH);
    svg.select('.x.axis')
      .transition(t)
      .call(xAxis)    
    d3.selectAll('circle')
      .filter(function(d) {return d.Region != "NORTH AMERICA"})
      .attr('visibility', 'hidden')
    d3.selectAll('circle')
      .filter(function(d) {return d.Region === "NORTH AMERICA"})
      .attr('visibility', 'visible')
    circle.each(function(d) {
      xy.set(this, [x(d.OVERALL_INDEX_HC), y(d.OVERALL_INDEX_GGI)]);
    })
    .transition(t)
    .attr('transform', function(d) {
      var pos = xy.get(this);
      return 'translate(' + pos + ')'
    })    
  })
  ///// EECA
  d3.select('#EECA').on('click', function() {
    y.domain([0.65, 0.85])
    x.domain([55,75])
    yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickSizeOuter(0)
      .tickSizeInner(-innerW);
    svg.select('.y.axis')
      .transition(t)
      .call(yAxis)
    xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickSizeInner(-innerH);
    svg.select('.x.axis')
      .transition(t)
      .call(xAxis)    
    d3.selectAll('circle')
      .filter(function(d) {return d.Region != "EASTERN EUROPE AND CENTRAL ASIA"})
      .attr('visibility', 'hidden')
    d3.selectAll('circle')
      .filter(function(d) {return d.Region === "EASTERN EUROPE AND CENTRAL ASIA"})
      .attr('visibility', 'visible')
    circle.each(function(d) {
      xy.set(this, [x(d.OVERALL_INDEX_HC), y(d.OVERALL_INDEX_GGI)]);
    })
    .transition(t)
    .attr('transform', function(d) {
      var pos = xy.get(this);
      return 'translate(' + pos + ')'
    })    
  })
    ///// LAC
    d3.select('#LAC').on('click', function() {
      y.domain([0.6, 0.85])
      x.domain([50,70])
      yAxis = d3.axisLeft(y)
        .ticks(5)
        .tickSizeOuter(0)
        .tickSizeInner(-innerW);
      svg.select('.y.axis')
        .transition(t)
        .call(yAxis)
      xAxis = d3.axisBottom(x)
        .ticks(5)
        .tickSizeInner(-innerH);
      svg.select('.x.axis')
        .transition(t)
        .call(xAxis)    
      d3.selectAll('circle')
        .filter(function(d) {return d.Region != "LATIN AMERICA AND THE CARIBBEAN"})
        .attr('visibility', 'hidden')
      d3.selectAll('circle')
        .filter(function(d) {return d.Region === "LATIN AMERICA AND THE CARIBBEAN"})
        .attr('visibility', 'visible')
      circle.each(function(d) {
        xy.set(this, [x(d.OVERALL_INDEX_HC), y(d.OVERALL_INDEX_GGI)]);
      })
      .transition(t)
      .attr('transform', function(d) {
        var pos = xy.get(this);
        return 'translate(' + pos + ')'
      })    
    })
    ///// SSA
    d3.select('#SSA').on('click', function() {
      y.domain([0.55, 0.85])
      x.domain([40,65])
      yAxis = d3.axisLeft(y)
        .ticks(5)
        .tickSizeOuter(0)
        .tickSizeInner(-innerW);
      svg.select('.y.axis')
        .transition(t)
        .call(yAxis)
      xAxis = d3.axisBottom(x)
        .ticks(5)
        .tickSizeInner(-innerH);
      svg.select('.x.axis')
        .transition(t)
        .call(xAxis)    
      d3.selectAll('circle')
        .filter(function(d) {return d.Region != "SUB-SAHARAN AFRICA"})
        .attr('visibility', 'hidden')
      d3.selectAll('circle')
        .filter(function(d) {return d.Region === "SUB-SAHARAN AFRICA"})
        .attr('visibility', 'visible')
      circle.each(function(d) {
        xy.set(this, [x(d.OVERALL_INDEX_HC), y(d.OVERALL_INDEX_GGI)]);
      })
      .transition(t)
      .attr('transform', function(d) {
        var pos = xy.get(this);
        return 'translate(' + pos + ')'
      })    
    })
    ///// SA
    d3.select('#SA').on('click', function() {
      y.domain([0.50, 0.70])
      x.domain([41,65])
      yAxis = d3.axisLeft(y)
        .ticks(5)
        .tickSizeOuter(0)
        .tickSizeInner(-innerW);
      svg.select('.y.axis')
        .transition(t)
        .call(yAxis)
      xAxis = d3.axisBottom(x)
        .ticks(5)
        .tickSizeInner(-innerH);
      svg.select('.x.axis')
        .transition(t)
        .call(xAxis)    
      d3.selectAll('circle')
        .filter(function(d) {return d.Region != "SOUTH ASIA"})
        .attr('visibility', 'hidden')
      d3.selectAll('circle')
        .filter(function(d) {return d.Region === "SOUTH ASIA"})
        .attr('visibility', 'visible')
      circle.each(function(d) {
        xy.set(this, [x(d.OVERALL_INDEX_HC), y(d.OVERALL_INDEX_GGI)]);
      })
      .transition(t)
      .attr('transform', function(d) {
        var pos = xy.get(this);
        return 'translate(' + pos + ')'
      })    
    })
}  



