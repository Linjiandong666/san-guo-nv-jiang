(function(w) {
	w.gesture = function(node, callback) {
		var isStart = false;
		var startD = 0;
		var startC = 0;
		node.addEventListener('touchstart', function(event) {
			var touch = event.touches;
			if(touch.length >= 2) {
				isStart = true;
				//俩根手指初始的角度
				startD = getD(touch[0], touch[1]);
				//俩根手指的初始距离差
				startC = getC(touch[0], touch[1]);

				if(callback && typeof callback['start'] == 'function') {
					callback['start']();
				}
			}
		});

		node.addEventListener('touchmove', function(event) {
			var touch = event.touches;
			if(touch.length >= 2) {

				//拿到两根手指的角度D
				var endD = getD(touch[0], touch[1]);
				//拿到结束的角度 - 开始的角度
				var deg = endD - startD;

				//拿到两根手机的距离差
				var endC = getC(touch[0], touch[1]);
				var scale = endC / startC;

				event.rotate = deg;
				event.scale = scale;

				if(callback && typeof callback['change'] == 'function') {
					callback['change'](event);
				}
			}
		});

		node.addEventListener('touchend', function(event) {
			var touch = event.touches;
			if(isStart && touch.length < 2) {
				if(callback && typeof callback['end'] == 'function') {
					callback['end']();
				}
			}
		});
	}
	w.getC = function(p1, p2) {
		var disX = p1.clientX - p2.clientX;
		var disY = p1.clientY - p2.clientY;
		var disC = Math.sqrt(disX * disX + disY * disY);
		return disC;
	}
	w.getD = function(p1, p2) {
		var disX = p1.clientX - p2.clientX;
		var disY = p1.clientY - p2.clientY;
		//特别强调，三角函数有关的全是弧度
		var radia = Math.atan2(disY, disX);
		//弧度转角度
		//		180 / pi     ? / radia
		var deg = 180 * radia / Math.PI;

		return deg;
	}
})(window);