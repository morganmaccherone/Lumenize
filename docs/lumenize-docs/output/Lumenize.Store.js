Ext.data.JsonP.Lumenize_Store({"tagname":"class","name":"Lumenize.Store","autodetected":{},"files":[{"filename":"Store.coffee.js","href":"Store.coffee.html#Lumenize-Store"}],"members":[{"name":"defaultValues","tagname":"cfg","owner":"Lumenize.Store","id":"cfg-defaultValues","meta":{}},{"name":"idField","tagname":"cfg","owner":"Lumenize.Store","id":"cfg-idField","meta":{}},{"name":"uniqueIDField","tagname":"cfg","owner":"Lumenize.Store","id":"cfg-uniqueIDField","meta":{}},{"name":"validFromField","tagname":"cfg","owner":"Lumenize.Store","id":"cfg-validFromField","meta":{}},{"name":"validToField","tagname":"cfg","owner":"Lumenize.Store","id":"cfg-validToField","meta":{}},{"name":"constructor","tagname":"method","owner":"Lumenize.Store","id":"method-constructor","meta":{}},{"name":"addSnapshots","tagname":"method","owner":"Lumenize.Store","id":"method-addSnapshots","meta":{"chainable":true}},{"name":"filtered","tagname":"method","owner":"Lumenize.Store","id":"method-filtered","meta":{}},{"name":"stateBoundaryCrossedFiltered","tagname":"method","owner":"Lumenize.Store","id":"method-stateBoundaryCrossedFiltered","meta":{}},{"name":"stateBoundaryCrossedFilteredBothWays","tagname":"method","owner":"Lumenize.Store","id":"method-stateBoundaryCrossedFilteredBothWays","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Lumenize.Store","short_doc":"An efficient, in-memory, datastore for snapshot data. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Store.coffee.html#Lumenize-Store' target='_blank'>Store.coffee.js</a></div></pre><div class='doc-contents'><p><strong>An efficient, in-memory, datastore for snapshot data.</strong></p>\n\n<p>Note, this store takes advantage of JavaScript's prototype inheritance to store snapshots in memory. Since the next snapshot might\nonly have one field different from the prior one, this saves a ton of space. There is some concern that this will\nslow down certain operations because the interpreter has to search all fields in the current level before bumping up\nto the next. However, there is some evidence that modern javascript implementations handle this very efficiently.</p>\n\n<p>However, this choice means that each row in the snapshots array doesn't have all of the fields.</p>\n\n<p>Store keeps track of all of the fields it has seen so you can flatten a row(s) if necessary.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-defaultValues' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.Store'>Lumenize.Store</span><br/><a href='source/Store.coffee.html#Lumenize-Store-cfg-defaultValues' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.Store-cfg-defaultValues' class='name expandable'>defaultValues</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>In some datastores, null numeric fields may be assumed to be zero and null\n  boolean fields may be assumed to be false. ...</div><div class='long'><p>In some datastores, null numeric fields may be assumed to be zero and null\n  boolean fields may be assumed to be false. Lumenize makes no such assumption and will crash if a field value\n  is missing. the defaultValues becomes the root of prototype inheritance hierarchy.</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='cfg-idField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.Store'>Lumenize.Store</span><br/><a href='source/Store.coffee.html#Lumenize-Store-cfg-idField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.Store-cfg-idField' class='name expandable'>idField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;_id&quot;</code></p></div></div></div><div id='cfg-uniqueIDField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.Store'>Lumenize.Store</span><br/><a href='source/Store.coffee.html#Lumenize-Store-cfg-uniqueIDField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.Store-cfg-uniqueIDField' class='name expandable'>uniqueIDField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Specifies the field that identifies unique entities (Default: \"ObjectID\"). ...</div><div class='long'><p>Specifies the field that identifies unique entities (Default: \"ObjectID\").</p>\n<p>Defaults to: <code>&quot;ObjectID&quot;</code></p></div></div></div><div id='cfg-validFromField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.Store'>Lumenize.Store</span><br/><a href='source/Store.coffee.html#Lumenize-Store-cfg-validFromField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.Store-cfg-validFromField' class='name expandable'>validFromField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;_ValidFrom&quot;</code></p></div></div></div><div id='cfg-validToField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.Store'>Lumenize.Store</span><br/><a href='source/Store.coffee.html#Lumenize-Store-cfg-validToField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.Store-cfg-validToField' class='name expandable'>validToField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;_ValidTo&quot;</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.Store'>Lumenize.Store</span><br/><a href='source/Store.coffee.html#Lumenize-Store-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Lumenize.Store-method-constructor' class='name expandable'>Lumenize.Store</a>( <span class='pre'>config, [snapshots]</span> ) : <a href=\"#!/api/Lumenize.Store\" rel=\"Lumenize.Store\" class=\"docClass\">Lumenize.Store</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>See Config options for details.</p>\n</div></li><li><span class='pre'>snapshots</span> : Object[] (optional)<div class='sub-desc'><p>Optional parameter allowing the population of the Store at instantiation.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Lumenize.Store\" rel=\"Lumenize.Store\" class=\"docClass\">Lumenize.Store</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-addSnapshots' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.Store'>Lumenize.Store</span><br/><a href='source/Store.coffee.html#Lumenize-Store-method-addSnapshots' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.Store-method-addSnapshots' class='name expandable'>addSnapshots</a>( <span class='pre'>snapshots</span> ) : Store<span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Adds the snapshots to the Store ...</div><div class='long'><p>Adds the snapshots to the Store</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>snapshots</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Store</span><div class='sub-desc'><p>Returns this</p>\n</div></li></ul></div></div></div><div id='method-filtered' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.Store'>Lumenize.Store</span><br/><a href='source/Store.coffee.html#Lumenize-Store-method-filtered' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.Store-method-filtered' class='name expandable'>filtered</a>( <span class='pre'>filter</span> ) : Object[]<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the subset of the snapshots that match the filter ...</div><div class='long'><p>Returns the subset of the snapshots that match the filter</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>filter</span> : Function<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object[]</span><div class='sub-desc'><p>An array or snapshots. Note, they will not be flattened so they have references to their prototypes</p>\n</div></li></ul></div></div></div><div id='method-stateBoundaryCrossedFiltered' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.Store'>Lumenize.Store</span><br/><a href='source/Store.coffee.html#Lumenize-Store-method-stateBoundaryCrossedFiltered' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.Store-method-stateBoundaryCrossedFiltered' class='name expandable'>stateBoundaryCrossedFiltered</a>( <span class='pre'>field, values, valueToTheRightOfBoundary, [forward], [assumeNullIsLowest]</span> ) : Object[]<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the subset of the snapshots where the field transitions from the left of valueToTheRightOfBoundary to\n  the r...</div><div class='long'><p>Returns the subset of the snapshots where the field transitions from the left of valueToTheRightOfBoundary to\n  the right (inclusive)</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>field</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>values</span> : String[]<div class='sub-desc'>\n</div></li><li><span class='pre'>valueToTheRightOfBoundary</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>forward</span> : Boolean (optional)<div class='sub-desc'><p>When true (the default), this will return the transitions from left to right\n  However, if you set this to false, it will return the transitions right to left.</p>\n<p>Defaults to: <code>true</code></p></div></li><li><span class='pre'>assumeNullIsLowest</span> : Boolean (optional)<div class='sub-desc'><p>Set to false if you don't want to consider transitions out of null</p>\n<p>Defaults to: <code>true</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object[]</span><div class='sub-desc'><p>An array or snapshots. Note, they will not be flattened so they have references to their prototypes</p>\n</div></li></ul></div></div></div><div id='method-stateBoundaryCrossedFilteredBothWays' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Lumenize.Store'>Lumenize.Store</span><br/><a href='source/Store.coffee.html#Lumenize-Store-method-stateBoundaryCrossedFilteredBothWays' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Lumenize.Store-method-stateBoundaryCrossedFilteredBothWays' class='name expandable'>stateBoundaryCrossedFilteredBothWays</a>( <span class='pre'>field, values, valueToTheRightOfBoundary, [assumeNullIsLowest]</span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Shortcut to stateBoundaryCrossedFiltered for when you need both directions ...</div><div class='long'><p>Shortcut to stateBoundaryCrossedFiltered for when you need both directions</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>field</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>values</span> : String[]<div class='sub-desc'>\n</div></li><li><span class='pre'>valueToTheRightOfBoundary</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>assumeNullIsLowest</span> : Boolean (optional)<div class='sub-desc'><p>Set to false if you don't want to consider transitions out of null</p>\n<p>Defaults to: <code>true</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>An object with two root keys: 1) forward, 2) backward. The values are the arrays that are returned\n  from stateBoundaryCrossedFiltered</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});