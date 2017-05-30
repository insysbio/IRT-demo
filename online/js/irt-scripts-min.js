/*
This file is a part of IRT navigator
Author: Evgeny Metelkin

This work is licensed under a Creative Commons Attribution-NoDerivatives 4.0 International 

License http://creativecommons.org/licenses/by-nd/4.0/

© Institute for Systems Biology, Moscow, 2016-2017
http://insysbio.ru
*/
function readXml(a){try{xmlhttp=new XMLHttpRequest,xmlhttp.open("GET",a,!1),xmlhttp.send();var b=xmlhttp.responseXML;return b}catch(a){return null}}function readXml2(a,b){var c=new FileReader;c.onload=function(){var a=c.result.toString(),d=(new DOMParser).parseFromString(a,"text/xml");b(d)},c.readAsText(a)}function hideSp(a){null!=document.getElementById(a).getAttribute("hidden")?document.getElementById(a).removeAttribute("hidden"):document.getElementById(a).setAttribute("hidden","true")}function irtns(a){var b={svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink",html:"http://www.w3.org/1999/xhtml",irt:"http://irt.insilicobio.ru/ns",sbml:"http://www.sbml.org/sbml/level2/version4",mml:"http://www.w3.org/1998/Math/MathML",l2v1:"http://www.sbml.org/sbml/level2/version1",l2v2:"http://www.sbml.org/sbml/level2/version2",l2v3:"http://www.sbml.org/sbml/level2/version3",l2v4:"http://www.sbml.org/sbml/level2/version4",l2v5:"http://www.sbml.org/sbml/level2/version5"};return b[a]||null}function initCheck(a){var b,c=document.getElementById("checking").children[0];c.className="check-true";var d=!!window.chrome&&!!window.chrome.webstore,e=document.getElementById("checking").children[1];e.className=d?"check-true":"check-false";var f=Math.max(screen.availHeight,screen.availWidth)>=680,g=!("ontouchstart"in document.documentElement),h=document.getElementById("checking").children[2];g=true;h.className=f&&g?"check-true":"check-false";var i=!0;try{var j=window.open();if(j.close(),!j)throw"Blocking windows"}catch(a){i=!1}finally{var k=document.getElementById("checking").children[3];k.className=i?"check-true":"check-false"}var l=!0;try{xmlhttp=new XMLHttpRequest,xmlhttp.open("GET",DBVersion+"indexes.xml",!1),xmlhttp.send(),indexesDoc=xmlhttp.responseXML}catch(a){l=!1}finally{var m=document.getElementById("checking").children[4];m.className=l?"check-true":"check-false"}var b=d&&f&&g&&i&&l;b&&a(function(){document.getElementById("welcomeModal").style.display="none"})}function initApp(a){document.styleSheets[2].disabled=!0,iddbDoc=readXml(DBVersion+indexesDoc.getElementsByTagName("identifications")[0].getAttribute("path")),openModel(),initializeSearch(),initializeFavorite(),initializePagesNav(),initializeSchemesNav(),initializeSectionNav(),openSection("pages"),initializeFooter(),updateWindowHeight(),window.addEventListener("resize",updateWindowHeight),a()}function initializeSearch(){var a=readXml("./js/sbml2tab.xsl"),b=new XSLTProcessor;b.importStylesheet(a);var c=b.transformToFragment(modelDoc,document);document.getElementById("searchDiv").appendChild(c);for(var d=document.evaluate(".//html:div[@irt:ref]",document.getElementById("searchDiv").firstElementChild,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),e=0;e<d.snapshotLength;e++)d.snapshotItem(e).addEventListener("mousedown",mouseDownElement,!1)}function initializeFavorite(){var a=readXml("./js/sbml2favorite.xsl"),b=new XSLTProcessor;b.importStylesheet(a);var c=b.transformToFragment(modelDoc,document);document.getElementById("rightDiv").appendChild(c);for(var d=document.evaluate(".//html:div[@irt:ref]",document.getElementById("rightDiv").firstElementChild,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),e=0;e<d.snapshotLength;e++)d.snapshotItem(e).addEventListener("mouseover",mouseOverElement,!1),d.snapshotItem(e).addEventListener("mouseout",mouseOutElement,!1),d.snapshotItem(e).addEventListener("mousedown",mouseDownElement2,!1)}function initializeFooter(){var a="<span class='w3-large'>"+indexesDoc.documentElement.getAttribute("name")+" "+indexesDoc.documentElement.getAttribute("version")+"</span> <span class='w3-medium'>by "+indexesDoc.documentElement.getAttribute("copyright")+"</span>";document.getElementById("footerDiv").innerHTML=a}function initializeSectionNav(){indexesDoc.getElementsByTagName("pages")[0].setAttribute("hasChildren","true"),indexesDoc.getElementsByTagName("pages")[0].setAttribute("num","0"),indexesDoc.getElementsByTagName("schemes")[0].setAttribute("hasChildren","true"),indexesDoc.getElementsByTagName("schemes")[0].setAttribute("num","1"),indexesDoc.getElementsByTagName("models")[0].setAttribute("hasChildren","false"),indexesDoc.getElementsByTagName("models")[0].setAttribute("num","2"),indexesDoc.getElementsByTagName("save")[0].setAttribute("hasChildren","false"),indexesDoc.getElementsByTagName("save")[0].setAttribute("num","3")}function openSection(a){for(var b=document.getElementsByClassName("irt-section"),c=0;c<b.length;c++)b[c].style.display="none";var d=document.getElementsByClassName("sectionLink");for(c=0;c<b.length;c++)d[c].className=d[c].className.replace(" w3-grey","");for(var e=document.getElementsByClassName("sectionNav"),c=0;c<e.length;c++)e[c].style.display="none";num=indexesDoc.getElementsByTagName(a)[0].getAttribute("num"),b[num].style.display="block",d[num].className+=" w3-grey","true"==indexesDoc.getElementsByTagName(a)[0].getAttribute("hasChildren")&&(e[num].style.display="block")}function initializePagesNav(){for(var a=indexesDoc.evaluate("//irt:pages/irt:page",indexesDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),b=0;b<a.snapshotLength;b++){var c=a.snapshotItem(b).getAttribute("name");a.snapshotItem(b).setAttribute("num",b);var d=document.createElement("li");d.className="leftLink1",d.textContent=c,document.getElementById("pagesUl").appendChild(d),d.addEventListener("click",openHtmlPage.bind(null,a.snapshotItem(b).id),!1)}openHtmlPage(a.snapshotItem(0).id)}function initializeSchemesNav(){for(var a=indexesDoc.evaluate("//irt:schemes/irt:scheme[@active='true']",indexesDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),b=0;b<a.snapshotLength;b++){var c=a.snapshotItem(b).getAttribute("name");a.snapshotItem(b).setAttribute("num",b);var d=document.createElement("li");d.className="leftLink2",d.textContent=c,document.getElementById("schemesUl").appendChild(d),d.addEventListener("click",openSvgScheme.bind(null,a.snapshotItem(b).id),!1)}openSvgScheme(a.snapshotItem(0).id)}function openSvgScheme(a){var b=document.getElementById("schemesDiv");if(b.children.length>0&&b.removeChild(b.children[0]),null!=a){var c=indexesDoc.getElementById(a).getAttribute("num"),d=document.getElementsByClassName("leftLink2");for(i=0;i<d.length;i++)d[i].className=d[i].className.replace(" w3-grey","");d[c].className+=" w3-grey";var e=readXml(DBVersion+"/schemes/"+a+".svg");schemeNode=e.firstChild,b.appendChild(schemeNode),initSVG()}}function hideRightDiv(){var a=document.getElementById("rightDiv").style;"block"==a.display?a.display="none":a.display="block"}function updateWindowHeight(){var a=document.documentElement.clientHeight-document.getElementById("topDiv").clientHeight-document.getElementById("footerDiv").clientHeight;document.getElementById("mainDiv").style.height=a+"px"}function filterSbml(){var a=document.getElementById("filter").value.toLowerCase();if(""!=a){for(var b="//sbml:*[@covered='false']",c=modelDoc.evaluate(b,modelDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),d=0;d<c.snapshotLength;d++)c.snapshotItem(d).setAttribute("covered","true");for(var b="//sbml:*[@name[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'"+a+"')] or @id[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'"+a+"')]or sbml:notes/text()[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'"+a+"')] or @speciesType=//sbml:speciesType[sbml:notes/text()[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'"+a+"')]]/@id]",c=modelDoc.evaluate(b,modelDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),d=0;d<c.snapshotLength;d++)c.snapshotItem(d).setAttribute("covered","false");document.styleSheets[2].disabled=!1}else document.styleSheets[2].disabled=!0}function selectAllTable(){for(var a="//sbml:*[@included='false']",b=modelDoc.evaluate(a,modelDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),c=0;c<b.snapshotLength;c++){var d=b.snapshotItem(c).getAttribute("id");modelDoc.getElementById(d).setAttribute("included","true")}updateStatistics()}function deselectAllTable(){for(var a="//sbml:species[@included='true'] | //sbml:reaction[@included='true']",b=modelDoc.evaluate(a,modelDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),c=0;c<b.snapshotLength;c++){var d=b.snapshotItem(c).getAttribute("id");modelDoc.getElementById(d).setAttribute("included","false")}updateStatistics()}function openHtmlPage(a){var b=indexesDoc.getElementById(a).getAttribute("num"),c=document.getElementsByClassName("leftLink1");for(i=0;i<c.length;i++)c[i].className=c[i].className.replace(" w3-grey","");c[b].className+=" w3-grey";var d=DBVersion+indexesDoc.getElementById(a).getAttribute("path"),e=readXml(d),f=document.getElementById("pagesDiv");f.children.length>0&&f.removeChild(f.children[0]),f.appendChild(e.documentElement),MathJax.Hub.Queue(["Typeset",MathJax.Hub])}function openModel(){modelDoc=readXml(DBVersion+indexesDoc.getElementsByTagName("model")[0].getAttribute("path"));var a=modelDoc.documentElement.firstElementChild;a.setAttribute("touched",""),a.setAttribute("chosen",""),amo.observe(a,{attributes:!0,attributeOldValue:!0,attributeFilter:["touched","chosen"]});for(var b="//sbml:model//sbml:species[@id]/@id | //sbml:model//sbml:reaction[@id]/@id",c=modelDoc.evaluate(b,modelDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),d=0;d<c.snapshotLength;d++){var e=modelDoc.getElementById(c.snapshotItem(d).textContent);e.setAttribute("included","false"),e.setAttribute("covered","true"),amo.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:["included","covered"]})}for(var b="//sbml:compartment/@id ",c=modelDoc.evaluate(b,modelDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),d=0;d<c.snapshotLength;d++){var e=modelDoc.getElementById(c.snapshotItem(d).textContent);e.setAttribute("included","true"),e.setAttribute("covered","true"),amo.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:["covered"]})}}function onChangeSbml(a){a.map(function(a){if("covered"==a.attributeName){var b=a.target.id,c="true"==a.target.getAttribute("covered");if(c){for(var d="//svg:g[@irt:ref='"+b+"']",e=document.evaluate(d,schemeNode,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),f=0;f<e.snapshotLength;f++)e.snapshotItem(f).classList.add("irt-covered");document.getElementById("s_"+b).parentElement.parentElement.classList.add("irt-covered")}else{for(var d="//svg:g[@irt:ref='"+b+"']",e=document.evaluate(d,schemeNode,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),f=0;f<e.snapshotLength;f++)e.snapshotItem(f).classList.remove("irt-covered");document.getElementById("s_"+b).parentElement.parentElement.classList.remove("irt-covered")}}if("included"==a.attributeName){var b=a.target.id,g="true"==a.target.getAttribute("included");if(g){for(var d="//svg:g[@irt:ref='"+b+"']",e=document.evaluate(d,schemeNode,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),f=0;f<e.snapshotLength;f++)e.snapshotItem(f).classList.add("irt-included");document.getElementById("s_"+b).classList.add("irt-included"),document.getElementById("f_"+b).classList.add("irt-included"),modelDoc.getElementById("irt").getAttribute("chosen")==b&&(annotationWindow.document.getElementById("spanReactionId").classList.add("irt-included"),annotationWindow.document.getElementById("spanSpeciesId").classList.add("irt-included"))}else{for(var d="//svg:g[@irt:ref='"+b+"']",e=document.evaluate(d,schemeNode,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),f=0;f<e.snapshotLength;f++)e.snapshotItem(f).classList.remove("irt-included");document.getElementById("s_"+b).classList.remove("irt-included"),document.getElementById("f_"+b).classList.remove("irt-included"),modelDoc.getElementById("irt").getAttribute("chosen")==b&&(annotationWindow.document.getElementById("spanReactionId").classList.remove("irt-included"),annotationWindow.document.getElementById("spanSpeciesId").classList.remove("irt-included"))}annotationWindow && annotationWindow.focus()}if("chosen"==a.attributeName){for(var b=a.target.getAttribute("chosen"),d="//svg:g[@irt:ref='"+b+"']",e=document.evaluate(d,schemeNode,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),f=0;f<e.snapshotLength;f++)e.snapshotItem(f).classList.add("irt-chosen");if(document.getElementById("s_"+b).classList.add("irt-chosen"),document.getElementById("f_"+b).classList.add("irt-chosen"),annotationWindow=window.open("annotation.xhtml?"+b,"annotation","width=800,height=600,left=300,top=300,menubar=no,titlebar=no",!1),""!=a.oldValue){for(var d="//svg:g[@irt:ref='"+a.oldValue+"']",e=document.evaluate(d,schemeNode,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),f=0;f<e.snapshotLength;f++)e.snapshotItem(f).classList.remove("irt-chosen");document.getElementById("s_"+a.oldValue).classList.remove("irt-chosen"),document.getElementById("f_"+a.oldValue).classList.remove("irt-chosen")}}if("touched"==a.attributeName){for(var b=a.target.getAttribute("touched"),d="//svg:g[@irt:ref='"+b+"']",e=document.evaluate(d,schemeNode,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),f=0;f<e.snapshotLength;f++)e.snapshotItem(f).classList.add("irt-touched");for(var d="//svg:g[@irt:ref='"+a.oldValue+"']",e=document.evaluate(d,schemeNode,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),f=0;f<e.snapshotLength;f++)e.snapshotItem(f).classList.remove("irt-touched")}})}function shortAnnotation(a){var b=null;try{b=modelDoc.getElementById(a).getAttribute("name")}catch(a){}try{note=modelDoc.getElementById(a).getElementsByTagName("notes")[0].innerHTML}catch(a){}var c="<p><b>"+b+"</b> (<i>"+a+"</i>)</p><p>"+note+"</p>";return c}function initSVG(){var a=readXml("./style/style.svg").documentElement;schemeNode.appendChild(a.firstElementChild);for(var b=document.evaluate(".//svg:g[@irt:ref]",schemeNode,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),c=0;c<b.snapshotLength;c++){var d=b.snapshotItem(c).getAttribute("irt:ref"),e=modelDoc.getElementById(d);null!=e&&("false"!=e.getAttribute("covered")&&b.snapshotItem(c).classList.add("irt-covered"),"true"==e.getAttribute("included")&&b.snapshotItem(c).classList.add("irt-included"),modelDoc.documentElement.firstElementChild.getAttribute("chosen")==d&&b.snapshotItem(c).classList.add("irt-chosen"),"compartment"==e.nodeName&&b.snapshotItem(c).classList.add("irt-compartment"),"species"==e.nodeName&&b.snapshotItem(c).classList.add("irt-species"),"reaction"==e.nodeName&&b.snapshotItem(c).classList.add("irt-reaction")),b.snapshotItem(c).addEventListener("mouseover",mouseOverElement,!1),b.snapshotItem(c).addEventListener("mouseout",mouseOutElement,!1),b.snapshotItem(c).addEventListener("mousedown",mouseDownElement,!1)}}function mouseOverElement(a){var b=a.currentTarget.getAttribute("irt:ref");modelDoc.documentElement.firstElementChild.setAttribute("touched",b),document.getElementById("tip").style.top=a.clientY+"px",document.getElementById("tip").style.left=a.clientX+"px",document.getElementById("tip").innerHTML=shortAnnotation(b),to=setTimeout(function(){document.getElementById("tip").style.display="block"},500)}function mouseOutElement(a){modelDoc.documentElement.firstElementChild.setAttribute("touched",""),clearTimeout(to),document.getElementById("tip").style.display="none"}function mouseDownElement(a){var b=a.currentTarget.getAttribute("irt:ref"),c="true"==modelDoc.getElementById(b).getAttribute("included"),d=modelDoc.documentElement.firstElementChild.getAttribute("chosen")==b;d?modelDoc.getElementById(b).setAttribute("included",!c):modelDoc.documentElement.firstElementChild.setAttribute("chosen",b)}function mouseDownElement2(a){var b=a.currentTarget.getAttribute("irt:ref");modelDoc.documentElement.firstElementChild.setAttribute("chosen",b)}function selectAllSheme(){for(var b="//svg:g[@irt:ref and not(contains(@class, 'hidden'))]",c=document.evaluate(b,schemeNode,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),d=0;d<c.snapshotLength;d++){var e=c.snapshotItem(d).getAttribute("irt:ref");modelDoc.getElementById(e).setAttribute("included","true")}}function deselectAllSheme(){for(var b="//svg:g[@irt:ref and not(contains(@class, 'hidden')) and not(contains(@class, 'irt-compartment'))]",c=document.evaluate(b,schemeNode,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),d=0;d<c.snapshotLength;d++){var e=c.snapshotItem(d).getAttribute("irt:ref");modelDoc.getElementById(e).setAttribute("included","false")}}function createCloneModelDoc(){cloneModelDoc=modelDoc.cloneNode(!0);for(var a="//sbml:assignmentRule[@variable=//sbml:species[@included='true']/@id]/descendant::mml:ci/text() | //sbml:reaction[@included='true']/descendant::mml:ci/text()",b=cloneModelDoc.evaluate(a,cloneModelDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),c=0;c<b.snapshotLength;c++){var d=cloneModelDoc.getElementById(b.snapshotItem(c).textContent.clearSpace());d.setAttribute("mentioned","true")}for(var a="//sbml:species[@id=//sbml:reaction[@included='true']//sbml:*[@species]/@species]",b=cloneModelDoc.evaluate(a,cloneModelDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),c=0;c<b.snapshotLength;c++){var d=b.snapshotItem(c);d.setAttribute("mentioned","true")}for(var a="//sbml:assignmentRule[@variable=//sbml:parameter[@mentioned='true']/@id]/descendant::mml:ci/text()",b=cloneModelDoc.evaluate(a,cloneModelDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),c=0;c<b.snapshotLength;c++){var d=cloneModelDoc.getElementById(b.snapshotItem(c).textContent.clearSpace());d.setAttribute("mentioned","true")}for(var a="//sbml:assignmentRule[@variable=//sbml:species[@included='true']/@id] | //sbml:assignmentRule[@variable=//sbml:parameter[@mentioned='true']/@id]",b=cloneModelDoc.evaluate(a,cloneModelDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),c=0;c<b.snapshotLength;c++)b.snapshotItem(c).setAttribute("mentioned","true");for(var a="//sbml:unitDefinition[@id=//sbml:species[@mentioned='true' or @included='true']/@substanceUnits] | //sbml:unitDefinition[@id=//sbml:parameter[@mentioned='true']/@units] | //sbml:unitDefinition[@id=//sbml:compartment[@mentioned='true' or @included='true']/@units]",b=cloneModelDoc.evaluate(a,cloneModelDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),c=0;c<b.snapshotLength;c++)b.snapshotItem(c).setAttribute("mentioned","true");for(var a="//sbml:speciesType[@id=//sbml:species[@mentioned='true' or @included='true']/@speciesType]",b=cloneModelDoc.evaluate(a,cloneModelDoc,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),c=0;c<b.snapshotLength;c++)b.snapshotItem(c).setAttribute("mentioned","true")}function saveSBML(){updateStatistics();var a=document.getElementById("sbmlVersion").value;switch(a){case"L2V1":var b=readXml("./js/templatev2l1.xsl");break;case"L2V2":var b=readXml("./js/templatev2l2.xsl");break;case"L2V3":var b=readXml("./js/templatev2l3.xsl");break;case"L2V4":var b=readXml("./js/templatev2l4.xsl");break;case"L2V5":var b=readXml("./js/templatev2l5.xsl");break;case"L3V1":var b=readXml("./js/templatev3l1.xsl");break;default:alert("This vesion is not suported!")}var c=new XSLTProcessor;c.importStylesheet(b),document.getElementById("includeUnitDefinitions").checked&&c.setParameter(null,"unitDefinitions","true()"),document.getElementById("includeSpeciesTypes").checked&&c.setParameter(null,"speciesTypes","true()"),document.getElementById("includeAnnotation").checked&&c.setParameter(null,"annotation","true()"),document.getElementById("includeNotes").checked&&c.setParameter(null,"notes","true()");var d=c.transformToDocument(cloneModelDoc),e=new XMLSerializer,f=e.serializeToString(d);f='<?xml version="1.0" encoding="UTF-8" standalone="no"?>'+f;var g=document.createElement("a"),h=new Blob([f],{type:"text/plain"});g.setAttribute("href",window.URL.createObjectURL(h)),g.setAttribute("download","template "+a+".xml"),g.dataset.downloadurl=["text/plain",g.download,g.href].join(":"),g.draggable=!0,g.classList.add("dragout"),g.click()}function numOfIncludedCompartments(){var a="count(//sbml:model//sbml:compartment[@included='true'])",b=modelDoc.evaluate(a,modelDoc,irtns,XPathResult.ANY_TYPE,null);return b.numberValue}function numOfIncludedSpecies(){var a="count(//sbml:model//sbml:species[@included='true'])",b=modelDoc.evaluate(a,modelDoc,irtns,XPathResult.ANY_TYPE,null);return b.numberValue}function numOfIncludedReactions(){var a="count(//sbml:model//sbml:reaction[@included='true'])",b=modelDoc.evaluate(a,modelDoc,irtns,XPathResult.ANY_TYPE,null);return b.numberValue}function updateStatistics(){document.getElementById("numOfIncludedCompartments").innerHTML=numOfIncludedCompartments(),document.getElementById("numOfIncludedSpecies").innerHTML=numOfIncludedSpecies(),document.getElementById("numOfIncludedReactions").innerHTML=numOfIncludedReactions(),createCloneModelDoc()}function openODE(){odeWindow=window.open("ode.xhtml","ode","width=800,height=600")}function loadSBML(a){a.preventDefault();var d,b=document.getElementById("uploadTemplate").files[0],c=new FileReader;c.onload=function(a){var b=c.result.toString(),e=(new DOMParser).parseFromString(b,"text/xml");if("irt"==e.getElementsByTagName("model")[0].id){deselectAllTable();var f="//*[descendant::irt:included]/@id";d=modelDoc.evaluate(f,e,irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(var g=1;g<d.snapshotLength;g++)modelDoc.getElementById(d.snapshotItem(g).value).setAttribute("included","true");alert(d.snapshotLength-1+" element were included"),updateStatistics()}},c.readAsText(b)}var DBVersion=options.DBVersion,debuggingMode=options.debuggingMode,indexesDoc=null,modelDoc=null,iddbDoc=null,elementsDoc=null,schemeNode=null,annotationWindow=null,odeWindow=null;window.onload=function(){initCheck(initApp)};var amo=new MutationObserver(onChangeSbml);String.prototype.clearSpace=function(){return this.replace(/(^\s+|\s+$)/g,"")};var cloneModelDoc;