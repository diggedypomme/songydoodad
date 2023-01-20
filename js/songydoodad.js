



//
//this needs sorting and annotating
//


let map = L.map('map').setView([47, 9.6], 4);
//const map = L.map('map').fitWorld();

map.createPane('labels');
map.getPane('labels').style.zIndex = 650;

// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';




let cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://exploratory.io/map">exploratory.io</a>,&copy; <a href="https://carto.com/attribution">CARTO</a>,  <a href="https://gka.github.io/chroma.js/">chromaJS</a> ';




let positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution,
    //noWrap: true
}).addTo(map);

//blue background
//L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//    subdomains: ['a','b','c']
//}).addTo( map );	



let positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution,
    pane: 'labels',

    noWrap: true
    //maxZoom: '4'
}).addTo(map);




// control that shows state info on hover
let info = L.control();

info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};




info.update = function(props) {
    //console.log(props)

    try {
        //console.log(newsongs[props.ISO_A2]["Band"])

        const contents = props ? `<b>${props.name}</b><br />
		
		${props.ISO_A2}
		<BR>
		<BR><b>Band            :</b>${newsongs[props.ISO_A2]["Band"]}
		<BR><b>Track           :</b>${newsongs[props.ISO_A2]["Track"]}
		<BR><b>Style         :  </b>${newsongs[props.ISO_A2]["MusicStyle"]}
	
		<BR><b> Rating : </b>${newsongs[props.ISO_A2]["Rating"]}
     	<BR><BR>Honourable mentions :${newsongs[props.ISO_A2]["Honourable"]}
		<BR>		
		
		` : 'Hover over a country';


        this._div.innerHTML = `<h4>My favourite track</h4>${contents}`;


    } catch {
        //console.log("not found")


        const contents = props ? `<b>${props.name}</b><br />
		
		${props.ISO_A2}
		<BR>
		<BR><b>Track not set</b>
		
		
		` : 'Hover over a country';


        this._div.innerHTML = `<h4>My favourite track</h4>${contents}`;




    }




};

info.addTo(map);




// get color depending on population density value
function getColor(d) {

    //this needs to do it automatically based on a base colour

    //return chroma("green")


    //if (d>0){
    //	return chroma('blue').saturate(d/10).hex()
    //}
    return d > 9 ? '#00acfa' :
        d > 8 ? '#2bb8f8' :
        d > 7 ? '#42bcf4' :
        d > 5 ? '#5bc5f5' :
        d > 3 ? '#7ccdf2' :
        d > 2 ? '#95d6f4' :
        d > 1 ? '#bae3f5' : '#ffe9e0';
}

function style(feature) {
	//console.log(feature)
    rating = -1
    try {
        //console.log(newsongs[feature.properties.ISO_A2]["Rating"])
        rating = newsongs[feature.properties.ISO_A2]["Rating"]
    } catch {
        //console.log("missing")
    }


    return {
        weight: 4,
        opacity: 1,
        color: 'white',
        //dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(rating)
    };
}


function rob_wipe_thenrefresh()
{
	rob_wipe_colours()
	rob_refresh_colours()
}


function rob_wipe_colours()
{
	try{
	window.geojson.remove()
	}
	catch{}
	try{
	window.geojson2.remove()
		}
	catch{}
	//var geojson = L.geoJson(statesData, {
	//	style,
	//	onEachFeature
	//}).addTo(map);
	
}
var geojson2
function rob_refresh_colours()
{
	//rob_wipe_colours()
	
	 geojson2 = L.geoJson(statesData, {
		style,
		onEachFeature
	}).addTo(map);
	
}







function removestyle(feature) {

    rating = -1
    try {
        //console.log(newsongs[feature.properties.ISO_A2]["Rating"])
        rating = 2
    } catch {
        //console.log("missing")
    }


    return {
        weight: 4,
        opacity: 1,
        color: 'white',
        //dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(-1)
    };
}

function highlightFeature(e) {
	//console.log(["E IS",e])
    const layer = e.target;
//console.log(["layer IS",layer])
    layer.setStyle({
        weight: 2,
        color: 'blue',
        dashArray: '',
        fillOpacity: 0.7,
		//fillColor: getColor(10)
    });

    layer.bringToFront();

    info.update(layer.feature.properties);
}



