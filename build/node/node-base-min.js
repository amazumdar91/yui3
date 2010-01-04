YUI.add("node-base",function(C){var G=".",E="nodeName",I="nodeType",B="ownerDocument",H="tagName",D="_yuid",F=function(L){var K=L[D];if(K&&F._instances[K]&&F._instances[K]._node!==L){L[D]=null;}K=C.stamp(L);if(!K){K=C.guid();}this[D]=K;this._node=L;F._instances[K]=this;this._stateProxy=L;if(this._initPlugins){this._initPlugins();}},J=function(L){var K=null;if(L){K=(typeof L==="string")?function(M){return C.Selector.test(M,L);}:function(M){return L(C.one(M));};}return K;};F.NAME="Node";F.re_aria=/^(?:role$|aria-)/;F.DOM_EVENTS={abort:true,beforeunload:true,blur:true,change:true,click:true,close:true,command:true,contextmenu:true,drag:true,dragstart:true,dragenter:true,dragover:true,dragleave:true,dragend:true,drop:true,dblclick:true,error:true,focus:true,keydown:true,keypress:true,keyup:true,load:true,message:true,mousedown:true,mousemove:true,mouseout:true,mouseover:true,mouseup:true,mousemultiwheel:true,mousewheel:true,submit:true,mouseenter:true,mouseleave:true,scroll:true,reset:true,resize:true,select:true,textInput:true,unload:true};C.mix(F.DOM_EVENTS,C.Env.evt.plugins);F._instances={};F.getDOMNode=function(K){if(K){return(K.nodeType)?K:K._node||null;}return null;};F.scrubVal=function(L,K){if(K&&L){if(typeof L==="object"||typeof L==="function"){if(I in L||C.DOM.isWindow(L)){L=C.one(L);}else{if((L.item&&!L._nodes)||(L[0]&&L[0][I])){L=C.all(L);}}}}else{if(L===undefined){L=K;}}return L;};F.addMethod=function(K,M,L){if(K&&M&&typeof M==="function"){F.prototype[K]=function(){L=L||this;var O=C.Array(arguments,0,true),N;if(O[0]&&O[0] instanceof F){O[0]=O[0]._node;}if(O[1]&&O[1] instanceof F){O[1]=O[1]._node;}O.unshift(this._node);N=F.scrubVal(M.apply(L,O),this);return N;};}else{}};F.importMethod=function(M,K,L){if(typeof K==="string"){L=L||K;F.addMethod(L,M[K],M);}else{C.Array.each(K,function(N){F.importMethod(M,N);});}};F.one=function(N){var K=null,M,L;if(N){if(typeof N==="string"){if(N.indexOf("doc")===0){N=C.config.doc;}else{if(N.indexOf("win")===0){N=C.config.win;}else{N=C.Selector.query(N,null,true);}}if(!N){return null;}}else{if(N instanceof F){return N;}}L=N._yuid;K=F._instances[L];M=K?K._node:null;if(!K||(M&&N!==M)){K=new F(N);}}return K;};F.get=function(){return F.one.apply(F,arguments);};F.create=function(){return C.one(C.DOM.create.apply(C.DOM,arguments));};F.ATTRS={text:{getter:function(){return C.DOM.getText(this._node);},setter:function(K){C.DOM.setText(this._node,K);return K;}},"options":{getter:function(){return this._node.getElementsByTagName("option");}},"elements":{getter:function(){return C.all(this._node.elements);}},"children":{getter:function(){var N=this._node,M=N.children,O,L,K;if(!M){O=N.childNodes;M=[];for(L=0,K=O.length;L<K;++L){if(O[L][H]){M[M.length]=O[L];}}}return C.all(M);}},value:{getter:function(){return C.DOM.getValue(this._node);},setter:function(K){C.DOM.setValue(this._node,K);return K;}},data:{getter:function(){return this._data;},setter:function(K){this._data=K;return K;}}};F.DEFAULT_SETTER=function(K,M){var L=this._stateProxy,N;if(K.indexOf(G)>-1){N=K;K=K.split(G);C.Object.setValue(L,K,M);}else{if(L[K]!==undefined){L[K]=M;}}return M;};F.DEFAULT_GETTER=function(K){var L=this._stateProxy,M;if(K.indexOf&&K.indexOf(G)>-1){M=C.Object.getValue(L,K.split(G));}else{if(L[K]!==undefined){M=L[K];}}return M;};C.augment(F,C.Event.Target);C.mix(F.prototype,{toString:function(){var M="",L=this[D]+": not bound to a node",K=this._node;if(K){M+=K[E];if(K.id){M+="#"+K.id;}if(K.className){M+="."+K.className.replace(" ",".");}M+=" "+this[D];}return M||L;},get:function(K){var L;if(this._getAttr){L=this._getAttr(K);}else{L=this._get(K);}if(L){L=C.Node.scrubVal(L,this);}return L;},_get:function(K){var L=F.ATTRS[K],M;if(L&&L.getter){M=L.getter.call(this);}else{if(F.re_aria.test(K)){M=this._node.getAttribute(K,2);}else{M=F.DEFAULT_GETTER.apply(this,arguments);}}return M;},set:function(K,M){var L=F.ATTRS[K];if(this._setAttr){this._setAttr.apply(this,arguments);}else{if(L&&L.setter){L.setter.call(this,M);}else{if(F.re_aria.test(K)){this._node.setAttribute(K,M);}else{F.DEFAULT_SETTER.apply(this,arguments);}}}return this;},setAttrs:function(K){if(this._setAttrs){this._setAttrs(K);}else{C.Object.each(K,function(L,M){this.set(M,L);},this);}return this;},getAttrs:function(L){var K={};if(this._getAttrs){this._getAttrs(L);}else{C.Array.each(L,function(M,N){K[M]=this.get(M);},this);}return K;},create:F.create,compareTo:function(K){var L=this._node;if(K instanceof C.Node){K=K._node;}return L===K;},inDoc:function(L){var K=this._node;L=(L)?L._node||L:K[B];if(L.documentElement){return C.DOM.contains(L.documentElement,K);}},getById:function(M){var L=this._node,K=C.DOM.byId(M,L[B]);if(K&&C.DOM.contains(L,K)){K=C.one(K);}else{K=null;}return K;},ancestor:function(K,L){return C.one(C.DOM.ancestor(this._node,J(K),L));},previous:function(L,K){return C.one(C.DOM.elementByAxis(this._node,"previousSibling",J(L),K));},next:function(L,K){return C.one(C.DOM.elementByAxis(this._node,"nextSibling",J(L),K));},siblings:function(K){return C.all(C.DOM.siblings(this._node,J(K)));},one:function(K){return C.one(C.Selector.query(K,this._node,true));},query:function(K){return this.one(K);},all:function(K){var L=C.all(C.Selector.query(K,this._node));L._query=K;L._queryRoot=this;return L;},queryAll:function(K){return this.all(K);},test:function(K){return C.Selector.test(this._node,K);},remove:function(L){var M=this._node,K=M.parentNode;if(K){K.removeChild(M);}if(L){this.destroy(true);}return this;},replace:function(K){var L=this._node;L.parentNode.replaceChild(C.Node.getDOMNode(K),L);return this;},purge:function(L,K){C.Event.purgeElement(this._node,L,K);return this;},destroy:function(K){delete F._instances[this[D]];this.purge(K);if(this.unplug){this.unplug();}this._node._yuid=null;this._node=null;this._stateProxy=null;},invoke:function(R,L,K,Q,P,O){var N=this._node,M;if(L&&L instanceof C.Node){L=L._node;}if(K&&K instanceof C.Node){K=K._node;}M=N[R](L,K,Q,P,O);return C.Node.scrubVal(M,this);},each:function(L,K){K=K||this;
return L.call(K,this);},item:function(K){return this;},size:function(){return this._node?1:0;},insert:function(M,K){var L=this._node;if(M){if(typeof K==="number"){K=this._node.childNodes[K];}else{if(K&&K._node){K=K._node;}}if(typeof M!=="string"){if(M._node){M=M._node;}else{if(M._nodes||(!M.nodeType&&M.length)){M=C.all(M);C.each(M._nodes,function(N){C.DOM.addHTML(L,N,K);});return this;}}}C.DOM.addHTML(L,M,K);}else{}return this;},prepend:function(K){return this.insert(K,0);},append:function(K){return this.insert(K,null);},setContent:function(K){if(K){if(K._node){K=K._node;}else{if(K._nodes){K=C.DOM._nl2Frag(K._nodes);}}}C.DOM.addHTML(this._node,K,"replace");return this;},swap:document.documentElement.swapNode?function(K){this._node.swapNode(C.Node.getDOMNode(K));}:function(K){K=C.Node.getDOMNode(K);var M=this._node,L=K.parentNode,N=K.nextSibling;if(N===M){L.insertBefore(M,K);}else{if(K===M.nextSibling){L.insertBefore(K,M);}else{M.parentNode.replaceChild(K,M);C.DOM.addHTML(L,M,N);}}return this;},hasMethod:function(L){var K=this._node;return(K&&K[L]&&(typeof K[L]==="function"));}},true);C.Node=F;C.get=C.Node.get;C.one=C.Node.one;var A=function(K){if(typeof K==="string"){this._query=K;K=C.Selector.query(K);}else{if(K.nodeType){K=[K];}else{K=C.Array(K,0,true);}}A._instances[C.stamp(this)]=this;this._nodes=K;};A.NAME="NodeList";A.getDOMNodes=function(K){return K._nodes;};A._instances=[];A.each=function(K,N,M){var L=K._nodes;if(L&&L.length){C.Array.each(L,N,M||K);}else{}};A.addMethod=function(K,M,L){if(K&&M){A.prototype[K]=function(){var O=[],N=arguments;C.Array.each(this._nodes,function(T){var S="_yuid",Q=C.Node._instances[T[S]],R,P;if(!Q){Q=A._getTempNode(T);}R=L||Q;P=M.apply(R,N);if(P!==undefined&&P!==Q){O[O.length]=P;}});return O.length?O:this;};}else{}};A.importMethod=function(M,K,L){if(typeof K==="string"){L=L||K;A.addMethod(K,M[K]);}else{C.Array.each(K,function(N){A.importMethod(M,N);});}};A._getTempNode=function(L){var K=A._tempNode;if(!K){K=C.Node.create("<div></div>");A._tempNode=K;}K._node=L;K._stateProxy=L;return K;};C.mix(A.prototype,{item:function(K){return C.one((this._nodes||[])[K]);},each:function(M,L){var K=this;C.Array.each(this._nodes,function(O,N){O=C.one(O);return M.call(L||O,O,N,K);});return K;},batch:function(L,K){var M=this;C.Array.each(this._nodes,function(P,O){var N=C.Node._instances[P[D]];if(!N){N=A._getTempNode(P);}return L.call(K||N,N,O,M);});return M;},some:function(M,L){var K=this;return C.Array.some(this._nodes,function(O,N){O=C.one(O);L=L||O;return M.call(L,O,N,K);});},toFrag:function(){return C.one(C.DOM._nl2frag(this._nodes));},indexOf:function(K){return C.Array.indexOf(this._nodes,C.Node.getDOMNode(K));},filter:function(K){return C.all(C.Selector.filter(this._nodes,K));},modulus:function(M,L){L=L||0;var K=[];A.each(this,function(O,N){if(N%M===L){K.push(O);}});return C.all(K);},odd:function(){return this.modulus(2,1);},even:function(){return this.modulus(2);},destructor:function(){delete A._instances[this[D]];},refresh:function(){var N,L=this._nodes,M=this._query,K=this._queryRoot;if(M){if(!K){if(L&&L[0]&&L[0].ownerDocument){K=L[0].ownerDocument;}}this._nodes=C.Selector.query(M,K);}return this;},on:function(N,M,L){var K=C.Array(arguments,0,true);K.splice(2,0,this._nodes);K[3]=L||this;return C.on.apply(C,K);},after:function(N,M,L){var K=C.Array(arguments,0,true);K.splice(2,0,this._nodes);K[3]=L||this;return C.after.apply(C,K);},size:function(){return this._nodes.length;},isEmpty:function(){return this._nodes.length<1;},toString:function(){var N="",M=this[D]+": not bound to any nodes",K=this._nodes,L;if(K&&K[0]){L=K[0];N+=L[E];if(L.id){N+="#"+L.id;}if(L.className){N+="."+L.className.replace(" ",".");}if(K.length>1){N+="...["+K.length+" items]";}}return N||M;}},true);A.importMethod(C.Node.prototype,["append","detach","detachAll","insert","prepend","remove","removeAttribute","set","setContent"]);A.prototype.get=function(L){var O=[],N=this._nodes,M=false,P=A._getTempNode,K,Q;if(N[0]){K=C.Node._instances[N[0]._yuid]||P(N[0]);Q=K._get(L);if(Q&&Q.nodeType){M=true;}}C.Array.each(N,function(R){K=C.Node._instances[R._yuid];if(!K){K=P(R);}Q=K._get(L);if(!M){Q=C.Node.scrubVal(Q,K);}O.push(Q);});return(M)?C.all(O):O;};C.NodeList=A;C.all=function(K){return new A(K);};C.Node.all=C.all;C.Array.each(["replaceChild","appendChild","insertBefore","removeChild","hasChildNodes","cloneNode","hasAttribute","removeAttribute","scrollIntoView","getElementsByTagName","focus","blur","submit","reset","select"],function(K){C.Node.prototype[K]=function(O,M,L){var N=this.invoke(K,O,M,L);return N;};});F.importMethod(C.DOM,["contains","setAttribute","getAttribute"]);C.NodeList.importMethod(C.Node.prototype,["getAttribute","setAttribute"]);(function(L){var K=["hasClass","addClass","removeClass","replaceClass","toggleClass"];L.Node.importMethod(L.DOM,K);L.NodeList.importMethod(L.Node.prototype,K);})(C);if(!document.documentElement.hasAttribute){C.Node.prototype.hasAttribute=function(K){return !!(this._node.attributes[K]&&this._node.attributes[K].specified);};}C.Node.ATTRS.type={setter:function(L){if(L==="hidden"){try{this._node.type="hidden";}catch(K){this.setStyle("display","none");this._inputType="hidden";}}else{try{this._node.type=L;}catch(K){}}return L;},getter:function(){return this._inputType||this._node.type;},_bypassProxy:true};},"@VERSION@",{requires:["dom-base","selector-css2","event-base"]});