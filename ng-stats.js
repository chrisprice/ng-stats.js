/**
 * chrisprice/ng-stats.js
 * A kentcdodds/ng-stats and mrdoob/stats.js smoothie.
 */

var NgStats = function () {

	var startTime, result, time;
	var ms = 0, msMin = Infinity, msMax = 0;
	var fps = 0, fpsMin = Infinity, fpsMax = 0;
	var mode = 0;

	var container = document.createElement( 'div' );
	container.id = 'stats';
	container.addEventListener( 'mousedown', function ( event ) { event.preventDefault(); setMode( ++ mode % 2 ) }, false );
	container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

	var fpsDiv = document.createElement( 'div' );
	fpsDiv.id = 'fps';
	fpsDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#002';
	container.appendChild( fpsDiv );

	var fpsText = document.createElement( 'div' );
	fpsText.id = 'fpsText';
	fpsText.style.cssText = 'color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	fpsText.innerHTML = 'W';
	fpsDiv.appendChild( fpsText );

	var fpsGraph = document.createElement( 'div' );
	fpsGraph.id = 'fpsGraph';
	fpsGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0ff';
	fpsDiv.appendChild( fpsGraph );

	while ( fpsGraph.children.length < 74 ) {

		var bar = document.createElement( 'span' );
		bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#113';
		fpsGraph.appendChild( bar );

	}

	var msDiv = document.createElement( 'div' );
	msDiv.id = 'ms';
	msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;display:none';
	container.appendChild( msDiv );

	var msText = document.createElement( 'div' );
	msText.id = 'msText';
	msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	msText.innerHTML = 'D';
	msDiv.appendChild( msText );

	var msGraph = document.createElement( 'div' );
	msGraph.id = 'msGraph';
	msGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
	msDiv.appendChild( msGraph );

	while ( msGraph.children.length < 74 ) {

		var bar = document.createElement( 'span' );
		bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
		msGraph.appendChild( bar );

	}

	var setMode = function ( value ) {

		mode = value;

		switch ( mode ) {

			case 0:
				fpsDiv.style.display = 'block';
				msDiv.style.display = 'none';
				break;
			case 1:
				fpsDiv.style.display = 'none';
				msDiv.style.display = 'block';
				break;
		}

	};

	var updateGraph = function ( dom, value ) {

		var child = dom.appendChild( dom.firstChild );
		child.style.height = value + 'px';

	};

	var countWatchers = function ( target ) {

		var current = target, count = 0, next;

		do {

			count += current.$$watchers ? current.$$watchers.length : 0;

			if ( ! ( next = ( current.$$childHead || ( current !== target && current.$$nextSibling ) ) ) ) {
				while ( current !== target && ! ( next = current.$$nextSibling ) ) {
					current = current.$parent;
				}
			}

		} while ( current = next );

		return count;

	};

	var bound = function ( min, value, max ) {

		return Math.max( min, Math.min( value, max ) );

	};

	return {

		REVISION: 1,

		domElement: container,

		setMode: setMode,

		attach: function (scopeElement, digestMsMax, watchersMax) {

			var scope = angular.element( scopeElement || document ).scope(),
				$digest = scope.$digest;

			scope.$digest = function() {

				startTime = Date.now();
				result = $digest.apply( this, arguments );
				time = Date.now();

				ms = time - startTime;
				msMin = Math.min( msMin, ms );
				msMax = Math.max( msMax, ms );

				msText.textContent = ms + ' D (' + msMin + '-' + msMax + ')';
				updateGraph( msGraph, bound( 1, 30 - ( ms / ( digestMsMax || 200 ) ) * 30, 30 ) );

				fps = countWatchers( scope );
				fpsMin = Math.min( fpsMin, fps );
				fpsMax = Math.max( fpsMax, fps );

				fpsText.textContent = fps + ' W (' + fpsMin + '-' + fpsMax + ')';
				updateGraph( fpsGraph, bound( 1, 30 - ( fps / ( watchersMax || 2500 ) ) * 30, 30 ) );

				return result;

			};

		}

	}

};