//e isnt what you think. howdo you do it
function testhighlightFeature(bit) {
	
    const layer = bit;

    layer.setStyle({
        weight: 2,
        color: 'blue',
        dashArray: '',
        fillOpacity: 0.7,
		fillColor: getColor(10)
    });

    layer.bringToFront();

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    //console.log(e.target)
    //console.log(e.target)
    //console.log(e)
    //console.log(e.target)
	
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    //map.fitBounds(e.target.getBounds());

    console.log("--------------------")
    console.log(e.target)
    const layer = e.target;
    console.log(layer.feature.properties)


    try {
        console.log(newsongs[layer.feature.properties.ISO_A2]["link"])
        let yt_link = newsongs[layer.feature.properties.ISO_A2]["link"]
        yt_link = yt_link.replace("https://youtu.be/", "")
        console.log(yt_link)
        console.log("--------------------")
        preview_track(yt_link)

        document.getElementById("songinfo").style.display = "block"
        document.getElementById("trackinfo_info").innerHTML = `
			<BR><b>Country            :</b>` + newsongs[layer.feature.properties.ISO_A2]["CountryName"] + `
			<BR><b>Band            :</b>` + newsongs[layer.feature.properties.ISO_A2]["Band"] + `
			<BR><b>Track           :</b>` + newsongs[layer.feature.properties.ISO_A2]["Track"] + `
			`

        document.getElementById("country_select").value = layer.feature.properties.ISO_A2;
        change_edit_to()
    } catch {

        hideallmenus("editholder")
        //change_edit_to(layer.feature.properties.ISO_A2)
        document.getElementById("country_select").value = layer.feature.properties.ISO_A2
        change_edit_to(layer.feature.properties.ISO_A2)
    }



}

