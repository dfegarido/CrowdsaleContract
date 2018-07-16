
var tokenAddress;
var contractAddress;
var rate;

contractAddress = token.address;
token.token().then(function(v){
	tokenAddress = v.toString()
});
token.rate().then(function(v){
	rate = v.toString()
})


function delay(){
	$("#contractAddress").html(contractAddress)
	$("#tokenAddress").html(tokenAddress)
	$("#tokenRate").html("1 ETH = " + rate)
}

setTimeout(delay, 1000)


