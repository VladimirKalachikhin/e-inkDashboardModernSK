/*
display()
displayON()
displayOFF()

realWindSymbolUpdate(direction=0,speed=0)

isValueNull(valueName,value)
chkTPV(tpvName,checksTPV)
chkAllTPV()

bigBlock(block,bigStyleName)
updBottomMessages()

MOBalarm()
closebottomOnButtonMessage()
sendMOBtoServer(status=true)

bearing(latlng1, latlng2)
equirectangularDistance(from,to)

generateUUID()
getCookie(name)
*/
var bottomMessages = {};

function display(changedTPV){
/* Функция, которая показвает картинку на основе tpv. 
changedTPV - список ключей tpv, которые изменились. Перересуются только эти элементы интерфейса. Типа, оптимизация.
*/
/* FOR TEST*/
//tpv = {};
//tpv.track = {};
//tpv.heading = {};
//tpv.heading.value = tpv.track.value + 10;
//changedTPV = null;
//displayData.track.headingDirection = true;
//displayData.heading.headingDirection = true;
/* END FOR TEST*/


/*
if(Object.keys(tpv).length === 0 && tpv.constructor === Object){	// менее через жопу установить факт, что объект пустой -- нельзя
	displayOFF();
	return;
};
*/

if(!changedTPV) changedTPV = Object.keys(displayData);
//console.log('[display] changedTPV:',changedTPV);
//console.log('[display] tpv:',tpv);
/* FOR TEST*/
//if(!tpv.heading) tpv.heading = {};
//changedTPV.push('heading');
//tpv.heading.value += (5 + Math.floor(Math.random() * 25));
//tpv.heading.value += 45;
//if(tpv.track) tpv.heading.value = tpv.track.value + 45;
/* END FOR TEST*/
for(let tpvName of changedTPV){
	// оказывается, case -- не блок, и объявленные внутри case переменные видимы во всём switch
	let str='',htmlBLock;
	let strPropLabel='',strPropVal='';
	switch(tpvName){
	case 'pluginStatus':
		//console.log('[display] pluginStatus:',tpv.pluginStatus);
		if(tpv.pluginStatus){
			switch(tpv.pluginStatus.value){
			case 'configCreate':
			case 'configChange':
				console.log('Plugin reports that config changed, so window reload.');
				location.reload(true);
				break;
			default:
			};
		};
		break;
	case 'position':
		//console.log('[display] position:',tpv.position,'mobPosition:',mobPosition);
		if(mobPosition && tpv.position) {	// обновляем расстояние до MOB
			const mobDist = equirectangularDistance(tpv.position.value,mobPosition);
			//console.log('[display] mobPosition:',mobPosition,'tpv.position:',tpv.position,'mobDist=',mobDist);
			// Расстояние до MOB в левом нижнем углу
			leftBottomBlock.style.display = 'inherit';
			leftBottomBlock.innerHTML = `${mobDist.toFixed(displayData.mob.precision)}<span style="font-size:var(--ltl1-font-size);"><br>${dashboardMOBalarmTXT}, ${dashboardAlarmDistanceMesTXT}</span>`;
			leftBottomBlock.classList.add('leftBottomFrameBlinker');
		}
		if(tpv.nextPoint && tpv.nextPoint.value && tpv.nextPoint.value.position && tpv.position) {	// обновляем следующую путевую точку
			displayNextPoint();
		}
		break;
	/* Рисование круга */
	case 'track':
		compassMessage.style.display = 'none';
		if(tpv.track && tpv.track.value != null && tpv.track.value != undefined) {
			center_icon.style.display = '';
			if(displayData.track.headingDirection) {
				if(tpv.heading && tpv.heading.value != null && tpv.heading.value != undefined) {
					//console.log('track=',tpv.track.value,'heading=',tpv.heading.value,'track-heading=',Math.max(tpv.track.value,tpv.heading.value)-Math.min(tpv.track.value,tpv.heading.value));
					center_marc.style.transform = `rotate(${tpv.track.value-tpv.heading.value}deg)`;
				}
			}
			compassCard.style.transform = `rotate(${360-tpv.track.value}deg)`;
			topMessage.innerHTML = `${displayData.track.label} ${tpv.track.value.toFixed(displayData.track.precision)}°`;
		}
		else {	// нужно показывать картушку, даже если нет направления, потому что на ней может показываться ветер и MOB
			compassCard.style.transform = `rotate(0deg)`;
			center_icon.style.display = 'none';
			compassMessage.innerHTML = `<span class="blink" style="font-size:3em;">?</span>`;
			compassMessage.style.display = '';
			topMessage.innerHTML = `${displayData.track.label} ?`;
		}
		if(mobPosition && tpv.position) {
			const mobBearing = bearing(tpv.position.value,mobPosition);
			mobMark.style.display = '';
			mobMark.style.transform = `rotate(${mobBearing}deg)`;
		}
		break;
	case 'heading':
		if(tpv.heading && tpv.heading.value != null && tpv.heading.value != undefined) {
			if(displayData.heading.headingDirection) {
				center_icon.style.transform = `rotate(0deg)`;
			}
			else {
				if(tpv.track && tpv.track.value != null && tpv.track.value != undefined) {
					//console.log('[display] tpv.heading.value=',tpv.heading.value,'tpv.track.value=',tpv.track.value,tpv.heading.value-tpv.track.value);
					center_icon.style.transform = `rotate(${tpv.heading.value-tpv.track.value}deg)`;
				}
			}
			bottomMessages.heading = `${displayData.heading.label} ${tpv.heading.value.toFixed(displayData.heading.precision)}°`;
			updBottomMessages();	// показывает нижнее сообщение
		}
		else {
			center_icon.style.transform = `rotate(0deg)`;
			delete bottomMessages.heading;
			updBottomMessages();	// показывает нижнее сообщение
		}
		break;
	case 'wangle':
		// Ветер у нас нормальный, т.е., относительно судна.
		// Реально значёт ветра будет перерсован, когда есть и wangle и wspeed
		// т.е., сначала придёт что-то одно, потом, когда придёт следующее - 
		// значёк будет нарисован, но с прошлым значением другого.
		// Эмулятор SKsim сперва присылает угол, а потом скорость
/* FOR TEST*/
		//if(!tpv.wangle) tpv.wangle = {};
		//tpv.wangle.value = 45;
/* END FOR TEST*/
		if(tpv.wspeed && tpv.wspeed.value != null && tpv.wspeed.value != undefined) {
			if(tpv.wangle && tpv.wangle.value != null && tpv.wangle.value != undefined) {
				//console.log('wind direction=',tpv.wangle.value,'wind speed=',tpv.wspeed.value);
				windSVGimage.setAttribute("transform", `rotate(${tpv.wangle.value-90})`);
			}
			else {
				realWindSymbolViewUpdate(null);
				delete bottomMessages.wspeed;
				updBottomMessages();	// показывает нижнее сообщение
			}
		}
		break;
	case 'wspeed':
		if(tpv.wangle && tpv.wangle.value != null && tpv.wangle.value != undefined) {
			if(tpv.wspeed && tpv.wspeed.value != null && tpv.wspeed.value != undefined) {
				//console.log('wind speed=',tpv.wspeed.value,'wind direction=',tpv.wangle.value);
				realWindSymbolViewUpdate(tpv.wspeed.value);
				bottomMessages.wspeed = `${displayData.wspeed.label} ${tpv.wspeed.value.toFixed(displayData.wspeed.precision)}`;
				updBottomMessages();	// показывает нижнее сообщение
			}
			else {
				realWindSymbolViewUpdate(null);
				delete bottomMessages.wspeed;
				updBottomMessages();	// показывает нижнее сообщение
			}
		}
		break;
	case 'collisions':
		//console.log('Уберём имеющиеся стрелки',collisionArrows.children.length)
		collisionArrows.innerHTML = '';
		rightBottomBlock.innerHTML = '';
		//console.log('осталось',collisionArrows.children.length)
		if(tpv.collisions && tpv.collisions.value){
			//console.log('collisions:',tpv.collisions.value);
			let collisions = Object.entries(tpv.collisions.value.vessels).sort(function(a,b){return a[1].dist - b[1].dist;});	// сортировка по дистанции, collisions - массив массивов из двух элементов, первый - бывший ключ, второй - бывшее значение
			//console.log('sorted collisions:',collisions);
			let minDist=Math.floor(collisions[0][1].dist+1),maxDist,step;
			if(collisions.length > 1){
				minDist = Math.floor(collisions[1][1].dist);
				maxDist = Math.floor(collisions[collisions.length-1][1].dist)+1;
				step = (maxDist-minDist)/4;
			}
			//console.log('minDist=',minDist,'maxDist=',maxDist,'step=',step);
			let nearestDist = '';
			for(let collision of collisions){
				const arrow = collisionArrow.cloneNode(true);
				arrow.id = collision[0];
				collisionArrows.appendChild(arrow);
				arrow.style.display = null;
				arrow.style.transform = `rotate(${collision[1].bearing}deg)`;
				//console.log(arrow);
				if(collision[1].dist < minDist) {
					//console.log('Ближайший');
					nearestDist = collision[1].dist
				}
				else if((collision[1].dist > minDist) && (collision[1].dist < (minDist+step))) {
					//console.log('Близкий');
					arrow.style.width = 'var(--collisionArrowWidthNormal)';
					arrow.style.left = 'var(--collisionArrowLeftNormal)';
				}
				else if((collision[1].dist > (minDist+step)) && (collision[1].dist < (minDist+2*step))) {
					//console.log('Средний');
					arrow.style.width = 'var(--collisionArrowWidthSmall)';
					arrow.style.left = 'var(--collisionArrowLeftSmall)';
				}
				else {
					//console.log('Дальний');
					arrow.style.width = 'var(--collisionArrowWidthLitle)';
					arrow.style.left = 'var(--collisionArrowLeftLitle)';
				}
				//console.log('tpv collisions',collision[1].dist);
			}
			// Расстояние до ближайшей опасности в правом нижнем углу
			rightBottomBlock.style.display = 'inherit';
			rightBottomBlock.innerHTML = `${nearestDist.toFixed(displayData.collisions.precision)}<span style="font-size:var(--ltl1-font-size);"><br>${dashboardCollisionAlarmTXT}, ${dashboardAlarmDistanceMesTXT}</span>`;
			rightBottomBlock.classList.add('rightBottomFrameBlinker');
		}
		else {
			rightBottomBlock.classList.remove('rightBottomFrameBlinker');
		}
		break;
	case 'mob':
		//console.log('mob:',JSON.stringify(tpv.mob));
		// Похоже, что автор Freeboard-SK индус. В любом случае - он дебил, и
		// разницы между выключением режима и сменой режима не видит.
		// Поэтому он выключает режим MOB установкой value.state = "normal"
		// вместо value = null, как это указано в документации.
		if(tpv.mob && tpv.mob.value && (tpv.mob.value.state != "normal")){	// режим MOB есть
			//console.log('mob:',tpv.mob.value);
			// mob as described https://github.com/SignalK/signalk-server/pull/1560
			// при этом у этих кретинов может быть "position": "No vessel position data."
			if(tpv.mob.value.data && tpv.mob.value.data.position){	
				mobPosition = {'longitude': tpv.mob.value.data.position.longitude,'latitude': tpv.mob.value.data.position.latitude,'nogeojson': true};
			}
			else if(tpv.mob.value.position && tpv.mob.value.position.features){	// Это GeoJSON, вероятно, от GaladrielMap
				// поищем точку, указанную как текущая
				let point;
				for(point of tpv.mob.value.position.features){	// там не только точки, но и LineString
					if((point.geometry.type == "Point")  && point.properties && point.properties.current){
						mobPosition = {'longitude': point.geometry.coordinates[0],'latitude': point.geometry.coordinates[1]};
						break;
					}
				};
				// Но кто-то левый может прислать GeoJSON без указания текущей точки. Тогда текущей станет последняя.
				if(!mobPosition) mobPosition = {'longitude': point.geometry.coordinates[0],'latitude': point.geometry.coordinates[1]};
				
			}
			else {
				if(tpv.mob.value.position){
					const s = JSON.stringify(tpv.mob.value.position);
					if(s.includes('longitude') && s.includes('latitude')){
						mobPosition = {'longitude': tpv.mob.value.position.longitude,'latitude': tpv.mob.value.position.latitude,'nogeojson': true};
					}
					else if(s.includes('lng') && s.includes('lat')){
						mobPosition = {'longitude': tpv.mob.value.position.lng,'latitude': tpv.mob.value.position.lat,'nogeojson': true};
					}
					else if(s.includes('lon') && s.includes('lat')){
						mobPosition = {'longitude': tpv.mob.value.position.lon,'latitude': tpv.mob.value.position.lat,'nogeojson': true};
					}
					else if(Array.isArray(tpv.mob.value.position)){
						mobPosition = {'longitude': tpv.mob.value.position[0],'latitude': tpv.mob.value.position[1],'nogeojson': true};
					};
				}
				else{
					const s = JSON.stringify(tpv.mob.value);
					if(s.includes('longitude') && s.includes('latitude')){
						mobPosition = {'longitude': tpv.mob.value.longitude,'latitude': tpv.mob.value.latitude,'nogeojson': true};
					}
					else if(s.includes('lng') && s.includes('lat')){
						mobPosition = {'longitude': tpv.mob.value.lng,'latitude': tpv.mob.value.lat,'nogeojson': true};
					}
					else if(s.includes('lon') && s.includes('lat')){
						mobPosition = {'longitude': tpv.mob.value.lon,'latitude': tpv.mob.value.lat,'nogeojson': true};
					}
					else if(Array.isArray(tpv.mob.value)){
						mobPosition = {'longitude': tpv.mob.value[0],'latitude': tpv.mob.value[1],'nogeojson': true};
					};
				};
				if(mobPosition){
					mobPosition.longitude = parseFloat(mobPosition.longitude);
					mobPosition.latitude = parseFloat(mobPosition.latitude);
					if(isNaN(mobPosition.longitude) || isNaN(mobPosition.latitude)) mobPosition = null;
				}
			}
			//console.log('The MOB is raised, mobPosition:',mobPosition);
		}
		else {	// режима MOB нет
			mobPosition = null;
			leftBottomBlock.innerHTML = '';
			leftBottomBlock.classList.remove('leftBottomFrameBlinker');
			mobMark.style.display = 'none';
		}
		break;
	/* Рисование углов */
	case 'propRevolutions0':
	case 'propRevolutions1':
		if(!displayData[tpvName].DOMid) break;	// данный параметр запрошен, но не должен показываться
		if((displayData[tpvName].DOMid == 'leftBottomBlock') && mobPosition) break;	// не будем рисовать в нижнем левом углу, если режим MOB
		if((displayData[tpvName].DOMid == 'rightBottomBlock') && tpv.collisions && tpv.collisions.value) break;	// не будем рисовать в нижнем правом углу, если опасность столкновения
		//console.log('[display] tpvname:',tpvName,tpv[tpvName]);
		htmlBLock = document.getElementById(displayData[tpvName].DOMid);
		if(!tpv[tpvName] || tpv[tpvName].value === undefined) {	// null -- это двигатель остановлен. мог быть вызов display для всех величин -- для обновления экрана
			htmlBLock.style.display = 'none';	// чтобы и события отключить
			break;
		}
		if(tpvName[tpvName.length-1] == '0') {
			if(!tpv.propLabel0 && !tpv.propState0) break;	// нет никакой информации об этом двигателе
			if(tpv.propLabel0 && tpv.propLabel0.value) strPropLabel = `<span style="font-size:var(--ltl1-font-size);">${tpv.propLabel0.value}</span>`;
			if(tpv.propState0 && tpv.propState0.value == 'stopped'){
				strPropVal = `<span style="font-size:calc(var(--font-size)*0.7);">${dashboardPropStopTXT}</span>`;	// почему здесь не работает var(--small-font-size) ? 
			}
			else {
				strPropVal = tpv[tpvName].value.toFixed(displayData[tpvName].precision);			
			}
		}
		else {
			if(!tpv.propLabel1 && !tpv.propState1) break;	// нет никакой информации об этом двигателе
			if(tpv.propLabel1 && tpv.propLabel1.value) strPropLabel = `<span style="font-size:var(--ltl1-font-size);">${tpv.propLabel1.value}</span>`;
			if(tpv.propState1 && tpv.propState1.value == 'stopped'){
				strPropVal = `<span style="font-size:calc(var(--font-size)*0.7);">${dashboardPropStopTXT}</span>`;	// почему здесь не работает var(--small-font-size) ? 
			}
			else {
				strPropVal = tpv[tpvName].value.toFixed(displayData[tpvName].precision);			
			}
		}
		if(displayData[tpvName].DOMid.includes('ottom')) {	// указано размещать в нижних углах
			str += strPropLabel+'<span style="font-size:var(--ltl1-font-size);"><br><br></span>';	// человеческое наименование двигателя из SignalK
			str += strPropVal;
			if(displayData[tpvName].label) str += `<span style="font-size:var(--ltl1-font-size);"><br>${displayData[tpvName].label}</span>`;
		}
		else {
			if(displayData[tpvName].label) str += `<span style="font-size:var(--ltl1-font-size);">${displayData[tpvName].label}<br><br></span>`;
			str += strPropVal;
			str += '<span style="font-size:var(--ltl1-font-size);"><br><br></span>'+strPropLabel;	// человеческое наименование двигателя из SignalK
		}
		htmlBLock.style.display = 'inherit';
		htmlBLock.innerHTML = str;
		break;
	case 'propTemperature0':
	case 'propTemperature1':
		if(!displayData[tpvName].DOMid) break;	// данный параметр запрошен, но не должен показываться
		if((displayData[tpvName].DOMid == 'leftBottomBlock') && mobPosition) break;	// не будем рисовать в нижнем левом углу, если режим MOB
		if((displayData[tpvName].DOMid == 'rightBottomBlock') && tpv.collisions && tpv.collisions.value) break;	// не будем рисовать в нижнем правом углу, если опасность столкновения
		//console.log('[display] tpvname:',tpvName,tpv[tpvName]);
		htmlBLock = document.getElementById(displayData[tpvName].DOMid);
		if(!tpv[tpvName] || tpv[tpvName].value === undefined) {	// мог быть вызов display для всех величин -- для обновления экрана
			htmlBLock.style.display = 'none';	// чтобы и события отключить
			break;
		}
		if(tpvName[tpvName.length-1] == '0') {
			if(!tpv.propLabel0 && !tpv.propState0) break;	// нет никакой информации об этом двигателе
			if(tpv.propLabel0 && tpv.propLabel0.value) strPropLabel = `<span style="font-size:var(--ltl1-font-size);">${tpv.propLabel0.value}</span>`;
			if(tpv.propState0 && tpv.propState0.value == 'stopped'){
				strPropVal = '<br>&nbsp;';
			}
			else {
				strPropVal = (tpv.propTemperature0.value-273.15).toFixed(displayData[tpvName].precision);
			}
		}
		else {
			if(!tpv.propLabel1 && !tpv.propState1) break;	// нет никакой информации об этом двигателе
			if(tpv.propLabel1 && tpv.propLabel1.value) strPropLabel = `<span style="font-size:var(--ltl1-font-size);">${tpv.propLabel1.value}</span>`;
			if(tpv.propState1 && tpv.propState1.value == 'stopped'){
				strPropVal = '<br>&nbsp;';
			}
			else {
				strPropVal = (tpv.propTemperature0.value-273.15).toFixed(displayData[tpvName].precision);
			}
		}
		if(displayData[tpvName].DOMid.includes('ottom')) {	// указано размещать в нижних углах
			str += strPropLabel+'<span style="font-size:var(--ltl1-font-size);"><br><br></span>';	// человеческое наименование двигателя из SignalK
			str += strPropVal;
			if(displayData[tpvName].label) str += `<span style="font-size:var(--ltl1-font-size);"><br>${displayData[tpvName].label}</span>`;
		}
		else {
			if(displayData[tpvName].label) str += `<span style="font-size:var(--ltl1-font-size);">${displayData[tpvName].label}<br><br></span>`;
			str += strPropVal;
			str += '<span style="font-size:var(--ltl1-font-size);"><br><br></span>'+strPropLabel;	// человеческое наименование двигателя из SignalK
		}
		htmlBLock.style.display = 'inherit';
		htmlBLock.innerHTML = str;
		break;
	case 'nextPoint':	// тут возможно рисование углов, но рисуется и метка на круге
		//console.log('[display] tpvname:',tpvName,tpv[tpvName]);
		if(!tpv[tpvName] || !tpv[tpvName].value) {
			nextPointDirection.style.display = 'none';
			if(displayData[tpvName].DOMid) document.getElementById(displayData[tpvName].DOMid).style.display = 'none';
			break;
		}
		if(!tpv.position || !tpv.position.value) break;	// если нет своих координат, мы не можем вычислить дальнейшее
		displayNextPoint();
		break;
	case 'speed':
	case 'depth':
	case 'airTemperature':
	case 'airPressure':
	case 'airHumidity':
	case 'waterTemperature':
	default:
		if(!displayData[tpvName].DOMid) break;	// данный параметр запрошен, но не должен показываться
		if((displayData[tpvName].DOMid == 'leftBottomBlock') && mobPosition) break;	// не будем рисовать в нижнем левом углу, если режим MOB
		if((displayData[tpvName].DOMid == 'rightBottomBlock') && tpv.collisions && tpv.collisions.value) break;	// не будем рисовать в нижнем правом углу, если опасность столкновения
		//console.log('[display] tpvname:',tpvName,tpv[tpvName]);
		htmlBLock = document.getElementById(displayData[tpvName].DOMid);
		if(!tpv[tpvName] || tpv[tpvName].value === null || tpv[tpvName].value === undefined) {	// мог быть вызов display для всех величин -- для обновления экрана
			htmlBLock.style.display = 'none';	// чтобы и события отключить
			break;
		}
		if(tpvName.includes('emperature')) tpv[tpvName].value -= 273.15;	// к температуре в Цельсия
		if(displayData[tpvName].DOMid.includes('ottom')) {	// указано размещать в нижних углах
			str += tpv[tpvName].value.toFixed(displayData[tpvName].precision);			
			if(displayData[tpvName].label) str += `<span style="font-size:var(--ltl1-font-size);"><br>${displayData[tpvName].label}</span>`;
		}
		else {
			if(displayData[tpvName].label) str += `<span style="font-size:var(--ltl1-font-size);">${displayData[tpvName].label}<br><br></span>`;
			str += tpv[tpvName].value.toFixed(displayData[tpvName].precision);			
		}
		htmlBLock.style.display = 'inherit';
		htmlBLock.innerHTML = str;
		break;
	}
}

function displayNextPoint(){
const azimuth = bearing(tpv.position.value, tpv.nextPoint.value.position);
nextPointDirection.style.transform = `rotate(${azimuth}deg)`;
nextPointDirection.style.display = 'inherit';

if(!displayData.nextPoint.DOMid) return;	// данный параметр запрошен, но не должен показываться
if((displayData.nextPoint.DOMid == 'leftBottomBlock') && mobPosition) return;	// не будем рисовать в нижнем левом углу, если режим MOB
if((displayData.nextPoint.DOMid == 'rightBottomBlock') && tpv.collisions && tpv.collisions.value) return;	// не будем рисовать в нижнем правом углу, если опасность столкновения

let dist = equirectangularDistance(tpv.position.value, tpv.nextPoint.value.position);
let mesTXT;
if(dist>1000){ 
	dist = (dist/1000).toFixed(displayData.nextPoint.precision+1);
	mesTXT = dashboarNextPointMesKMTXT;
}
else {
	dist = dist.toFixed(displayData.nextPoint.precision);
	mesTXT = dashboarNextPointMesMTXT;
}

const htmlBLock = document.getElementById(displayData.nextPoint.DOMid);
let str='';
if(displayData.nextPoint.DOMid.includes('ottom')) {	// указано размещать в нижних углах
	str += dist;			
	if(displayData.nextPoint.label) str += `<span style="font-size:var(--ltl1-font-size);"><br>${displayData.nextPoint.label}, ${mesTXT}</span>`;
}
else {
	if(displayData.nextPoint.label) str += `<span style="font-size:var(--ltl1-font-size);">${displayData.nextPoint.label}, ${mesTXT}<br><br></span>`;
	str += dist;			
}
htmlBLock.style.display = 'inherit';
htmlBLock.innerHTML = str;
}; // 	end function displayNextPoint
}; // end function display()


