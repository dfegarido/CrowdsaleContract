
// {"hardcap":"50",
// "end_t":"1535904000",
// "start_t":"1531115387",
// "goal_total":"50",
// "goal_reached":false,
// "goal_ended":false,
// "goal_finalized":null,
// "token_max":"100000",
// "token_address":"0x85cc8ddb2f9817ea4e7b7a72f8edb111ddd0490b",
// "token_airdrop":"50",
// "token_company":"30",
// "token_team":"10",
// "token_sale":"20",
// "token_preICO":"60",
// "wallet":"0x42e754186C1b7e16b5E1A5e994AB8D4482F5A6f3",
// "rate":"100",
// "stage":"PreICO",
// "fund_raised":"25"}
var getData;

const qry ={
	  "query":"query{getCrowdsale{hardcap,end_t,start_t,goal_total,goal_reached,goal_ended,goal_finalized,token_max,token_address,token_airdrop,token_company,token_team,token_sale,token_preICO,wallet,rate,stage,fund_raised}}"
	}
$.ajax({
	url: "https://api.vpncash.org/query/",
	headers: { 
		'content-type': "application/json",
	},
	data:JSON.stringify(qry),
	type:"post",
	success: function(result,status, xhr){
				getData = result.data.getCrowdsale
				// console.log(getData);
				countDown(getData.end_t);
				progressBar(
					getData.fund_raised,
				 	getData.end_t,
				 	getData.hardcap,
				 	getData.goal_total,
				 	getData.rate
				 	);
		    },
	error: function(x, s, e){
				console.log(x.status, s)
			}
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



	



