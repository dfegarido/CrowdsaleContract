var endDate;
var hardCap;
var currentWei;
var goal;
var hasEnded = "false";

// Skills Progress Bar
function testing() {
  $('.progress-bar').each(function() {
    // var bar_value = $(this).attr('aria-valuenow') + '%';   
    // console.log(bar_value)             
    $(this).animate({ width: _percentage(currentWei) + "%" }, { duration: 1000, easing: 'easeOutCirc' });
    document.getElementById("progress").innerText = _percentage(currentWei) + " %" ;
  });
  document.getElementById("currentETH").innerText = currentWei + " ETH"
  document.getElementById("goal").innerText = goal + " ETH"
  document.getElementById("hardCap").innerText = hardCap + " ETH"
  document.getElementById("icoDate").innerText = new Date(endDate).toDateString()

  // console.log(_percentage(currentWei))

};
setTimeout(testing, 1500);

function _percentage(_value){
	return (_value / hardCap) * 100;

}

token.rate(function(e,r){
	if(!e){
		document.getElementById("rate").innerHTML = "1 ETH = " + r.toNumber() + " VPN"
	}
});

token.endTime(function(e,r){
	if(!e){
		endDate = r.toNumber() * 1000
	}
});

token.goal(function(e,r){
	if(!e){
		goal = r.toNumber() / 10**18;
	}
});

function countDown(){
	// Set the date we're counting down to
	var countDownDate = endDate;
	// console.log(endDate)

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
	        document.getElementById("countdownTimer").innerHTML = "EXPIRED";

	    }
	}, 1000);
}
setTimeout(countDown, 1000);

token.cap(function(e,r){
	if(!e){
		hardCap = r.toNumber() / 10**18;
	}
});

token.weiRaised(function(e,r){
	currentWei = r.toNumber() / 10**18

});

token.hasEnded(function(e,r){
	if(!e){
		hasEnded = r.toString()
		
	}
});


function checkIfCrowdsaleIsEnded(){
	// console.log(hasEnded)
	if(hasEnded == "false"){
		$("#buyToken").removeClass("disabled")
	}else{
		$("#buyToken").addClass("disabled")
		document.getElementById("buyToken").innerText = "Crowdsale Has Finished !!!";
	}
}
setTimeout(checkIfCrowdsaleIsEnded, 1000)


		

