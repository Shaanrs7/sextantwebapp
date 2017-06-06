	/*window.addEventListener("devicemotion", function (event){
		sextant.heading(event.alpha);
	}, true);*/

	// now you can use the plan maanger to send points to sextant
	function sextant_api() {
        json_data = {
            waypoints: [
                [  19.36479555, -155.20178273],
                [  19.3660102 , -155.2002431 ],
                [  19.36612641, -155.20061863],
                [  19.36670636, -155.20098881]
            ],
            time: "2pm"
        };

        $.post("http://localhost:5000/", JSON.stringify(json_data))
            .done(function (data) {
                alert("Data Loaded: " + data);
            });
    }

	function stop(){
		gpstracksilencer.connect();
		gpstracksilencer.send('stop');
	}
	
	function start(){
		gpstrack.connect('COM6');
		gpstrack.requestData();
	}
	
	function zoom(){
		sextant.zoom(sextant.camera);
	}

	function setHeading(){
		sextant.heading(90, sextant.camera);
	}

	function zoomToTracks(){
		if (sextant.gps_tracks !== undefined) {
			sextant.gps_tracks.zoomTo();
		}
	}
	function serialstatus(){
		console.log('serialstatus0')
		sextant.serialrequest.connect();
		sextant.serialrequest.requestData();
	}
	
	function getwaypoints(){
		console.log('getting waypoints');
		sextant.getwaypoints.connect();
		sextant.getwaypoints.requestData();
	}
	
	function drawpextant(){
		sextant.getwaypoints.send("bla")
	}
	
	function getpextant(){
		console.log('getting waypoints');
		sextant.getpextant.connect();
		sextant.getpextant.requestData();
	}
	
	function getpextantFromHere(){
		console.log('pextant from here');
		console.log(sextant.globalpoint());

		document.getElementById("globalpoint").innerHTML =JSON.stringify(sextant.globalpoint());

		sextant.getpextant.connect();
		sextant.getpextant.send(JSON.stringify(sextant.globalpoint()));
	}

	function calibrate(){
		console.log('pextant from here');
		console.log(sextant.globalpoint());

		document.getElementById("globalpoint").innerHTML =JSON.stringify(sextant.globalpoint());

		sextant.calibrate.connect();
		sextant.calibrate.send(JSON.stringify(sextant.globalpoint()));
	}
	
	function reloadPlan() {
		if (sextant.planManager !== undefined){
			sextant.planManager.fetchXGDSPlan();
		}
	}
	
	function clearTracks() {
		if (sextant.tsse !== undefined){
			sextant.tsse.clearTracks();
		}
	}
	
	function sendPlanToSextant() {
		if (sextant.planManager !== undefined){
			sextant.planManager.sendPlanToSextant(true);
		}
	}
	
	function toggleEditMode(){
		let button = $("#editButton");
		let state = button.prop('checked');
		window.editMode = state;
	}
