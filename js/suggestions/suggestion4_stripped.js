

//this needs to check for duplicates and list them all, then I can root through them
//then have a remove if country does not equal blah
//also a general remove




//this needs to remove blank lines
//also needs an extra tag for notes, and one for who suggested it


let built_new_list={}
function build_new_list()
{
	
	// This was a script that updated the song suggestions to have extra fields
	
Object.keys(song_recommendations).forEach(country => {
  Object.keys(song_recommendations[country]).forEach(musicStyle => {
    if (song_recommendations[country][musicStyle].length > 0) {
      song_recommendations[country][musicStyle].forEach(artistArray => {
        artistArray.push(artist_origins[artistArray[0]]);
      });
    }
  });
});

console.log(song_recommendations);
	
}

//Great, you can remove that artist lookup




function new_helper()
{
	
	const newDict = {};

Object.keys(song_recommendations).forEach(country => {
  Object.keys(song_recommendations[country]).forEach(musicStyle => {
    if (song_recommendations[country][musicStyle].length > 0) {
      song_recommendations[country][musicStyle].forEach(artistArray => {
        if (artistArray[8] === "unknown") {
          newDict[artistArray[0]] = artistArray;
        }
      });
    }
  });
});
console.log(newDict)
}



function new_helper_2() // this will give you a ranked list of the most common artists that have it set to unknown
{
const newDict = {};
const frequency = {};

Object.keys(song_recommendations).forEach(country => {
  Object.keys(song_recommendations[country]).forEach(musicStyle => {
    if (song_recommendations[country][musicStyle].length > 0) {
      song_recommendations[country][musicStyle].forEach(artistArray => {
        if (artistArray[8] === "unknown") {
          newDict[artistArray[0]] = artistArray;
          if (frequency[artistArray[0]]) {
            frequency[artistArray[0]]++;
          } else {
            frequency[artistArray[0]] = 1;
          }
        }
      });
    }
  });
});

const frequencyList = Object.entries(frequency).sort((a, b) => b[1] - a[1]);

console.log(frequencyList);
	
	
}


function artist_removal(remove_artist, except_country) //pass this the artist name and the correct country and it will remove the extras
{
	

  Object.keys(song_recommendations).forEach(c => {
    if (c !== except_country) {
      Object.keys(song_recommendations[c]).forEach(musicStyle => {
        song_recommendations[c][musicStyle] = song_recommendations[c][musicStyle].filter(
          artistArray => artistArray[0] !== remove_artist
        );
      });
    }
	
  });
  
  
  Object.keys(song_recommendations).forEach(c => {
    if (c === except_country) {
      Object.keys(song_recommendations[c]).forEach(musicStyle => {
        song_recommendations[c][musicStyle].forEach(artistArray => {
          if (artistArray[8] == "unknown") {
			  
			if (artistArray[0]==remove_artist)  {
				artistArray[8] = country_to_code[except_country];
			}
			
          }
        });
      });
    }
  });
  
  
  
  
  

console.log(song_recommendations)
	
}




let country_array=[]
function build_country()
	{
		for(var i = 0; i < Object.keys(song_recommendations).length; i++) {
		country_array.push(Object.keys(song_recommendations)[i])
		var opt = Object.keys(song_recommendations)[i];
		var el = document.createElement("option");
		el.textContent = Object.keys(song_recommendations)[i];
		el.value = opt;
		document.getElementById("suggestion_country_select").appendChild(el);

	}
console.log(country_array)
}

function change_country()
{
	console.log("change country")
	let chosen_country=document.getElementById("suggestion_country_select").value
	console.log(chosen_country)
	suggestion_build_styles(chosen_country)
	
	
	
	
	
	
	
	
	
	
	suggestion_build_suggestions()
}



