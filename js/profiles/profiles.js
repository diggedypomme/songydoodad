//disabled while testing

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
    },
    "Luigi499": {
        "user": "Luigi499",
        "profile": "Luigi499.js",
        "variable_name": "song_user_Luigi499"
    },	
    "TB_massiv": {
        "user": "TB_massiv",
        "profile": "tbmassiv.js",
        "variable_name": "song_user_TB_massiv"
    }

}


document.addEventListener('DOMContentLoaded', () => {
  let loadedProfileCount = 0;

  Object.values(Stored_userdict).forEach(userData => {
    const script = document.createElement('script');
    script.src = `profiles/${userData.profile}`;
    script.addEventListener('load', () => {
      loadedProfileCount += 1;
      if (loadedProfileCount === Object.keys(Stored_userdict).length) {
        // All profiles have finished loading, so run your desired function
        runAfterProfilesLoad();
      }
    });
    document.body.appendChild(script);
  });
});






function runAfterProfilesLoad() {

  
  
  
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


get_styles_list_combined_bool=false;
use_key_colours=false
rob_wipe_thenrefresh()

  
  
  
  
  
  
  
  
  
  
}







function set_up_user_dropdown() {
    document.getElementById("usernames").innerHTML =

`<option value="Superpomme">Superpomme - `+compare_completed_real("Superpomme")+`</option>
<option value="SynkkäMaan">SynkkäMaan - `+compare_completed_real("SynkkäMaan")+`</option>
<option value="Sheskabab">Sheskabab - `+compare_completed_real("Sheskabab")+`</option>
<option value="Luigi499">Luigi499 - `+compare_completed_real("Luigi499")+`</option>
<option value="TB_massiv">TB_massiv - `+compare_completed_real("TB_massiv")+`</option>
<option value="Temp">Temp (locally stored) - `+compare_completed()+`</option>`

}



function set_up_user_dropdown() {
    document.getElementById("usernames").innerHTML =

`<option value="Superpomme">Superpomme - `+compare_completed_real("Superpomme")+`</option>
<option value="SynkkäMaan">SynkkäMaan - `+compare_completed_real("SynkkäMaan")+`</option>
<option value="Sheskabab">Sheskabab - `+compare_completed_real("Sheskabab")+`</option>
<option value="Luigi499">Luigi499 - `+compare_completed_real("Luigi499")+`</option>
<option value="TB_massiv">TB_massiv - `+compare_completed_real("TB_massiv")+`</option>
<option value="Temp">Temp (locally stored) - `+compare_completed()+`</option>`

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

setTimeout(() => {


}, 500);


//checking to see if you have a username set
//if (localStorage.getItem("current_username") != null) {
//
//    console.log("current_username is SET")
//    console.log("current_username is " + localStorage.getItem("current_username"))
//
//    let current_user_name = localStorage.getItem("current_username")
//    console.log(current_user_name)
//
//    if (localStorage.getItem("current_username") == "Temp") {
//        console.log("it was temp")
//
//
//        if (localStorage.getItem("song_user_temp") != null) {
//            localstorage("load")
//        } else {
//            //newsongs = window["song_user_superpomme"]
//			newsongs={}
//            localstorage("save")
//
//        }
//
//
//
//    } else {
//
//
//
//
//        variablename = Stored_userdict[localStorage.getItem("current_username")]["variable_name"]
//        console.log(variablename)
//        console.log(window)
//        console.log(window[variablename])
//        newsongs = window[variablename]
//    }
//
//    //localstorage("save")
//
//
//
//} else {
//    console.log("current_username is UNSET")
//    localStorage.setItem("current_username", "Superpomme")
//    variablename = Stored_userdict[localStorage.getItem("current_username")]["variable_name"]
//    console.log(variablename)
//    console.log(window)
//    console.log(window[variablename])
//    newsongs = window[variablename]
//}
//
