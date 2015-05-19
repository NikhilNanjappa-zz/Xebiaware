'use strict';

/**
 * @ngdoc function
 * @name xebiawareApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the xebiawareApp
 */
angular.module('xebiawareApp')
  .controller('AboutCtrl', function ($scope, $http) {

  	var relativePos = 
  	{ 
  		101 : { "top":"9%", "left":"6%"}, 
  		102: { "top":"9%", "left":"35%"},
  		103: { "top":"9%", "left":"53%"},
  		104: { "top":"32%", "left":"6%"},
  		105: { "top":"33%", "left":"24%"},
  		106: { "top":"33%", "left":"41%"},
  		107: { "top":"26%", "left":"67%"},
  		108: { "top":"31%", "left":"82%"},
  		109: { "top":"41%", "left":"65%"},
  		110: { "top":"55%", "left":"28%"},
  		111: { "top":"72%", "left":"6%"},
  		112: { "top":"81%", "left":"30%"},
  		113: { "top":"62%", "left":"64%"},
  		114: { "top":"76%", "left":"64%"},
  		115: { "top":"86%", "left":"59%"},

  		121: { "top":"10%", "left":"15%"},
  		122: { "top":"10%", "left":"30%"},
  		123: { "top":"18%", "left":"61%"},
  		124: { "top":"39%", "left":"4%"},
  		125: { "top":"44%", "left":"36%"},
  		126: { "top":"42%", "left":"64%"},
  		127: { "top":"42%", "left":"79%"},
  		128: { "top":"50%", "left":"4%"},
  		129: { "top":"61%", "left":"4%"},
  		130: { "top":"61%", "left":"22%"},
  		131: { "top":"61%", "left":"39%"},
  		132: { "top":"62%", "left":"69%"},
  	}
  	for(var i=1;i<16;i++) {
  		var div = document.createElement('div');
  		div.id = 100+i;
  		div.innerHTML = '0';
  		div.className = 'circle';
  		div.style.top = relativePos[100+i].top;
  		div.style.left = relativePos[100+i].left;
  		$("#img_sixth").before(div);
  	}

  	for(var i=1;i<13;i++) {
  		var div = document.createElement('div');
  		div.id = 120+i;
  		div.innerHTML = '0';
  		div.className = 'circle';
  		div.style.top = relativePos[120+i].top;
  		div.style.left = relativePos[120+i].left;
  		$("#img_fifth").before(div);
  	}

  	// pusher code
  	var pusher = new Pusher('0be41d4178d4a396fa5f');
  	var channel = pusher.subscribe("XebiAware");

    $http({method: 'GET', url: "http://192.168.1.93:3000/getBeaconsList"})
    .success(function(data) {

    		var beaconsList = data.beaconsList;
    		console.log(_.pluck(beaconsList,'beacon_id'));
    		var beaconIDTAGMap = {};


    		for (var i in beaconsList) {
    			beaconIDTAGMap[beaconsList[i]['beacon_id']] = beaconsList[i]['beacon_room_tag'];
    		};

			$http({method: 'GET', url: "http://192.168.1.93:3000/getAllBeaconStatus"})
		    .success(function(data) {
		    	var message = data;//.message;
					for (var i = 0; i< message.length;i++) {
							$('#'+beaconIDTAGMap[message[i]['beacon_id']]).html(message[i].active_users.length);
					};
		    });

  		channel.bind("active", function(data) {
				var message = JSON.parse(data.message);
				for (var i = 0; i< message.length;i++) {
						$('#'+beaconIDTAGMap[message[i]['beacon_id']]).html(message[i].active_users.length);
						var sonar_effect_id = (beaconIDTAGMap[message[i]['beacon_id']]);
						// $("#sonar_effect_id")
				};
			});
    }).error(function() {});

  });
