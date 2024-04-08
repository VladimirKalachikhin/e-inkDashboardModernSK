
const checkDataFreshness = undefined;
// типы данных, которые, собственно, будем показывать 
// javascript допускает комментарии в json?
const displayData = {  	// 

	'track' : {	// course over ground, путевой угол, TPV track в gpsd
		'signalkPath': 'navigation.courseOverGroundTrue',
		'label': dashboardCourseTXT,	// наименование переменной из internationalisation.js
		'precision': 0,	// точность показываемой цифры, символов после запятой
		'multiplicator': 57.29577951308232, 	// на что нужно умножить значение для показа
		'maxRefreshInterval': 0,
		'fresh': 5000,		// время свежести, миллисек.
		'headingDirection': false
	},
	'heading' : {	// heading, курс, в gpsd ATT heading
		'signalkPath': 'navigation.headingTrue',
		'label': dashboardHeadingTXT,	// наименование переменной из internationalisation.js
		'precision': 0,	// точность показываемой цифры, символов после запятой
		'multiplicator': 57.29577951308232, 	// на что нужно умножить значение для показа
		'maxRefreshInterval': 0,
		'fresh': 5000,		// время свежести, миллисек.
		'headingDirection': false
	},

'wangle' : {
		'signalkPath': 'environment.wind.angleApparent',
		'label': '',
		'precision' : 0,
		'multiplicator' : 57.29577951308232,
		'maxRefreshInterval': 0,
		'fresh': 2000,
		'trueWind': false
	},

	'wspeed' : {
		'signalkPath': 'environment.wind.speedApparent',
		'label': dashboardWindSpeedTXT+', '+dashboardWindSpeedMesTXT+':',
		'precision' : 0,
		'multiplicator' : 1,
		'maxRefreshInterval': 0,
		'fresh': 2000,
	},

	'position' : {
		'signalkPath': 'navigation.position',
		'dataPaths': ['longitude','latitude'],	// если .value в delta не атомарное значение - пути от value до атомарных значений. Для проверки на null.
		'maxRefreshInterval': 0,
		'fresh': 5000,		// время свежести, миллисек.
	},

	'collisions' : {
		'signalkPath': 'notifications.danger.collision',
		'precision' : 0,
		'maxRefreshInterval': 0,
		'fresh': 5000,		// время свежести, миллисек.
	},

	'mob' : {
		'signalkPath': 'notifications.mob',
		'precision' : 0,
		'maxRefreshInterval': 0,
	},

	'nextPoint' : {
		'signalkPath': 'navigation.course.nextPoint',
		'precision' : 0,
		'maxRefreshInterval': 0,
		'fresh': 86400000,
	},

	'speed' : {
		'signalkPath': 'navigation.speedOverGround',
		'label': dashboardSpeedTXT+', '+dashboardSpeedMesTXT,	// скорость
		'precision' : 1,
		'multiplicator' : 3.6,
		'maxRefreshInterval': 0,
		'fresh': 3000,
		"DOMid": "leftTopBlock"
	},

	'depth' : {
		'signalkPath': 'environment.depth.belowTransducer',
		'label': dashboardTransDepthTXT+', '+dashboardDepthMesTXT, 	// глубина
		'precision' : 1,
		'multiplicator' : 1,
		'maxRefreshInterval': 0,
		'fresh': 2000,
		"DOMid": "rightTopBlock"
	},

	'propRevolutions0' : {
		'signalkPath': 'propulsion.p0.revolutions',
		'label': dashboardPropRevolutionTXT+', '+dashboardPropRevolutionMesTXT,
		'precision' : 0,
		'multiplicator' : 60,
		'maxRefreshInterval': 0,
		'fresh': 2000,
		"DOMid": "leftBottomBlock"
	},

	'propLabel0' : {
		'signalkPath': 'propulsion.p0.label',
		'maxRefreshInterval': 0,
		'fresh': 10000,
	},

	'propState0' : {
		'signalkPath': 'propulsion.p0.state',
		'maxRefreshInterval': 0,
		'fresh': 10000,
	},

	'propTemperature0' : {
		'signalkPath': 'propulsion.p0.temperature',
		'label': dashboardPropTemperatureTXT+', '+dashboardTemperatureMesTXT,
		'precision' : 0,
		'maxRefreshInterval': 0,
		'fresh': 5000,
		"DOMid": "rightBottomBlock"
	},

	'propLabel0' : {
		'signalkPath': 'propulsion.p0.label',
		'maxRefreshInterval': 0,
		'fresh': 10000,
	},

	'propState0' : {
		'signalkPath': 'propulsion.p0.state',
		'maxRefreshInterval': 0,
		'fresh': 10000,
	},

};