function displayON(){
/* включает отображение обычных элементов экрана, и выключает отображение сообщения */
console.log('[displayON]');

center_marc.style.display = '';
topMessage.style.display = '';
bottomMessage.style.display = '';
center_icon.style.display = '';
mobButton.style.display = '';

compassMessage.style.display = 'none';
}; // end function displayON


function displayOFF(){
/* выключает отображение обычных элементов экрана, и включает отображение сообщения */
console.log('[displayOFF]');

center_marc.style.display = 'none';
topMessage.style.display = 'none';
bottomMessage.style.display = 'none';
center_icon.style.display = 'none';
leftTopBlock.style.display = 'none';	// чтобы и события отключить
rightTopBlock.style.display = 'none';
rightBottomBlock.style.display = 'none';
leftBottomBlock.style.display = 'none';
mobButton.style.display = 'none';

compassMessage.innerHTML = `<span>${dashboardGNSSoldTXT}</span>`;
compassMessage.style.display = '';
}; // end function displayOFF


var oldWind = {'w25cnt': null,'w5cnt': null,'w2dt5cnt': null,'direction': null};

function realWindSymbolViewUpdate(speed=null){
/* Изменяет внешний вид символа ветра от данной скорости ветра. 
Но не поворачивает.
*/
// Символ
let windSVG = document.getElementById('windSVGimage');
if(!windSVG) return;	// картинка там как-то не сразу появляется
let windMark = windSVG.getElementById('wMark');

if(speed === null){
	while (windMark.firstChild) {	// удалим все символы из значка
		windMark.removeChild(windMark.firstChild);
	}
	return;
}

let posX=0, stepX=hbl.x2.baseVal.value, stepY=bLine.points[2].y-bLine.points[1].y;
//console.log('stepX=',stepX,'stepY=',stepY);
posX += bLine.points[0].x;

//console.log('[realWindSymbolViewUpdate] wind speed=',speed);
let w25cnt = Math.floor(speed/25);	// перо 25 м/сек
speed -= w25cnt * 25;
if(w25cnt) w25cnt = 1;	// одно перо. Не будем показывать фантастические скорости

let w5cnt = Math.floor(speed/5);	// перья 5 м/сек
speed -= w5cnt * 5;

let w2dt5cnt = Math.floor((speed*10)/25)
//console.log('speed=',speed,'w25cnt=',w25cnt,'w5cnt=',w5cnt,'w2dt5cnt=',w2dt5cnt);

if(oldWind.w25cnt == w25cnt && oldWind.w5cnt == w5cnt && oldWind.w2dt5cnt == w2dt5cnt) return;	// Вид стрелки не изменился

//console.log('Вид стрелки изменился -- перерисовываем');
oldWind.w25cnt = w25cnt; oldWind.w5cnt = w5cnt; oldWind.w2dt5cnt = w2dt5cnt;

while (windMark.firstChild) {	// удалим все символы из значка
	windMark.removeChild(windMark.firstChild);
}
// стрелка
windMark.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'use'));
windMark.lastChild.setAttribute('x','0');
windMark.lastChild.setAttribute('y','0');
windMark.lastChild.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#bLine');