function onEachFeature(feature, layer) {

    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

let current_youtube = ""

function preview_track(youtube_link) {

    console.log("ran preview track")
    document.getElementById('iframeholder').style.display = 'block'
    document.getElementById('song_iframe').src = 'https://www.youtube.com/embed/' + youtube_link
}




const legend = L.control({
    position: 'bottomright'
});

legend.onAdd = function (map) {

	const div = L.DomUtil.create('div', 'info legend');
	const grades = [0, 1, 2, 5, 6, 7, 8, 9, 10];
	const labels = [];
	let from, to;

	for (let i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
	}

	div.innerHTML = labels.join('<br>');
	return div;
};

//legend.addTo(map);


//
//
//
//
//
//const legend2 = L.control({position: 'bottomleft'});
//
//legend2.onAdd = function (map) {
//
//	const div = L.DomUtil.create('div', 'info legend');
//	const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
//	const labels = [];
//	let from, to;
//
//	for (let i = 0; i < grades.length; i++) {
//		from = grades[i];
//		to = grades[i + 1];
//
//		labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
//	}
//
//	div.innerHTML = labels.join('<br>');
//	return div;
//};
//
//legend2.addTo(map);




let compared_dict = {}

function do_a_diff() {


    let local_keys = Object.keys(newsongs)
    let default_keys = Object.keys(song_user_superpomme)
    let combined_keys = [...new Set([...local_keys, ...default_keys])].sort()




    let compared_dict_countup = 0
    while (compared_dict_countup < combined_keys.length) {

        compared_dict[combined_keys[compared_dict_countup]] = "none"


        if (local_keys.includes(combined_keys[compared_dict_countup]) == true && default_keys.includes(combined_keys[compared_dict_countup]) == false)

        {
            compared_dict[combined_keys[compared_dict_countup]] = "local_keys"
        }

        if (default_keys.includes(combined_keys[compared_dict_countup]) == true && local_keys.includes(combined_keys[compared_dict_countup]) == false) {
            compared_dict[combined_keys[compared_dict_countup]] = "default_keys"
        }

        if (local_keys.includes(combined_keys[compared_dict_countup]) == true && default_keys.includes(combined_keys[compared_dict_countup]) == true)

        {
            //console.log([newsongs[combined_keys[compared_dict_countup]],song_user_superpomme[combined_keys[compared_dict_countup]]])

            if (JSON.stringify(newsongs[combined_keys[compared_dict_countup]]) == JSON.stringify(song_user_superpomme[combined_keys[compared_dict_countup]]))

            {
                compared_dict[combined_keys[compared_dict_countup]] = "same"

            } else {
                compared_dict[combined_keys[compared_dict_countup]] = "diff"
            }
        }
        compared_dict_countup = compared_dict_countup + 1
    }

    console.log(compared_dict)




}


function set_diff() {
    do_a_diff()
    //let difftext=output_diff( )
    document.getElementById("bosstunes_menu").style.display = "none"
    document.getElementById("bosstunes_diff").style.display = "block"
    document.getElementById("diff").innerHTML = output_diff()
}




function output_diff() {
    console.log("outputting diff")
    //none,
    //left,
    //right,

    let difftext = ""

    let diffcountup = 0
    while (diffcountup < Object.keys(compared_dict).length) {




        if (compared_dict[Object.keys(compared_dict)[diffcountup]] != "same") {

            console.log("looping")
            difftext = difftext + output_diff_line(Object.keys(compared_dict)[diffcountup])
        }


        diffcountup = diffcountup + 1




    }
    console.log(difftext)
    return difftext

}




function output_diff_line(countrycode, ) {
    //none,
    //left,
    //right,

    let linesetup = `<div id="another_line"
	style="
	border-style: solid;
		width: 97%;
		border-radius: 10px
	"

	 > 
	  <center>` + country_name_dict[countrycode] + `</center><BR> 
	 <div style=
	  "display: inline-block;
	  width: 45%;
	  height: 180px;
	  overflow:hidden;
	  white-space: nowrap;
	  border: 1px solid black;">` + output_diff_element("left", countrycode) + ` </div>
	 <div style=
	  "display: inline-block;
	  width: 45%;
	  overflow:hidden;
	  height: 180px;
	  white-space: nowrap;
	  border: 1px solid black;">` + output_diff_element("right", countrycode) + ` </div>  
	 
	 </div>`

    return (linesetup)
}



function output_diff_element(element_to_show, countrycode) {


    diffdict_value = compared_dict[countrycode]

    console.log(diffdict_value)
    console.log(compared_dict)



    nonedict = { // If I don't do it this way, the alignment is messed up
        "Not set": "None",
        ".": "",
        "..": " ",
        "...": "",
        "....": "",
        ".....": "",
        "......": "",
        ".......": ""
    }




    if (diffdict_value == "diff") {

        if (element_to_show == "left") {
            return (return_formatted_songdict(newsongs[countrycode]))
        } else if (element_to_show == "right") {
            return (return_formatted_songdict(song_user_superpomme[countrycode]))
        }
    } else if (diffdict_value == "local_keys") {

        if (element_to_show == "left") {
            return (return_formatted_songdict(newsongs[countrycode]))
        } else if (element_to_show == "right") {
            return (return_formatted_songdict(nonedict))
        }
    } else if (diffdict_value == "default_keys") {

        if (element_to_show == "left") {
            return (return_formatted_songdict(nonedict))
        } else if (element_to_show == "right") {
            return (return_formatted_songdict(song_user_superpomme[countrycode]))
        }
    }

}



function return_formatted_songdict(dict_to_replace) {
    //print(dict_to_replace)

    let formatted_dict = ""
    for (const [key, value] of Object.entries(dict_to_replace)) {
        formatted_dict = formatted_dict + `${key}: ${value} <BR> `;
    }


    //return JSON.stringify(dict_to_replace)
    return formatted_dict


}



function set_up_user_dropdown() {
    document.getElementById("usernames").innerHTML =

`<option value="Superpomme">Superpomme - `+compare_completed_real("Superpomme")+`</option>
<option value="SynkkäMaan">SynkkäMaan - `+compare_completed_real("SynkkäMaan")+`</option>
<option value="Sheskabab">Sheskabab - `+compare_completed_real("Sheskabab")+`</option>
<option value="Temp">Temp (locally stored) - `+compare_completed()+`</option>`

}




setTimeout(() => {
    set_up_user_dropdown()
    document.getElementById("usernames").value = localStorage.getItem("current_username")
}, 500);



function change_user(changeto) {
    console.log("changing user")
    localStorage.setItem("current_username", changeto)
    location.reload();
}



// THIS IS THE ONE GOING THROUGH THEM ONE BY ONE


let country_name_dict = {}
countup = 0
while (countup < statesData.features.length) {
    country_name_dict[statesData.features[countup].properties.ISO_A2] = statesData.features[countup].properties.NAME_LONG
    countup = countup + 1
}
console.log(country_name_dict)


//for(var i = 0; i < country_name_dict.length; i++) {
for (var i = 0; i < Object.keys(country_name_dict).length; i++) {
    var opt = Object.keys(country_name_dict)[i];
    //var opt = "hi";
    var el = document.createElement("option");
    el.textContent = country_name_dict[Object.keys(country_name_dict)[i]];
    el.value = opt;
    document.getElementById("country_select").appendChild(el);
}



//document.getElementById("editholder").innerHTML=country_name_dict

function change_edit_to() {

    let countrycode = document.getElementById("country_select").value
    console.log(countrycode)
    //document.getElementById("edit_countryname").innerHTML=newsongs[countrycode]["CountryName"]


    document.getElementById("suggestion_country_select").value //the suggestion ones
    document.getElementById("country_select").value //the  edit sone

    try {
        document.getElementById("suggestion_country_select").value = code_to_country[document.getElementById("country_select").value]
        change_country()
    } catch {
        console.log("country code no match")
    }

    document.getElementById("edit_countryname").innerHTML = country_name_dict[countrycode]



    console.log("-----------------------")
    console.log(newsongs[countrycode])
    console.log("-----------------------")

    try {
        document.getElementById("Band").value = newsongs[countrycode]["Band"]
        document.getElementById("Track").value = newsongs[countrycode]["Track"]
        document.getElementById("MusicStyle").value = newsongs[countrycode]["MusicStyle"]
        document.getElementById("link").value = newsongs[countrycode]["link"]
        document.getElementById("Honourable").value = newsongs[countrycode]["Honourable"]
        document.getElementById("Honourable2").value = newsongs[countrycode]["Honourable2"]
        document.getElementById("Rating").value = newsongs[countrycode]["Rating"]
    } catch {
        document.getElementById("Band").value = ""
        document.getElementById("Track").value = ""
        document.getElementById("MusicStyle").value = ""
        document.getElementById("link").value = ""
        document.getElementById("Honourable").value = ""
        document.getElementById("Honourable2").value = ""
        document.getElementById("Rating").value = ""


    }



}

function bosstunes_menu(inputname) {

    console.log("bosstunes")
    console.log(inputname)
    if (inputname == "show") {
        document.getElementById("bosstunes_menu").style.display = "block"
    } else {
        document.getElementById("bosstunes_menu").style.display = "none"
    }



}

function download_config() {

    console.log(newsongs)
    downloadToFile(JSON.stringify(newsongs, null, 2), 'Custom_country_songlist.txt', 'text/plain');
}


//https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js
const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {
        type: contentType
    });

    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
};


