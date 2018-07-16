
// const qry ={
// 	  "query":"query{getCrowdsale{hardcap,end_t,start_t,goal_total,goal_reached,goal_ended,goal_finalized,token_max,token_address,token_airdrop,token_company,token_team,token_sale,token_preICO,wallet,rate,stage,fund_raised}}"
// 	}
// $.ajax({
// 	url: "https://api.vpncash.org/query/",
// 	headers: { 
// 		'content-type': "application/json",
// 	},
// 	data:JSON.stringify(qry),
// 	type:"post",
// 	success: function(result,status, xhr){
// 				getData = result.data.getCrowdsale
// 				// console.log(getData);
// 				countDown(getData.end_t);
// 				progressBar(
// 					getData.fund_raised,
// 				 	getData.end_t,
// 				 	getData.hardcap,
// 				 	getData.goal_total,
// 				 	getData.rate
// 				 	);
// 		    },
// 	error: function(x, s, e){
// 				console.log(x.status, s)
// 			}
// });

$(window).on("load",function(){
	let currentWei;
	let endDate;
	let hardcap;
	let rate;
	let goal;

		
	token.endTime().then(function(v){
		endDate = v.toString()
		countDown(v.toString())
	});

	token.rate().then(function(v){
		rate = v.toString()
		// console.log(currentWei)
	});

	token.cap().then(function(v){
		hardcap = v.toString() / 10**18
	});

	token.weiRaised().then(function(v){
		currentWei = v.toString() / 10**18
	});

	token.goal().then(function(v){
		goal = v.toString() / 10**18
	});



	function delay(){
		progressBar(currentWei, endDate, hardcap, goal, rate)
	}
	setTimeout(delay, 1000)
	

});



function countDown(dataValue){
	// Set the date we're counting down to
	var countDownDate = dataValue * 1000;

	// Update the count down every 1 second
	var x = setInterval(function() {

	    // Get todays date and time
	    var now = new Date().getTime();
	    
	    // Find the distance between now an the count down date
	    var distance = countDownDate - now;
	    
	    // Time calculations for days, hours, minutes and seconds
	    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	    
	    // Output the result in an element with id="demo"
	    // document.getElementById("countdownTimer").innerHTML = days + " days " + hours + " hours " + minutes + " mins " + seconds + " secs ";

	    document.getElementById("days").innerHTML = days;
	    document.getElementById("hours").innerHTML = hours;
	    document.getElementById("mins").innerHTML = minutes;
	    document.getElementById("secs").innerHTML = seconds;
	    
	    // If the count down is over, write some text 
	    if (distance < 0) {
	        clearInterval(x);
	        console.log("Expired");

	    }
	}, 1000);
}


function progressBar(currentWei, endDate, hardcap, goal, rate) {
  $('.progress-bar').each(function() {
    // var bar_value = $(this).attr('aria-valuenow') + '%';   
    // console.log(bar_value)             
    $(this).animate({ width: _percentage(parseInt(currentWei), parseInt(hardcap)) + "%" }, { duration: 1000, easing: 'easeOutCirc' });
    document.getElementById("progress").innerText = _percentage(parseInt(currentWei), parseInt(hardcap)) + " %" ;
  });
  document.getElementById("currentETH").innerText = currentWei + " ETH"
  document.getElementById("goal").innerText = goal + " ETH"
  document.getElementById("hardCap").innerText = hardcap + " ETH"
  document.getElementById("icoDate").innerText = new Date(endDate * 1000).toDateString()
  document.getElementById("rate").innerHTML = "1 ETH = " + rate + " VPN"
};


function _percentage(_value, _hardcap){
	return (_value / _hardcap) * 100;

}



	



