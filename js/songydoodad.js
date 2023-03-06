



//
//this needs sorting and annotating
//


//let map = L.map('map').setView([47, 9.6], 4);

var map = L.map('map', { 
    zoomSnap: 0.5, // doesnt seem to be doing anything
	   zoomDelta: 0.25,
	    minZoom: 2,
	    maxZoom: 8
});

map.setView([47, 9.6], 4)

//const map = L.map('map').fitWorld();

map.createPane('labels');
map.getPane('labels').style.zIndex = 650;

// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';

var southWest = L.latLng(-89.98155760646617, -180),
northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);
map.on('drag', function() {
	map.panInsideBounds(bounds, { animate: false });
});


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


let use_key_colours=false

function style(feature) {
	
	
	if (use_key_colours==false){
	
		//console.log(feature)
		rating = -1
		try {
			//console.log(newsongs[feature.properties.ISO_A2]["Rating"])
			rating = newsongs[feature.properties.ISO_A2]["Rating"]
					//console.log("HERE HERE")
					//console.log(getColor(rating))
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
	
	else{
		
		
		if (get_styles_list_combined_bool==true)
		{
			
			try{
			//console.log("HERE HERE")
			//console.log(newsongs[feature.properties.ISO_A2]["MusicStyle"])
			//console.log(global_style_dict)
			
			let testfail=global_style_dict[newsongs[feature.properties.ISO_A2]["MusicStyle"].toLowerCase()] // this is so it tests it then fails over if it doesnt have it
			//console.log(global_style_dict[newsongs[feature.properties.ISO_A2]["MusicStyle"].toLowerCase()])
			return {
				weight: 4,
				opacity: 1,
				color: 'white',
				//dashArray: '3',
				fillOpacity: 0.7,
				//fillColor: getColor(9)
				fillColor: global_style_dict[check_grouped_key(newsongs[feature.properties.ISO_A2]["MusicStyle"].toLowerCase())]
				//fillColor: global_style_dict[newsongs[feature.properties.ISO_A2]["MusicStyle"].toLowerCase()]
			};				
		}
		catch{
			return {
				weight: 4,
				opacity: 1,
				color: 'white',
				//dashArray: '3',
				fillOpacity: 0.7,
				//fillColor: getColor(9)
				fillColor: getColor(0)
			};			
			
		}
			
			
			
			
			
			
		}
		else{
		
		
		
		//global_style_dict={}
		//global_style_dict[newsongs[feature.properties.ISO_A2]["MusicStyle"]]
		//console.log(feature.properties)
		//console.log(feature.properties.ISO_A2)
		try{
			//console.log("HERE HERE")
			//console.log(newsongs[feature.properties.ISO_A2]["MusicStyle"])
			//console.log(global_style_dict)
			
			let testfail=global_style_dict[newsongs[feature.properties.ISO_A2]["MusicStyle"].toLowerCase()]
			//console.log(global_style_dict[newsongs[feature.properties.ISO_A2]["MusicStyle"].toLowerCase()])
			return {
				weight: 4,
				opacity: 1,
				color: 'white',
				//dashArray: '3',
				fillOpacity: 0.7,
				//fillColor: getColor(9)
				fillColor: global_style_dict[newsongs[feature.properties.ISO_A2]["MusicStyle"].toLowerCase()]
			};				
		}
		catch{
			return {
				weight: 4,
				opacity: 1,
				color: 'white',
				//dashArray: '3',
				fillOpacity: 0.7,
				//fillColor: getColor(9)
				fillColor: getColor(0)
			};			
			
		}
		
		}
		
		
		
		
		
		//console.log(global_style_dict[newsongs[feature.properties.ISO_A2]["MusicStyle"]])
		//console.log(global_style_dict[newsongs[feature.properties.ISO_A2]["MusicStyle"]])
		
		return {
			weight: 4,
			opacity: 1,
			color: 'white',
			//dashArray: '3',
			fillOpacity: 0.7,
			//fillColor: getColor(9)
			fillColor: global_style_dict[newsongs[feature.properties.ISO_A2]["MusicStyle"]]
		};
		
		
		
	}
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







setTimeout(() => {
    set_up_user_dropdown()
    document.getElementById("usernames").value = localStorage.getItem("current_username")
}, 500);



function change_user(changeto) {
    console.log("changing user")
    localStorage.setItem("current_username", changeto)
    //location.reload();
	runAfterProfilesLoad()
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


function download_config_full() {
/*

//username
//user flagged_tracks
//user extra suggestions
//user bio
//songydoodad version number
//generated date


//dont allow namme if already taken
//user default colour scheme




*/


    console.log(newsongs)
    downloadToFile(JSON.stringify(newsongs, null, 2), 'Custom_country_songlist.txt', 'text/plain');
}

/*


You are currrently viewing the profile of []


[h1] (select to change)

Bio:

-------------------------

This user has [x] songs
Their most common genre is []

-------------------------


[Make my own map!]


Your profile is currently locally saved. This means that it is only visibile on this one computer. If you would like this to be visible for others too, download your profile below, then pop on over to the discord server at [store this in a variable so there is only one place to update if needed] and I will get it added. I will not accept any offensive names/ bios, so please keep it civil, thanks.


Configuration:

View sorted by:

=======================================


Locally Stored Profile

Your profile is currently locally saved. This means that it is only visibile on this one computer. If you would like this to be visible for others too, download your profile below, then pop on over to the discord server at [store this in a variable so there is only one place to update if needed] and I will get it added. I will not accept any offensive names/ bios, so please keep it civil, thanks.

Note that you can only have one locally stored profile (let me know if that's a problem and I will add in the ability to have multiple)


Name: (This will be the name used to identify your locally stored user, as well as the username used if this is shared publicly)
[]

Bio: (A bit of information about yourself. This is not necessasry, but will be listed on the profile should you upload it to the discord server.)
[]

Tools:
[Wipe the map to blank] (Note that this is not revertable, so take a copy of your local profile before you do this)

[Clone user] [usernames from profiles] (This will take a copy of a user of your choice. Useful if you are moving to another device, or want to base yous on an existing map)

[Download user profile]
[Download just the user map]

[Uploading user profile/map]






*/







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




//let Stored_userdict = {
//    "Superpomme": {
//        "user": "Superpomme",
//        "profile": "superpomme.js",
//        "variable_name": "song_user_superpomme"
//    },
//    "SynkkäMaan": {
//        "user": "SynkkäMaan",
//        "profile": "SynkkaMaan.js",
//        "variable_name": "song_user_SynkkaMaan"
//    },
//    "Sheskabab": {
//        "user": "Sheskabab",
//        "profile": "Sheskabab.js",
//        "variable_name": "song_user_Sheskabab"
//    },
//    "Luigi499": {
//        "user": "Luigi499",
//        "profile": "Luigi499.js",
//        "variable_name": "song_user_Luigi499"
//    },	
//    "TB_massiv": {
//        "user": "TB_massiv",
//        "profile": "tbmassiv.js",
//        "variable_name": "song_user_TB_massiv"
//    }
//
//}
//



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
    newsongs[countrycode]["link"] = document.getElementById("link").value.replace("www.youtube.com/watch?v=","youtu.be/")
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


//compare_completed_real("Superpomme")
//
//
//
//compare_completed("Superpomme")


function robzoomToFeature(e) {
    //map.fitBounds(e.target.getBounds());

    console.log("--------------------")
    console.log(e.target)
    const layer = e.target;
    console.log(layer.feature.properties)
}


//Gets a list of the current styles for colour coding
function get_styles_list()
{
	console.log(newsongs)
	
	let styles_list=[]
	
	let styles_country_countup=0
	
	while ( styles_country_countup <Object.keys(newsongs).length)
		
	
	
	//while ( styles_country_countup <10)
	{
		console.log("counting up")
		
		
		
		
		if (Object.keys(newsongs)[styles_country_countup]!="ACTIVE")
		{
		
		if ( styles_list.includes((newsongs[   Object.keys(newsongs)[styles_country_countup]    ]["MusicStyle"] ).toLowerCase()) == false){
			styles_list.push(    newsongs[   Object.keys(newsongs)[styles_country_countup]    ]["MusicStyle"].toLowerCase()      )
		}
		
		}
		
		
		
		styles_country_countup=styles_country_countup+1
	}
	console.log(styles_list)
	
	
	
	return(styles_list)
	
	
}



function get_styles_list_combined()
{
	console.log(newsongs)
	
	let styles_list=[]
	
	let styles_country_countup=0
	
	while ( styles_country_countup <Object.keys(newsongs).length)
		
	
	
	//while ( styles_country_countup <10)
	{
		console.log("counting up")
		
		
		
		
		if (Object.keys(newsongs)[styles_country_countup]!="ACTIVE") // a fix for an old key that was being added and has since been removed
		{
		
		if ( styles_list.includes(   check_grouped_key(    (newsongs[   Object.keys(newsongs)[styles_country_countup]    ]["MusicStyle"] ).toLowerCase()   )      ) == false){
			
			styles_list.push(  check_grouped_key(  newsongs[   Object.keys(newsongs)[styles_country_countup]    ]["MusicStyle"].toLowerCase()   )   )
		}
		
		}
		
		
		
		styles_country_countup=styles_country_countup+1
	}
	console.log(styles_list)
	
	
	
	return(styles_list)
	
	
}

//function to merge some common ones together like dub and reggae?



//legend.addTo(map);


//
//
//
//
//





//https://gist.github.com/mucar/3898821
var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];





let global_style_dict={}

const legend2 = L.control({position: 'bottomleft'});

legend2.onAdd = function (map,style_list) {

	console.log(global_style_list)
	const div = L.DomUtil.create('div', 'info legend');
	//const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
	const grades = global_style_list;
	const labels = [];
	let from, to;

	for (let i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(`<i style="background:${colorArray[i]}"></i> ${from}`);
		global_style_dict[from]=colorArray[i]
		
	}

	div.innerHTML = labels.join('<br>');
	console.log(labels)
	//div.parent.id="ROBROB"
	return div;
};
//
//legend2.addTo(map);

let global_style_list=[]

let get_styles_list_combined_bool=true

function set_key_styles()
{
	
	let style_list=get_styles_list()
	
	if (get_styles_list_combined_bool==true){
		style_list=get_styles_list_combined()
	}
	console.log("style list is")
	console.log(style_list)
	
	//setTimeout("legend2.addTo(map,style_list)", 500);
	global_style_list=style_list
	
	use_key_colours=true
	
	setTimeout(() => {
		legend2.addTo(map,style_list)
	}, 50);

	setTimeout(() => {
		console.log(global_style_dict)
		

	rob_wipe_thenrefresh_test()
	//rob_refresh_colours_key()
	
		
		
	}, 100);
	
	
	
	
}

//function rob_refresh_colours_key()
//{
//	//rob_wipe_colours()
//	
//	 geojson2 = L.geoJson(statesData, {
//		styletest,
//		onEachFeature
//	}).addTo(map);
//	
//}
//
// 
//
function rob_wipe_thenrefresh_test()
{
	rob_wipe_colours()
	rob_refresh_colours2()
}
//
function rob_refresh_colours2()
{
	//rob_wipe_colours()
	
	 geojson2 = L.geoJson(statesData, {
		style,
		onEachFeature
	}).addTo(map);
	
}


function flag_incorrect_song(incoming_song_variables)
{
	console.log("flagging song")
	console.log(incoming_song_variables)
	
	//--------
	let tempflag_storage =[]
	
	if ( JSON.parse(localStorage.getItem("flagged_tracks")) != null)
	{
		
	tempflag_storage=JSON.parse(localStorage.getItem("flagged_tracks"))
	
	}
	else{
		localStorage.setItem("flagged_tracks", [])
		
	}
	
	console.log("it got past the first bit")
	
//let tempflag_storage =JSON.parse(localStorage.getItem("flagged_tracks"))
console.log(tempflag_storage)
console.log(incoming_song_variables.includes(tempflag_storage))
if (incoming_song_variables != null){
	if (incoming_song_variables.includes(tempflag_storage)==false ){ // this is already returning false. maybe you have to loop to avoid duplicates
	
	tempflag_storage.push(incoming_song_variables)
	}
}
console.log(tempflag_storage)
localStorage.setItem("flagged_tracks", JSON.stringify(tempflag_storage))



	//--------
	
}




let grouped_key=true
function check_grouped_key(songstyle)
{



if (grouped_key==true){



	console.log(songstyle)
	
	
	if ( songstyle.toLowerCase().includes("reggae") ){	return("reggae/dub") }
	
	else if ( songstyle.toLowerCase().includes("dub") ) {	return("reggae/dub") }


	else if ( songstyle.toLowerCase().includes("metal") ) {	return("metal") }


	else if ( songstyle.toLowerCase().includes("folk") ) {	return("folk") }

	else if ( songstyle.toLowerCase().includes("rock") ) {	return("rock") }

	else if ( songstyle.toLowerCase().includes("pop") ) {	return("pop") }

	else if ( songstyle.toLowerCase().includes("jazz") ) {	return("jazz") }

	else if ( songstyle.toLowerCase().includes("unknown") ) {	return("unknown") }

	else if ( songstyle.toLowerCase().includes("no idea") ) {	return("unknown") }
	
	else if ( songstyle.toLowerCase().includes("latin") ) {	return("latin") }

	else if ( songstyle.toLowerCase().includes("don't know") ) {	return("unknown") }


	else if ( songstyle.toLowerCase() =="" ) {	return("unknown") }







	else{ return(songstyle)}
}

	else{ return(songstyle)}
	
// to lower
	
//	"reggae/dub"	"reggae","dub"	
//	"metal"			"metal"
//	"folk"			"folk"
//	"rock"			"rock"
//	"pop"			"pop"
//	"jazz"
//	"unknown"		"no idea" , "unknown", ""




//for each in dict[dict.keys]
	

// 	return songstyle	
// 	else{
//		return(songstyle)
//	}

}

function prepare_playlists()
{
	
let playlist_usercountup=0
let playlist_array=[]
let playlist_emptylink=0
let playlist_duplicates=0
while (playlist_usercountup < Object.keys(Stored_userdict).length)
{
	
	let user_username=Object.keys(Stored_userdict)[playlist_usercountup] 
	console.log("person "+playlist_usercountup)
	console.log("person "+user_username)
	let user_uservariable= Stored_userdict[ Object.keys(Stored_userdict)[playlist_usercountup] ]["variable_name"]  
	console.log( user_uservariable    )
	
	 let songcountup=0
	 console.log(window[user_uservariable])
	 
	 
	 while (songcountup< window.Object.keys(window[user_uservariable]).length){
	 
	 //window[user_uservariable][window.Object.keys(window[user_uservariable])]
	 
	 	//console.log(window.Object.keys(window[user_uservariable]))
		
		console.log(          user_uservariable      )
		console.log(          window[user_uservariable]     )
		console.log(     window.Object.keys(window[user_uservariable])     )
		console.log(     window.Object.keys(window[user_uservariable])[songcountup]    )//MX
		
		console.log(   window[user_uservariable][   window.Object.keys(window[user_uservariable])[songcountup]   ] )
		console.log(   window[user_uservariable][   window.Object.keys(window[user_uservariable])[songcountup]   ] ["link"]) // lol what a mess
		
		let link_to_add_to_playlist=window[user_uservariable][   window.Object.keys(window[user_uservariable])[songcountup]   ] ["link"]
		
		if (  playlist_array.includes(link_to_add_to_playlist)==false ){
			if (  link_to_add_to_playlist != "" ){
		
				playlist_array.push(window[user_uservariable][   window.Object.keys(window[user_uservariable])[songcountup]   ] ["link"])
			}
			else
			{
				playlist_emptylink=playlist_emptylink+1
			}
			
		}
		else
		{
			playlist_duplicates=playlist_duplicates+1
		}
		
	 	//console.log(window[user_uservariable][])
	 	console.log("song "+songcountup)
	 	songcountup=songcountup+1
	 }
	playlist_usercountup=playlist_usercountup+1
	
	console.log("finished adding the list:")
	console.log(playlist_array)
	console.log("duplicates  : "+playlist_duplicates)
	console.log("empty links : "+playlist_emptylink)
	console.log("Total remaining : "+playlist_array.length)
	
	// could be epanded to show the people who tagged it
}
	
}




function zoomToCountry(isoA2) {
  for (var i = 0; i < statesData.features.length; i++) {
    var feature = statesData.features[i];
    if (feature.properties.ISO_A2 === isoA2) {
      var coordinates = feature.geometry.coordinates;
      var lngLats = [];
      for (var j = 0; j < coordinates.length; j++) {
        for (var k = 0; k < coordinates[j].length; k++) {
          var lngLat = coordinates[j][k];
          lngLats.push(L.latLng(lngLat[1], lngLat[0]));
        }
      }
      console.log(lngLats);
      var bounds = L.latLngBounds(lngLats);
      map.fitBounds(bounds);
      break;
    }
  }
}

//function centerCountry(isoA2) {
//  for (var i = 0; i < statesData.features.length; i++) {
//    var feature = statesData.features[i];
//    if (feature.properties.ISO_A2 === isoA2) {
//      var coordinates = feature.geometry.coordinates;
//      var maxArea = -1;
//      var maxSection = null;
//      for (var j = 0; j < coordinates.length; j++) {
//        var section = coordinates[j];
//        var sectionArea = getArea(section);
//        if (sectionArea > maxArea) {
//          maxArea = sectionArea;
//          maxSection = section;
//        }
//      }
//      var lngLats = [];
//      for (var k = 0; k < maxSection.length; k++) {
//        var lngLat = maxSection[k];
//        lngLats.push(L.latLng(lngLat[1], lngLat[0]));
//      }
//      var bounds = L.latLngBounds(lngLats);
//      var center = bounds.getCenter();
//      var text = feature.properties.name;
//      L.marker(center).addTo(map)
//        .bindPopup(text)
//        .openPopup();
//      break;
//    }
//  }
//}
//
//function getArea(coordinates) {
//  var area = 0;
//  for (var i = 0; i < coordinates.length - 1; i++) {
//    var point1 = coordinates[i];
//    var point2 = coordinates[i + 1];
//    area += point1[0] * point2[1] - point2[0] * point1[1];
//  }
//  return Math.abs(area / 2);
//}

//function centerCountry(isoA2) {
//  for (var i = 0; i < statesData.features.length; i++) {
//    var feature = statesData.features[i];
//    if (feature.properties.ISO_A2 === isoA2) {
//      var coordinates = feature.geometry.coordinates;
//      var maxLength = -1;
//      var maxSection = null;
//      for (var j = 0; j < coordinates.length; j++) {
//        var section = coordinates[j];
//        if (section.length > maxLength) {
//          maxLength = section.length;
//          maxSection = section;
//        }
//      }
//      var lngLats = [];
//      for (var k = 0; k < maxSection.length; k++) {
//        var lngLat = maxSection[k];
//        lngLats.push(L.latLng(lngLat[1], lngLat[0]));
//      }
//      var bounds = L.latLngBounds(lngLats);
//      var center = bounds.getCenter();
//      var text = feature.properties.name;
//      L.marker(center).addTo(map)
//        .bindPopup(text)
//        .openPopup();
//      break;
//    }
//  }
//}


function centerCountry(isoA2) {
  for (var i = 0; i < statesData.features.length; i++) {
    var feature = statesData.features[i];
    if (feature.properties.ISO_A2 === isoA2) {
      var bounds = L.geoJSON(feature).getBounds();
      var text = feature.properties.name;
      map.fitBounds(bounds);
      L.marker([(bounds.getNorth() + bounds.getSouth()) / 2, (bounds.getEast() + bounds.getWest()) / 2])
        .addTo(map)
        .bindPopup(text)
        .openPopup();
      break;
    }
  }
}