let active_user = "temp"
let editmode = "enabled"

function localstorage(SaveLoad) {
    console.log(SaveLoad)

    //console.log(newsongs)
    if (SaveLoad == "save") {
        //localStorage.setItem("song_user_"+active_user, "");
        //localStorage.setItem("song_user_"+active_user, JSON.stringify(newsongs));
        localStorage.setItem("song_user_temp", JSON.stringify(newsongs));
    } else if (SaveLoad == "load") {

        newsongs = JSON.parse(localStorage.getItem("song_user_temp"))
        console.log("loaded")

    } else if (SaveLoad == "removeuser") {
        localStorage.removeItem('song_user_temp');
        //newsongs=JSON.parse(localStorage.getItem("song_user_superpomme"))	
        console.log("removed")

    }



}

//if (localStorage.getItem("song_user_superpomme") != null){
//	
//localstorage("load") //this needs moving later but whatever)
//}
//else{
//	newsongs=song_user_superpomme
//	localstorage("save")
//}




let Stored_userdict = {
    "Superpomme": {
        "user": "Superpomme",
        "profile": "superpomme.js",
        "variable_name": "song_user_superpomme"
    },
    "SynkkäMaan": {
        "user": "SynkkäMaan",
        "profile": "SynkkaMaan.js",
        "variable_name": "song_user_SynkkaMaan"
    },
    "Sheskabab": {
        "user": "Sheskabab",
        "profile": "Sheskabab.js",
        "variable_name": "song_user_Sheskabab"
    }

}




