/**/
// А, собственно, нафига? Отдельные переменные для каждой строки - сложилось исторически.
// Но можно просто переделать всё на один объект.
var i18n;	// объект со строками

function internalisationApply() {
/**/
// загрузим сперва английские названия - они всегда есть, и полные.
// Правда, при таком подходе список переменных содержится в файле en.json
i18n = getI18nData('en.json');	
if(!i18n) return;	//
// Поищем национальные названия
let i18nFileNames = navigator.language.split(',').map((l)=>l.split(';')[0]);
// Здесь игнорируются двойные локали (en-US), поэтому американскую локализацию сделать нельзя. Удмуртскую тоже.
i18nFileNames = Array.from(new Set(i18nFileNames.map((l)=>l.split('-')[0].toLowerCase())));	// unique через set
i18nFileNames.push('en');	// хрен с ним, пусть будет неуникальное
//console.log('[internalisation] navigator.language=',navigator.language,'i18nFileNames:',i18nFileNames);
let i18nLocal
for(const i18nFileName of i18nFileNames){
	//console.log('i18nFileName=',i18nFileName);
	i18nLocal = getI18nData(i18nFileName+'.json');
	if(i18nLocal) break;
};
if(!i18nLocal) return;
for(let varName in i18n){	// присвоим имеющимся переменным национальные значения
	if(i18nLocal[varName]) i18n[varName] = i18nLocal[varName];	// только в браузере, в node надо global[]
};
return;
	
function getI18nData(i18nFileName){
//fetch('internationalisation/'+i18nFileName).then(response => response.json()).then(data => {
//}).catch((error) => {
//	console.error('Get localisation strings Error:', error);
//});
let xhr = new XMLHttpRequest();
xhr.open('GET', 'internationalisation/'+i18nFileName, false); 	// оно не успевает к нужному, поэтому синхронно
xhr.send();
if (xhr.status == 200) { 	// Успешно
	let data;
	try {
		data = JSON.parse(xhr.responseText); 	// 
	}
	catch(error) {
		console.error('Get localisation strings Error:', error);
		return;
	};
	//console.log('[getI18nData] data:',data);
	return data;
};
console.log('Get localisation file Error:', xhr.statusText);
return;
};		// end function getI18nData
}; // end function internalisationApply

internalisationApply();	// вызываем здесь потому что в других подключаемых скриптах эти переменные уже используются.
