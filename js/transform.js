(function(w){
	w.transformCss = function(node, name, value) {
	//			var box = 
	//			arguments[2]  一般不会使用arguments，但是当你想要判断实参的个数的时候，会有大用；

	//			第一步:进来我们得有一个容器去保存我们要设置的属性及属性值;为了以后设置的时候一起去设置;

	//			var obj = {}//这样去创建对象，没法保存之前设置的值；
	//我们创建的对象容器是在对应的元素对象身上，每一个元素身上都会有自己对应的对象容器	
	if(!node.obj) {
		node.obj = {}
	}
	//			obj = {
	//				'translateY':200,
	//				'rotate':30,
	//				'skew':20,
	//				'translateX':100,
	//			}
	if(arguments.length > 2) {
		//设置值的逻辑
		//				var age = 'nianling';
		//				obj.age = 1;
		//				obj['age'] = 1
		//				obj[age] = obj['nianling']
		node.obj[name] = value;
		var result = '';
		for(var key in node.obj) {
			switch(key) {
				case 'translateX':
				case 'translateY':
				case 'translateZ':
				case 'translate':
					result += key + '(' + node.obj[key] + 'px) ';
					break;
				case 'rotateX':
				case 'rotateY':
				case 'rotateZ':
				case 'rotate':
				case 'skewX':
				case 'skewY':
				case 'skew':
					result += key + '(' + node.obj[key] + 'deg) ';
					break;
				case 'scaleX':
				case 'scaleY':
				case 'scale':
					result += key + '(' + node.obj[key] + ') ';
					break;
			}
		}
		//				result = 'translateY(200px) rotate(30deg) skew(20deg) translateX(100px) ';
		node.style.transform = result; //真正的把对象当中所有的属性值设置给元素；

		//				return undefined;
	} else {
		//读取值，一上来要判断要读取的这个属性有没有，如果没有，要去给赋默认值
		//不能直接返回undefined
		var result = 0;
		if(node.obj[name] == undefined) {
			//如果没有值，我们设置默认值
			if(name == 'scale' || name == 'scaleX' || name == 'scaleY') {
				result = 1;
			} else {
				result = 0;
			}
		} else {
			result = node.obj[name];
		}
		return result;
	}

}
})(window);


