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
javascript:!function(){var%20e=function(){var%20e,t,n,i=0,a=1/0,l=0,o=0,d=1/0,s=0,r=0,c=document.createElement(%22div%22);c.id=%22stats%22,c.addEventListener(%22mousedown%22,function(e){e.preventDefault(),v(++r%252)},!1),c.style.cssText=%22width:80px;opacity:0.9;cursor:pointer%22;var%20p=document.createElement(%22div%22);p.id=%22fps%22,p.style.cssText=%22padding:0%200%203px%203px;text-align:left;background-color:%23002%22,c.appendChild(p);var%20h=document.createElement(%22div%22);h.id=%22fpsText%22,h.style.cssText=%22color:%230ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px%22,h.innerHTML=%22W%22,p.appendChild(h);var%20m=document.createElement(%22div%22);for(m.id=%22fpsGraph%22,m.style.cssText=%22position:relative;width:74px;height:30px;background-color:%230ff%22,p.appendChild(m);m.children.length%3C74;){var%20f=document.createElement(%22span%22);f.style.cssText=%22width:1px;height:30px;float:left;background-color:%23113%22,m.appendChild(f)}var%20x=document.createElement(%22div%22);x.id=%22ms%22,x.style.cssText=%22padding:0%200%203px%203px;text-align:left;background-color:%23020;display:none%22,c.appendChild(x);var%20u=document.createElement(%22div%22);u.id=%22msText%22,u.style.cssText=%22color:%230f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px%22,u.innerHTML=%22D%22,x.appendChild(u);var%20g=document.createElement(%22div%22);for(g.id=%22msGraph%22,g.style.cssText=%22position:relative;width:74px;height:30px;background-color:%230f0%22,x.appendChild(g);g.children.length%3C74;){var%20f=document.createElement(%22span%22);f.style.cssText=%22width:1px;height:30px;float:left;background-color:%23131%22,g.appendChild(f)}var%20v=function(e){switch(r=e){case%200:p.style.display=%22block%22,x.style.display=%22none%22;break;case%201:p.style.display=%22none%22,x.style.display=%22block%22}},y=function(e,t){var%20n=e.appendChild(e.firstChild);n.style.height=t+%22px%22},E=function(e){var%20t,n=e,i=0;do%20if(i+=n.$$watchers%3Fn.$$watchers.length:0,!(t=n.$$childHead||n!==e%26%26n.$$nextSibling))for(;n!==e%26%26!(t=n.$$nextSibling);)n=n.$parent;while(n=t);return%20i},b=function(e,t,n){return%20Math.max(e,Math.min(t,n))};return{REVISION:1,domElement:c,setMode:v,attach:function(r,c,p){var%20f=angular.element(r||document).scope(),x=f.$digest;f.$digest=function(){return%20e=Date.now(),t=x.apply(this,arguments),n=Date.now(),i=n-e,a=Math.min(a,i),l=Math.max(l,i),u.textContent=i+%22%20D%20(%22+a+%22-%22+l+%22)%22,y(g,b(1,30-i/(c||200)*30,30)),o=E(f),d=Math.min(d,o),s=Math.max(s,o),h.textContent=o+%22%20W%20(%22+d+%22-%22+s+%22)%22,y(m,b(1,30-o/(p||2500)*30,30)),t}},countWatchers:E}},t=new%20e;t.setMode(1),t.domElement.style.position=%22absolute%22,t.domElement.style.left=%220px%22,t.domElement.style.top=%220px%22,document.body.appendChild(t.domElement),t.attach(document,200,2500)}();
```

Misc.
=====

Count watchers for a given element (in dev tools where $0 is the currently selected element) -

```
ngStats.countWatchers(angular.element($0).scope())
```
