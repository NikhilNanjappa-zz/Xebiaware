'use strict';

/**
 * @ngdoc function
 * @name xebiawareApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the xebiawareApp
 */
angular.module('xebiawareApp')
  .controller('MainCtrl', function ($scope, $http, dateFilter) {

  	//Average rooms Occupancy per day
    $http({method: 'GET', url: "http://192.168.1.93:3000/getBeaconTimeseriesData/2015-05-19/0"})
    .success(function(data) {

			var all_room_names = _.uniq(_.pluck(data.beaconsList, 'beacon_room_name'));
			var average_count_in_room = [];

			// console.log();

			
			function average (arr)
			{
				return _.reduce(arr, function(memo, num)
				{
					return memo + num;
				}, 0) / arr.length;
			}
			

			for(var i=0;i<all_room_names.length;i++) {

				var users_in_room = []; 
				var active_users_count_in_room = [];

				var array = _.pluck(_.where(data.beaconsList, { 'beacon_room_name': all_room_names[i] }), 'active_users');
				console.log(array);

				for (var j in array) {
	  			active_users_count_in_room.push(_.size(j));
				};

				console.log("avg of"+ all_room_names[i] + " " + average(active_users_count_in_room));

				average_count_in_room.push(average(active_users_count_in_room));

				var users_in_room = []; 
				var active_users_count_in_room = [];
				var array = [];

			}

			console.log(average_count_in_room);

			//chart configurations
			$(function () { 
			    $('#chart1').highcharts({
			        chart: {
			            type: 'column',
			            margin: 75,
			            options3d: {
			                enabled: true,
			                alpha: 10,
			                beta: 25,
			                depth: 70
			            }
			        },
			        title: {
			            text: 'Average rooms Occupancy per day'
			        },
			        xAxis: {
			            categories: all_room_names
			        },
			        yAxis: {
			            title: {
			                text: 'Occupancy'
			            }
			        },
			        plotOptions: {
              column: {
                  minPointLength: 0.03
                  }
          		},
			        series: [{
			            name: 'Average Count',
			            data: average_count_in_room
			        }]
			    });
			});
			//chart configurations end

    }).error(function() {});


  //Average rooms Occupancy per day per room
	$(function () { 
	    $('#chart2').highcharts({
	        chart: {
	            type: 'bar'
	        },
	        title: {
	            text: 'Fruit Consumption'
	        },
	        xAxis: {
	            categories: ['Apples', 'Bananas', 'Oranges']
	        },
	        yAxis: {
	            title: {
	                text: 'Fruit eaten'
	            }
	        },
	        series: [{
	            name: 'Jane',
	            data: [1, 0, 4]
	        }, {
	            name: 'John',
	            data: [5, 7, 3]
	        }]
	    });
	});

});