//console.log('Перед половинным пером posX=',posX);
if(w2dt5cnt) {	// половинное перо
	// рисуем верхнюю линию Вообще-то, её длина должна быть равна w2dt5.points[3].x, но в данном случае мы просто вставляем hbl
	windMark.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'use'));
	windMark.lastChild.setAttribute('x',String(posX));
	windMark.lastChild.setAttribute('y',0);
	windMark.lastChild.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href','#hbl');
	// рисуем перо
	windMark.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'use'));
	windMark.lastChild.setAttribute('x',String(posX));
	windMark.lastChild.setAttribute('y',String(stepY));
	windMark.lastChild.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href','#w2dt5');
	posX += w2dt5.points[3].x;
	// рисуем продолжение
	upHline(posX);	// рисуем верхнюю соединительную линию, запоминать новое posX не надо
	posX = downHline(posX);	// рисуем нижнюю соединительную линию
}
//console.log('После половинного пера posX=',posX);

for(let i=w5cnt; i--;){	// рисуем перья 5 м/сек
	// рисуем верхнюю линию
	windMark.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'use'));
	windMark.lastChild.setAttribute('x',String(posX));
	windMark.lastChild.setAttribute('y',0);
	windMark.lastChild.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href','#hbl');
	// рисуем перо
	windMark.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'use'));
	windMark.lastChild.setAttribute('x',String(posX));
	windMark.lastChild.setAttribute('y',String(stepY));
	windMark.lastChild.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href','#w5');
	posX += w5.points[3].x;
	// рисуем продолжение
	if(i != 0){
		upHline(posX);	// рисуем верхнюю соединительную линию, запоминать новое posX не надо
		posX = downHline(posX);	// рисуем нижнюю соединительную линию
	}
	//console.log('posX=',posX,windMark);
}
//console.log('После 5 м/сек перьев posX=',posX);