function add_suggestions_from_profiles(chosen_country)
{
	console.log("add_suggestions_from_profiles")
	console.log(chosen_country)
	console.log(song_recommendations[chosen_country])
	
	//console.log(code_to_country(chosen_country)) - was there a country to code one?
	//song_recommendations[chosen_country]["test"]="hi"
	
	
	
	
	
	if (user_country_check(chosen_country).length > 0){
		song_recommendations[chosen_country]["User Favourites"]=user_country_check(chosen_country)
	}
	
	console.log(song_recommendations[chosen_country])	
	
	//for each profile, for this country, add to new dict
	
	
}



function user_country_check(country)
{
	
	
	let list_of_suggestions=[]
	
	let user_counting_up=0
		while (user_counting_up < Object.keys(Stored_userdict).length)
		{
			//console.log(Stored_userdict[user_counting_up])
			
			
			console.log(Stored_userdict)
			console.log(Object.keys(Stored_userdict)[user_counting_up])
			console.log(Stored_userdict[Object.keys(Stored_userdict)[user_counting_up]])
			
			//this is the user  variable for that profiles store
			console.log(Stored_userdict[Object.keys(Stored_userdict)[user_counting_up]]["variable_name"])
			
			let test_user_variable=Stored_userdict[Object.keys(Stored_userdict)[user_counting_up]]["variable_name"]
			console.log(test_user_variable)
			
			//this is the band list
			console.log(window[test_user_variable])
			
			let this_country_code=country_to_code[country]
			console.log(this_country_code)
			
			
			
			
			if (window[test_user_variable][this_country_code] != undefined)
			{
				console.log(" ----------------- THIS IS FOUND ")
				console.log(window[test_user_variable][this_country_code])
				let found_dict=window[test_user_variable][this_country_code]
				
				adding_list=[
					found_dict["Band"],
					found_dict["Track"],
					"https://www.last.fm/music/"+found_dict['Band']+"/_/"+found_dict['Track']+"",
					"https://www.youtube.com/results?search_query="+found_dict['Band']+"%20(2)%20"+found_dict['Track']+"",
					"https://musicbrainz.org/search?query="+found_dict['Band']+"&type=artist",
					found_dict["link"],
				]
				
				
				console.log(adding_list)
				list_of_suggestions.push(adding_list)
				
				
				
				
				
			}
			
			
			//ountry_to_code
			
			
			//console.log(Object.keys(Stored_userdict)[Stored_userdict[user_counting_up]])
			
			
			user_counting_up=user_counting_up+1
		}
	console.log(list_of_suggestions)
	return list_of_suggestions

	
	
}

function suggestion_build_styles(chosen_country)
{
	add_suggestions_from_profiles(chosen_country)
	
	document.getElementById("suggestion_style_select").innerHTML=""
	console.log("suggestion_build_styles : "+chosen_country)
		for(var i = 0; i < Object.keys(song_recommendations[chosen_country]).length; i++) {
		country_array.push(Object.keys(song_recommendations[chosen_country])[i])
		var opt = Object.keys(song_recommendations[chosen_country])[i];
		var el = document.createElement("option");
		
	
		var style_name=Object.keys(song_recommendations[chosen_country])[i]
		var count_suggestions_vars=song_recommendations[chosen_country][opt]
		var count_suggestions=count_suggestions_vars.length
		
		
		//console.log("-------"+style_name+"-------"+count_suggestions+"------------")
		//
		//
		//console.log(count_suggestions_vars)
		//console.log(count_suggestions)

		
		if (count_suggestions>0)
		{
			el.textContent = style_name+" : "+count_suggestions;
			el.value = opt;
			document.getElementById("suggestion_style_select").appendChild(el);
			//document.getElementById("suggestion_style_select").insertBefore(el, document.getElementById("suggestion_style_select").children[0]);
			//document.getElementById("suggestion_style_select").insertBefore(el,document.getElementById("suggestion_style_select"));
			//document.getElementById("suggestion_style_select").value='User Favourites';
			
		}
		else{
			//document.getElementById("suggestion_style_select").value=document.getElementById("suggestion_style_select").children[0]
		}
		
	
		
	}
		
		console.log( Object.keys(song_recommendations[chosen_country]) )
		if ( Object.keys(song_recommendations[chosen_country]).includes("User Favourites") ){
			console.log(Object.keys(song_recommendations[chosen_country])) 
			document.getElementById("suggestion_style_select").value='User Favourites';
		}
		else{
			console.log("it was not in there")
		}
}


