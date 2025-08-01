module.exports = function (app) {
/**/

var plugin = {};
var versionTXT = '';

plugin.id = 'e-inkDashboardModern';
plugin.name = 'e-inkDashboardModern';
plugin.description = 'Dashboard for modern powerful JavaScript-enabled e-ink devices with some Signal K instruments';

plugin.schema = {
	"title": "e-inkDashboardModern",
	"type": "object",
	"description": "",
	"properties": {
		"trackProp":{
			"title": "Direction",
			"description": "",
			"type": "object",
			"properties": {
				"feature":{
					"type": "string",
					"title": "Will be displayed as a Course:",
					"enum": [
						"Course over ground (COG)",
						"Course over ground magnetic (CGM)",
						"Heading true (HT)",
						"Heading magnetic (HM)",
						"Heading compass (HC)",
					],
					"default": "Course over ground (COG)"
				},
				"maxRefreshInterval": {
					"type": "number",
					"title": "The maximum frequency of Course refresh, sec",
					"description": `Set this as quickly as your e-ink device may. If 0 -- 
					the data will be displayed as fast as they are received. If your device swamping this data flow -- 
					set this parameter to 0.5, 1 or 2 sec. Getting data seldom can be dangerous!
					`,
					"default": 0
				},
			},
		},
		"wind": {
			"title": "Wind",
			"type": "object",
			"properties": {
				"direction":{
					"title": "",
					"type": "object",
					"properties": {
						"feature":{
							"type": "string",
							"title": "Will be displayed as a Wind direction:",
							"enum": [
								"Apparent wind (AWA)",
								"True wind through water (TWA)",
								"True wind through ground (GWA)",
								"Wind direction true (TWD)",
								"Wind direction magnetic (MWD)",
								"none"
							],
							"default": "Apparent wind (AWA)"
						},
						"maxRefreshInterval": {
							"type": "number",
							"title": "The maximum frequency of Wind refresh, sec",
							"description": `Set this as quickly as your e-ink device may. If 0 -- 
							the data will be displayed as fast as they are received. If your device swamping this data flow -- 
							set this parameter to 0.5, 1 or 2 sec. Getting data seldom can be dangerous!
							`,
							"default": 0
						},
					},
				},
			}
		},
		"leftTopBlock":{
			"title": "Left top value",
			"type": "object",
			"properties": {
				"feature":{
					"type": "string",
					"title": "Will be displayed on the left top corner:",
					"enum": [
						"Speed ower ground (SOG)",
						"Speed through water (STW)",
						"Depth below surface (DBS)",
						"Depth below keel (DBK)",
						"Depth below transducer (DBT)",
						"Engine 1 revolutions",
						"Engine 1 temperature",
						"Engine 2 revolutions",
						"Engine 2 temperature",
						"Outside air temperature",
						"Outside air pressure",
						"Outside air relative humidity",
						"Water temperature",
						"Next navigated point",
						"none"
					],
					"default": "Speed ower ground (SOG)"
				},
				"maxRefreshInterval": {
					"type": "number",
					"title": "The maximum frequency of value refresh, sec",
					"description": `Set this as quickly as your e-ink device may. If 0 -- 
					the data will be displayed as fast as they are received. If your device swamping this data flow -- 
					set this parameter to 0.5, 1 or 2 sec. Getting data seldom can be dangerous!
					`,
					"default": 0
				}
			}
		},
		"rightTopBlock":{
			"title": "Right top value",
			"type": "object",
			"properties": {
				"feature":{
					"type": "string",
					"title": "Will be displayed on the right top corner:",
					"enum": [
						"Speed ower ground (SOG)",
						"Speed through water (STW)",
						"Depth below surface (DBS)",
						"Depth below keel (DBK)",
						"Depth below transducer (DBT)",
						"Engine 1 revolutions",
						"Engine 1 temperature",
						"Engine 2 revolutions",
						"Engine 2 temperature",
						"Outside air temperature",
						"Outside air pressure",
						"Outside air relative humidity",
						"Water temperature",
						"Next navigated point",
						"none"
					],
					"default": "Depth below transducer (DBT)"
				},
				"maxRefreshInterval": {
					"type": "number",
					"title": "The maximum frequency of value refresh, sec",
					"description": `Set this as quickly as your e-ink device may. If 0 -- 
					the data will be displayed as fast as they are received. If your device swamping this data flow -- 
					set this parameter to 0.5, 1 or 2 sec. Getting data seldom can be dangerous!
					`,
					"default": 0
				}
			}
		},
		"leftBottomBlock":{
			"title": "Left bottom value",
			"type": "object",
			"properties": {
				"feature":{
					"type": "string",
					"title": "Will be displayed on the left bottom corner:",
					"enum": [
						"Speed ower ground (SOG)",
						"Speed through water (STW)",
						"Depth below surface (DBS)",
						"Depth below keel (DBK)",
						"Depth below transducer (DBT)",
						"Engine 1 revolutions",
						"Engine 1 temperature",
						"Engine 2 revolutions",
						"Engine 2 temperature",
						"Outside air temperature",
						"Outside air pressure",
						"Outside air relative humidity",
						"Water temperature",
						"Next navigated point",
						"none"
					],
					"default": "Engine 1 revolutions"
				},
				"maxRefreshInterval": {
					"type": "number",
					"title": "The maximum frequency of value refresh, sec",
					"description": `Set this as quickly as your e-ink device may. If 0 -- 
					the data will be displayed as fast as they are received. If your device swamping this data flow -- 
					set this parameter to 0.5, 1 or 2 sec. Getting data seldom can be dangerous!
					`,
					"default": 0
				}
			}
		},
		"rightBottomBlock":{
			"title": "Right bottom value",
			"type": "object",
			"properties": {
				"feature":{
					"type": "string",
					"title": "Will be displayed on the right bottom corner:",
					"enum": [
						"Speed ower ground (SOG)",
						"Speed through water (STW)",
						"Depth below surface (DBS)",
						"Depth below keel (DBK)",
						"Depth below transducer (DBT)",
						"Engine 1 revolutions",
						"Engine 1 temperature",
						"Engine 2 revolutions",
						"Engine 2 temperature",
						"Outside air temperature",
						"Outside air pressure",
						"Outside air relative humidity",
						"Water temperature",
						"Next navigated point",
						"none"
					],
					"default": "Engine 1 temperature"
				},
				"maxRefreshInterval": {
					"type": "number",
					"title": "The maximum frequency of value refresh, sec",
					"description": `Set this as quickly as your e-ink device may. If 0 -- 
					the data will be displayed as fast as they are received. If your device swamping this data flow -- 
					set this parameter to 0.5, 1 or 2 sec. Getting data seldom can be dangerous!
					`,
					"default": 0
				}
			}
		},
		"kioskMode":{
			type: 'boolean',
			title: 'Without controls',
			description: 'The client device has no any controls, including a touchscreen.',
			default: false
		}
	}
};

var unsubscribes = []; 	// массив функций с традиционным именем, в котором функции, которые надо выполнить при остановке плагина
var propulsionPaths=[];

plugin.start = function (options, restartPlugin) {
const fs = require("fs");

const createOptionsCount = {'count':0,'timeoutID':null};	// счётчик попыток создания конфига в ожидании появления пути, и id процесса setTimeout
const createOptionsCountLimit = 50;	// максимальное число попыток создать конфиг. Видимо, нужно, чтобы оно пыталось минут пять? Пока всё включат, пока заведут...

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
let optionsjs = '';	// конфиг, загружаемый клиентами как <script src="options.js"></script>
createOptions();	// собственно генерация конфига
app.debug('Plugin started');
// На этом содержательная часть закончилась, дальше - определения функций




function createOptions(){
/**/
// То, что они казлы, это, как бы, понятно... Короче:
// Если изменить конфиг, то плагин останавливается - запускается. При этом
// та переменная options, которая передаётся в плагин, сперва имеет новое значение, как изменили,
// а потом, через некоторое время - снова старое. А потом опять новое. Через раз. 
// Я сам нигде не savePluginOptions
// Почему так происходит - ??
// Но если считать options предназначенной для этого функцией - всё нормально.
// Правда, в доке написано Read the stored plugin configuration options. https://demo.signalk.org/documentation/develop/plugins/server_plugin_api.html
// и пример:
// let options = app.readPluginOptions();
// На самом деле, оно так:
const options = app.readPluginOptions().configuration;
//app.debug('options:',options);
optionsjs = `// Automaticaly created file
// типы данных, которые, собственно, будем показывать 
var displayData = {
	"maxRefreshInterval" : ${options.trackProp.maxRefreshInterval},
	"pluginStatus" : {	// состояние серверной части
		"signalkPath": "${plugin.id}",
		"maxRefreshInterval": 0,
	},
	"kioskMode" : ${options.kioskMode},
`;
if(checkPropulsionPath()){
	optionsjs += `
	"propulsionPaths" : ${JSON.stringify(propulsionPaths)},
`;
};
/* Центральный круг, безусловная подписка */
/* направление */
// Может быть выбрано только одна величина для track, поэтому есть только track и нет magtrack
let headingDirection = 'false';
if(options.trackProp.feature.includes('COG')) {
	optionsjs += `
	"track" : {	// course over ground, путевой угол, TPV track в gpsd
		"signalkPath": "navigation.courseOverGroundTrue",
		"label": i18n.dashboardCourseTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": ${180/Math.PI}, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		"headingDirection": ${headingDirection},
		"menuItem" : "track"
	},
	"heading" : {	// heading, курс, в gpsd ATT heading
		"signalkPath": "navigation.headingTrue",
		"label": i18n.dashboardHeadingTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": ${180/Math.PI}, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		"headingDirection": ${headingDirection},
		"menuItem" : "track"
	},
`;
}
else if(options.trackProp.feature.includes('CGM')) {
	optionsjs += `
	"track" : {	// course over ground, путевой угол, track в gpsd
		"signalkPath": "navigation.courseOverGroundMagnetic",
		"label": i18n.dashboardMagCourseTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": ${180/Math.PI}, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		"headingDirection": ${headingDirection},
		"menuItem" : "magtrack"
	},
	"heading" : {	// heading, курс
		"signalkPath": "navigation.headingMagnetic",
		"label": i18n.dashboardMagHeadingTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": ${180/Math.PI}, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		"headingDirection": ${headingDirection},
		"menuItem" : "magtrack"
	},
`;
}
else if(options.trackProp.feature.includes('HT')) {
	headingDirection = 'true';
	optionsjs += `
	"track" : {	// 
		"signalkPath": "navigation.courseOverGroundTrue",
		"label": i18n.dashboardCourseTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": ${180/Math.PI}, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		"headingDirection": ${headingDirection},
		"menuItem" : "heading"
	},
	"heading" : {	// heading, курс
		"signalkPath": "navigation.headingTrue",
		"label": i18n.dashboardHeadingTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": ${180/Math.PI}, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		"headingDirection": ${headingDirection},
		"menuItem" : "heading"
	},
`;
}
else if(options.trackProp.feature.includes('HM')) {
	headingDirection = 'true';
	optionsjs += `
	"track" : {	// course over ground, путевой угол, track в gpsd
		"signalkPath": "navigation.courseOverGroundMagnetic",
		"label": i18n.dashboardMagCourseTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": ${180/Math.PI}, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		"headingDirection": ${headingDirection},
		"menuItem" : "mheading"
	},
	"heading" : {	// heading, курс
		"signalkPath": "navigation.headingMagnetic",
		"label": i18n.dashboardMagHeadingTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": ${180/Math.PI}, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		"headingDirection": ${headingDirection},
		"menuItem" : "mheading"
	},
`;
}
else if(options.trackProp.feature.includes('HC')) {
	headingDirection = 'true';
	optionsjs += `
	"track" : {	//
		"signalkPath": "navigation.courseOverGroundMagnetic",
		"label": i18n.dashboardMagCourseTXT,	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": ${180/Math.PI}, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		"headingDirection": ${headingDirection},
		"menuItem" : "mheadingC"
	},
	"heading" : {	// heading, курс
		"signalkPath": "navigation.headingCompass",
		"label": i18n.dashboardCompassHeadingTXT",	// наименование переменной из internationalisation.js
		"precision": 0,	// точность показываемой цифры, символов после запятой
		"multiplicator": ${180/Math.PI}, 	// на что нужно умножить значение для показа
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
		"headingDirection": ${headingDirection},
		"menuItem" : "mheadingC"
	},
`;
};
/* ветер 
 только один вариант показывается 
*/
let trueWind = 'false';
if(options.wind.direction.feature.includes('(AWA)')) {	// вымпельный ветер
	optionsjs += `
	"wangle" : {
		"signalkPath": "environment.wind.angleApparent",
		"label": "",
		"precision" : 0,
		"multiplicator" : ${180/Math.PI},
		"maxRefreshInterval": ${options.wind.direction.maxRefreshInterval * 1000},
		"fresh": ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		"trueWind": ${trueWind},
		"menuItem" : "wangler"
	},
	"wspeed" : {
		"signalkPath": "environment.wind.speedApparent",
		"label": i18n.dashboardWindSpeedTXT+', '+i18n.dashboardWindSpeedMesTXT+':',
		"precision" : 0,
		"multiplicator" : 1,
		"maxRefreshInterval": ${options.wind.direction.maxRefreshInterval * 1000},
		"fresh": ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		"menuItem" : "wangler"
	},
`;
}
else if(options.wind.direction.feature.includes('(TWD)')) {
	trueWind = 'true';
	optionsjs += `
	"wangle" : {
		"signalkPath": "environment.wind.directionTrue",	// The wind direction relative to true north
		"label": "",
		"precision" : 0,
		"multiplicator" : ${180/Math.PI},
		"maxRefreshInterval": ${options.wind.direction.maxRefreshInterval * 1000},
		"fresh": ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		"trueWind": ${trueWind},
		"menuItem" : "wdirT"
	},
	"wspeed" : {
		"signalkPath": "environment.wind.speedTrue",	// Wind speed over water (as calculated from speedApparent and vessel's speed through water)
		"label": i18n.dashboardTrueWindSpeedTXT+', '+i18n.dashboardWindSpeedMesTXT+':',
		"precision" : 1,
		"multiplicator" : 1,
		"maxRefreshInterval": ${options.wind.direction.maxRefreshInterval * 1000},
		"fresh": ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		"menuItem" : "wdirT"
	},
`;
}
else if(options.wind.direction.feature.includes('(MWD)')) {
	// только если курс или путевой угол магнитный
	if(options.trackProp.feature.includes('CGM') || options.trackProp.feature.includes('HM' || options.trackProp.feature.includes('HC'))){
		trueWind = 'true';
		optionsjs += `
	"wangle" : {
		"signalkPath": "environment.wind.directionMagnetic",
		"label": "",
		"precision" : 0,
		"multiplicator" : ${180/Math.PI},
		"maxRefreshInterval": ${options.wind.direction.maxRefreshInterval * 1000},
		"fresh": ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		"trueWind": ${trueWind},
		"menuItem" : "wdirM"
	},
	"wspeed" : {
		"signalkPath": "environment.wind.speedTrue",	// Wind speed over water (as calculated from speedApparent and vessel's speed through water)
		"label": i18n.dashboardTrueWindSpeedTXT+', '+i18n.dashboardWindSpeedMesTXT+':',
		"precision" : 1,
		"multiplicator" : 1,
		"maxRefreshInterval": ${options.wind.direction.maxRefreshInterval * 1000},
		"fresh": ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		"menuItem" : "wdirM"
	},
`;
	};
}
else if(options.wind.direction.feature.includes('GWA')) {	// Видимо, это курсовой угол истинного ветра, вычисленный из вымпельного по истинной скорости
	trueWind = 'true';
	optionsjs += `
	"wangle" : {
		"signalkPath": "environment.wind.angleTrueGround",
		"label": "",
		"precision" : 0,
		"multiplicator" : ${180/Math.PI},
		"maxRefreshInterval": ${options.wind.direction.maxRefreshInterval * 1000},
		"fresh": ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		"trueWind": ${trueWind},
		"menuItem" : "wanglet"
	},
	"wspeed" : {
		"signalkPath": "environment.wind.speedOverGround",
		"label": i18n.dashboardTrueWindSpeedTXT+', '+i18n.dashboardWindSpeedMesTXT+':',
		"precision" : 0,
		"multiplicator" : 1,
		"maxRefreshInterval": ${options.wind.direction.maxRefreshInterval * 1000},
		"fresh": ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		"menuItem" : "wanglet"
	},
`;
}
else if(options.wind.direction.feature.includes('TWA')) {	// а это -- по скорости по лагу
	trueWind = 'true';
	optionsjs += `
	"wangle" : {
		"signalkPath": "environment.wind.angleTrueWater",
		"label": "",
		"precision" : 0,
		"multiplicator" : ${180/Math.PI},
		"maxRefreshInterval": ${options.wind.direction.maxRefreshInterval * 1000},
		"fresh": ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		"trueWind": ${trueWind},
		"menuItem" : "wangletW"
	},
	"wspeed" : {
		"signalkPath": "environment.wind.speedTrue",	// Wind speed over water (as calculated from speedApparent and vessel's speed through water)
		"label": i18n.dashboardTrueWindSpeedTXT+', '+i18n.dashboardWindSpeedMesTXT+':',
		"precision" : 1,
		"multiplicator" : 1,
		"maxRefreshInterval": ${options.wind.direction.maxRefreshInterval * 1000},
		"fresh": ${(2+options.wind.direction.maxRefreshInterval) * 1000},
		"menuItem" : "wangletW"
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
	"position" : {
		"signalkPath": "navigation.position",
		"dataPaths": ["longitude","latitude"],	// если .value в delta не атомарное значение - пути от value до атомарных значений. Для проверки на null.
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
	},
`;
/* Предупреждение столкновений, требует наличия collision-detector */
optionsjs += `
	"collisions" : {
		"signalkPath": "notifications.danger.collision",
		"precision" : 0,
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${(5+options.trackProp.maxRefreshInterval) * 1000},		// время свежести, миллисек.
	},
`;
/* Человек за бортом, требует наличия GaladrielMap*/
optionsjs += `
	"mob" : {
		"signalkPath": "notifications.mob",
		"precision" : 0,
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
	},
`;
/* Следующая путевая точка на круге */
optionsjs += `
	"nextPoint" : {
		"signalkPath": "navigation.course.nextPoint",
		"precision" : 0,
		"maxRefreshInterval": ${options.trackProp.maxRefreshInterval * 1000},
		"fresh": ${60*60*24*1000},
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

// завершаем объект
optionsjs += `
};
`;
// Проверка, не изменили ли мы конфиг
let prevOptions;
try {
	prevOptions = fs.readFileSync(__dirname+'/public/options.js','utf8');
}
catch(err) {
}
//app.debug('новый:',optionsjs.length,'старый:',prevOptions.length);
if(prevOptions && optionsjs != prevOptions) {
	app.debug('Config updated',optionsjs.length,prevOptions.length);
	fs.writeFileSync(__dirname+'/public/options.js',optionsjs);	// записываем конфиг

	// Организуем служебный канал для сообщений клиентам о состоянии сервера, куда сообщаем, что конфиг изменился.
	const delta = {
		"context": "vessels.self",
		"updates": [
			{
				"values": [
					{
						"path": plugin.id,
						"value": "configCreate"
					}
				],
				"source": { "label": plugin.id },
				"timestamp": new Date().toISOString(),
			}
		]
	};
	app.handleMessage(plugin.id,delta);

	// Последнее сообщение следует делать с "value": null, потому что последнее сообщение в канале
	// посылается каждому новому клиенту, и соответственнно, какое-то старое уведомление будет показываться вечно.
	// Это не помогает, потому что клиент должен получить сообщение об изменении конфига, но он его не получит, если не на связи.
	// Например SignalK перегружали и конфиг изменился. Клиент отключился, и подключится через время.
	// А последнее сообщение - пусто.
	// Короче, при рестарте SignalK весь этот механизмик с перезагрузкой конфига не работает.
	// Только при изменении конфигурации плагина или обнаружения пути, при работающем SignalK
	setImmediate(()=>{	// запустим в следующем обороте
		const delta = {
			"context": "vessels.self",
			"updates": [
				{
					"values": [
						{
							"path": plugin.id,
							"value": null
						}
					],
					"source": { "label": plugin.id },
					"timestamp": new Date().toISOString(),
				}
			]
		};
		app.handleMessage(plugin.id,delta);
	});
};
//



function buildOptions(option,DOMid=null){
/* дописывает optionsjs величинами для показа в углах экрана */

if(option.feature.includes('SOG')) {	/* скорость */
	optionsjs += `
	"speed" : {
		"signalkPath": "navigation.speedOverGround",
		"label": i18n.dashboardSpeedTXT+', '+i18n.dashboardSpeedMesTXT,	// скорость
		"precision" : 1,
		"multiplicator" : ${60*60/1000},
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(3+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "speed"
	},
`;
}
else if(option.feature.includes('STW')) {
	optionsjs += `
	"speed" : {
		"signalkPath": "navigation.speedThroughWater",
		"label": i18n.dashboardVaterSpeedTXT+', '+i18n.dashboardSpeedMesTXT,	// скорость
		"precision" : 1,
		"multiplicator" : ${60*60/1000},
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(3+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "STW"
	},
`;
}
else if(option.feature.includes('DBS')) {	// глубина
	optionsjs += `
	"depth" : {
		"signalkPath": "environment.depth.belowSurface",
		"label": i18n.dashboardDepthTXT+', '+i18n.dashboardDepthMesTXT, 	// глубина
		"precision" : 1,
		"multiplicator" : 1,
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(2+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "DBS"
	},
`;
}
else if(option.feature.includes('DBK')) {
	optionsjs += `
	"depth" : {
		"signalkPath": "environment.depth.belowKeel",
		"label": i18n.dashboardKeelDepthTXT+", "+i18n.dashboardDepthMesTXT, 	// глубина
		"precision" : 1,
		"multiplicator" : 1,
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(2+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "DBK"
	},
`;
}
else if(option.feature.includes('DBT')) {
	optionsjs += `
	"depth" : {
		"signalkPath": "environment.depth.belowTransducer",
		"label": i18n.dashboardTransDepthTXT+', '+i18n.dashboardDepthMesTXT, 	// глубина
		"precision" : 1,
		"multiplicator" : 1,
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(2+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "DBT"
	},
`;
}
else if(option.feature.includes('1 revolutions')) {	/* двигатели */
	//setTimeout(()=>{app.debug('двигатель',app.getSelfPath('propulsion'))},3000);
	if(checkPropulsionPath() && propulsionPaths[0]) {	// вообще-то, оно по логике здесь уже всегда есть, но для единообразия
		optionsjs += `
	"propRevolutions0" : {
		"signalkPath": "${propulsionPaths[0]}.revolutions",
		"label": i18n.dashboardPropRevolutionTXT+', '+i18n.dashboardPropRevolutionMesTXT,
		"precision" : 0,
		"multiplicator" : 60,
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(2+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "Engine1r"
	},
`;
	}
}
else if(option.feature.includes('1 temperature')) {
	// Temperature in Kelvin!!!
	if(checkPropulsionPath() && propulsionPaths[0]) {	// вообще-то, оно по логике здесь уже всегда есть, но для единообразия
		optionsjs += `
	"propTemperature0" : {
		"signalkPath": "${propulsionPaths[0]}.temperature",
		"label": i18n.dashboardPropTemperatureTXT+', '+i18n.dashboardTemperatureMesTXT,
		"precision" : 0,
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(5+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "Engine1t"
	},
`;
	}
}
else if(option.feature.includes('2 revolutions')) {
	if(checkPropulsionPath() && propulsionPaths[1]) {
		optionsjs += `
	"propRevolutions1" : {
		"signalkPath": "${propulsionPaths[1]}.revolutions",
		"label": i18n.dashboardPropRevolutionTXT+', '+i18n.dashboardPropRevolutionMesTXT,
		"precision" : 0,
		"multiplicator" : 60,
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(2+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "Engine2r"
	},
`;
	}
}
else if(option.feature.includes('2 temperature')) {
	// Temperature in Kelvin!!!
	if(checkPropulsionPath() && propulsionPaths[1]) {
		optionsjs += `
	"propTemperature1" : {
		"signalkPath": "${propulsionPaths[1]}.temperature",
		"label": i18n.dashboardPropTemperatureTXT+', '+i18n.dashboardTemperatureMesTXT,
		"precision" : 0,
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(5+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "Engine2t"
	},
`;
	};
}
else if(option.feature.includes('air temperature')) {	/* температура воздуха */ 
	// Temperature in Kelvin!!!
	optionsjs += `
	"airTemperature" : {
		"signalkPath": "environment.outside.temperature",
		"label": i18n.dashboarAirTemperatureTXT+', '+i18n.dashboardTemperatureMesTXT,
		"precision" : 0,
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(30+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "temp"
	},
`;
}
else if(option.feature.includes('air pressure')) {	/* давление воздуха */
	optionsjs += `
	"airPressure" : {
		"signalkPath": "environment.outside.pressure",
		"label": i18n.dashboarAirPressureTXT+', '+i18n.dashboardAirPressureMesTXT,
		"precision" : 0,
		"multiplicator" : 0.01,
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(30+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "airP"
	},
`;
}
else if(option.feature.includes('humidity')) {	/* влажность */
	optionsjs += `
	"airHumidity" : {
		"signalkPath": "environment.outside.relativeHumidity",
		"label": i18n.dashboarAirHumidityTXT+', '+i18n.dashboardAirHumidityMesTXT,
		"precision" : 0,
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(30+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "airH"
	},
`;
}
else if(option.feature.includes('ater temperature')) {	/* температура воды */
	optionsjs += `
	"waterTemperature" : {
		"signalkPath": "environment.water.temperature",
		"label": i18n.dashboarWaterTemperatureTXT+', '+i18n.dashboardTemperatureMesTXT,
		"precision" : 0,
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(30+option.maxRefreshInterval) * 1000},
		"DOMid": "${DOMid}",
		"menuItem" : "waterT"
	},
`;
}
else if(option.feature.includes('navigated point')) {	/* следующая путевая точка на круге и в углу. При этом, nextPoint уже указана выше, и указание здесь перепишет его */
	optionsjs += `
	"nextPoint" : {
		"signalkPath": "navigation.course.nextPoint",
		"label": i18n.dashboarNextPointTXT,
		"precision" : 0,
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${60*60*24*1000},
		"DOMid": "${DOMid}",
		"menuItem" : "navPoint"
	},
`;
};

if(propulsionPaths[0]){
	optionsjs += `
	"propLabel0" : {
		"signalkPath": "${propulsionPaths[0]}.label",
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(10+option.maxRefreshInterval) * 1000},
	},
`;
	optionsjs += `
	"propState0" : {
		"signalkPath": "${propulsionPaths[0]}.state",
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(10+option.maxRefreshInterval) * 1000},
	},
`;
}
if(propulsionPaths[1]){
	optionsjs += `
	"propLabel1" : {
		"signalkPath": "${propulsionPaths[1]}.label",
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(10+option.maxRefreshInterval) * 1000},
	},
`;
	optionsjs += `
	"propState1" : {
		"signalkPath": "${propulsionPaths[1]}.state",
		"maxRefreshInterval": ${option.maxRefreshInterval * 1000},
		"fresh": ${(10+option.maxRefreshInterval) * 1000},
	},
`;
};
}; // 		end function buildOptions

function checkPropulsionPath(){
if(!propulsionPaths.length){
	// функция может быть запущена несколько раз (по разу на каждый угол), и с предыдущего запуска всё уже.
	const realPropulsionPath = app.getSelfPath('propulsion');
	if(!realPropulsionPath) {
		if(createOptionsCount.timeoutID) return false;	// ожидание уже запущено
		// запуск ожидания появления пути
		let timeout = 2000;
		// Сперва будем часто пытаться, потом редко
		if(createOptionsCount.count>10) timeout = 10000;
		//app.debug('Пути нет',createOptionsCount.count*timeout/1000,'сек.');
		//app.debug('timeout=',timeout,'на самом деле прошло',(Date.now()-createOptionsCount.timestamp)/1000,'сек.');
		if(createOptionsCount.count > createOptionsCountLimit){
			clearTimeout(createOptionsCount.timeoutID);	// ну упс
			createOptionsCount.timeoutID = null;
		}
		else {
			createOptionsCount.timeoutID = setTimeout(()=>{createOptionsCount.timeoutID = null; createOptions()}, timeout);
			createOptionsCount.count += 1;
			//createOptionsCount.timestamp = Date.now();
		}
		return false;
	}
	clearTimeout(createOptionsCount.timeoutID);
	createOptionsCount.timeoutID = null;
	for(const propID in realPropulsionPath){
		propulsionPaths.push('propulsion.'+propID)
	};
	//app.debug('Путь есть!');
};
return true;
}; //			end function checkPropulsionPath
}; //	end function createOptions

}; // end function plugin.start

plugin.stop = function () {
// Here we put logic we need when the plugin stops
	app.debug('Plugin stopped');
	unsubscribes.forEach(f => f());
	unsubscribes = [];
}; // end function plugin.stop

return plugin;
}; //end module.exports

