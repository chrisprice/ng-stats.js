ng-stats.js
===========

An [ng-stats](https://github.com/kentcdodds/ng-stats) and [stats.js](https://github.com/mrdoob/stats.js/) smoothie.

Usage
=====

Run the following in the dev tools console -

```
var ngStats = new NgStats();
ngStats.setMode(1); // 0: Watch count, 1: Digest time (ms)

// align top-left
ngStats.domElement.style.position = 'absolute';
ngStats.domElement.style.left = '0px';
ngStats.domElement.style.top = '0px';

document.body.appendChild( ngStats.domElement );

ngStats.attach( document, 200, 2500 ); // Defaults for scopeElement, digestMsMax, watchersMax
```

And of course the same again, but this time as the obligatory bookmarklet snippet (courtesy of [Bookmarkleter](http://chriszarate.github.io/bookmarkleter/)) -

```
javascript:void%20function(){var%20NgStats=function(){var%20startTime,result,time,ms=0,msMin=1/0,msMax=0,fps=0,fpsMin=1/0,fpsMax=0,mode=0,container=document.createElement(%22div%22);container.id=%22stats%22,container.addEventListener(%22mousedown%22,function(event){event.preventDefault(),setMode(++mode%252)},!1),container.style.cssText=%22width:80px;opacity:0.9;cursor:pointer%22;var%20fpsDiv=document.createElement(%22div%22);fpsDiv.id=%22fps%22,fpsDiv.style.cssText=%22padding:0%200%203px%203px;text-align:left;background-color:%23002%22,container.appendChild(fpsDiv);var%20fpsText=document.createElement(%22div%22);fpsText.id=%22fpsText%22,fpsText.style.cssText=%22color:%230ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px%22,fpsText.innerHTML=%22W%22,fpsDiv.appendChild(fpsText);var%20fpsGraph=document.createElement(%22div%22);for(fpsGraph.id=%22fpsGraph%22,fpsGraph.style.cssText=%22position:relative;width:74px;height:30px;background-color:%230ff%22,fpsDiv.appendChild(fpsGraph);fpsGraph.children.length%3C74;){var%20bar=document.createElement(%22span%22);bar.style.cssText=%22width:1px;height:30px;float:left;background-color:%23113%22,fpsGraph.appendChild(bar)}var%20msDiv=document.createElement(%22div%22);msDiv.id=%22ms%22,msDiv.style.cssText=%22padding:0%200%203px%203px;text-align:left;background-color:%23020;display:none%22,container.appendChild(msDiv);var%20msText=document.createElement(%22div%22);msText.id=%22msText%22,msText.style.cssText=%22color:%230f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px%22,msText.innerHTML=%22D%22,msDiv.appendChild(msText);var%20msGraph=document.createElement(%22div%22);for(msGraph.id=%22msGraph%22,msGraph.style.cssText=%22position:relative;width:74px;height:30px;background-color:%230f0%22,msDiv.appendChild(msGraph);msGraph.children.length%3C74;){var%20bar=document.createElement(%22span%22);bar.style.cssText=%22width:1px;height:30px;float:left;background-color:%23131%22,msGraph.appendChild(bar)}var%20setMode=function(value){switch(mode=value){case%200:fpsDiv.style.display=%22block%22,msDiv.style.display=%22none%22;break;case%201:fpsDiv.style.display=%22none%22,msDiv.style.display=%22block%22}},updateGraph=function(dom,value){var%20child=dom.appendChild(dom.firstChild);child.style.height=value+%22px%22},countWatchers=function(target){var%20next,current=target,count=0;do%20if(count+=current.$$watchers%3Fcurrent.$$watchers.length:0,!(next=current.$$childHead||current!==target%26%26current.$$nextSibling))for(;current!==target%26%26!(next=current.$$nextSibling);)current=current.$parent;while(current=next);return%20count},bound=function(min,value,max){return%20Math.max(min,Math.min(value,max))},now=function(){return%20performance.now%3FMath.round(performance.now()):Date.now()};return{REVISION:1,domElement:container,setMode:setMode,attach:function(scopeElement,digestMsMax,watchersMax,digestTimesCollector){var%20scope=angular.element(scopeElement||document).scope(),$digest=scope.$digest;scope.$digest=function(){return%20startTime=now(),result=$digest.apply(this,arguments),time=now(),ms=time-startTime,msMin=Math.min(msMin,ms),msMax=Math.max(msMax,ms),msText.textContent=ms+%22%20D%20(%22+msMin+%22-%22+msMax+%22)%22,updateGraph(msGraph,bound(1,30-ms/(digestMsMax||200)*30,30)),fps=countWatchers(scope),fpsMin=Math.min(fpsMin,fps),fpsMax=Math.max(fpsMax,fps),fpsText.textContent=fps+%22%20W%20(%22+fpsMin+%22-%22+fpsMax+%22)%22,updateGraph(fpsGraph,bound(1,30-fps/(watchersMax||2500)*30,30)),digestTimesCollector%26%26digestTimesCollector.push(ms),result}},countWatchers:countWatchers}},ngStats=new%20NgStats;ngStats.setMode(1),ngStats.domElement.style.position=%22absolute%22,ngStats.domElement.style.left=%220px%22,ngStats.domElement.style.top=%220px%22,document.body.appendChild(ngStats.domElement),ngStats.attach(document,200,2500)}();
```

Misc.
=====

Count watchers for a given element (in dev tools where $0 is the currently selected element) -

```
ngStats.countWatchers(angular.element($0).scope())
```