//checking to see if you have a username set
if (localStorage.getItem("current_username") != null) {

    console.log("current_username is SET")
    console.log("current_username is " + localStorage.getItem("current_username"))

    let current_user_name = localStorage.getItem("current_username")
    console.log(current_user_name)

    if (localStorage.getItem("current_username") == "Temp") {
        console.log("it was temp")


        if (localStorage.getItem("song_user_temp") != null) {
            localstorage("load")
        } else {
            //newsongs = window["song_user_superpomme"]
			newsongs={}
            localstorage("save")

        }



    } else {




        variablename = Stored_userdict[localStorage.getItem("current_username")]["variable_name"]
        console.log(variablename)
        console.log(window)
        console.log(window[variablename])
        newsongs = window[variablename]
    }

    //localstorage("save")



} else {
    console.log("current_username is UNSET")
    localStorage.setItem("current_username", "Superpomme")
    variablename = Stored_userdict[localStorage.getItem("current_username")]["variable_name"]
    console.log(variablename)
    console.log(window)
    console.log(window[variablename])
    newsongs = window[variablename]
}



var geojson = L.geoJson(statesData, {
    style,
    onEachFeature
}).addTo(map);




function save_song() {



		if (document.getElementById("Rating").value == ""){
			let text = "You did not set a rating. That's fine, but the colour is based on the rating. \n \n Without this the country will still look blank.";
		
			if (confirm(text) == true) {
				console.log("You pressed OK!")
	 

			} else {

				console.log("You cancelled!")
				return("cancelled")
			}
		}	
		
		
		

	if (document.getElementById("usernames").value!="Temp")
	{
		let text = "Are you definitely sure? This will overwrite your current song list with currently set profile. \n\n You should probably change your user to 'Temp' instead, before saving to avoid accidentally overwriting (unless you are  trying to clone a user).";
        if (confirm(text) == true) {
            console.log("You pressed OK!")

            }
 

         else {

            console.log("You cancelled!")
			return("you cancelled")
        }
		
	}








    let countrycode = document.getElementById("country_select").value
    console.log(countrycode)

    if (countrycode in newsongs) {

    } else {
        newsongs[countrycode] = {}
    }
    newsongs[countrycode]["CountryName"] = country_name_dict[document.getElementById("country_select").value]

    //console.log("-----------------------")
    //console.log(newsongs[countrycode])
    //console.log("-----------------------")

    newsongs[countrycode]["Band"] = document.getElementById("Band").value
    newsongs[countrycode]["Track"] = document.getElementById("Track").value
    newsongs[countrycode]["MusicStyle"] = document.getElementById("MusicStyle").value
    newsongs[countrycode]["link"] = document.getElementById("link").value
    newsongs[countrycode]["Honourable"] = document.getElementById("Honourable").value
    newsongs[countrycode]["Honourable2"] = document.getElementById("Honourable2").value
    newsongs[countrycode]["Rating"] = document.getElementById("Rating").value


    if (newsongs[countrycode]["Band"] == "" &&
        newsongs[countrycode]["Track"] == "" &&
        newsongs[countrycode]["MusicStyle"] == "" &&
        newsongs[countrycode]["link"] == "" &&
        newsongs[countrycode]["Honourable"] == "" &&
        newsongs[countrycode]["Honourable2"] == "" &&
        newsongs[countrycode]["Rating"] == "")

    {
        delete(newsongs[countrycode])

    }




    localstorage("save")
	rob_wipe_thenrefresh()
	
	
	let thecurrentuser=document.getElementById("usernames").value
	set_up_user_dropdown()
	document.getElementById("usernames").value=thecurrentuser
	
	
}

