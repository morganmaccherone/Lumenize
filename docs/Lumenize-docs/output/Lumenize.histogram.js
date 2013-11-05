Ext.data.JsonP.Lumenize_histogram({"tagname":"class","name":"Lumenize.histogram","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{},"private":null,"id":"class-Lumenize.histogram","members":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"linenr":9,"files":[{"filename":"histogram.coffee.js","href":"histogram.coffee.html#Lumenize-histogram"}],"html_meta":{},"statics":{"cfg":[],"property":[],"method":[{"name":"bucket","tagname":"method","owner":"Lumenize.histogram","meta":{"static":true},"id":"static-method-bucket"},{"name":"buckets","tagname":"method","owner":"Lumenize.histogram","meta":{"static":true},"id":"static-method-buckets"},{"name":"bucketsPercentile","tagname":"method","owner":"Lumenize.histogram","meta":{"static":true},"id":"static-method-bucketsPercentile"},{"name":"clipping","tagname":"method","owner":"Lumenize.histogram","meta":{"static":true},"id":"static-method-clipping"},{"name":"histogram","tagname":"method","owner":"Lumenize.histogram","meta":{"static":true},"id":"static-method-histogram"},{"name":"histogramFromBuckets","tagname":"method","owner":"Lumenize.histogram","meta":{"static":true},"id":"static-method-histogramFromBuckets"}],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/histogram.coffee.html#Lumenize-histogram' target='_blank'>histogram.coffee.js</a></div></pre><div class='doc-contents'><p>This module has functionality that will allow you to create histograms and do bucketing.</p>\n\n<p>Features:</p>\n\n<ul>\n<li>Three bucketing strategies:\n\n<ol>\n<li>constant width (default)</li>\n<li>constant depth - for an example of using this mode, look at the source code for the <code>bucketPercentile()</code> function</li>\n<li><a href=\"http://en.wikipedia.org/wiki/V-optimal_histograms\">v-optimal</a></li>\n</ol>\n</li>\n<li>Two operating modes modes:\n\n<ol>\n<li>Automatic. Call histogram with data and all of your parameters and out pops a histogram.</li>\n<li>Piecemeal. Create buckets, put data into buckets, generate histograms from data and pre-calculated buckets.\nSometimes you are less interested in the histogram than you are in the bucketing.</li>\n</ol>\n</li>\n</ul>\n\n\n<p>Let's walk through some examples of both modes. But first a general discussion about how these functions accept raw data.</p>\n\n<h2>Getting data into the histogram functions</h2>\n\n<p>We have two ways to define data. We can pass in an Array of Objects and specify the field to use.</p>\n\n<pre><code>grades = [\n  {name: 'Joe', average: 105},\n  {name: 'Jeff', average: 104.9}, # ...\n\n]\n\n{histogram} = require('../')\nh = histogram.histogram(grades, 'average')\n\nconsole.log(h)\n# [ { index: 0, startOn: null, endBelow: null, label: 'all', count: 2 } ]\n</code></pre>\n\n<p>Or, we can just pass in a list of values</p>\n\n<pre><code>grades = [105, 104.9, 99, 98.7, 85, 78, 54, 98, 78, 20]\nh = histogram.histogram(grades)\nconsole.log((row.label + ': ' + row.count for row in h))\n# [ '&lt; 41.25: 1', '41.25-62.5: 1', '62.5-83.75: 2', '&gt;= 83.75: 6' ]\n</code></pre>\n\n<h2>Automatic histogram creation</h2>\n\n<p>The above examples for the two ways of getting data into the histogram functions also demonstrates the use of\nautomatic histogram creation. There are additional parameters to this function that allow you to control the\ntype of bucketing (constantWidth, constantDepth, etc.), min and max values, significance of the bucket boundaries, etc.\nSee the individual functions for details on these parameters.</p>\n\n<h2>Piecemeal usage</h2>\n\n<p>Sometimes you don't actually want a histogram. You want a way to create constantWidth or constantDepth or v-optimal buckets\nand you want a tool to know which bucket a particular value falls into. The cannonical example of this is for calculating\npercentiles for standardized testing... or for grading on a curve. The documentation for the <code>percentileBuckets()</code>\nfunction walks you through an example like this.</p>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static Methods</h3><div id='static-method-bucket' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.histogram'>Lumenize.histogram</span><br/><a href='source/histogram.coffee.html#Lumenize-histogram-static-method-bucket' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.histogram-static-method-bucket' class='name expandable'>bucket</a>( <span class='pre'>value, buckets</span> ) : Object<strong class='static signature' >static</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Number<div class='sub-desc'><p>The value to bucket</p>\n</div></li><li><span class='pre'>buckets</span> : Object[]<div class='sub-desc'><p>Array of objects where each row is in the form {index, startOn, endBelow, label}</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>Returns the bucket that contains the given value unless the data fits in none of the buckets, in which case, it returns\n<code>null</code>.</p>\n\n<p>Note: With default parameters, the buckets generated by this module will cover -Infinity to Infinity, (i.e. all\npossible values). However, if you hand generate your own buckets or you use firstStartOn or lastEndBelow parameters,\nwhen calling histogram.buckets, then it's possible for values to fall into no buckets.\nYou can effectively use this as a way to filter out outliers or unexpected\nnegative values. Also note that the firstStartOn (min) is inclusive, but the lastEndBelow (max) is exclusive. If\nyou set the lastEndBelow to 100, then no values of 100 will get bucketed. You can't score in the 100th percentile\nbecause you can't beat your own score. This is simlar logic.</p>\n</div></li></ul></div></div></div><div id='static-method-buckets' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.histogram'>Lumenize.histogram</span><br/><a href='source/histogram.coffee.html#Lumenize-histogram-static-method-buckets' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.histogram-static-method-buckets' class='name expandable'>buckets</a>( <span class='pre'>rows, [valueField], [type], [significance], [firstStartOn], [lastEndBelow], [bucketCount]</span> ) : Object[]<strong class='static signature' >static</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>rows</span> : Object[]/Number[]<div class='sub-desc'><p>If no valueField is provided or the valueField parameter is null, then the first parameter is\nassumed to be an Array of Numbers representing the values to bucket. Otherwise, it is assumed to be an Array of Objects\nwith a bunch of fields.</p>\n</div></li><li><span class='pre'>valueField</span> : String (optional)<div class='sub-desc'><p>Specifies the field containing the values to calculate the histogram on</p>\n</div></li><li><span class='pre'>type</span> : function (optional)<div class='sub-desc'><p>Specifies how to pick the edges of the buckets. Three standard schemes\n  are provided: histogram.bucketsConstantWidth, histogram.bucketsConstantDepth, and histogram.bucketsVOptimal.\n  You could inject your own but this function simply calls that so you may as well just create the buckets yourself.</p>\n<p>Defaults to: <code>histogram.constantWidth</code></p></div></li><li><span class='pre'>significance</span> : Number (optional)<div class='sub-desc'><p>The multiple to which you want to round the bucket edges. 1 means whole numbers.\n 0.1 means to round to tenths. 0.01 to hundreds. Etc. If you provide all of these last four parameters, ensure\n that (lastEndBelow - firstStartOn) / bucketCount will naturally come out in the significance specified. So,\n (100 - 0) / 100 = 1. This works well with a significance of 1, 0.1, 0.01, etc. But (13 - 0) / 10  = 1.3. This\n would not work with a significance of 1. However, a signficance of 0.1 would work fine.</p>\n</div></li><li><span class='pre'>firstStartOn</span> : Number (optional)<div class='sub-desc'><p>This will be the startOn of the first bucket. Think of it as the min value.</p>\n</div></li><li><span class='pre'>lastEndBelow</span> : Number (optional)<div class='sub-desc'><p>This will be the endBelow of the last bucket. Think of it as the max value.</p>\n</div></li><li><span class='pre'>bucketCount</span> : Number (optional)<div class='sub-desc'><p>If provided, the histogram will have this many buckets.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object[]</span><div class='sub-desc'><p>Returns an Array of Objects (buckets) in the form of {index, startOn, endBelow, label}</p>\n\n<p>The buckets array that is returned will have these properties:</p>\n\n<ul>\n<li>Each bucket (row) will have these fields {index, startOn, endBelow, label}.</li>\n<li>Duplicate buckets are merged. When they are merged two fields are added to the resulting merged bucket:\n{matchingRangeIndexStart, matchingRangeIndexEnd} indicating the range that this bucket replaces.</li>\n<li>If firstStartOn is not provided, it will be null indicating -Infinity</li>\n<li>If lastEndBelow is not provided, it will be null indicating Infinity.</li>\n</ul>\n\n</div></li></ul></div></div></div><div id='static-method-bucketsPercentile' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.histogram'>Lumenize.histogram</span><br/><a href='source/histogram.coffee.html#Lumenize-histogram-static-method-bucketsPercentile' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.histogram-static-method-bucketsPercentile' class='name expandable'>bucketsPercentile</a>( <span class='pre'>rows</span> ) : Object[]<strong class='static signature' >static</strong></div><div class='description'><div class='short'>This is a short cut to creating a set of buckets for \"scoring\" in percentiles (think standardized testing). ...</div><div class='long'><p>This is a short cut to creating a set of buckets for \"scoring\" in percentiles (think standardized testing).</p>\n\n<p>Note: You can't score in the 100th percentile because you can't beat your own score.\nIf you have a higher score than anybody else, you didn't beat your own score. So, you aren't better than 100%. If there are\nless than 100 total scores then you technically can't even be in the 99th percentile. This function is hard-coded\nto only create 100 buckets. However, if you wanted to calculate fractional percentiles. Say you want to know who\nis in the 99.9th percentile, then you could simulate that yourself by calling bucketsConstantDepth with 1000 as\nthe bucketCount parameter.</p>\n\n<p>Let's say you are a teacher and you only give out A's, B's, C's, and F's. Let's say you\nwant the top 10% to get an A. This should only be one student, no matter what he scores. The next 30% of students\nto get a B. The next 50% of students to get a C and the last 10% to get an F (again, only 1 student). So with 10 students,\nthe final distribution of grades will be this:</p>\n\n<ul>\n<li>A: 1</li>\n<li>B: 3</li>\n<li>C: 5</li>\n<li>F: 1</li>\n<li>Total: 10</li>\n</ul>\n\n\n<p>Let's say you have these grades:</p>\n\n<pre><code>grades = [\n  {name: 'Joe', average: 105},    # 1 A 90th percentile and above\n  {name: 'Jeff', average: 104.9}, # 1 B 60th percentile and above\n  {name: 'John', average: 92},    # 2\n  {name: 'Jess', average: 90},    # 3\n  {name: 'Joseph', average: 87},  # 1 C 10th percentile and above\n  {name: 'Julie', average: 87},   # 2\n  {name: 'Juan', average: 75},    # 3\n  {name: 'Jill', average: 73},    # 4\n  {name: 'Jon', average: 71},     # 5\n  {name: 'Jorge', average: 32}    # 1 F rest\n]\n</code></pre>\n\n<p>Now, let's create the percentile buckets for this by calling bucketsPercentile.</p>\n\n<pre><code>{histogram} = require('../')\nbuckets = histogram.bucketsPercentile(grades, 'average')\n</code></pre>\n\n<p>Let's create a little helper function to convert the percentiles to grades. It includes a call to <code>histogram.bucket</code>.</p>\n\n<pre><code>getGrade = (average, buckets) -&gt;\n  percentile = histogram.bucket(average, buckets).percentileHigherIsBetter\n  if percentile &gt;= 90\n    return 'A'\n  else if percentile &gt;= 60\n    return 'B'\n  else if percentile &gt;= 10\n    return 'C'\n  else\n    return 'F'\n</code></pre>\n\n<p>Now, if we loop over this and call getGrade, we can print out the final grade for each student.</p>\n\n<pre><code>for student in grades\n  console.log(student.name, getGrade(student.average, buckets))\n\n# Joe A\n# Jeff B\n# John B\n# Jess B\n# Joseph C\n# Julie C\n# Juan C\n# Jill C\n# Jon C\n# Jorge F\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>rows</span> : Object[]/Number[]<div class='sub-desc'><p>If no valueField is provided or the valueField parameter is null, then the first parameter is\nassumed to be an Array of Numbers representing the values to bucket. Otherwise, it is assumed to be an Array of Objects\nwith a bunch of fields.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object[]</span><div class='sub-desc'><p>Returns an Array of Objects (buckets) in the form of {index, startOn, endBelow, label, percentileHigherIsBetter, percentileLowerIsBetter}</p>\n\n<p>To convert a value into a percentile call <code>histogram.bucket(value, bucketsFromCallToBucketsPercentile)</code> and\nthen read the percentileHigherIsBetter or percentileLowerIsBetter of the bucket that is returned.</p>\n</div></li></ul></div></div></div><div id='static-method-clipping' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.histogram'>Lumenize.histogram</span><br/><a href='source/histogram.coffee.html#Lumenize-histogram-static-method-clipping' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.histogram-static-method-clipping' class='name expandable'>clipping</a>( <span class='pre'>rows, valueField, [noClipping]</span> ) : Object[]<strong class='static signature' >static</strong></div><div class='description'><div class='short'>Note: The calling pattern and functionality of this method is legacy and a bit different from the other members of\nth...</div><div class='long'><p>Note: The calling pattern and functionality of this method is legacy and a bit different from the other members of\nthis histogram module. I just haven't yet had the opportunity to upgrade it to the new pattern.</p>\n\n<p>This histogram function is designed to work with data that is zero bound on the low end and might have outliers\non the high end. It's not very general purpose but it's ideal for distributions that have a long-fat-tail.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>rows</span> : Object[]<div class='sub-desc'>\n</div></li><li><span class='pre'>valueField</span> : String<div class='sub-desc'><p>Specifies the field containing the values to calculate the histogram on</p>\n</div></li><li><span class='pre'>noClipping</span> : Boolean (optional)<div class='sub-desc'><p>If set to true, then it will not create a non-linear band for the outliers. The\n default behavior (noClipping = false) is to lump together outliers into a single bucket at the top.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object[]</span><div class='sub-desc'><p>Returns an object containing the following:</p>\n\n<ul>\n<li>buckets - An Array containing {label, count, rows, clippedChartValue}</li>\n<li>bucketSize - The size of each bucket (except the top one)</li>\n<li>chartMax - The maximum to use for charting using clipped values</li>\n<li>clipped - A Boolean indicating if the result is clipped</li>\n<li>valueMax - The actual maximum value found. Will always be >= chartMax</li>\n</ul>\n\n\n<p>Given an array of rows like:</p>\n\n<pre><code>{histogram} = require('../')\n\nrows = [\n  {age:  7},\n  {age: 25},\n  {age: 23},\n  {age: 27},\n  {age: 34},\n  {age: 55},\n  {age: 42},\n  {age: 13},\n  {age: 11},\n  {age: 23},\n  {age: 31},\n  {age: 32},\n  {age: 29},\n  {age: 16},\n  {age: 31},\n  {age: 22},\n  {age: 25},\n]\n</code></pre>\n\n<p>histogram will calculate a histogram. There will be sqrt(n) + 1 buckets</p>\n\n<pre><code>{buckets, chartMax} = histogram.clipping(rows, 'age')\nfor b in buckets\n  console.log(b.label, b.count)\n# 0-12 2\n# 12-24 5\n# 24-36 8\n# 36-48 1\n# 48-60 1\n\nconsole.log(chartMax)\n# 60\n</code></pre>\n\n<p>This histogram calculator will also attempt to lump outliers into a single bucket at the top.</p>\n\n<pre><code>rows.push({age: 85})\n\n{buckets, chartMax} = histogram.clipping(rows, 'age')\n\nlastBucket = buckets[buckets.length - 1]\nconsole.log(lastBucket.label, lastBucket.count)\n# 48-86* 2\n</code></pre>\n\n<p>The asterix <code>*</code> is there to indicate that this bucket is not the same size as the others and non-linear.\nThe histogram calculator will also \"clip\" the values for these outliers so that you can\ndisplay them in a scatter chart on a linear scale with the last band compressed.\nThe <code>clippedChartValue</code> will be guaranteed to be below the <code>chartMax</code> by interpolating it's position between\nthe bounds of the top band where the actual max value is scaled down to the <code>chartMax</code></p>\n\n<pre><code>lastBucket = buckets[buckets.length - 1]\nconsole.log(lastBucket.rows[1].age, lastBucket.rows[1].clippedChartValue)\n# 85 59.68421052631579\n</code></pre>\n</div></li></ul></div></div></div><div id='static-method-histogram' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.histogram'>Lumenize.histogram</span><br/><a href='source/histogram.coffee.html#Lumenize-histogram-static-method-histogram' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.histogram-static-method-histogram' class='name expandable'>histogram</a>( <span class='pre'>rows, [valueField], [type], [significance], [firstStartOn], [lastEndBelow], [bucketCount]</span> ) : Object[]<strong class='static signature' >static</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>rows</span> : Object[]/Number[]<div class='sub-desc'><p>If no valueField is provided or the valueField parameter is null, then the first parameter is\n assumed to be an Array of Numbers representing the values to bucket. Otherwise, it is assumed to be an Array of Objects\n with a bunch of fields.</p>\n</div></li><li><span class='pre'>valueField</span> : String (optional)<div class='sub-desc'><p>Specifies the field containing the values to calculate the histogram on</p>\n</div></li><li><span class='pre'>type</span> : function (optional)<div class='sub-desc'><p>Specifies how to pick the edges of the buckets. Three standard schemes\n  are provided: histogram.bucketsConstantWidth, histogram.bucketsConstantDepth, and histogram.bucketsVOptimal.\n  However, you can inject your own.</p>\n<p>Defaults to: <code>histogram.constantWidth</code></p></div></li><li><span class='pre'>significance</span> : Number (optional)<div class='sub-desc'><p>The multiple to which you want to round the bucket edges. 1 means whole numbers.\n 0.1 means to round to tenths. 0.01 to hundreds. Etc. If you provide all of these last four parameters, ensure\n that (lastEndBelow - firstStartOn) / bucketCount will naturally come out in the significance specified. So,\n (100 - 0) / 100 = 1. This works well with a significance of 1, 0.1, 0.01, etc. But (13 - 0) / 10  = 1.3. This\n would not work with a significance of 1. However, a signficance of 0.1 would work fine.</p>\n</div></li><li><span class='pre'>firstStartOn</span> : Number (optional)<div class='sub-desc'><p>This will be the startOn of the first bucket.</p>\n</div></li><li><span class='pre'>lastEndBelow</span> : Number (optional)<div class='sub-desc'><p>This will be the endBelow of the last bucket. Think of it as the max value.</p>\n</div></li><li><span class='pre'>bucketCount</span> : Number (optional)<div class='sub-desc'><p>If provided, the histogram will have this many buckets.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object[]</span><div class='sub-desc'><p>Returns an Array of Objects (buckets) in the form of {index, startOn, endBelow, label, count} where count is the\nnumber of values in each bucket.</p>\n\n<p>Note: With default parameters, the buckets will cover -Infinity to Infinity, (i.e. all\npossible values). However, if firstStartOn or lastEndBelow are provided, then any values that you pass in that\nfall outside of this range will be ignored. You can effectively use this as a way to filter out outliers or unexpected\nnegative values. Also note that the firstStartOn (min) is inclusive, but the lastEndBelow (max) is exclusive. If\nyou set the lastEndBelow to 100, then no values of 100 will get counted. You can't score in the 100th percentile\nbecause you can't beat your own score. This is simlar logic.</p>\n</div></li></ul></div></div></div><div id='static-method-histogramFromBuckets' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.histogram'>Lumenize.histogram</span><br/><a href='source/histogram.coffee.html#Lumenize-histogram-static-method-histogramFromBuckets' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.histogram-static-method-histogramFromBuckets' class='name expandable'>histogramFromBuckets</a>( <span class='pre'>rows, valueField, buckets</span> ) : Object[]<strong class='static signature' >static</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>rows</span> : Object[]/Number[]<div class='sub-desc'><p>If no valueField is provided or the valueField parameter is null, then the first parameter is\n assumed to be an Array of Numbers representing the values to bucket. Otherwise, it is assumed to be an Array of Objects\n with a bunch of fields.</p>\n</div></li><li><span class='pre'>valueField</span> : String<div class='sub-desc'><p>Specifies the field containing the values to calculate the histogram on</p>\n</div></li><li><span class='pre'>buckets</span> : Object[]<div class='sub-desc'><p>Array of Objects as output from a get...Buckets() function. Each row {index, startOn, endBelow, label}</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object[]</span><div class='sub-desc'><p>Returns a histogram from rows using the provided buckets. See histogram.histogram() for details on the returned Array.</p>\n</div></li></ul></div></div></div></div></div></div></div>"});