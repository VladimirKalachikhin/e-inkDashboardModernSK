/*
display()
displayNextPoint()
displayON()
displayOFF()

realWindSymbolUpdate(speed=null)
upHline(posX)
downHline(posX)

MOBmessageInit()
MOBalarm()
closeMOBmessage()
sendMOBtoServer(status=true)
MOBtoGeoJSON(MOBdata)	Переделывает объект MOB из формата SignalK notifications.mob в mobMarkerJSON: Leaflet GeoJSON для GaladrielMap
GeoJSONtoMOB(mobMarkerJSON,status,label='galadrielmap_sk')	Переделывает Leaflet GeoJSON мультислоя mobMarker в delta формата SignalK для MOB 

modeMenuInit()
selectOption(DOMid)
DOMidSelectionUpdOption(event)
modeMenuOpen()
modeMenuClose()
modeMenuReset()
modeMenuSubmit(event)

isValueNull(valueName,value)
chkTPV(tpvName,checksTPV)
chkAllTPV()

bigBlock(block,bigStyleName)
updBottomMessages()

bearing(latlng1, latlng2)
equirectangularDistance(from,to)

generateUUID()
isBooblingFrom(event,id)

storageHandler
*/

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
//if((testFlag === true) && !tpv.heading) {
//	console.log('tpv.heading created');
//	tpv.heading = {"value": 95.0000000216913,"timestamp": 1745765598606};
//	testFlag = 0;
//};
//changedTPV.push('heading');
//tpv.heading.value += (5 + Math.floor(Math.random() * 25));
//tpv.heading.value += 45;
//if(testFlag > 10){
//	delete tpv.heading;
//	console.log('tpv.heading deleted');
//	testFlag = false;
//}
//else{
//	testFlag += 1;
//};
//if(tpv.track) tpv.heading.value = tpv.track.value + 45;
/* END FOR TEST*/
byChangedTPV: for(let tpvName of changedTPV){
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
			leftBottomBlock.style.display = '';
			leftBottomBlock.innerHTML = `${mobDist.toFixed(displayData.mob.precision)}<span style="font-size:var(--ltl1-font-size);"><br>${i18n.dashboardMOBalarmTXT}, ${i18n.dashboardAlarmDistanceMesTXT}</span>`;
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
				else{	// heading может внезапно исчезнуть или протухнуть, поэтому картушку надо вернуть
					//console.log('no heading, but must be. center_marc.style.transform=',center_marc.style.transform)
					if(center_marc.style.transform && center_marc.style.transform != 'none'){
						center_marc.style.transform = 'none';
					};
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
				if(center_icon.style.transform && center_icon.style.transform != 'none'){
					center_icon.style.transform = 'none';
				};
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
			if(center_icon.style.transform && center_icon.style.transform != 'none'){
				center_icon.style.transform = 'none';
			};
			delete bottomMessages.heading;
			updBottomMessages();	// показывает нижнее сообщение
		}
		break;
	case 'wangle':
		// Ветер у нас нормальный, т.е., относительно судна.
		// Реально значёк ветра будет перерсован, когда есть и wangle и wspeed
		// т.е., сначала придёт что-то одно, потом, когда придёт следующее - 
		// значёк будет нарисован, но с прошлым значением другого.
		// Эмулятор SKsim сперва присылает угол, а потом скорость
/* FOR TEST*/
		//if(!tpv.wangle) tpv.wangle = {};
		//tpv.wangle.value = 45;
/* END FOR TEST*/
		if(tpv.wspeed && tpv.wspeed.value != null && tpv.wspeed.value != undefined) {
			if(tpv.wangle && tpv.wangle.value != null && tpv.wangle.value != undefined) {
				//console.log('wind direction=',tpv.wangle.value,'wind speed=',tpv.wspeed.value,displayData.wangle);
				windSVGimage.setAttribute("transform", `rotate(${tpv.wangle.value-90})`);	// исходно картинка горизонтальная, я ветер считается от center_icon
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
		//console.log('collisions:',tpv.collisions);
		if(tpv.collisions){
			if(tpv.collisions.value){	// есть состояние collision, пришли новые данные
				//console.log('есть состояние collision, пришли новые данные collisions:',tpv.collisions.value);
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
					if(collision[1].dist <= minDist) {
						//console.log('Ближайший');
						nearestDist = collision[1].dist
					}
					else if((collision[1].dist > minDist) && (collision[1].dist <= (minDist+step))) {
						//console.log('Близкий');
						arrow.style.width = 'var(--collisionArrowWidthNormal)';
						arrow.style.left = 'var(--collisionArrowLeftNormal)';
					}
					else if((collision[1].dist > (minDist+step)) && (collision[1].dist <= (minDist+2*step))) {
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
				rightBottomBlock.style.display = '';
				rightBottomBlock.innerHTML = `${nearestDist.toFixed(displayData.collisions.precision)}<span style="font-size:var(--ltl1-font-size);"><br>${i18n.dashboardCollisionAlarmTXT}, ${i18n.dashboardAlarmDistanceMesTXT}</span>`;
				rightBottomBlock.classList.add('rightBottomFrameBlinker');
			}
			else {	// состояние collision прекратилось
				//console.log('состояние collision прекратилось collisions:',tpv.collisions);
				delete tpv.collisions;
				//console.log('collisions:',tpv.collisions);
				rightBottomBlock.classList.remove('rightBottomFrameBlinker');
			};
		};
		break;
	case 'mob':
		//console.log('[display] in mob data:',JSON.stringify(tpv.mob));
		// Похоже, что автор Freeboard-SK индус. В любом случае - он дебил, и
		// разницы между выключением режима и сменой режима не видит.
		// Поэтому он выключает режим MOB установкой value.state = "normal"
		// вместо value = null, как это указано в документации.
		// Вряд ли он знал, что точки в выключенном MOB понадобятся, чтобы разобраться, где свои
		// точки, где чужие, а где - AIS SART.
		// Поэтому, хоть он и индус, но я теперь тоже выключаю режим MOB установкой value.state = "normal",
		// оставляя точки.
		if(tpv.mob && tpv.mob.value && (tpv.mob.value.state != "normal")){	// режим MOB есть
			//console.log('mob:',tpv.mob.value);
			// mob as described https://github.com/SignalK/signalk-server/pull/1560
			// при этом у этих кретинов может быть "position": "No vessel position data."
			mobPosition=null;	// если режим есть, и пришло что-то новое, знаяит, старое неактуально?
			mobMarkerJSON = MOBtoGeoJSON(tpv.mob.value);	// имена унаследованы из GaladrielMap
			//console.log('[display] mobMarkerJSON:',JSON.stringify(mobMarkerJSON));
			if(mobMarkerJSON){
				for(const point of mobMarkerJSON.features){
					if(point.geometry.type != 'Point') continue;
					if(!point.properties.current) continue;
					mobPosition = {'longitude': point.geometry.coordinates[0],'latitude': point.geometry.coordinates[1]};
					break;
				};
			};
			//console.log('The MOB is raised, mobPosition:',mobPosition);
		}
		else {	// режима MOB нет
			mobMarkerJSON = null;
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
		if(tpvName[tpvName.length-1] == 0) {
			if(!tpv.propLabel0 && !tpv.propState0) break;	// нет никакой информации об этом двигателе
			if(tpv.propLabel0 && tpv.propLabel0.value) strPropLabel = `<span style="font-size:var(--ltl1-font-size);">${tpv.propLabel0.value}</span>`;
			if(tpv.propState0 && tpv.propState0.value == 'stopped'){
				strPropVal = `<span style="font-size:calc(var(--font-size)*0.7);">${i18n.dashboardPropStopTXT}</span>`;	// почему здесь не работает var(--small-font-size) ? 
			}
			else {
				strPropVal = tpv[tpvName].value.toFixed(displayData[tpvName].precision);			
			}
		}
		else {
			if(!tpv.propLabel1 && !tpv.propState1) break;	// нет никакой информации об этом двигателе
			if(tpv.propLabel1 && tpv.propLabel1.value) strPropLabel = `<span style="font-size:var(--ltl1-font-size);">${tpv.propLabel1.value}</span>`;
			if(tpv.propState1 && tpv.propState1.value == 'stopped'){
				strPropVal = `<span style="font-size:calc(var(--font-size)*0.7);">${i18n.dashboardPropStopTXT}</span>`;	// почему здесь не работает var(--small-font-size) ? 
			}
			else {
				strPropVal = tpv[tpvName].value.toFixed(displayData[tpvName].precision);			
			}
		}
		if(displayData[tpvName].DOMid.includes('ottom')) {	// указано размещать в нижних углах
			str += strPropLabel+'<span style="font-size:0.1em;"><br><br></span>';	// человеческое наименование двигателя из SignalK
			str += strPropVal;
			if(displayData[tpvName].label) str += `<span style="font-size:var(--ltl1-font-size);"><br>${displayData[tpvName].label}</span>`;
		}
		else {	// указано размещать в верхних углах
			if(displayData[tpvName].label) str += `<span style="font-size:var(--ltl1-font-size);">${displayData[tpvName].label}<br><br></span>`;
			str += strPropVal;
			str += '<span style="font-size:0.2em;"><br></span>'+strPropLabel;	// человеческое наименование двигателя из SignalK
		}
		htmlBLock.style.display = '';
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
		if(tpvName[tpvName.length-1] == 0) {
			if(!tpv.propLabel0 && !tpv.propState0) break;	// нет никакой информации об этом двигателе
			if(tpv.propLabel0 && tpv.propLabel0.value) strPropLabel = `<span style="font-size:var(--ltl1-font-size);">${tpv.propLabel0.value}</span>`;
			// Почему не показывать температуру, если двигатель остановлен?
			//if(tpv.propState0 && tpv.propState0.value == 'stopped'){
				//strPropVal = '<br>&nbsp;';
			//}
			//else {
				strPropVal = (tpv.propTemperature0.value-273.15).toFixed(displayData[tpvName].precision);
			//};
		}
		else {
			if(!tpv.propLabel1 && !tpv.propState1) break;	// нет никакой информации об этом двигателе
			if(tpv.propLabel1 && tpv.propLabel1.value) strPropLabel = `<span style="font-size:var(--ltl1-font-size);">${tpv.propLabel1.value}</span>`;
			//if(tpv.propState1 && tpv.propState1.value == 'stopped'){
				//strPropVal = '<br>&nbsp;';
			//}
			//else {
				strPropVal = (tpv.propTemperature0.value-273.15).toFixed(displayData[tpvName].precision);
			//};
		}
		if(displayData[tpvName].DOMid.includes('ottom')) {	// указано размещать в нижних углах
			str += strPropLabel+'<span style="font-size:0.1em;"><br><br></span>';	// человеческое наименование двигателя из SignalK
			str += strPropVal;
			if(displayData[tpvName].label) str += `<span style="font-size:var(--ltl1-font-size);"><br>${displayData[tpvName].label}</span>`;
		}
		else {	// указано размещать в верхних углах
			if(displayData[tpvName].label) str += `<span style="font-size:var(--ltl1-font-size);">${displayData[tpvName].label}<br><br></span>`;
			str += strPropVal;
			str += '<span style="font-size:0.2em;"><br></span>'+strPropLabel;	// человеческое наименование двигателя из SignalK
		}
		htmlBLock.style.display = '';
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
		htmlBLock.style.display = '';
		htmlBLock.innerHTML = str;
		break;
	};
};

function displayNextPoint(){
const azimuth = bearing(tpv.position.value, tpv.nextPoint.value.position);
nextPointDirection.style.transform = `rotate(${azimuth}deg)`;
nextPointDirection.style.display = '';

if(!displayData.nextPoint.DOMid) return;	// данный параметр запрошен, но не должен показываться
if((displayData.nextPoint.DOMid == 'leftBottomBlock') && mobPosition) return;	// не будем рисовать в нижнем левом углу, если режим MOB
if((displayData.nextPoint.DOMid == 'rightBottomBlock') && tpv.collisions && tpv.collisions.value) return;	// не будем рисовать в нижнем правом углу, если опасность столкновения

let dist = equirectangularDistance(tpv.position.value, tpv.nextPoint.value.position);
let mesTXT;
if(dist>1000){ 
	dist = (dist/1000).toFixed(displayData.nextPoint.precision+1);
	mesTXT = i18n.dashboarNextPointMesKMTXT;
}
else {
	dist = dist.toFixed(displayData.nextPoint.precision);
	mesTXT = i18n.dashboarNextPointMesMTXT;
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
htmlBLock.style.display = '';
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
if(displayData.kioskMode){	// клинтское устройство без органов управления
	modeMenuIcon.style.display = 'none';
	mobButton.style.display = 'none';
}
else {
	modeMenuIcon.style.display = '';
	mobButton.style.display = '';
};
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

compassMessage.innerHTML = `<span><br><br>${i18n.dashboardGNSSoldTXT}</span>`;
compassMessage.style.display = 'contents';	// Не знаю, почему это так, но если указать пусто - текст вообще не показывается.
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
	};
	oldWind.w25cnt = null; oldWind.w5cnt = null; oldWind.w2dt5cnt = null;
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
} // end function realWindSymbolViewUpdate

function MOBmessageInit(){
/* Окно сообщения MOB */
MOBmessage.style.display = 'none';
MOBmessage.addEventListener('click',function (event){	// для срабатывания клика везде, кроме самого окна, для закрытия
	event.stopPropagation();	// чтобы оно не дошло до body, на который раньше успело навеситься modeMenuClose.
});
mobButton.addEventListener('click',function (event){
	event.stopPropagation();	// чтобы оно не дошло до body, на который раньше успело навеситься closebotMOBmessage. Что странно...
	MOBalarm();
});
MOBmessageAddPointButton.querySelector('span').innerHTML = i18n.dashboardMOBbuttonAddTXT;
MOBmessageCancelButton.querySelector('span').innerHTML = i18n.dashboardMOBbuttonCancelTXT;

}; // end function MOBmessageInit

function MOBalarm(){
if(tpv.mob && tpv.mob.value && (tpv.mob.value.state != "normal")){	// режим MOB есть
	//if(mobPosition) MOBmessageAddPointButton.style.display = '';	// Почему можно добавить точку, только если есть текущая? Тогда мы не сможем инициировать свой MOB, если есть MOB от SART, который мы игнорируем.
	//else MOBmessageAddPointButton.style.display = 'none';
	MOBmessageAddPointButton.style.display = '';
	MOBmessage.style.display = '';
	document.body.addEventListener('click',(event)=>{closeMOBmessage();},{'once':true});
}
else {
	MOBmessage.style.display = 'none';
	sendMOBtoServer(true);	//console.log('Поднять режим MOB');
};
}; // end function MOBalarm

function closeMOBmessage(){
MOBmessage.style.display = 'none';
} // end function closeMOBmessage


function sendMOBtoServer(status=true){
/* */
//console.log("[sendMOBtoServer] status=",status,'tpv.position:',tpv.position,'mobMarkerJSON:',mobMarkerJSON);
if(status) {	// нужно открыть режим "человек за бортом"
	// Есть координаты
	let coordinates = [];	// если нет координат, то Leaflet такую точку просто не показывает.
	if(tpv.position && tpv.position.value && tpv.position.value.latitude && tpv.position.value.longitude) coordinates = [tpv.position.value.longitude,tpv.position.value.latitude];
	if(mobMarkerJSON && mobMarkerJSON.state != 'normal'){	// имеются точки, надо добавить
		mobMarkerJSON.features.push({
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": coordinates
			},
			"properties": {
				"current": true
			}
		});
	}
	else {	// новая единственная точка
		mobMarkerJSON = {
			"type": "FeatureCollection",
			"features": [
				{
					"type": "Feature",
					"geometry": {
						"type": "Point",
						"coordinates": coordinates
					},
					"properties": {
						"current": true
					}
				}
			],
			"properties": {
			}
		};
	};
};
mobMarkerJSON.properties.timestamp = Math.round(Date.now()/1000);
let delta = GeoJSONtoMOB(mobMarkerJSON,status,'e-inkDashboardModern');
//console.log('[sendMOBtoServer] delta:',delta);
if(socket.readyState == 1) {
	socket.send(JSON.stringify(delta));
};
}; // end function sendMOBtoServer

// Следующие две функции из galadrielmap,js, и лучше оставить их такими.
// разьираться с дурацкой системой модулей в javascript & nodejs мне лень.
function MOBtoGeoJSON(MOBdata){
/* Переделывает объект MOB из формата SignalK notifications.mob в mobMarkerJSON: Leaflet GeoJSON для GaladrielMap */
//console.log('[MOBtoGeoJSON] MOBdata:',MOBdata);
let mobMarkerJSON=null;
let timestamp=null;
if(MOBdata.position && MOBdata.position.properties){	// Это GeoJSON
	timestamp = MOBdata.position.properties.timestamp;
}
else if(MOBdata.data && MOBdata.data.timestamp){	// это alarm от Freeboard
	timestamp = Math.round(Date.parse(MOBdata.data.timestamp)/1000);
}
else if(MOBdata.timestamp){
	timestamp = Math.round(Date.parse(MOBdata.timestamp)/1000);
};
//console.log('[MOBtoGeoJSON] timestamp:',timestamp);
if(MOBdata.position && MOBdata.position.features){	// Это GeoJSON
	mobMarkerJSON = MOBdata.position;	// Это GeoJSON
	if(!mobMarkerJSON.properties) mobMarkerJSON.properties = {};
	mobMarkerJSON.properties.timestamp = timestamp;	// Если я правильно понимаю, это будет штамп последнего изменения в любом случае, потому что цикл по источникам в порядке поступления изменений?
}
else{
	let mobPosition; 
	if(MOBdata.data && MOBdata.data.position){	// это alarm от Freeboard
		// mob as described https://github.com/SignalK/signalk-server/pull/1560
		// при этом у этих кретинов может быть "position": "No vessel position data."
		mobPosition = {'longitude': MOBdata.data.position.longitude,'latitude': MOBdata.data.position.latitude};
	}
	else {
		if(MOBdata.position){
			const s = JSON.stringify(MOBdata.position);
			if(s.includes('longitude') && s.includes('latitude')){
				mobPosition = {'longitude': MOBdata.position.longitude,'latitude': MOBdata.position.latitude};
			}
			else if(s.includes('lng') && s.includes('lat')){
				mobPosition = {'longitude': MOBdata.position.lng,'latitude': MOBdata.position.lat};
			}
			else if(s.includes('lon') && s.includes('lat')){
				mobPosition = {'longitude': MOBdata.position.lon,'latitude': MOBdata.position.lat};
			}
			else if(Array.isArray(MOBdata.position)){
				mobPosition = {'longitude': MOBdata.position[0],'latitude': MOBdata.position[1]};
			};
		}
		else{
			const s = JSON.stringify(MOBdata);
			if(s.includes('longitude') && s.includes('latitude')){
				mobPosition = {'longitude': MOBdata.longitude,'latitude': MOBdata.latitude};
			}
			else if(s.includes('lng') && s.includes('lat')){
				mobPosition = {'longitude': MOBdata.lng,'latitude': MOBdata.lat};
			}
			else if(s.includes('lon') && s.includes('lat')){
				mobPosition = {'longitude': MOBdata.lon,'latitude': MOBdata.lat};
			}
			else if(Array.isArray(MOBdata)){
				mobPosition = {'longitude': MOBdata[0],'latitude': MOBdata[1]};
			};
		};
	};
	if(mobPosition){
		mobPosition.longitude = parseFloat(mobPosition.longitude);
		mobPosition.latitude = parseFloat(mobPosition.latitude);
		if(!(isNaN(mobPosition.longitude) || isNaN(mobPosition.latitude))){
			mobMarkerJSON = {
				"type": "FeatureCollection",
				"features": [
					{
						"type": "Feature",
						"geometry": {
							"type": "Point",
							"coordinates": [
								mobPosition.longitude,
								mobPosition.latitude
							]
						},
						"properties": {
							"current": true,
							"mmsi": '',	// пусто - значит, это MOB свой, и кто-нибудь там поправит
							"safety_related_text": ''
						}
					}
				],
				"properties": {
					"timestamp": timestamp
				}
			};
		};
	};
};
//console.log('[MOBtoGeoJSON] mobMarkerJSON:',mobMarkerJSON);
return mobMarkerJSON;
}; // end function MOBtoGeoJSON

function GeoJSONtoMOB(mobMarkerJSON,status,label='galadrielmap_sk'){
/* Переделывает Leaflet GeoJSON мультислоя mobMarker в delta формата SignalK для MOB 
mobMarkerJSON содержит исчерпывающие данные MOB или false
*/
//console.log('[GeoJSONtoMOB] mobMarkerJSON:',mobMarkerJSON);
let delta = {
	"context": 'vessels.self',
	"updates": [
		{
			"values": [
				{
					"path": "notifications.mob",
					"value": {
						"method": [],
						"state": "normal",
						"message": "",
						"source": typeof instanceSelf !== 'undefined' ? instanceSelf : plugin.id,
						"position": mobMarkerJSON
					}
				}
			],
			"source": {"label": label},
			"timestamp": status ? new Date(mobMarkerJSON.properties.timestamp*1000).toISOString() : new Date().toISOString(),	// Мы завершаем MOB именно сейчас.
		}
	]
};
if(status) {
	delta.updates[0].values[0].value.method = ["visual", "sound"];
	delta.updates[0].values[0].value.state = "emergency";
	delta.updates[0].values[0].value.message = "A man overboard!";
};
//console.log('[GeoJSONtoMOB] delta:',delta);
return delta;
}; // end function GeoJSONtoMOB



// Меню параметров
function modeMenuInit(){
/* Окно меню параметров */
modeMenu.style.display = 'none';
modeMenu.addEventListener('click',function (event){	// для срабатывания клика везде, кроме самого окна, для закрытия
	event.stopPropagation();	// чтобы оно не дошло до body, на который раньше успело навеситься modeMenuClose.
});
modeMenuIcon.addEventListener('click',function (event){
	event.stopPropagation();	// чтобы оно не дошло до body, на который раньше успело навеситься modeMenuClose.
	modeMenuOpen();
});
let selected=false;
// Путевой угол
courseTypeSelector.labels[0].innerHTML = `${i18n.courseTypeSelectorLabelTXT}`;
courseTypeSelector.options.length = 0;
for(let option in i18n.courseTypeSelectorOptionsTXT){
	if(displayData.track && displayData.track.menuItem == option) selected=true;
	else selected=false;
	courseTypeSelector.add(new Option(i18n.courseTypeSelectorOptionsTXT[option], option,selected,selected));
};
courseRefreshIntervalInput.labels[0].innerHTML = `${i18n.modeRefreshIntervalInputTXT}`;
courseRefreshIntervalInput.value = displayData.maxRefreshInterval || 0;
// Ветер
windTypeSelector.labels[0].innerHTML = `${i18n.windTypeSelectorLabelTXT}`;
windTypeSelector.options.length = 0;
for(let option in i18n.windTypeSelectorOptionsTXT){
	if(displayData.wangle && displayData.wangle.menuItem == option) selected=true;
	else selected=false;
	windTypeSelector.add(new Option(i18n.windTypeSelectorOptionsTXT[option], option,selected,selected));
};
windRefreshIntervalInput.labels[0].innerHTML = `${i18n.modeRefreshIntervalInputTXT}`;
windRefreshIntervalInput.value = displayData.maxRefreshInterval || 0;
// Углы
let DOMid = modeMenu.querySelector('input[name="DOMidSelection"]:checked').value;	// выбранный угол
let tpvName;
for(tpvName in displayData){
	if(displayData[tpvName].DOMid != DOMid) {
		tpvName = null;
		continue;
	}
	break;
};
//console.log('[modeMenuInit] DOMid=',DOMid,'tpvName=',tpvName);
modeSelector.labels[0].innerHTML = `${i18n.modeSelectorLabelTXT}`;
modeSelector.options.length = 0;
for(let option in i18n.modeSelectorOptionsTXT){
	//console.log('[modeMenuInit] option=',option,i18n.modeSelectorOptionsTXT[option]);
	if(option.startsWith('Engine')) {
		if(!displayData.propulsionPaths) continue;
		if(option.includes('1') && displayData.propLabel0.value) i18n.modeSelectorOptionsTXT[option] = i18n.modeSelectorOptionsTXT[option].replace('1',displayData.propLabel0.value);
		else if(option.includes('2') && displayData.propLabel1.value) i18n.modeSelectorOptionsTXT[option] = i18n.modeSelectorOptionsTXT[option].replace('2',displayData.propLabel1.value);
	};
	if(tpvName && displayData[tpvName].menuItem == option) selected=true;
	else selected=false;
	modeSelector.add(new Option(i18n.modeSelectorOptionsTXT[option], option,selected,selected));
};
modeRefreshIntervalInput.value = displayData.maxRefreshInterval || 0;
modeRefreshIntervalInput.labels[0].innerHTML = `${i18n.modeRefreshIntervalInputTXT}`;
resetToDefaultButton.value = i18n.resetToDefaultButtonTXT;

}; // end function modeMenuInit

function selectOption(DOMid){
let tpvName;
for(tpvName in displayData){
	if(displayData[tpvName].DOMid != DOMid) {
		tpvName = null;
		continue;
	}
	break;
};
//console.log('[selectOption] DOMid=',DOMid,'tpvName=',tpvName);
if(tpvName){
	for(const option of modeSelector.options){
		if(option.value != displayData[tpvName].menuItem) continue;
		option.selected = true;
		break;
	};
}
else modeSelector.selectedIndex = 0;
}; // end function selectOption

function DOMidSelectionUpdOption(event){
selectOption(event.target.value);
}; // end function DOMidSelectionUpdOption

function modeMenuOpen(){
if(modeMenu.style.display == 'none'){
	//console.log('[modeMenuOpen] modeMenu:',modeMenu);
	modeMenu.style.display = '';
	document.body.addEventListener('click',(event)=>{
		//console.log(event.target,event.currentTarget);
		//console.log('Проходит через modeMenu:',isBooblingFrom(event,'modeMenu'));
		// В этом кретинском языке нет нормального способа узнать, через какие объекты всплывает событие,
		// и нет способа запретить всплытие событий через объект.
		// Поэтому костыль.
		//if(!isBooblingFrom(event,'modeMenu')) modeMenuClose();
		// Но мы обойдёмся без костыля, рекомендованными методами: запретом
		// всплытия по клику на соответствующем объекте.
		modeMenuClose();
	},{'once':true});	// закрывать меню по клику в любом месте
}
else modeMenu.style.display = 'none';
}; // end function modeMenuOpen

function modeMenuClose(){
modeMenu.style.display = 'none';
}; // end function modeMenuClose

function modeMenuReset(){
storageHandler.del('displayData');
modeMenu.submit();	// при этом событие submit не происходит, и modeMenuSubmit() не вызывается.
}; // end function modeMenuReset

function modeMenuSubmit(event){
/**/
//console.log('[modeMenuSubmit]',event);
//console.log('[modeMenuSubmit] courseTypeSelector',courseTypeSelector.value,);
//console.log('[modeMenuSubmit] windTypeSelector',windTypeSelector.value,);
//console.log('[modeMenuSubmit] DOMidSelection',modeMenu.querySelector('input[name="DOMidSelection"]:checked').value);
//console.log('[modeMenuSubmit] modeSelector',modeSelector.value,);
//alert('[modeMenuSubmit]');

let maxRefreshInterval;
// Удалим из конфигурационного файла все параметры, указанные в форме ввода
const DOMid = modeMenu.querySelector('input[name="DOMidSelection"]:checked').value;
for(let tpvName in displayData){
	if(displayData[tpvName].maxRefreshInterval && (displayData[tpvName].maxRefreshInterval>maxRefreshInterval)) maxRefreshInterval = displayData[tpvName].maxRefreshInterval;	// найдём самый большой интервал обновления

	if(
		(displayData[tpvName].DOMid == DOMid)
		|| (displayData[tpvName].menuItem == courseTypeSelector.value)
		|| (displayData[tpvName].menuItem == windTypeSelector.value)
	) delete displayData[tpvName];
};
// Вот это всё должно быть полностью аналогично тому, что написано в index.js
// Однако, в этом гавёном языке нельзя простым путём включить один js-файл и в node, и в html,
// поэтому здесь просто копирование.

// Путевой угол
// Может быть выбрано только одна величина для track, поэтому есть только track и нет magtrack
let headingDirection = 'false';
switch(courseTypeSelector.value){
case "none":
	for(let tpvName in displayData){
		switch(displayData[tpvName].menuItem){
		case "track":
		case "magtrack":
		case "heading":
		case "mheading":
		case "mheadingC":
			delete displayData[tpvName];
		};
	};	
	break;
case "track":
	displayData["track"] = {	// course over ground, путевой угол, TPV track в gpsd
		"signalkPath": "navigation.courseOverGroundTrue",
		"label": i18n.dashboardCourseTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": 180/Math.PI, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": courseRefreshIntervalInput.value * 1000,
		"fresh": (5+courseRefreshIntervalInput.value) * 1000,		// время свежести, миллисек.
		"headingDirection": headingDirection,
		"menuItem" : courseTypeSelector.value
	};
	displayData["heading"] = {	// heading, курс, в gpsd ATT heading
		"signalkPath": "navigation.headingTrue",
		"label": i18n.dashboardHeadingTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": 180/Math.PI, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": courseRefreshIntervalInput.value * 1000,
		"fresh": (5+courseRefreshIntervalInput.value) * 1000,		// время свежести, миллисек.
		"headingDirection": headingDirection,
		"menuItem" : courseTypeSelector.value
	};
	break;
case "magtrack":
	displayData["track"] = {	// course over ground, путевой угол, TPV track в gpsd
		"signalkPath": "navigation.courseOverGroundMagnetic",
		"label": i18n.dashboardMagCourseTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": 180/Math.PI, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": courseRefreshIntervalInput.value * 1000,
		"fresh": (5+courseRefreshIntervalInput.value) * 1000,		// время свежести, миллисек.
		"headingDirection": headingDirection,
		"menuItem" : courseTypeSelector.value
	};
	displayData["heading"] = {	// heading, курс, в gpsd ATT heading
		"signalkPath": "navigation.dashboardMagCourseTXT",
		"label": i18n.dashboardMagHeadingTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": 180/Math.PI, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": courseRefreshIntervalInput.value * 1000,
		"fresh": (5+courseRefreshIntervalInput.value) * 1000,		// время свежести, миллисек.
		"headingDirection": headingDirection,
		"menuItem" : courseTypeSelector.value
	};
	break;
case "heading":
	headingDirection = 'true';
	displayData["track"] = {	// 
		"signalkPath": "navigation.courseOverGroundTrue",
		"label": i18n.dashboardCourseTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": 180/Math.PI, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": courseRefreshIntervalInput.value * 1000,
		"fresh": (5+courseRefreshIntervalInput.value) * 1000,		// время свежести, миллисек.
		"headingDirection": headingDirection,
		"menuItem" : courseTypeSelector.value
	};
	displayData["heading"] = {	// heading, курс
		"signalkPath": "navigation.headingTrue",
		"label": i18n.dashboardHeadingTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": 180/Math.PI, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": courseRefreshIntervalInput.value * 1000,
		"fresh": (5+courseRefreshIntervalInput.value) * 1000,		// время свежести, миллисек.
		"headingDirection": headingDirection,
		"menuItem" : courseTypeSelector.value
	};
	break;
case "mheading":
	headingDirection = 'true';
	displayData["track"] = {	// course over ground, путевой угол, track в gpsd
		"signalkPath": "navigation.courseOverGroundMagnetic",
		"label": i18n.dashboardMagCourseTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": 180/Math.PI, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": courseRefreshIntervalInput.value * 1000,
		"fresh": (5+courseRefreshIntervalInput.value) * 1000,		// время свежести, миллисек.
		"headingDirection": headingDirection,
		"menuItem" : courseTypeSelector.value
	};
	displayData["heading"] = {	// heading, курс
		"signalkPath": "navigation.headingMagnetic",
		"label": i18n.dashboardMagHeadingTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": 180/Math.PI, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": courseRefreshIntervalInput.value * 1000,
		"fresh": (5+courseRefreshIntervalInput.value) * 1000,		// время свежести, миллисек.
		"headingDirection": headingDirection,
		"menuItem" : courseTypeSelector.value
	};
	break;
case "mheadingC":
	headingDirection = 'true';
	displayData["track"] = {	//
		"signalkPath": "navigation.courseOverGroundMagnetic",
		"label": i18n.dashboardMagCourseTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": 180/Math.PI, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": courseRefreshIntervalInput.value * 1000,
		"fresh": (5+courseRefreshIntervalInput.value) * 1000,		// время свежести, миллисек.
		"headingDirection": headingDirection,
		"menuItem" : courseTypeSelector.value
	};
	displayData["heading"] = {	// heading, курс
		"signalkPath": "navigation.headingCompass",
		"label": i18n.dashboardCompassHeadingTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": 180/Math.PI, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": courseRefreshIntervalInput.value * 1000,
		"fresh": (5+courseRefreshIntervalInput.value) * 1000,		// время свежести, миллисек.
		"headingDirection": headingDirection,
		"menuItem" : courseTypeSelector.value
	};
	break;
};
// Ветер
let trueWind = false;
switch(windTypeSelector.value){
case "none":
	for(let tpvName in displayData){
		switch(displayData[tpvName].menuItem){
		case "wangler":
		case "wangletW":
		case "wanglet":
		case "wdirT":
		case "wdirM":
			delete displayData[tpvName];
		};
	};	
	break;
case "wangler":
	displayData["wangle"] = {
		"signalkPath": "environment.wind.angleApparent",
		"label": "",
		"precision" : 0,
		"multiplicator" : 180/Math.PI,
		"maxRefreshInterval": windRefreshIntervalInput.value * 1000,
		"fresh": (2+windRefreshIntervalInput.value) * 1000,
		"trueWind": trueWind,
		"menuItem" : windTypeSelector.value
	};
	displayData["wspeed"] = {
		"signalkPath": "environment.wind.speedApparent",
		"label": i18n.dashboardWindSpeedTXT+', '+i18n.dashboardWindSpeedMesTXT+':',
		"precision" : 0,
		"multiplicator" : 1,
		"maxRefreshInterval": windRefreshIntervalInput.value * 1000,
		"fresh": (2+windRefreshIntervalInput.value) * 1000,
		"menuItem" : windTypeSelector.value
	};
	break;
case "wdirT":
	trueWind = 'true';
	displayData["wangle"] = {
		"signalkPath": "environment.wind.directionTrue",	// The wind direction relative to true north
		"label": "",
		"precision" : 0,
		"multiplicator" : 180/Math.PI,
		"maxRefreshInterval": windRefreshIntervalInput.value * 1000,
		"fresh": (2+windRefreshIntervalInput.value) * 1000,
		"trueWind": trueWind,
		"menuItem" : windTypeSelector.value
	};
	displayData["wspeed"] = {
		"signalkPath": "environment.wind.speedTrue",	// Wind speed over water (as calculated from speedApparent and vessel's speed through water)
		"label": i18n.dashboardTrueWindSpeedTXT+', '+i18n.dashboardWindSpeedMesTXT+':',
		"precision" : 1,
		"multiplicator" : 1,
		"maxRefreshInterval": windRefreshIntervalInput.value * 1000,
		"fresh": (2+windRefreshIntervalInput.value) * 1000,
		"menuItem" : windTypeSelector.value
	};
	break;
case "wdirM":
	// только если курс или путевой угол магнитный
	if(displayData.track && ((displayData.track.menuItem == 'magtrack') || (displayData.track.menuItem == 'mheading') || (displayData.track.menuItem == 'mheadingC'))){
		trueWind = 'true';
		displayData["wangle"] = {
			"signalkPath": "environment.wind.directionMagnetic",
			"label": "",
			"precision" : 0,
			"multiplicator" : 180/Math.PI,
			"maxRefreshInterval": windRefreshIntervalInput.value * 1000,
			"fresh": (2+windRefreshIntervalInput.value) * 1000,
			"trueWind": trueWind,
			"menuItem" : windTypeSelector.value
		};
		displayData["wspeed"] = {
			"signalkPath": "environment.wind.speedTrue",	// Wind speed over water (as calculated from speedApparent and vessel's speed through water)
			"label": i18n.dashboardTrueWindSpeedTXT+', '+i18n.dashboardWindSpeedMesTXT+':',
			"precision" : 1,
			"multiplicator" : 1,
			"maxRefreshInterval": windRefreshIntervalInput.value * 1000,
			"fresh": (2+windRefreshIntervalInput.value) * 1000,
			"menuItem" : windTypeSelector.value
		};
	};
	break;
case "wanglet":
	trueWind = 'true';
	displayData["wangle"] = {
		"signalkPath": "environment.wind.angleTrueGround",
		"label": "",
		"precision" : 0,
		"multiplicator" : 180/Math.PI,
		"maxRefreshInterval": windRefreshIntervalInput.value * 1000,
		"fresh": (2+windRefreshIntervalInput.value) * 1000,
		"trueWind": trueWind,
		"menuItem" : windTypeSelector.value
	};
	displayData["wspeed"] = {
		"signalkPath": "environment.wind.speedOverGround",
		"label": i18n.dashboardTrueWindSpeedTXT+', '+i18n.dashboardWindSpeedMesTXT+':',
		"precision" : 0,
		"multiplicator" : 1,
		"maxRefreshInterval": windRefreshIntervalInput.value * 1000,
		"fresh": (2+windRefreshIntervalInput.value) * 1000,
		"menuItem" : windTypeSelector.value
	};
	break;
case "wangletW":
	trueWind = 'true';
	displayData["wangle"] = {
		"signalkPath": "environment.wind.angleTrueWater",
		"label": "",
		"precision" : 0,
		"multiplicator" : 180/Math.PI,
		"maxRefreshInterval": windRefreshIntervalInput.value * 1000,
		"fresh": (2+windRefreshIntervalInput.value) * 1000,
		"trueWind": trueWind,
		"menuItem" : windTypeSelector.value
	};
	displayData["wspeed"] = {
		"signalkPath": "environment.wind.speedTrue",	// Wind speed over water (as calculated from speedApparent and vessel's speed through water)
		"label": i18n.dashboardTrueWindSpeedTXT+', '+i18n.dashboardWindSpeedMesTXT+':',
		"precision" : 1,
		"multiplicator" : 1,
		"maxRefreshInterval": windRefreshIntervalInput.value * 1000,
		"fresh": (2+windRefreshIntervalInput.value) * 1000,
		"menuItem" : windTypeSelector.value
	};
	break;
};
// Углы
switch(modeSelector.value){
case "none":
	break;
case "speed":
	displayData["speed"] = {
		"signalkPath": "navigation.speedOverGround",
		"label": i18n.dashboardSpeedTXT+', '+i18n.dashboardSpeedMesTXT,	// скорость
		"precision" : 1,
		"multiplicator" : 60*60/1000,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (3+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "STW":
	displayData["speed"] = {
		"signalkPath": "navigation.speedThroughWater",
		"label": i18n.dashboardVaterSpeedTXT+', '+i18n.dashboardSpeedMesTXT,	// скорость
		"precision" : 1,
		"multiplicator" : 60*60/1000,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (3+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "DBS":
	displayData["depth"] = {
		"signalkPath": "environment.depth.belowSurface",
		"label": i18n.dashboardDepthTXT+', '+i18n.dashboardDepthMesTXT, 	// глубина
		"precision" : 1,
		"multiplicator" : 1,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (2+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "DBK":
	displayData["depth"] = {
		"signalkPath": "environment.depth.belowKeel",
		"label": i18n.dashboardKeelDepthTXT+', '+i18n.dashboardDepthMesTXT, 	// глубина
		"precision" : 1,
		"multiplicator" : 1,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (2+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "DBT":
	displayData["depth"] = {
		"signalkPath": "environment.depth.belowTransducer",
		"label": i18n.dashboardTransDepthTXT+', '+i18n.dashboardDepthMesTXT, 	// глубина
		"precision" : 1,
		"multiplicator" : 1,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (2+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "Engine1r":
	if(!(displayData.propulsionPaths && displayData.propulsionPaths[0])) break;
	displayData["propRevolutions0"] = {
		"signalkPath": `${displayData.propulsionPaths[0]}.revolutions`,
		"label": i18n.dashboardPropRevolutionTXT+', '+i18n.dashboardPropRevolutionMesTXT,
		"precision" : 0,
		"multiplicator" : 60,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (2+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "Engine1t":
	if(!(displayData.propulsionPaths && displayData.propulsionPaths[0])) break;
	displayData["propTemperature0"] = {
		"signalkPath": `${displayData.propulsionPaths[0]}.temperature`,
		"label": i18n.dashboardPropTemperatureTXT+', '+i18n.dashboardTemperatureMesTXT,
		"precision" : 0,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (10+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "Engine2r":
	if(!(displayData.propulsionPaths && displayData.propulsionPaths[1])) break;
	displayData["propRevolutions1"] = {
		"signalkPath": `${displayData.propulsionPaths[1]}.revolutions`,
		"label": i18n.dashboardPropRevolutionTXT+', '+i18n.dashboardPropRevolutionMesTXT,
		"precision" : 0,
		"multiplicator" : 60,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (2+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "Engine2t":
	if(!(displayData.propulsionPaths && displayData.propulsionPaths[1])) break;
	displayData["propTemperature1"] = {
		"signalkPath": `${displayData.propulsionPaths[1]}.temperature`,
		"label": i18n.dashboardPropTemperatureTXT+', '+i18n.dashboardTemperatureMesTXT,
		"precision" : 0,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (10+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "temp":
	displayData["airTemperature"] = {
		"signalkPath": "environment.outside.temperature",
		"label": i18n.dashboarAirTemperatureTXT+', '+i18n.dashboardTemperatureMesTXT,
		"precision" : 0,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (30+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "airP":
	displayData["airPressure"] = {
		"signalkPath": "environment.outside.pressure",
		"label": i18n.dashboarAirPressureTXT+', '+i18n.dashboardAirPressureMesTXT,
		"precision" : 0,
		"multiplicator" : 0.01,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (30+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "airH":
	displayData["airHumidity"] = {
		"signalkPath": "environment.outside.relativeHumidity",
		"label": i18n.dashboarAirHumidityTXT+', '+i18n.dashboardAirHumidityMesTXT,
		"precision" : 0,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (30+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "waterT":
	displayData["waterTemperature"] = {
		"signalkPath": "environment.water.temperature",
		"label": i18n.dashboarWaterTemperatureTXT+', '+i18n.dashboardTemperatureMesTXT,
		"precision" : 0,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": (30+modeRefreshIntervalInput.value) * 1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
case "navPoint":
	displayData["nextPoint"] = {
		"signalkPath": "navigation.course.nextPoint",
		"label": i18n.dashboarNextPointTXT,
		"precision" : 0,
		"maxRefreshInterval": modeRefreshIntervalInput.value * 1000,
		"fresh": 60*60*24*1000,
		"DOMid": DOMid,
		"menuItem" : modeSelector.value
	};
	break;
};
//console.log('[modeMenuSubmit] displayData:',displayData);
storageHandler.save('displayData');
//console.log('[modeMenuSubmit] displayData saved:',storageHandler.restore('displayData'));
//modeMenuClose();	// оно не надо, поскольку окно перегружается
//alert('[modeMenuSubmit] Перезагрузка!');
}; // end function modeMenuSubmit

// Конец Меню параметров



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
//console.log('[chkTPV] tpvName=',tpvName,'displayData[tpvName].fresh=',displayData[tpvName].fresh,'Время данных',tpv[tpvName].timestamp,'устарело на',(Date.now()-tpv[tpvName].timestamp)/1000,'сек.');
//if(tpvName=='collisions') console.log('[chkTPV] tpvName=',tpvName,'displayData[tpvName].fresh=',displayData[tpvName].fresh,'Время данных',tpv[tpvName].timestamp,'устарело на',(Date.now()-tpv[tpvName].timestamp)/1000,'сек.');
//if(tpv[tpvName] && ((dt > displayData[tpvName].fresh) || dt < 0)){	// dt меньше 0 - это фигня какая-то... Почему?
// dt меньше 0 - это действительно фигня, но следует ли заморачиваться?
// Причина, скорее всего, в разном времени на компьютерах
if(tpv[tpvName] && ((dt > displayData[tpvName].fresh))){	
	console.log('Property',tpvName,'is',dt/1000,'sec. old, but should be no more than',displayData[tpvName].fresh/1000,'sec.');
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
//console.log('[chkAllTPV] запущено');
let minFresh=999999999999;
let changed=false;
for(let tpvName in tpv){
	//console.log('[chkAllTPV] tpvName=',tpvName);
	changed = chkTPV(tpvName);
	if(!changed && displayData[tpvName].fresh && (displayData[tpvName].fresh < minFresh)) {
		minFresh = displayData[tpvName].fresh;
		//console.log('[chkAllTPV] tpvName=',tpvName,'minFresh=',minFresh,displayData[tpvName]);
	};
};
//console.log('[chkAllTPV] minFresh=',minFresh,'minFreshInterval:',minFreshInterval);
if(minFresh > 10000) minFresh = 10000;	// может не быть ни одного значения свежести, или быть очень большое
if(minFresh != minFreshInterval.value){
	minFreshInterval.value = minFresh;
	clearInterval(minFreshInterval.object);
	//console.log('[chkAllTPV] Интервал проверки свежести имеющихся данных установлен в',minFreshInterval.value/1000,'сек.');
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
bottomMessage.style.display = '';
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

/*
function isBooblingFrom(event,id){
// Проверяет, всплывает ли событие event через объект с id 
//Нужно, чтобы объект, на котором зарегистрировано событие, тоже имел id
//
if(event.target.id == id) return true;	// событие вызвано собственно на искомом объекте
let currentTargetID = event.currentTarget.id;
if(!currentTargetID) return null;
let current = event.target.parentElement;
do{
	if(!current) return false;
	if(current.id == currentTargetID) return false;
	if(current.id == id) return true;
	current = current.parentElement;
} while(true);
}; // end function isBooblingFrom
*/

const storageHandler = {
	_storageName : 'DashboardModernSKOptions',
	_store: {'empty':true},	// типа, флаг, что ещё не считывали из хранилища. Так проще и быстрей в этом кривом языке.
	storage: false,	// теоретически, можно указать, куда именно записывать? Но только мимо проверки доступности.
	//storage: 'cookie',
	//storage: 'storage',
	save: function(key,value=null){
		/* сохраняет key->value, но можно передать список пар одним параметром 
		или просто строку с именем переменной */
		let values = {};
		if(arguments.length == 2){	// два аргумента - это key->value
			values[key] = value;
		}
		else if(typeof key == 'object') {	// один, но список key->value
			values = key;
		}
		else {	// один, тогда это строка - имя переменной
			//values[key] = window[key];	// это обломается, если key - не глобальная переменная, объявленная через var
			// поэтому нижесказанное - единственный способ получить значение объекта по его имени.
			// Он сработает и с локальным объектом, и с объектами, объявленными через let и const
			values[key] = eval(key);
			//console.log('[storageHandler] save key=',key,window[key]);
		};
		//console.log('[storageHandler] save',values,'to storage:',this.storage,'store:',this._store);
		for(let key in values){
			this._store[key] = values[key];
		};
		this._store.empty = false;
		this._saveStore();
	},
	restore: function(key){
		//alert('[storageHandler] restore '+key);
		if(this._store.empty){
			this._restoreStore();
			this._store.empty = false;
		};
		return this._store[key.trim()];
	},
	restoreAll: function(){
		if(this._store.empty){
			this._restoreStore();
			this._store.empty = false;
		};
		delete this._store.empty;
		for(let varName in this._store){
			window[varName] = this._store[varName];	// window[varName] - создаётся глобальная переменная с именем, являющимся значением varName
		};
		this._store.empty = false;
	},
	del: function(key){
		if(this._store.empty){
			this._restoreStore();
			this._store.empty = false;
		};
		delete this._store[key.trim()];
		this._saveStore();
	},
	_findStorage: function(){
		try {
			window.localStorage.setItem("__storage_test__", "__storage_test__");
			window.localStorage.removeItem("__storage_test__");
			this.storage='storage';
		}
		catch (err) {
			this.storage='cookie';	// куки-то всегда можно, да?
		};
	},
	_saveStore: function(){
		if(!this.storage) this._findStorage();
		switch(this.storage){
		case 'storage':
			//console.log('_saveStore:',JSON.stringify(this._store));
			window.localStorage.setItem(this._storageName, JSON.stringify(this._store));
			break;
		case 'cookie':
			let expires = new Date(Date.now() + (60*24*60*60*1000));	// протухнет через два месяца
			expires = expires.toUTCString();
			document.cookie = this._storageName+"="+JSON.stringify(this._store)+"; expires="+expires+"; path=/; SameSite=Lax;";
			break;
		default:
			console.log('storageHandler: the parameters are not saved, there is nowhere');
		};
	},
	_restoreStore: function(){
		if(!this.storage) this._findStorage();
		switch(this.storage){
		case 'storage':
			this._store = JSON.parse(window.localStorage.getItem(this._storageName));
			//console.log('_restoreStore:',JSON.stringify(this._store));
			if(!this._store) this._store = {'empty':true};
			break;
		case 'cookie':
			this._store = JSON.parse(document.cookie.match(new RegExp(
				"(?:^|; )" + this._storageName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			))[1]);
			if(!this._store) this._store = {'empty':true};
			break;
		default:
			console.log('storageHandler: no saved parameters, there is nowhere');
		};
	}
}; // end storageHandler