function ask_for_conf(menu_in_question) {







    if (menu_in_question == "wipe_countries") {
        //"wipe_countries"
        let text = "Are you definitely sure? this will wipe all the countries then save!";
        if (confirm(text) == true) {
            console.log("You pressed OK!")
            newsongs = {}
            newsongs = {
                //"ACTIVE": "yes"
            }
            localstorage("save")
			rob_wipe_thenrefresh()
			document.getElementById("usernames").value="Temp"
			change_user(document.getElementById('usernames').value)

        } else {

            console.log("You cancelled!")
        }

    } else if (menu_in_question == "remove_saved_user") {
        //"wipe_countries"
        let text = "Are you definitely sure? this will change all locally saved songs back to default";
        if (confirm(text) == true) {
            console.log("You pressed OK!")
			newsongs = song_user_superpomme
			
            localstorage("removeuser")
			localstorage("save")
			rob_wipe_thenrefresh()

        } else {

            console.log("You cancelled!")
        }

    }

}




function play_this_song() {


    preview_track(document.getElementById("link").value.replace("https://youtu.be/", ""))
}




function hideallmenus(thenshow = "", exception = "") {
    document.getElementById('iframeholder').style.display = 'none';
    document.getElementById('editholder').style.display = 'none'
    document.getElementById('bosstunes_menu').style.display = 'none'
    document.getElementById('suggestionholder').style.display = 'none'

    if (thenshow.length > 0) {
        document.getElementById(thenshow).style.display = 'block'
    }

}

function reload_map() {
    map.remove()

    map = L.map('map').setView([47, 9.6], 4);
    //const map = L.map('map').fitWorld();

    map.createPane('labels');
    map.getPane('labels').style.zIndex = 650;

    // Layers in this pane are non-interactive and do not obscure mouse/touch events
    map.getPane('labels').style.pointerEvents = 'none';




    cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributosrs, &copy; <a href="https://carto.com/attribution">CARTO</a>';

    positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: cartodbAttribution
    }).addTo(map);


    positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: cartodbAttribution,
        pane: 'labels',
        //maxZoom: '4'
    }).addTo(map);




    // it is currently erroring due to something that happens here

    // control that shows state info on hover
    info = L.control();

    info.onAdd = function(map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };
    geojson = L.geoJson(statesData, {
        style,
        onEachFeature
    }).addTo(map);




}

function import_user() 
{
	//https://jsfiddle.net/Ln37kqc0/
	
  var files = document.getElementById('selectFiles').files;
  console.log(files);
  if (files.length <= 0) {
    return false;
	}
	 var fr = new FileReader();
  
  fr.onload = function(e) { 
  console.log(e);
    var result = JSON.parse(e.target.result);
	
	
    var formatted = JSON.stringify(result, null, 2);
		//document.getElementById('result').value = formatted;
		console.log(result)
		//song_user_temp=newsongs
		newsongs=result
		localstorage("save")
		rob_wipe_thenrefresh()
  }
  
  fr.readAsText(files.item(0));
	
	
	
	
		let thecurrentuser=document.getElementById("usernames").value
	set_up_user_dropdown()
	document.getElementById("usernames").value=thecurrentuser
	
	
}

//this currently just does it for local

function compare_completed()
{
	
	try{
		let templength=Object.keys ( JSON.parse(localStorage.getItem("song_user_temp")) ).length
	
        JSON.parse(localStorage.getItem("song_user_temp")	)
	
		//console.log(Object.keys(newsongs).length+" / "+statesData["features"].length + " Countries")
		console.log(templength+" / "+statesData["features"].length + " Countries")
		
		
		
		
		//return (Object.keys(newsongs).length)
		return (templength)
	}
	catch{
		return 0
		
	}
	
}

function compare_completed_real(username)
{
		console.log((Object.keys(username).length)+" / "+statesData["features"].length + " Countries")
	
	
	let value=Stored_userdict[username]["variable_name"]
	
	console.log(value)
	console.log(value)
	//console.log(song_user_superpomme)
	//console.log((Object.keys(song_user_superpomme)))
	console.log(         (Object.keys(eval(value)))          )
	console.log(         Object.keys((Object.keys(eval(value)))).length          )
	
	
	return Object.keys((Object.keys(eval(value)))).length
	
}
compare_completed_real("Superpomme")



compare_completed("Superpomme")


function robzoomToFeature(e) {
    //map.fitBounds(e.target.getBounds());

    console.log("--------------------")
    console.log(e.target)
    const layer = e.target;
    console.log(layer.feature.properties)
}