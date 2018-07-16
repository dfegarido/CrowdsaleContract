// Authentication
$(window).on("load",function(){
	try{
		const decode = jwt_decode(localStorage.session)
		if(decode.roles[0] != "isAuthenticated"){
			window.localStorage.session = ""
			window.location.href = "login.html"
		}
	}catch(e){
		console.log(e)
		window.localStorage.session = ""
		window.location.href = "login.html"
	}
	
	
})




token.endTime().then(function(v){
	countdown(v.toString())
});


let hardcap;
let currentWei;
let team;
let company;
let airdrop;
let sale;

token.isFinalized().then(function(v){
	$("#isFinalizedBtn").html(v.toString())
});

token.goalReached().then(function(v){
	$("#goalReachedBtn").html(v.toString())
});

token.hasEnded().then(function(v){
	$("#crowdSaleBtn").html(v.toString())
});

token.rate().then(function(v){
	$("#rate").html("1 ETH = " + v.toString() + " VPN")
});

token.stage().then(function(v){
	const stage = ["PreICO","2nd Stage","3rd Stage","Final Stage"]
	$("#stageResult").html(stage[v.toString()])
});

token.goal().then(function(v){
	$("#goalResult").html(v.toString() / 10**18 + " ETH")
});

token.maxTokens().then(function(v){
	$("#totalSupply").html(Math.round(v.toString() / 10**18).toLocaleString())
})

token.cap().then(function(v){
	hardcap = v.toString()
	$("#capresult").html(hardcap / 10**18 + " ETH")
});

token.weiRaised().then(function(v){
	currentWei = v.toString()
	$("#currentWei").html(currentWei + " ETH")
});

token.tokensForTeam().then(function(v){
	team = v.toString()
});
token.tokensForEcosystem().then(function(v){
	company = v.toString()
})
token.tokensForBountyAndAirDrop().then(function(v){
	airdrop = v.toString()
});
token.totalTokensForSale().then(function(v){
	sale = v.toString()
});

setTimeout(progressBar, 1000)
setTimeout(pieCharts, 1000)






function countdown(endTime){
	var countDownDate = endTime * 1000;
	// console.log(countDownDate);

	 // Set the date we're counting down to
	// var countDownDate = endTime * 1000;


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
	    
	    // Output the result in an element with id
	    document.getElementById("days").innerText = days;
	    document.getElementById("hours").innerText = hours;
	    document.getElementById("mins").innerText = minutes;
	    document.getElementById("secs").innerText = seconds;
	    
	    // If the count down is over, write some text 
	    if (distance < 0) {
	        clearInterval(x);
	        document.getElementById("days").innerHTML = 0;
	        document.getElementById("hours").innerHTML = 0;
	        document.getElementById("mins").innerHTML = 0;
	        document.getElementById("secs").innerHTML = 0;
	    }
	}, 1000);

	//Main Sale Starts in:
    var mainSaleICO = new Date(endTime*1000);
    document.getElementById("mainSale").innerText = mainSaleICO.toDateString();

}

function progressBar(){
	// console.log(currentWei, hardcap)
	$('.progress-bar').each(function() {
	    // var bar_value = $(this).attr('aria-valuenow') + '%';                
	    $(this).animate({ width: _percentage(currentWei, hardcap) + "%" }, { duration: 3000, easing: 'easeOutCirc' });
	    $(this).text(_percentage(currentWei, hardcap) + " %");
	    
	  });
}

function _percentage(_value, _hardcap){
    //formula (value / hardcap) * 100
    return (_value / _hardcap) * 100
};



// Pie Chart
function pieCharts(){
	
    Highcharts.chart('container', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },

        credits: {
            enabled:true,
            text:"vpncash.org",
            href:"https://www.vpncash.org",
            style:{
                fontSize:"15px",
                color:"black",
            },

        },
        exporting:{
            enabled:false,
        },

        title: {
            text: 'Token Allocation'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Token share',
            data: [
                ['Team', Number(team)],
                ['Company', Number(company)],
                ['Airdrop', Number(airdrop)],
                ['Tokens for Sale', Number(sale)],
               
                
                
            ]
        }]
    });
}


