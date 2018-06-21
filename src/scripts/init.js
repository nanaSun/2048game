let base_array=new Array(17);
base_array=base_array.join(0).split("").map((i)=>parseInt(i));//强行批量赋值
getNewPos()
getNewPos()
let container=document.getElementById("2048Game"),sons=[];
for(var i=0;i<base_array.length;i++){
	let tmp=document.createElement("li")
	sons.push(tmp)
	container.appendChild(tmp);
}
render()
document.addEventListener("keyup",function(e) {
	let {keyCode}=e,action;
	switch(keyCode){
		case 37:action="left";break;
		case 38:action="up";break;
		case 39:action="right";break;
		case 40:action="down";break;	
	}
	if(action) mergeTogether(action) 
})
let startX=0,startY=0,moveX=0,moveY=0;
container.addEventListener("touchstart",function(e) {
	startX=e.touches[0].clientX;
	startY=e.touches[0].clientY;
})
container.addEventListener("touchmove",function(e) {
	moveX=e.touches[0].clientX;
	moveY=e.touches[0].clientY;
})
container.addEventListener("touchend",function(e) {
	if(moveX===0&&moveY===0) return;
	let action="";
	let offX=startX-moveX,offY=startY-moveY;
	if(Math.abs(offY)<10&&Math.abs(offX)<10) return;
	if(Math.abs(offY)<Math.abs(offX)){
		if(offX>0){
			action="left";
		}else{
			action="right";
		}
	}else{
		if(offY>0){
			action="up";
		}else{
			action="down";
		}
	}
	if(action) mergeTogether(action) 
})
function getNewPos(array){
	let newNum=[2,4][Math.round(Math.random())],randomNum;
	if(array){
		randomNum=Math.floor(Math.random()*array.length);
		base_array[array[randomNum]]=newNum;
	}else{
		randomNum=Math.floor(Math.random()*base_array.length);
		base_array[randomNum]=newNum;
	}
}
function mergeTogether(type){
	/*
	step 相加的距离
	每行的距离
	 */
	let initPos,curPos,step,zeroPlace=[];

	switch(type){
		case "left":initPos=0;step=1;next=4;break;
		case "up":initPos=0;step=4;next=1;break;
		case "right":initPos=15;step=-1;next=-4;break;
		case "down":initPos=15;step=-4;next=-1;break;
	}
	let prev=0,lastpos,prepos,pos,isMoved=false;
	for(i=0;i<4;i++){
		prepos=initPos+next*i
		lastpos=prepos
		for(j=0;j<4;j++){
			pos=initPos+next*i+step*j
			if(base_array[pos]){
				base_array[lastpos]=base_array[pos]
				if(lastpos!==pos){
					base_array[pos]=0;
					isMoved=true;
				}
				if(base_array[prepos]!==base_array[lastpos]){
					prepos += step;
					lastpos += step
				}else if(base_array[prepos]===base_array[lastpos]&&prepos!==lastpos){
					base_array[prepos]=base_array[lastpos]*2
					base_array[lastpos]=0
					prepos += step
					isMoved=true;
				}else{
					lastpos += step
				}
			}
		}
	}
	base_array.forEach(function(i,index){
		if(i===0)
			zeroPlace.push(index)
	})
	if(isMoved&&zeroPlace.length>0) getNewPos(zeroPlace)
	render();
}
function render(){
	sons.forEach(function(son,index){
		let tmp=parseInt(base_array[index]);
		if(tmp===0){
			son.innerHTML="";
		}else{
			son.innerHTML=base_array[index];
		}
	})
}
/*
00 01 02 03 
04       07
08       11
12 13 14 15
 */