for(let i=w25cnt; i--;){	// рисуем перья 25 м/сек
	upHline(posX);	// рисуем верхнюю соединительную линию, запоминать новое posX не надо
	posX = downHline(posX);	// рисуем нижнюю соединительную линию
	// рисуем верхнюю линию Она должна быть длиной с ширину w25
	windMark.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'line'));
	windMark.lastChild.setAttribute('x1',String(posX));
	windMark.lastChild.setAttribute('y1',2);
	windMark.lastChild.setAttribute('x2',String(posX+w25.points[2].x));
	windMark.lastChild.setAttribute('y2',2);
	// рисуем перо
	windMark.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'use'));
	windMark.lastChild.setAttribute('x',String(posX));
	windMark.lastChild.setAttribute('y',String(stepY));
	windMark.lastChild.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href','#w25');
	posX += w25.points[2].x;
}
//console.log('После 25 м/сек перьев posX=',posX);

// рисуем завершающую вертикальную линию
windMark.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'use'));
windMark.lastChild.setAttribute('x',String(posX));
windMark.lastChild.setAttribute('y',0);
windMark.lastChild.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href','#vbl');
//console.log('posX=',posX);


function upHline(posX){
for( let i=2; i--; ){
	windMark.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'use'));
	windMark.lastChild.setAttribute('x',String(posX));
	windMark.lastChild.setAttribute('y',0);
	windMark.lastChild.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href','#hbl');
	posX += hbl.x2.baseVal.value;
};
return posX;
}; //end function upHline
function downHline(posX){
for( let i=2; i--; ){
	windMark.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'use'));
	windMark.lastChild.setAttribute('x',String(posX));
	windMark.lastChild.setAttribute('y',String(bLine.points[2].y-bLine.points[1].y));
	windMark.lastChild.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href','#hbl');
	posX += hbl.x2.baseVal.value;
};
return posX;
}; //end function downHline
} // end function realWindSymbolUpdate


