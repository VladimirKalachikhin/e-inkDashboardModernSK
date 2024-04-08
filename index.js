module.exports = function (app) {
/**/

var plugin = {};
var versionTXT = '';

plugin.id = 'e-inkDashboardModern';
plugin.name = 'e-inkDashboardmodern';
plugin.description = 'Dashboard for modern powerful JavaScript-enabled e-ink devices with some Signal K instruments';

plugin.schema = {
	'title': 'e-inkDashboardModern',
	'type': 'object',
	'description': 'Reload Dashboard page in browser after changing any of this.',
	'properties': {
		'trackProp':{
			'title': 'Direction',
			'description': '',
			'type': 'object',
			'properties': {
				'feature':{
					'type': 'string',
					'title': 'Will be displayed as Course:',
					'enum': [
						'Course over ground (COG)',
						'Course over ground magnetic (CGM)',
						'Heading true (HT)',
						'Heading magnetic (HM)',
						'Heading compass (HC)',
					],
					'default': 'Course over ground (COG)'
				},
				'maxRefreshInterval': {
					'type': 'number',
					'title': 'The maximum frequency of Course refresh, sec',
					'description': `Set this as quickly as your e-ink device may. If 0 -- 
					the data will be displayed as fast as they are received. If your device swamping this data flow -- 
					set this parameter to 0.5, 1 or 2 sec. Getting data seldom can be dangerous!
					`,
					'default': 0
				},
			},
		},
		'wind': {
			'title': 'Wind',
			'type': 'object',
			'properties': {
				'direction':{
					'title': '',
					'type': 'object',
					'properties': {
						'feature':{
							'type': 'string',
							'title': 'Will be displayed as Wind direction:',
							'enum': [
								'Apparent wind (AW)',
								'True wind through water (TWA)',
								'True wind (TW)',
								'True wind magnetic (TWM)',
								'True wind through ground (GWA)',
								'none'
							],
							'default': 'Apparent wind (AW)'
						},
						'maxRefreshInterval': {
							'type': 'number',
							'title': 'The maximum frequency of Wind refresh, sec',
							'description': `Set this as quickly as your e-ink device may. If 0 -- 
							the data will be displayed as fast as they are received. If your device swamping this data flow -- 
							set this parameter to 0.5, 1 or 2 sec. Getting data seldom can be dangerous!
							`,
							'default': 0
						},
					},
				},
			}
		},
		'leftTopBlock':{
			'title': 'Left top value',
			'type': 'object',
			'properties': {
				'feature':{
					'type': 'string',
					'title': 'Will be displayed on the left top corner:',
					'enum': [
						'Speed ower ground (SOG)',
						'Speed through water (STW)',
						'Depth below surface (DBS)',
						'Depth below keel (DBK)',
						'Depth below transducer (DBT)',
						'Engine 1 revolutions',
						'Engine 1 temperature',
						'Engine 2 revolutions',
						'Engine 2 temperature',
						'Outside air temperature',
						'Outside air pressure',
						'Outside air relative humidity',
						'Water temperature',
						'Next navigated point',
						'none'
					],
					'default': 'Speed ower ground (SOG)'
				},
				'maxRefreshInterval': {
					'type': 'number',
					'title': 'The maximum frequency of value refresh, sec',
					'description': `Set this as quickly as your e-ink device may. If 0 -- 
					the data will be displayed as fast as they are received. If your device swamping this data flow -- 
					set this parameter to 0.5, 1 or 2 sec. Getting data seldom can be dangerous!
					`,
					'default': 0
				}
			}
		},
		'rightTopBlock':{
			'title': 'Right top value',
			'type': 'object',
			'properties': {
				'feature':{
					'type': 'string',
					'title': 'Will be displayed on the right top corner:',
					'enum': [
						'Speed ower ground (SOG)',
						'Speed through water (STW)',
						'Depth below surface (DBS)',
						'Depth below keel (DBK)',
						'Depth below transducer (DBT)',
						'Engine 1 revolutions',
						'Engine 1 temperature',
						'Engine 2 revolutions',
						'Engine 2 temperature',
						'Outside air temperature',
						'Outside air pressure',
						'Outside air relative humidity',
						'Water temperature',
						'Next navigated point',
						'none'
					],
					'default': 'Depth below transducer (DBT)'
				},
				'maxRefreshInterval': {
					'type': 'number',
					'title': 'The maximum frequency of value refresh, sec',
					'description': `Set this as quickly as your e-ink device may. If 0 -- 
					the data will be displayed as fast as they are received. If your device swamping this data flow -- 
					set this parameter to 0.5, 1 or 2 sec. Getting data seldom can be dangerous!
					`,
					'default': 0
				}
			}
		},
		'leftBottomBlock':{
			'title': 'Left bottom value',
			'type': 'object',
			'properties': {
				'feature':{
					'type': 'string',
					'title': 'Will be displayed on the left bottom corner:',
					'enum': [
						'Speed ower ground (SOG)',
						'Speed through water (STW)',
						'Depth below surface (DBS)',
						'Depth below keel (DBK)',
						'Depth below transducer (DBT)',
						'Engine 1 revolutions',
						'Engine 1 temperature',
						'Engine 2 revolutions',
						'Engine 2 temperature',
						'Outside air temperature',
						'Outside air pressure',
						'Outside air relative humidity',
						'Water temperature',
						'Next navigated point',
						'none'
					],
					'default': 'Engine 1 revolutions'
				},
				'maxRefreshInterval': {
					'type': 'number',
					'title': 'The maximum frequency of value refresh, sec',
					'description': `Set this as quickly as your e-ink device may. If 0 -- 
					the data will be displayed as fast as they are received. If your device swamping this data flow -- 
					set this parameter to 0.5, 1 or 2 sec. Getting data seldom can be dangerous!
					`,
					'default': 0
				}
			}
		},
		'rightBottomBlock':{
			'title': 'Right bottom value',
			'type': 'object',
			'properties': {
				'feature':{
					'type': 'string',
					'title': 'Will be displayed on the right bottom corner:',
					'enum': [
						'Speed ower ground (SOG)',
						'Speed through water (STW)',
						'Depth below surface (DBS)',
						'Depth below keel (DBK)',
						'Depth below transducer (DBT)',
						'Engine 1 revolutions',
						'Engine 1 temperature',
						'Engine 2 revolutions',
						'Engine 2 temperature',
						'Outside air temperature',
						'Outside air pressure',
						'Outside air relative humidity',
						'Water temperature',
						'Next navigated point',
						'none'
					],
					'default': 'Engine 1 temperature'
				},
				'maxRefreshInterval': {
					'type': 'number',
					'title': 'The maximum frequency of value refresh, sec',
					'description': `Set this as quickly as your e-ink device may. If 0 -- 
					the data will be displayed as fast as they are received. If your device swamping this data flow -- 
					set this parameter to 0.5, 1 or 2 sec. Getting data seldom can be dangerous!
					`,
					'default': 0
				}
			}
		}
	}
};

var unsubscribes = []; 	// массив функций с традиционным именем, в котором функции, которые надо выполнить при остановке плагина

plugin.start = function (options, restartPlugin) {
const fs = require("fs");

//app.debug('options:',options);
/* optionsjs создаётся как строка, потому что там указаны имена переменных, в результате во время
<script src="options.js"></script> эти имена будут заменены на значения. А если
формировать displayData как объект, а потом JSON.stringify, то такое фокус не пройдёт: невозможно
сказать, чтобы строка выводилась без кавычек.
Проблема: юзер может дважды указать одну options. Однако, JSON.parse, вроде, спокойно относится
к такому, и присваивает последнее значение. Это обстоятельство используется для показа путевой точки:
один раз на путь navigation.course.nextPoint подписываемся безусловно, для показа метки на круге,
а потом подписываемся, если указано в конфигурации -- для показа расстояния до точки в углу.
*/
let optionsjs = `
const checkDataFreshness = ${options.checkDataFreshness};
// типы данных, которые, собственно, будем показывать 
// javascript допускает комментарии в json?
const displayData = {  	// 
`;
/* Центральный круг, безусловная подписка */
/* направление */
// Может быть выбрано только одна величина для track, поэтому есть только track и нет magtrack
let headingDirection = 'false';
if(options.trackProp.feature.includes('COG')) {
	optionsjs += `
	'track' : {	// course over ground, путевой угол, TPV track в gpsd
		'signalkPath': 'navigation.courseOverGroundTrue',
		'label': dashboardCourseTXT,	// наименование переменной из internationalisation.js
		'precision': 0,	// точность показываемой цифры, символов после запятой
		'multiplicator': ${180/Math.PI}, 	// на что нужно умножить значение для показа
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		'headingDirection': ${headingDirection}
	},
	'heading' : {	// heading, курс, в gpsd ATT heading
		'signalkPath': 'navigation.headingTrue',
		'label': dashboardHeadingTXT,	// наименование переменной из internationalisation.js
		'precision': 0,	// точность показываемой цифры, символов после запятой
		'multiplicator': ${180/Math.PI}, 	// на что нужно умножить значение для показа
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		'headingDirection': ${headingDirection}
	},
`;
}
else if(options.trackProp.feature.includes('CGM')) {
	optionsjs += `
	'track' : {	// course over ground, путевой угол, track в gpsd
		'signalkPath': 'navigation.courseOverGroundMagnetic',
		'label': dashboardMagCourseTXT,	// наименование переменной из internationalisation.js
		'precision': 0,	// точность показываемой цифры, символов после запятой
		'multiplicator': ${180/Math.PI}, 	// на что нужно умножить значение для показа
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		'headingDirection': ${headingDirection}
	},
	'heading' : {	// heading, курс
		'signalkPath': 'navigation.headingMagnetic',
		'label': dashboardMagHeadingTXT,	// наименование переменной из internationalisation.js
		'precision': 0,	// точность показываемой цифры, символов после запятой
		'multiplicator': ${180/Math.PI}, 	// на что нужно умножить значение для показа
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		'headingDirection': ${headingDirection}
	},
`;
}
else if(options.trackProp.feature.includes('HT')) {
	headingDirection = 'true';
	optionsjs += `
	'track' : {	// course over ground, путевой угол, track в gpsd
		'signalkPath': 'navigation.courseOverGroundTrue',
		'label': dashboardCourseTXT,	// наименование переменной из internationalisation.js
		'precision': 0,	// точность показываемой цифры, символов после запятой
		'multiplicator': ${180/Math.PI}, 	// на что нужно умножить значение для показа
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		'headingDirection': ${headingDirection}
	},
	'heading' : {	// heading, курс
		'signalkPath': 'navigation.headingTrue',
		'label': dashboardHeadingTXT,	// наименование переменной из internationalisation.js
		'precision': 0,	// точность показываемой цифры, символов после запятой
		'multiplicator': ${180/Math.PI}, 	// на что нужно умножить значение для показа
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		'headingDirection': ${headingDirection}
	},
`;
}
else if(options.trackProp.feature.includes('HM')) {
	headingDirection = 'true';
	optionsjs += `
	'track' : {	// course over ground, путевой угол, track в gpsd
		'signalkPath': 'navigation.courseOverGroundMagnetic',
		'label': dashboardMagCourseTXT,	// наименование переменной из internationalisation.js
		'precision': 0,	// точность показываемой цифры, символов после запятой
		'multiplicator': ${180/Math.PI}, 	// на что нужно умножить значение для показа
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		'headingDirection': ${headingDirection}
	},
	'heading' : {	// heading, курс
		'signalkPath': 'navigation.headingMagnetic',
		'label': dashboardMagHeadingTXT,	// наименование переменной из internationalisation.js
		'precision': 0,	// точность показываемой цифры, символов после запятой
		'multiplicator': ${180/Math.PI}, 	// на что нужно умножить значение для показа
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		'headingDirection': ${headingDirection}
	},
`;
}
else if(options.trackProp.feature.includes('HC')) {
	headingDirection = 'true';
	optionsjs += `
	'track' : {	// course over ground, путевой угол, track в gpsd
		'signalkPath': 'navigation.courseOverGroundMagnetic',
		'label': dashboardMagCourseTXT,	// наименование переменной из internationalisation.js
		'precision': 0,	// точность показываемой цифры, символов после запятой
		'multiplicator': ${180/Math.PI}, 	// на что нужно умножить значение для показа
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		'headingDirection': ${headingDirection}
	},
	'heading' : {	// heading, курс
		'signalkPath': 'navigation.headingCompass',
		'label': dashboardCompassHeadingTXT',	// наименование переменной из internationalisation.js
		'precision': 0,	// точность показываемой цифры, символов после запятой
		'multiplicator': ${180/Math.PI}, 	// на что нужно умножить значение для показа
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		'headingDirection': ${headingDirection}
	},
`;
};
/* ветер 
 только один вариант показывается 
*/
let trueWind = 'false';
if(options.wind.direction.feature.includes('AW')) {	// вымпельный ветер
	optionsjs += `
'wangle' : {
		'signalkPath': 'environment.wind.angleApparent',
		'label': '',
		'precision' : 0,
		'multiplicator' : ${180/Math.PI},
		'maxRefreshInterval': ${options.wind.direction.maxRefreshInterval * 1000},
		'fresh': ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		'trueWind': ${trueWind}
	},
`;
	optionsjs += `
	'wspeed' : {
		'signalkPath': 'environment.wind.speedApparent',
		'label': dashboardWindSpeedTXT+', '+dashboardWindSpeedMesTXT+':',
		'precision' : 0,
		'multiplicator' : 1,
		'maxRefreshInterval': ${options.wind.direction.maxRefreshInterval * 1000},
		'fresh': ${(2+options.wind.direction.maxRefreshInterval) * 1000},
	},
`;
}
else if(options.wind.direction.feature.includes('(TW)')) {
	trueWind = 'true';
	optionsjs += `
	'wangle' : {
		'signalkPath': 'environment.wind.directionTrue',	// The wind direction relative to true north
		'label': '',
		'precision' : 0,
		'multiplicator' : ${180/Math.PI},
		'maxRefreshInterval': ${options.wind.direction.maxRefreshInterval * 1000},
		'fresh': ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		'trueWind': ${trueWind}
	},
`;
	optionsjs += `
	'wspeed' : {
		'signalkPath': 'environment.wind.speedTrue',	// Wind speed over water (as calculated from speedApparent and vessel's speed through water)
		'label': dashboardTrueWindSpeedTXT+', '+dashboardWindSpeedMesTXT+':',
		'precision' : 1,
		'multiplicator' : 1,
		'maxRefreshInterval': ${options.wind.direction.maxRefreshInterval * 1000},
		'fresh': ${(2+options.wind.direction.maxRefreshInterval) * 1000},
	},
`;
}
else if(options.wind.direction.feature.includes('TWM')) {
	// только если курс или путевой угол магнитный
	if(options.trackProp.feature.includes('CGM') || options.trackProp.feature.includes('HM' || options.trackProp.feature.includes('HC'))){
		trueWind = 'true';
		optionsjs += `
	'wangle' : {
		'signalkPath': 'environment.wind.directionMagnetic',
		'label': '',
		'precision' : 0,
		'multiplicator' : ${180/Math.PI},
		'maxRefreshInterval': ${options.wind.direction.maxRefreshInterval * 1000},
		'fresh': ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		'trueWind': ${trueWind}
	},
`;
	optionsjs += `
	'wspeed' : {
		'signalkPath': 'environment.wind.speedTrue',	// Wind speed over water (as calculated from speedApparent and vessel's speed through water)
		'label': dashboardTrueWindSpeedTXT+', '+dashboardWindSpeedMesTXT+':',
		'precision' : 1,
		'multiplicator' : 1,
		'maxRefreshInterval': ${options.wind.direction.maxRefreshInterval * 1000},
		'fresh': ${(2+options.wind.direction.maxRefreshInterval) * 1000},
	},
`;
	}
}
else if(options.wind.direction.feature.includes('GWA')) {	// Видимо, это курсовой угол истинного ветра, вычисленный из вымпельного по истинной скорости
	trueWind = 'true';
	optionsjs += `
	'wangle' : {
		'signalkPath': 'environment.wind.angleTrueGround',
		'label': '',
		'precision' : 0,
		'multiplicator' : ${180/Math.PI},
		'maxRefreshInterval': ${options.wind.direction.maxRefreshInterval * 1000},
		'fresh': ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		'trueWind': ${trueWind}
	},
`;
	optionsjs += `
	'wspeed' : {
		'signalkPath': 'environment.wind.speedOverGround',
		'label': dashboardTrueWindSpeedTXT+', '+dashboardWindSpeedMesTXT+':',
		'precision' : 0,
		'multiplicator' : 1,
		'maxRefreshInterval': ${options.wind.direction.maxRefreshInterval * 1000},
		'fresh': ${(2+options.wind.direction.maxRefreshInterval) * 1000},
	},
`;
}
else if(options.wind.direction.feature.includes('TWA')) {	// а это -- по скорости по лагу
	trueWind = 'true';
	optionsjs += `
	'wangle' : {
		'signalkPath': 'environment.wind.angleTrueWater',
		'label': '',
		'precision' : 0,
		'multiplicator' : ${180/Math.PI},
		'maxRefreshInterval': ${options.wind.direction.maxRefreshInterval * 1000},
		'fresh': ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		'trueWind': ${trueWind}
	},
`;
	optionsjs += `
	'wspeed' : {
		'signalkPath': 'environment.wind.speedTrue',	// Wind speed over water (as calculated from speedApparent and vessel's speed through water)
		'label': dashboardTrueWindSpeedTXT+', '+dashboardWindSpeedMesTXT+':',
		'precision' : 1,
		'multiplicator' : 1,
		'maxRefreshInterval': ${options.wind.direction.maxRefreshInterval * 1000},
		'fresh': ${(2+options.wind.direction.maxRefreshInterval) * 1000},
	},
`;
};

/* Безусловная подписка */
/* Собственные координаты 
требуются для режима "Человек за бортом", поскольку там передаётся сообщение только при 
изменении сведений о MOB, а не о своём относительно MOB, хотя такая возможность есть.
Думаю, правильно не флудить. Но тогда здесь нужны свои координаты.
Собственно, они нужны были и для Предупреждения столкновений, но там сообщение передаётся и 
каждое изменение собственной позиции, и я добавил в сообщение направление и дальность в
дополнение к координатам цели.
*/
optionsjs += `
	'position' : {
		'signalkPath': 'navigation.position',
		'dataPaths': ['longitude','latitude'],	// если .value в delta не атомарное значение - пути от value до атомарных значений. Для проверки на null.
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
	},
`;
/* Предупреждение столкновений, требует наличия collision-detector */
optionsjs += `
	'collisions' : {
		'signalkPath': 'notifications.danger.collision',
		'precision' : 0,
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
	},
`;
/* Человек за бортом, требует наличия GaladrielMap*/
optionsjs += `
	'mob' : {
		'signalkPath': 'notifications.mob',
		'precision' : 0,
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
	},
`;
/* Следующая путевая точка на круге */
optionsjs += `
	'nextPoint' : {
		'signalkPath': 'navigation.course.nextPoint',
		'precision' : 0,
		'maxRefreshInterval': ${options.trackProp.maxRefreshInterval * 1000},
		'fresh': ${60*60*24*1000},
	},
`;

/* Подписка если указано в настройках плагина */
/* Углы экрана */
/* Left top value */
if(options.leftTopBlock.feature !== 'none') buildOptions(options.leftTopBlock,'leftTopBlock');
/* Right top value */
if(options.rightTopBlock.feature !== 'none') buildOptions(options.rightTopBlock,'rightTopBlock');
/* Left bottom value */
if(options.leftBottomBlock.feature !== 'none') buildOptions(options.leftBottomBlock,'leftBottomBlock');
/* Right bottom value */
if(options.rightBottomBlock.feature !== 'none') buildOptions(options.rightBottomBlock,'rightBottomBlock');

// закрываем JSON
optionsjs += `
};
`;
fs.writeFileSync(__dirname+'/public/options.js',optionsjs);

function buildOptions(option,DOMid=null){
/* дописывает optionsjs величинами для показа в углах экрана */
let propulsion=[false,false];

if(option.feature.includes('SOG')) {	/* скорость */
	optionsjs += `
	'speed' : {
		'signalkPath': 'navigation.speedOverGround',
		'label': dashboardSpeedTXT+', '+dashboardSpeedMesTXT,	// скорость
		'precision' : 1,
		'multiplicator' : ${60*60/1000},
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(3+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
}
else if(option.feature.includes('STW')) {
	optionsjs += `
	'speed' : {
		'signalkPath': 'navigation.speedThroughWater',
		'label': dashboardVaterSpeedTXT+', '+dashboardSpeedMesTXT,	// скорость
		'precision' : 1,
		'multiplicator' : ${60*60/1000},
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(3+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
}
else if(option.feature.includes('DBS')) {	// глубина
	optionsjs += `
	'depth' : {
		'signalkPath': 'environment.depth.belowSurface',
		'label': dashboardDepthTXT+', '+dashboardDepthMesTXT, 	// глубина
		'precision' : 1,
		'multiplicator' : 1,
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(2+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
}
else if(option.feature.includes('DBK')) {
	optionsjs += `
	'depth' : {
		'signalkPath': 'environment.depth.belowKeel',
		'label': dashboardKeelDepthTXT+', '+dashboardDepthMesTXT, 	// глубина
		'precision' : 1,
		'multiplicator' : 1,
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(2+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
}
else if(option.feature.includes('DBT')) {
	optionsjs += `
	'depth' : {
		'signalkPath': 'environment.depth.belowTransducer',
		'label': dashboardTransDepthTXT+', '+dashboardDepthMesTXT, 	// глубина
		'precision' : 1,
		'multiplicator' : 1,
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(2+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
}
else if(option.feature.includes('1 revolutions')) {	/* двигатели */
	optionsjs += `
	'propRevolutions0' : {
		'signalkPath': 'propulsion.p0.revolutions',
		'label': dashboardPropRevolutionTXT+', '+dashboardPropRevolutionMesTXT,
		'precision' : 0,
		'multiplicator' : 60,
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(2+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
	propulsion[0]=true;
}
else if(option.feature.includes('1 temperature')) {
	// Temperature in Kelvin!!!
	optionsjs += `
	'propTemperature0' : {
		'signalkPath': 'propulsion.p0.temperature',
		'label': dashboardPropTemperatureTXT+', '+dashboardTemperatureMesTXT,
		'precision' : 0,
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(5+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
	propulsion[0]=true;
}
else if(option.feature.includes('2 revolutions')) {
	optionsjs += `
	'propRevolutions1' : {
		'signalkPath': 'propulsion.p1.revolutions',
		'label': dashboardPropRevolutionTXT+', '+dashboardPropRevolutionMesTXT,
		'precision' : 0,
		'multiplicator' : 60,
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(2+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
	propulsion[1]=true;
}
else if(option.feature.includes('2 temperature')) {
	// Temperature in Kelvin!!!
	optionsjs += `
	'propTemperature1' : {
		'signalkPath': 'propulsion.p1.temperature',
		'label': dashboardPropTemperatureTXT+', '+dashboardTemperatureMesTXT,
		'precision' : 0,
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(5+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
	propulsion[1]=true;
}
else if(option.feature.includes('air temperature')) {	/* температура воздуха */ 
	// Temperature in Kelvin!!!
	optionsjs += `
	'airTemperature' : {
		'signalkPath': 'environment.outside.temperature',
		'label': dashboarAirTemperatureTXT+', '+dashboardTemperatureMesTXT,
		'precision' : 0,
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(30+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
}
else if(option.feature.includes('air pressure')) {	/* давление воздуха */
	optionsjs += `
	'airPressure' : {
		'signalkPath': 'environment.outside.pressure',
		'label': dashboarAirPressureTXT+', '+dashboardAirPressureMesTXT,
		'precision' : 0,
		'multiplicator' : 0.01,
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(30+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
}
else if(option.feature.includes('humidity')) {	/* влажность */
	optionsjs += `
	'airHumidity' : {
		'signalkPath': 'environment.outside.relativeHumidity',
		'label': dashboarAirHumidityTXT+', '+dashboardAirHumidityMesTXT,
		'precision' : 0,
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(30+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
}
else if(option.feature.includes('ater temperature')) {	/* температура воды */
	optionsjs += `
	'waterTemperature' : {
		'signalkPath': 'environment.water.temperature',
		'label': dashboarWaterTemperatureTXT+', '+dashboardTemperatureMesTXT,
		'precision' : 0,
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(30+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}"
	},
`;
}
else if(option.feature.includes('navigated point')) {	/* следующая путевая точка на круге и в углу */
	optionsjs += `
	'nextPoint' : {
		'signalkPath': 'navigation.course.nextPoint',
		'label': dashboarNextPointTXT,
		'precision' : 0,
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${60*60*24*1000},
		"DOMid": "${DOMid}"
	},
`;
};

if(propulsion[0]){
	optionsjs += `
	'propLabel0' : {
		'signalkPath': 'propulsion.p0.label',
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(10+option.maxRefreshInterval) * 1000},
	},
`;
	optionsjs += `
	'propState0' : {
		'signalkPath': 'propulsion.p0.state',
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(10+option.maxRefreshInterval) * 1000},
	},
`;
}
if(propulsion[1]){
	optionsjs += `
	'propLabel1' : {
		'signalkPath': 'propulsion.p1.label',
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(10+option.maxRefreshInterval) * 1000},
	},
`;
	optionsjs += `
	'propState1' : {
		'signalkPath': 'propulsion.p1.state',
		'maxRefreshInterval': ${option.maxRefreshInterval * 1000},
		'fresh': ${(10+option.maxRefreshInterval) * 1000},
	},
`;
}

}; // end function buildOptions

app.debug('Plugin started');
}; // end function plugin.start

plugin.stop = function () {
// Here we put logic we need when the plugin stops
	app.debug('Plugin stopped');
	unsubscribes.forEach(f => f());
	unsubscribes = [];
}; // end function plugin.stop

return plugin;
}; //end module.exports

