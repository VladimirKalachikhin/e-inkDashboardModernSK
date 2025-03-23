
	var dashboardCourseTXT = 'Course';
	var dashboardMagCourseTXT = 'Magnetic course';
	var dashboardHeadingTXT = 'Heading';
	var dashboardMagHeadingTXT = 'Heading magnetic';
	var dashboardCompassHeadingTXT = 'Heading compass';
//	var dashboardMagVarTXT = 'Magnetic variation';
	var dashboardSpeedTXT = 'Speed';
	var dashboardVaterSpeedTXT = 'Speed through water';
//	var dashboardMinSpeedAlarmTXT = 'Speed too high';
//	var dashboardMaxSpeedAlarmTXT = 'Speed too low';
	var dashboardSpeedMesTXT = 'km/h';
	var dashboardDepthTXT = 'Depth';
	var dashboardKeelDepthTXT = 'Depth below keel';
	var dashboardTransDepthTXT = 'Depth below transducer';
//	var dashboardDepthAlarmTXT = 'Too shallow';
	var dashboardDepthMesTXT = 'm';
	var dashboardGNSSoldTXT = 'There is no data';
	var dashboardCollisionAlarmTXT = 'Distance to the nearest navigate danger';
	var dashboardMOBalarmTXT = 'Distance to the MOB';
	var dashboardAlarmDistanceMesTXT = 'm.'
	
	var dashboardWindSpeedTXT = 'Apparent wind';
	var dashboardWindSpeedMesTXT = 'm/sec';
	var dashboardTrueWindSpeedTXT = 'True wind';

	var dashboardPropStopTXT = 'Engine stopped';
	var dashboardPropRevolutionTXT = 'engine revolutions';
	var dashboardPropRevolutionMesTXT = 'RPM';
	var dashboardPropTemperatureTXT = 'engine temperature';
	var dashboardTemperatureMesTXT = '°C';
	var dashboarAirTemperatureTXT = 'Current outside air temperature';
	var dashboarAirPressureTXT = 'Current outside air ambient pressure';
	var dashboardAirPressureMesTXT = 'hPa';
	var dashboarAirHumidityTXT = 'Current outside air relative humidity';
	var dashboardAirHumidityMesTXT = '%';
	var dashboarWaterTemperatureTXT = 'Current water temperature';
	
	var dashboarNextPointTXT = 'Distance to the next point of navigate';
	var dashboarNextPointMesMTXT = 'm.';
	var dashboarNextPointMesKMTXT = 'km.';
//	var dashboardDepthMenuTXT = 'Shallow';
//	var dashboardMinSpeedMenuTXT = 'Min speed';
//	var dashboardMaxSpeedMenuTXT = 'Max speed';
//	var dashboardToHeadingAlarmTXT = 'The course is bad';
//	var dashboardKeysMenuTXT = 'Use keys to switch the screen mode';
//	var dashboardKeySetupTXT = 'Select purpose and press key for:';
//	var dashboardKeyNextTXT = 'Next mode';
//	var dashboardKeyPrevTXT = 'Previous mode';
//	var dashboardKeyMenuTXT = 'Alarm menu';
//	var dashboardKeyMagneticTXT = 'Magnetic course';
//	var dashboardMOBTXT = 'A man overboard!';

function internationalisation() {
/**/
let i18nFileNames = navigator.language.split(',').map((l)=>l.split(';')[0]);
// Здесь игнорируются двойные локали (en-US), поэтому американскую локализацию сделать нельзя. Удмуртскую тоже.
i18nFileNames = Array.from(new Set(i18nFileNames.map((l)=>l.split('-')[0].toLowerCase())));	// unique через set
i18nFileNames.push('en');	// хрен с ним, пусть будет неуникальное
//console.log('[internalisation] navigator.language=',navigator.language,'i18nFileNames:',i18nFileNames);
for(const i18nFileName of i18nFileNames){
	//console.log('i18nFileName=',i18nFileName);
	xhr = new XMLHttpRequest();
	xhr.open('GET', 'internationalisation/'+i18nFileName+'.json', false); 	// оно должно заполнить переменные до загрузки options.js, поэтому синхронно
	xhr.send();
	if (xhr.status == 200) { 	// Успешно
		let i18n;
		try {
			i18n = JSON.parse(xhr.responseText); 	// 
		}
		catch(error) {
			console.error('Get localisation strings Error:', error);
			return;
		};
		//console.log('[internationalisation] i18n:',i18n);
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
		// Это должно правильно сработать, даже если i18n неправильный.
		// ошибка при JSON.parse отсечёт явную фигню, остальное здесь.
		// В результате будут по крайней мере английские подписи, если файл интернационализации
		// отсутствует, кривой или неполный.
		({	dashboardCourseTXT,
			dashboardMagCourseTXT,
			dashboardHeadingTXT,
			dashboardMagHeadingTXT,
			dashboardCompassHeadingTXT,
			dashboardSpeedTXT,
			dashboardVaterSpeedTXT,
			dashboardSpeedMesTXT,
			dashboardDepthTXT,
			dashboardKeelDepthTXT,
			dashboardTransDepthTXT,
			dashboardDepthMesTXT,
			dashboardGNSSoldTXT,
			dashboardCollisionAlarmTXT,
			dashboardMOBalarmTXT,
			dashboardMOBbuttonAddTXT,
			dashboardMOBbuttonCancelTXT,
			dashboardAlarmDistanceMesTXT,
			dashboardWindSpeedTXT,
			dashboardWindSpeedMesTXT,
			dashboardTrueWindSpeedTXT,
			dashboardPropStopTXT,
			dashboardPropRevolutionTXT,
			dashboardPropRevolutionMesTXT,
			dashboardPropTemperatureTXT,
			dashboardTemperatureMesTXT,
			dashboarAirTemperatureTXT,
			dashboarAirPressureTXT,
			dashboardAirPressureMesTXT,
			dashboarAirHumidityTXT,
			dashboardAirHumidityMesTXT,
			dashboarWaterTemperatureTXT,
			dashboarNextPointTXT,
			dashboarNextPointMesMTXT,
			dashboarNextPointMesKMTXT
		} = i18n);	// () тут обязательно, потому что не var {} = obj, и кривой JavaScript воспринимает {} как блок кода;
		//console.log('[internationalisation] dashboardCourseTXT=',dashboardCourseTXT);
		break;
	};
};
}; // end function internalisation

internationalisation();