function MOBalarm(){
if(tpv.mob && tpv.mob.value && (tpv.mob.value.state != "normal")){	// режим MOB есть
	bottomOnButtonMessage.innerHTML = `
	<br>
	`;
	if(mobPosition && !mobPosition.nogeojson) bottomOnButtonMessage.innerHTML += `<div class="messageButton" style="width: 60%;margin:1em 0;" onclick="sendMOBtoServer(true,tpv.mob.value.position);"><img src="img/mob.svg"> ${dashboardMOBbuttonAddTXT}</div>`;
	bottomOnButtonMessage.innerHTML += `
	<div class="messageButton" style="width: 20%;" onclick="sendMOBtoServer(false);"> ✘ ${dashboardMOBbuttonCancelTXT}</div>
	`;
	bottomOnButtonMessage.style.display = '';
	document.body.addEventListener('click',(event)=>{closebottomOnButtonMessage();},{'once':true});
}
else {
	bottomOnButtonMessage.style.display = 'none';
	sendMOBtoServer(true);	//console.log('Поднять режим MOB');
};
}; // end function MOBalarm

function closebottomOnButtonMessage(){
bottomOnButtonMessage.style.display = 'none';
} // end function closebottomOnButtonMessage

function sendMOBtoServer(status=true,mobMarkerJSON=null){
/* */
//console.log("[sendMOBtoServer] status=",status,'tpv.position:',tpv.position);
if (typeof mobMarkerJSON == "string") {
	try	{mobMarkerJSON = JSON.parse(mobMarkerJSON);}
	catch(error) {mobMarkerJSON = null;};
};

let delta;
if(status) {	// нужно открыть режим "человек за бортом"
	// Есть координаты
	if(tpv.position && tpv.position.value && tpv.position.value.latitude && tpv.position.value.longitude){
		if(mobMarkerJSON){	// передали точки, надо добавить
			// это GeoJSON, считаем, что GaladrielMap
			// На другие варианты забъём за отсутствием. Может быть, когда нибудь....
			if(mobMarkerJSON.type == "FeatureCollection"){
				mobMarkerJSON.features.push({
						"type": "Feature",
						"geometry": {
							"type": "Point",
							"coordinates": [tpv.position.value.longitude,tpv.position.value.latitude]
						}
					}
				);
			}
		}
		else {	// новая единственная точка
			mobMarkerJSON = {
				"type": "FeatureCollection",
				"features": [
					{
						"type": "Feature",
						"geometry": {
							"type": "Point",
							"coordinates": [tpv.position.value.longitude,tpv.position.value.latitude]
						},
						"properties": {
							"current": true
						}
					}
				]
			};
		};
	};
	delta = {
		"context": "vessels.self",
		"updates": [
			{
				"values": [
					{
						"path": "notifications.mob",
						"value": {
							"method": ["visual", "sound"],
							"state": "emergency",
							"message": "A man overboard!",
							"source": instanceSelf,
							"position": mobMarkerJSON
						},
					}
				],
				"timestamp": new Date().toISOString(),
			}
		]
	};
}
else {
	delta = {
		"context": "vessels.self",
		"updates": [
			{
				"values": [
					{
						"path": "notifications.mob",
						"value": null
					}
				],
				"timestamp": new Date().toISOString(),
			}
		]
	};
};

//console.log('[sendMOBtoServer] delta:',delta);
if(socket.readyState == 1) {
	socket.send(JSON.stringify(delta));
};
}; // end function sendMOBtoServer





