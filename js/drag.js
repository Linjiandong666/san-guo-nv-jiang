(function(w){
	w.contentDrag = function (navWrap,callback) {
//		var navWrap = document.querySelector('#wrap .contentWrap .content .navWrap');
		var navList = navWrap.firstElementChild;
		var startY = 0;
		var startX = 0;
		var eleY = 0;
		var isFirst = true;
		var s1 = 0;
		var s2 = 0;
		var t1 = 0;
		var t2 = 0;
		var timer = null;
		var tween = {
			Linear: function(t,b,c,d){ return c*t/d + b; },
			easeOut: function(t,b,c,d,s){
	            if (s == undefined) s = 1.70158;
	            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	        }
		}
	
		navWrap.addEventListener('touchstart', function(event) {
			var touch = event.changedTouches[0];
			navList.style.transition = 'none';
			eleY = transformCss(navList, 'translateY');
			startY = touch.clientY;
			startX = touch.clientX;
			s1 = eleY;
			t1 = new Date().getTime(); //毫秒  
			isFirst = true;
			if(callback && typeof callback['start'] == 'function'){
				callback['start']();
			}
			clearInterval(timer);
		});
	
		navWrap.addEventListener('touchmove', function(event) {
			var touch = event.changedTouches[0];
			
			if(!isFirst){
				return;
			}
			
			var endY = touch.clientY;
			var endX = touch.clientX;
			var disY = endY - startY;
			var disX = endX - startX;
			
			
			if(Math.abs(disX) > Math.abs(disY)){
				if(isFirst){
					isFirst = false;
					return;
				}
			}
			
			
			var lastY = eleY + disY;
	
			//临界值的橡皮筋效果，滑100走80  有一个阻尼系数，我们需要求一个阻尼系数来让100减到80 
			//这个系数必须是 0~1之间的一个小数，并且这个小数会越来越小，才能达到最终的极限；
			if(lastY > 0) {
				var scale = 0.6 - lastY / (3 * navWrap.clientHeight);
				lastY = lastY * scale;
			} else if(lastY < navWrap.clientHeight - navList.offsetHeight) {
				var temp = Math.abs(lastY) - Math.abs(navWrap.clientHeight - navList.offsetHeight);
				var scale = 0.6 - temp / (3 * navWrap.clientHeight);
				temp = temp * scale;
				lastY = navWrap.clientHeight - navList.offsetHeight - temp;
			}
	
			transformCss(navList, 'translateY', lastY);
			//回调的调用方式，必须判断然后再调用，否则会影响到我们原来的功能；
			if(callback && typeof callback['move'] == 'function'){
				callback['move']();
			}
	
		});
	
		navWrap.addEventListener('touchend', function(event) {
			var touch = event.changedTouches[0];
			//加速
			s2 = transformCss(navList, 'translateY'); //这个位置和move当中最终设置的位置是重合的;
			t2 = new Date().getTime();
			var speed = (s2 - s1) / (t2 - t1);
			var lastY = s2 + speed * 100;
			var timeAll = 1;
			var type = 'Linear';
			
			if(lastY > 0){
				lastY = 0;
				type = 'easeOut';
			}else if(lastY < navWrap.clientHeight - navList.offsetHeight){
				lastY = navWrap.clientHeight - navList.offsetHeight;
				type = 'easeOut';
			}
			
//			t  当前次数
//			b  元素初始位置
//			c  元素需要变化的距离（加速的距离）
//			d  总共需要的次数
			tweenMove(lastY,timeAll,type);
			if(callback && typeof callback['endTrue'] == 'function'){
				callback['endTrue'](timer);
			}
			
			
			function tweenMove(lastY,timeAll,type){
				//			t  当前次数
				//			b  元素初始位置
				//			c  元素需要变化的距离（加速的距离）
				//			d  总共需要的次数
				var t = 0;
				var b = transformCss(navList,'translateY');
				var c = lastY - b;
				var d = timeAll/0.02;
				
				timer = setInterval(function(){
					if(t >= d){
						clearInterval(timer);
						if(callback && typeof callback['end'] == 'function'){
							callback['end']();
						}
					}else{
						t++;
						var lastY = tween[type](t,b,c,d);
						transformCss(navList, 'translateY', lastY);
						if(callback && typeof callback['move'] == 'function'){
							callback['move']();
						}
					}
					
				},20)
				
				
			}

			
	
			//回弹
//			var bezier = '';
//	
//			if(lastY > 0) {
//				lastY = 0;
//				bezier = 'cubic-bezier(.13,.67,.71,1.79)';
//			} else if(lastY < navWrap.clientHeight - navList.offsetHeight) {
//				lastY = navWrap.clientHeight - navList.offsetHeight;
//				bezier = 'cubic-bezier(.13,.67,.71,1.79)';
//			}
//	
//			navList.style.transition = '10s ' + bezier;
//			transformCss(navList, 'translateY', lastY);
			
			
		});
	}
})(window);

