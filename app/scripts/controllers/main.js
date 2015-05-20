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
    $http({method: 'GET', url: "http://default-environment-hgkgm8yf2y.elasticbeanstalk.com/getBeaconTimeseriesData/2015-05-19/0"})
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
			            text: 'Average rooms Occupancy for 19th May 2015'
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
  $http({method: 'GET', url: "http://default-environment-hgkgm8yf2y.elasticbeanstalk.com/getBeaconTimeseriesData/2015-05-19/0"})
		.success(function(data) {

			console.log(_.pluck(_.where(data.beaconsList, { 'beacon_room_name': 'Common Area' }), 'timestamp'));

			// console.log(moment(('2015-05-19T05:24:23.014Z')).utc().format("HH").toString());

			for(var i=1;i<25;i++) {
				var tim_array = _.pluck(_.where(data.beaconsList, { 'beacon_room_name': 'Common Area' }), 'timestamp');
				var hour_array = [];

				for(var j in tim_array) {
					hour_array.push(moment((tim_array[j])).utc().format("HH").toString());
				}

				// console.log(hour_array);

			}

			console.log(hour_array);

			var sorted_array = [];
			sorted_array = foo(hour_array);

			function foo(arr) {
		    var a = [], b = [], prev;

		    arr.sort();
		    for ( var i = 0; i < arr.length; i++ ) {
		        if ( arr[i] !== prev ) {
		            a.push(arr[i]);
		            b.push(1);
		        } else {
		            b[b.length-1]++;
		        }
		        prev = arr[i];
		    }

		    return [a, b];
			}

		$(function () { 
		    $('#chart2').highcharts({
		        chart: {
		            type: 'line'
		        },
		        title: {
		            text: 'Common area occupancy for 19th May 2015'
		        },
		        xAxis: {
		            categories: sorted_array[0]
		        },
		        yAxis: {
		            title: {
		                text: 'Occupancy'
		            }
		        },
		        series: [{
		            name: 'occupancy',
		            data: sorted_array[1]
		        }]
		    });
		});

	}).error(function() {});	

});