function suggestion_build_suggestions()
{
	
	console.log("bulding suggestions")
	let chosen_country=document.getElementById("suggestion_country_select").value
	let chosen_style=document.getElementById("suggestion_style_select").value
	let song_suggestions=song_recommendations[chosen_country][chosen_style]
	//console.log(song_suggestions)
	build_suggestion_html(song_suggestions)
}

function build_suggestion_html(song_suggestions)
{
	let suggestion_html="----------------------------<BR>"
	
	
	if (song_suggestions){
		for(var i = 0; i < song_suggestions.length; i++) {
			suggestion_html=suggestion_html+build_a_song(song_suggestions[i])
		}
		document.getElementById("suggestion_output").innerHTML=suggestion_html
	}
	else{
		document.getElementById("suggestion_output").innerHTML="Country not found <BR><BR> It probably means it is down under another name, as with russia"
	}
	

	
}

function build_a_song(song_variables)
{
	
	
	let previewsource=""
	
	let chosen_country=document.getElementById("suggestion_country_select").value
	let chosen_style=document.getElementById("suggestion_style_select").value
	
	try{
		previewsource=song_variables[5].replace("https://youtu.be/","https://www.youtube.com/embed/")
	}
	catch{
	}
	console.log(song_variables)
	return `<B><br>`+song_variables[0]+` - `+song_variables[1]+`</B><BR>`
	
	+artist_origins[song_variables[0]]+`<BR>`
	+`	<div style="   border-style: outset; font-weight: bold;  width: fit-content; " onclick="flag_incorrect_song(['`+song_variables[0]+`','`+song_variables[1]+`','`+chosen_country+`','`+chosen_style+`'])">Flag track as incorrect country</div><BR>`
	+`<a href="`+song_variables[2]+`" target="_blank">Lastfm - `+song_variables[0]+`</a><BR>`
	+`<a href="`+song_variables[3]+`" target="_blank">Youtube search : `+song_variables[0]+` - `+song_variables[1]+`</a><BR>`
	+`<a href="`+song_variables[5]+`" target="_blank">Youtube feeling lucky : `+song_variables[0]+` - `+song_variables[1]+`</a><BR>`
	+`<a href="`+song_variables[4]+`" target="_blank">Musicbrainz - `+song_variables[0]+`</a><BR>`
	+`<BR>`
	+`<div style="   border-style: outset; font-weight: bold;
    width: fit-content; " onclick=
	"document.getElementById('song_iframe').src='`+previewsource+`';hideallmenus('iframeholder')"
	>Preview</div>    
	

<hr>
<BR>
	`
}

function run_main_suggestions()
{

console.log(song_recommendations)
build_country()
console.log(song_recommendations)
}







