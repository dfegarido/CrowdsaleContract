
var buyerAddress = web3.eth.accounts[0];
var rate;


document.getElementById("buyerAddress").innerText = buyerAddress;

web3.eth.getBalance(buyerAddress, function(e,r){
    if(!e){
        var buyerBalance = r.toNumber() / 10**18;
        document.getElementById("buyerBalance").innerText = buyerBalance;
        if(buyerBalance < 1){
            document.getElementById("ethButton").disabled = true;
            document.getElementById("ethAmount").disabled = true;
        }else{
            $("#warning").addClass("hidden")
        }
    }
});

token.rate(function(e,r){
    rate = r.toNumber();
    document.getElementById("tokenRate").innerText = "1 ETH = " + r.toNumber()
});

$("#ethAmount").on('keyup', function(){
    var amount = $(this).val();
    var totalRate = amount * rate;
    document.getElementById("vpnAmount").value = totalRate + "  VPN";
})

$("#ethAmount").on('click', function(){
    var amount = $(this).val();
    var totalRate = amount * rate;
    document.getElementById("vpnAmount").value = totalRate + "  VPN";
})




$("#ethButton").on("click",function(){
    var ethAmount = $("#ethAmount").val();
    var trx = {value:web3.toWei(ethAmount,"ether"), gas:900000, gasPrice:web3.toWei("1","gwei")};
    token.buyTokens(buyerAddress, trx, function(e,r){
        if(!e){
            var transactionHash = r.toString();
            var url = 'https://ropsten.etherscan.io/tx/' + transactionHash;
            document.getElementById("buyerCheckTransaction").innerHTML = "Check The Transaction : <a href='#' onClick='window.open(`"+url+"`)'>"+transactionHash+"</a>"

            
        }
    });
});

token.token(function(e,r){
    document.getElementById("tokenAddress").innerText = r.toString();
});