var zerotonull = {};
function isValueNull(valueName,value){
/* Следует ли считать нулевое значение valueName эквивалентным null
возвращает true, если valueName было равно 0 isNullCount раз подряд */
/*
Эта задача сводится к счётчику, увеличивающемуся при каждом следующем вызове функции, 
и часто приводится в качестве примера применения "замыкания" в javascript. Однако, легко видеть,
что прямолинейное решение задачи лучше использования "замыкания" по следующим причинам:
1) При нормальном решении требуются две глобальные именованные сущности: переменная для хранения 
счётчиков и функция для их обработки.
При решении через "замыкания" требуется функция - генератор и по одной функции для каждого счётчика.
2) Нормальное решение будет одинаковым для вообще всех языков программирования, а решение с 
"замыканием" уникально для javascript и вызывает недоумение.
*/
let isNullCount = 10;

if(typeof value != 'number') return false;
if(! zerotonull[valueName]) zerotonull[valueName] = 0;
if(value === 0) zerotonull[valueName] += 1;	// строго целому нулю?
else zerotonull[valueName] = 0;
//console.log('[isValueNull] valueName=',valueName,'zerotonull[valueName]=',zerotonull[valueName]);
if(zerotonull[valueName] >= isNullCount){
	zerotonull[valueName] = isNullCount;
	return true;
}
return false;
} // end function isValueNull

