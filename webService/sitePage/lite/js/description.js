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


$('#crowdsaleStageButton').on('click',function(){
     const crowdstage = Number($("#setCrowdsaleStage").val());
     token.setCrowdsaleStage(crowdstage).then(function(result){
            console.log(result["hash"])
            const link = "<a href='https://ropsten.etherscan.io/tx/"+result['hash']+"'>Check Result!</a>"
            $("#setCrowdsaleStageResult").html(link)
     })
});


$('#newOwnershipButton').on('click',function(){
     const newOwner = $("#newOwnership").val();
     token.transferOwnership(newOwner).then(function(result){
            console.log(result["hash"])
            const link = "<a href='https://ropsten.etherscan.io/tx/"+result['hash']+"'>Check Result!</a>"
            $("#newOwnershipResult").html(link)
     })
});

$('#extendEndTimeButton').on('click',function(){
     const extendTime = $("#extendEndTime").val();
     const unixTime = new Date(String(extendTime)).getTime() / 1000
     console.log(unixTime)
     token.extendEndTime(unixTime).then(function(result){
            console.log(result["hash"])
            const link = "<a href='https://ropsten.etherscan.io/tx/"+result['hash']+"'>Check Result!</a>"
            $("#extendEndTimeResult").html(link)
     })
});


$('#distributeFunds').on('click',function(){
     const forTeamFunds = $("#forTeamFunds").val();
     const forEcosystemFunds = $("#forEcosystemFunds").val();
     const forBoundAndAirdropFunds = $("#forBoundAndAirdropFunds").val();
     token.finish(forTeamFunds, forEcosystemFunds, forBoundAndAirdropFunds).then(function(result){
            console.log(result["hash"])
            const link = "<a href='https://ropsten.etherscan.io/tx/"+result['hash']+"'>Check Result!</a>"
            $("#distributeFundsResult").html(link)
     })
});

function checkStatus(){
    let goalReached;
    let hasEnded;
    token.hasEnded().then(function(v){
         goalReached = v.toString()
    });
    token.goalReached().then(function(v){
         hasEnded = v.toString()
    });
    let tokenAdd;
    

    $("#contractAddress").text(token.address)
    

    if(hasEnded && goalReached == 'true'){
        $("#distributeFunds").removeAttr("disabled")
        $("#forTeamFunds").removeAttr("disabled")
        $("#forEcosystemFunds").removeAttr("disabled")
        $("#forBoundAndAirdropFunds").removeAttr("disabled")
    }
    setTimeout(checkStatus, 10000)
}
checkStatus()

token.token().then(function(v){
    $("#tokenAddress").text(v.toString())
})

token.vault().then(function(v){
    $("#vaultAddress").text(v.toString())
})

token.weiRaised().then(function(v){
    const weiRaised = Math.round(v.toString() / 10**18)
    $("#weiRaised").text(weiRaised + " ETH")
})

token.goal().then(function(v){
    const goalToken = Math.round(v.toString() / 10**18)
    $("#tokenGoal").text(goalToken + " ETH")
})

token.maxTokens().then(function(v){
    const maxToken = Math.round(v.toString() / 10**18)
    $("#totalSupply").text(maxToken.toLocaleString() + " VPN")
})

token.owner().then(function(v){
    $("#ownerWallet").text(v.toString())
})