let country_to_code={
    "Afghanistan" : "AF" ,
    "Angola" : "AO" ,
    "Albania" : "AL" ,
    "Aland Islands" : "AX" ,
    "Andorra" : "AD" ,
    "United Arab Emirates" : "AE" ,
    "Argentina" : "AR" ,
    "Armenia" : "AM" ,
    "French Southern and Antarctic Lands" : "TF" ,
    "Australia" : "AU" ,
    "Austria" : "AT" ,
    "Azerbaijan" : "AZ" ,
    "Burundi" : "BI" ,
    "Belgium" : "BE" ,
    "Benin" : "BJ" ,
    "Burkina Faso" : "BF" ,
    "Bangladesh" : "BD" ,
    "Bulgaria" : "BG" ,
    "Bahrain" : "BH" ,
    "Bahamas" : "BS" ,
    "Bosnia and Herzegovina" : "BA" ,
    "Belarus" : "BY" ,
    "Belize" : "BZ" ,
    "Bolivia" : "BO" ,
    "Brazil" : "BR" ,
    "Barbados" : "BB" ,
    "Brunei Darussalam" : "BN" ,
    "Bhutan" : "BT" ,
    "Botswana" : "BW" ,
    "Central African Republic" : "CF" ,
    "Canada" : "CA" ,
    "Switzerland" : "CH" ,
    "Chile" : "CL" ,
    "China" : "CN" ,
    "CÃ´te d'Ivoire" : "CI" ,
    "Cameroon" : "CM" ,
    "Cyprus U.N. Buffer Zone" : "-99" ,
    "Democratic Republic of the Congo" : "CD" ,
    "Republic of Congo" : "CG" ,
    "Colombia" : "CO" ,
    "Comoros" : "KM" ,
    "Cape Verde" : "CV" ,
    "Costa Rica" : "CR" ,
    "Cuba" : "CU" ,
    "Northern Cyprus" : "-99" ,
    "Cyprus" : "CY" ,
    "Czech Republic" : "CZ" ,
    "Germany" : "DE" ,
    "Djibouti" : "DJ" ,
    "Dominica" : "DM" ,
    "Denmark" : "DK" ,
    "Dominican Republic" : "DO" ,
    "Algeria" : "DZ" ,
    "Ecuador" : "EC" ,
    "Egypt" : "EG" ,
    "Eritrea" : "ER" ,
    "Dhekelia" : "-99" ,
    "Spain" : "ES" ,
    "Estonia" : "EE" ,
    "Ethiopia" : "ET" ,
    "Finland" : "FI" ,
    "Fiji" : "FJ" ,
    "Falkland Islands" : "FK" ,
    "France" : "FR" ,
    "Faeroe Islands" : "FO" ,
    "Gabon" : "GA" ,
    "United Kingdom" : "GB" ,
    "Georgia" : "GE" ,
    "Ghana" : "GH" ,
    "Guinea" : "GN" ,
    "The Gambia" : "GM" ,
    "Guinea-Bissau" : "GW" ,
    "Equatorial Guinea" : "GQ" ,
    "Greece" : "GR" ,
    "Greenland" : "GL" ,
    "Guatemala" : "GT" ,
    "Guyana" : "GY" ,
    "Hong Kong" : "HK" ,
    "Honduras" : "HN" ,
    "Croatia" : "HR" ,
    "Haiti" : "HT" ,
    "Hungary" : "HU" ,
    "Indonesia" : "ID" ,
    "Isle of Man" : "IM" ,
    "India" : "IN" ,
    "Ireland" : "IE" ,
    "Iran" : "IR" ,
    "Iraq" : "IQ" ,
    "Iceland" : "IS" ,
    "Israel" : "IL" ,
    "Italy" : "IT" ,
    "Jamaica" : "JM" ,
    "Jordan" : "JO" ,
    "Japan" : "JP" ,
    "Baikonur Cosmodrome" : "KZ" ,
    "Siachen Glacier" : "-99" ,
    "Kazakhstan" : "KZ" ,
    "Kenya" : "KE" ,
    "Kyrgyzstan" : "KG" ,
    "Cambodia" : "KH" ,
    "Republic of Korea" : "KR" ,
    "Kosovo" : "KV" ,
    "Kuwait" : "KW" ,
    "Lao PDR" : "LA" ,
    "Lebanon" : "LB" ,
    "Liberia" : "LR" ,
    "Libya" : "LY" ,
    "Saint Lucia" : "LC" ,
    "Sri Lanka" : "LK" ,
    "Lesotho" : "LS" ,
    "Lithuania" : "LT" ,
    "Luxembourg" : "LU" ,
    "Latvia" : "LV" ,
    "Morocco" : "MA" ,
    "Moldova" : "MD" ,
    "Madagascar" : "MG" ,
    "Mexico" : "MX" ,
    "Macedonia" : "MK" ,
    "Mali" : "ML" ,
    "Myanmar" : "MM" ,
    "Montenegro" : "ME" ,
    "Mongolia" : "MN" ,
    "Mozambique" : "MZ" ,
    "Mauritania" : "MR" ,
    "Mauritius" : "MU" ,
    "Malawi" : "MW" ,
    "Malaysia" : "MY" ,
    "Namibia" : "NA" ,
    "New Caledonia" : "NC" ,
    "Niger" : "NE" ,
    "Nigeria" : "NG" ,
    "Nicaragua" : "NI" ,
    "Netherlands" : "NL" ,
    "Norway" : "NO" ,
    "Nepal" : "NP" ,
    "New Zealand" : "NZ" ,
    "Oman" : "OM" ,
    "Pakistan" : "PK" ,
    "Panama" : "PA" ,
    "Peru" : "PE" ,
    "Philippines" : "PH" ,
    "Papua New Guinea" : "PG" ,
    "Poland" : "PL" ,
    "Puerto Rico" : "PR" ,
    "Dem. Rep. Korea" : "KP" ,
    "Portugal" : "PT" ,
    "Paraguay" : "PY" ,
    "Palestine" : "PS" ,
    "French Polynesia" : "PF" ,
    "Qatar" : "QA" ,
    "Romania" : "RO" ,
    "Russian Federation" : "RU" ,
    "Rwanda" : "RW" ,
    "Western Sahara" : "EH" ,
    "Saudi Arabia" : "SA" ,
    "Sudan" : "SD" ,
    "South Sudan" : "SS" ,
    "Senegal" : "SN" ,
    "Singapore" : "SG" ,
    "South Georgia and South Sandwich Islands" : "GS" ,
    "Solomon Islands" : "SB" ,
    "Sierra Leone" : "SL" ,
    "El Salvador" : "SV" ,
    "Somaliland" : "-99" ,
    "Somalia" : "SO" ,
    "Serbia" : "RS" ,
    "SÃ£o TomÃ© and Principe" : "ST" ,
    "Suriname" : "SR" ,
    "Slovakia" : "SK" ,
    "Slovenia" : "SI" ,
    "Sweden" : "SE" ,
    "Swaziland" : "SZ" ,
    "Syria" : "SY" ,
    "Chad" : "TD" ,
    "Togo" : "TG" ,
    "Thailand" : "TH" ,
    "Tajikistan" : "TJ" ,
    "Turkmenistan" : "TM" ,
    "Timor-Leste" : "TL" ,
    "Trinidad and Tobago" : "TT" ,
    "Tunisia" : "TN" ,
    "Turkey" : "TR" ,
    "Taiwan" : "TW" ,
    "Tanzania" : "TZ" ,
    "Uganda" : "UG" ,
    "Ukraine" : "UA" ,
    "Uruguay" : "UY" ,
    "United States" : "US" ,
    "Uzbekistan" : "UZ" ,
    "Venezuela" : "VE" ,
    "Vietnam" : "VN" ,
    "Vanuatu" : "VU" ,
    "Yemen" : "YE" ,
    "South Africa" : "ZA" ,
    "Zambia" : "ZM" ,
    "Zimbabwe" : "ZW" ,
    "Vatican City" : "VA" ,
    "San Marino" : "SM" ,
    "Antigua and Barbuda" : "AG"
}