function chkTPV(tpvName,checksTPV={}) {
/* Проверяет, не протухло ли tpvName
В кривом signalk нет не только проверки актуальности данных, но есть и преднамеренное
введение пользователя в заблуждение относительно актуальности данных.
А именно:
по крайней мере navigation.courseOverGroundTrue может быть получено как из RMC предложения NMEA0183
так и из VTG. Нормально, что в потоке NMEA есть и то и то. Но предложение RMC содержит отметку времени,
а предложение VTG - нет. Предложение RMC обязательно, и есть всегда, поэтому, скажем, в gpsd
от момента прихода сообщения RMC отсчитывается "эпоха", и считается, что все другие предложения в течение
эпохи имеют отметку времени, указанную в последнем предложении RMC.
В signalk "эпохи" нет, и там (любой?) величине, вычисленной из предложения NMEA, не имеющего отметки времени, ставится отметка
текущего времени, т.е., недостоверная. 
Так, navigation.courseOverGroundTrue, полученный из RMC,
будет иметь отметку времени RMC, а navigation.courseOverGroundTrue, полученный из VTG - 
отметку текущего времени. Если поток NMEA идёт с задержкой, то только часть значений navigation.courseOverGroundTrue
позволит это узнать.

Кроме того, в описываемом случае, видимо, время, установленное по GGA, будет на примерно 5(?) суток вперёд.
Это ваще фигня какая-то...
Не исключено, что эта фигня в naiveNMEAdaemon.php
*/
let changed=false;
if(!displayData[tpvName].fresh) return changed;	// если нет срока годности -- данные всегда свежие
const dt = Date.now()-tpv[tpvName].timestamp;
//if(tpvName=='track') console.log('[chkTPV] tpvName=',tpvName,'displayData[tpvName].fresh=',displayData[tpvName].fresh,'Время данных',tpv[tpvName].timestamp,'устарело на',(Date.now()-tpv[tpvName].timestamp)/1000,'сек.');
if(tpv[tpvName] && ((dt > displayData[tpvName].fresh) || dt < 0)){	// dt меньше 0 - это фигня какая-то... Почему?
	console.log('Property',tpvName,'is',(Date.now()-tpv[tpvName].timestamp)/1000,'sec. old, but should be no more than',displayData[tpvName].fresh/1000,'sec.');
	delete tpv[tpvName]; 	// 
	//console.log('[chkTPV tpv после очистки]',JSON.stringify(tpv,null,"\t"));
	display([tpvName]);
	changed = true;
	//console.log('clearInterval для ',checksTPV[tpvName]);
	if(checksTPV[tpvName]){
		clearInterval(checksTPV[tpvName]);
		delete checksTPV[tpvName];
	};
};
return changed;
}; // end function chkTPV

function chkAllTPV(){
let minFresh=999999999999;
let changed=false;
for(let tpvName in tpv){
	//console.log('[chkAllTPV] tpvName=',tpvName);
	changed = chkTPV(tpvName);
	if(!changed && displayData[tpvName].fresh && (displayData[tpvName].fresh < minFresh)) minFresh = displayData[tpvName].fresh;
};
//console.log('[chkAllTPV] minFresh=',minFresh,'minFreshInterval:',minFreshInterval);
if(minFresh > 10000) minFresh = 10000;	// может не быть ни одного значения свежести, или быть очень большое
if(minFresh != minFreshInterval.value){
	minFreshInterval.value = minFresh;
	clearInterval(minFreshInterval.object);
	//console.log('[chkAllTPV] Интервал проверки свежести имеющихся данных изменён на',minFreshInterval.value/1000,'сек.');
	minFreshInterval.object = window.setInterval(chkAllTPV, minFreshInterval.value);
};
}; // end function chkAllTPV



function bigBlock(block,bigStyleName){
/**/
block.classList.toggle(bigStyleName);
if(leftTopBlock.classList.contains("leftTopBlockBig")
|| rightTopBlock.classList.contains("rightTopBlockBig")
|| leftBottomBlock.classList.contains("leftBottomBlockBig")
|| rightBottomBlock.classList.contains("rightBottomBlockBig")
) compass.classList.add("opa");
else compass.classList.remove("opa");
} // end function bigBlock

function updBottomMessages(){
// В этом кретинском языке у пустого объекта нет функции .keys(), и если bottomMessages пуст, 
// bottomMessages.keys() обломится с Uncaught TypeError: bottomMessages.keys is not a function
if(!Object.keys(bottomMessages).length) {
	bottomMessage.style.display = 'none';
	return;
}
bottomMessage.innerHTML = '';
for(let key in bottomMessages) {
	bottomMessage.innerHTML += ' '+bottomMessages[key];
};
bottomMessage.style.display = 'inherit';
};// end function updBottomMessages


function bearing(latlng1, latlng2) {
/* возвращает азимут c точки 1 на точку 2 */
//console.log(latlng1,latlng2)
const rad = Math.PI/180;
let lat1,lat2,lon1,lon2;
if(latlng1.lat) lat1 = latlng1.lat * rad;
else lat1 = latlng1.latitude * rad;
if(latlng2.lat) lat2 = latlng2.lat * rad;
else lat2 = latlng2.latitude * rad;
if(latlng1.lng) lon1 = latlng1.lng * rad;
else if(latlng1.lon) lon1 = latlng1.lon * rad;
else lon1 = latlng1.longitude * rad;
if(latlng2.lng) lon2 = latlng2.lng * rad;
else if(latlng2.lon) lon2 = latlng2.lon * rad;
else lon2 = latlng2.longitude * rad;
//console.log('lat1=',lat1,'lat2=',lat2,'lon1=',lon1,'lon2=',lon2)

let y = Math.sin(lon2 - lon1) * Math.cos(lat2);
let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
//console.log('x',x,'y',y)

let bearing = ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
if(bearing >= 360) bearing = bearing-360;

return bearing;
} // end function bearing

function equirectangularDistance(from,to){
// https://www.movable-type.co.uk/scripts/latlong.html
// from,to: {longitude: xx, latitude: xx}
const rad = Math.PI/180;
const φ1 = from.latitude * rad;
const φ2 = to.latitude * rad;
const Δλ = (to.longitude-from.longitude) * rad;
const R = 6371e3;	// метров
const x = Δλ * Math.cos((φ1+φ2)/2);
const y = (φ2-φ1);
const d = Math.sqrt(x*x + y*y) * R;	// метров
return d;
} // end function equirectangularDistance

function generateUUID() { 
// Public Domain/MIT https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
// мне пофигу их соображеия о "небезопасности", ибо они вне контекста
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}; // end function generateUUID

function getCookie(name) {
// возвращает cookie с именем name, если есть, если нет, то undefined
name=name.trim();
var matches = document.cookie.match(new RegExp(
	"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	)
);
return matches ? decodeURIComponent(matches[1]) : null;
}; // end function getCookie