let code_to_country={
    "AF" : "Afghanistan" ,
    "AO" : "Angola" ,
    "AL" : "Albania" ,
    "AX" : "Aland Islands" ,
    "AD" : "Andorra" ,
    "AE" : "United Arab Emirates" ,
    "AR" : "Argentina" ,
    "AM" : "Armenia" ,
    "TF" : "French Southern and Antarctic Lands" ,
    "AU" : "Australia" ,
    "AT" : "Austria" ,
    "AZ" : "Azerbaijan" ,
    "BI" : "Burundi" ,
    "BE" : "Belgium" ,
    "BJ" : "Benin" ,
    "BF" : "Burkina Faso" ,
    "BD" : "Bangladesh" ,
    "BG" : "Bulgaria" ,
    "BH" : "Bahrain" ,
    "BS" : "Bahamas" ,
    "BA" : "Bosnia and Herzegovina" ,
    "BY" : "Belarus" ,
    "BZ" : "Belize" ,
    "BO" : "Bolivia" ,
    "BR" : "Brazil" ,
    "BB" : "Barbados" ,
    "BN" : "Brunei Darussalam" ,
    "BT" : "Bhutan" ,
    "BW" : "Botswana" ,
    "CF" : "Central African Republic" ,
    "CA" : "Canada" ,
    "CH" : "Switzerland" ,
    "CL" : "Chile" ,
    "CN" : "China" ,
    "CI" : "CÃ´te d'Ivoire" ,
    "CM" : "Cameroon" ,
    "-99" : "Cyprus U.N. Buffer Zone" ,
    "CD" : "Democratic Republic of the Congo" ,
    "CG" : "Republic of Congo" ,
    "CO" : "Colombia" ,
    "KM" : "Comoros" ,
    "CV" : "Cape Verde" ,
    "CR" : "Costa Rica" ,
    "CU" : "Cuba" ,
    "-99" : "Northern Cyprus" ,
    "CY" : "Cyprus" ,
    "CZ" : "Czech Republic" ,
    "DE" : "Germany" ,
    "DJ" : "Djibouti" ,
    "DM" : "Dominica" ,
    "DK" : "Denmark" ,
    "DO" : "Dominican Republic" ,
    "DZ" : "Algeria" ,
    "EC" : "Ecuador" ,
    "EG" : "Egypt" ,
    "ER" : "Eritrea" ,
    "-99" : "Dhekelia" ,
    "ES" : "Spain" ,
    "EE" : "Estonia" ,
    "ET" : "Ethiopia" ,
    "FI" : "Finland" ,
    "FJ" : "Fiji" ,
    "FK" : "Falkland Islands" ,
    "FR" : "France" ,
    "FO" : "Faeroe Islands" ,
    "GA" : "Gabon" ,
    "GB" : "United Kingdom" ,
    "GE" : "Georgia" ,
    "GH" : "Ghana" ,
    "GN" : "Guinea" ,
    "GM" : "The Gambia" ,
    "GW" : "Guinea-Bissau" ,
    "GQ" : "Equatorial Guinea" ,
    "GR" : "Greece" ,
    "GL" : "Greenland" ,
    "GT" : "Guatemala" ,
    "GY" : "Guyana" ,
    "HK" : "Hong Kong" ,
    "HN" : "Honduras" ,
    "HR" : "Croatia" ,
    "HT" : "Haiti" ,
    "HU" : "Hungary" ,
    "ID" : "Indonesia" ,
    "IM" : "Isle of Man" ,
    "IN" : "India" ,
    "IE" : "Ireland" ,
    "IR" : "Iran" ,
    "IQ" : "Iraq" ,
    "IS" : "Iceland" ,
    "IL" : "Israel" ,
    "IT" : "Italy" ,
    "JM" : "Jamaica" ,
    "JO" : "Jordan" ,
    "JP" : "Japan" ,
    "KZ" : "Baikonur Cosmodrome" ,
    "-99" : "Siachen Glacier" ,
    "KZ" : "Kazakhstan" ,
    "KE" : "Kenya" ,
    "KG" : "Kyrgyzstan" ,
    "KH" : "Cambodia" ,
    "KR" : "Republic of Korea" ,
    "KV" : "Kosovo" ,
    "KW" : "Kuwait" ,
    "LA" : "Lao PDR" ,
    "LB" : "Lebanon" ,
    "LR" : "Liberia" ,
    "LY" : "Libya" ,
    "LC" : "Saint Lucia" ,
    "LK" : "Sri Lanka" ,
    "LS" : "Lesotho" ,
    "LT" : "Lithuania" ,
    "LU" : "Luxembourg" ,
    "LV" : "Latvia" ,
    "MA" : "Morocco" ,
    "MD" : "Moldova" ,
    "MG" : "Madagascar" ,
    "MX" : "Mexico" ,
    "MK" : "Macedonia" ,
    "ML" : "Mali" ,
    "MM" : "Myanmar" ,
    "ME" : "Montenegro" ,
    "MN" : "Mongolia" ,
    "MZ" : "Mozambique" ,
    "MR" : "Mauritania" ,
    "MU" : "Mauritius" ,
    "MW" : "Malawi" ,
    "MY" : "Malaysia" ,
    "NA" : "Namibia" ,
    "NC" : "New Caledonia" ,
    "NE" : "Niger" ,
    "NG" : "Nigeria" ,
    "NI" : "Nicaragua" ,
    "NL" : "Netherlands" ,
    "NO" : "Norway" ,
    "NP" : "Nepal" ,
    "NZ" : "New Zealand" ,
    "OM" : "Oman" ,
    "PK" : "Pakistan" ,
    "PA" : "Panama" ,
    "PE" : "Peru" ,
    "PH" : "Philippines" ,
    "PG" : "Papua New Guinea" ,
    "PL" : "Poland" ,
    "PR" : "Puerto Rico" ,
    "KP" : "Dem. Rep. Korea" ,
    "PT" : "Portugal" ,
    "PY" : "Paraguay" ,
    "PS" : "Palestine" ,
    "PF" : "French Polynesia" ,
    "QA" : "Qatar" ,
    "RO" : "Romania" ,
    "RU" : "Russian Federation" ,
    "RW" : "Rwanda" ,
    "EH" : "Western Sahara" ,
    "SA" : "Saudi Arabia" ,
    "SD" : "Sudan" ,
    "SS" : "South Sudan" ,
    "SN" : "Senegal" ,
    "SG" : "Singapore" ,
    "GS" : "South Georgia and South Sandwich Islands" ,
    "SB" : "Solomon Islands" ,
    "SL" : "Sierra Leone" ,
    "SV" : "El Salvador" ,
    "-99" : "Somaliland" ,
    "SO" : "Somalia" ,
    "RS" : "Serbia" ,
    "ST" : "SÃ£o TomÃ© and Principe" ,
    "SR" : "Suriname" ,
    "SK" : "Slovakia" ,
    "SI" : "Slovenia" ,
    "SE" : "Sweden" ,
    "SZ" : "Swaziland" ,
    "SY" : "Syria" ,
    "TD" : "Chad" ,
    "TG" : "Togo" ,
    "TH" : "Thailand" ,
    "TJ" : "Tajikistan" ,
    "TM" : "Turkmenistan" ,
    "TL" : "Timor-Leste" ,
    "TT" : "Trinidad and Tobago" ,
    "TN" : "Tunisia" ,
    "TR" : "Turkey" ,
    "TW" : "Taiwan" ,
    "TZ" : "Tanzania" ,
    "UG" : "Uganda" ,
    "UA" : "Ukraine" ,
    "UY" : "Uruguay" ,
    "US" : "United States" ,
    "UZ" : "Uzbekistan" ,
    "VE" : "Venezuela" ,
    "VN" : "Vietnam" ,
    "VU" : "Vanuatu" ,
    "YE" : "Yemen" ,
    "ZA" : "South Africa" ,
    "ZM" : "Zambia" ,
    "ZW" : "Zimbabwe" ,
    "VA" : "Vatican City" ,
    "SM" : "San Marino" ,
    "AG" : "Antigua and Barbuda" 
    }  


	















run_main_suggestions()
//run_main()

