
   

    var hasEnded = "false";
    var isFundsAreDistributed = false;
    var isFinalized = "false";
    var goalReached = "false";
    var rate;
    var transactionPrice = {from:web3.eth.accounts[0], gas:900000, gasPrice:web3.toWei("1","gwei")};

    $(window).on('load',function(){
        $("#rate").click();
        $("#hasEnded").click();
        document.getElementById("contractAddress").innerHTML ='<a href="https://ropsten.etherscan.io/address/'+token.address+'">'+token.address+'</a>'
        token.token(function(e,r){
            if(!e){
                document.getElementById("tokenAddress").innerHTML = '<a href="https://ropsten.etherscan.io/address/'+r.toString()+'">'+r.toString()+'</a>'
            }
        });

        token.vault(function(e,r){
            if(!e){
                document.getElementById("vaultAddress").innerHTML = '<a href="https://ropsten.etherscan.io/address/'+r.toString()+'">'+r.toString()+'</a>'
            }
        });

        token.owner(function(e,r){
            if(!e){
                document.getElementById("ownerWallet").innerText = r.toString();
                $("#ownerWallet").attr("href","https://ropsten.etherscan.io/address/" + r.toString())
            }
        });

        token.weiRaised(function(e,r){
            if(!e){
                document.getElementById("weiRaised").innerHTML = r.toNumber() / 10**18 + " ETH "
            }
        });

        token.goal(function(e,r){
            if(!e){
                document.getElementById("tokenGoal").innerHTML = r.toNumber() / 10**18 + " ETH";
            }
        });

        token.maxTokens(function(e,r){
            if(!e){
                document.getElementById("totalSupply").innerHTML = Math.round(r.toNumber() / 10**18)  + " VPN";
            }
        });

        token.hasEnded(function(e,r){
            hasEnded = r.toString();
        });

        token.goalReached(function(e,r){
            goalReached = r.toString();
        });

        token.isFinalized(function(e,r){
            isFinalized = r.toString();
        });
        
    });




 
    
    $("#stage").on('click', function(){
        token.stage(function(error, result){
            if(error){
                console.log(error)
            }else{
                
                if(result.toNumber() == 0){
                    document.getElementById("stageResult").innerHTML = "Pre ICO";
                }else if(result.toNumber() == 1){
                    document.getElementById("stageResult").innerHTML = "Second Stage";
                }else if(result.toNumber() == 2){
                    document.getElementById("stageResult").innerHTML = "Third Stage";
                }else if(result.toNumber() == 3){
                    document.getElementById("stageResult").innerHTML = "Final Stage";
                }
            }
        });
    });

 

    $("#crowdsaleStageButton").on('click', function(){
        var selectedStage = $("#setCrowdsaleStage").val();
        //console.log(selectedStage)
        token.setCrowdsaleStage(selectedStage, transactionPrice, function(err, res){if(!err){document.getElementById("setCrowdsaleStageResult").innerHTML = "<a href=https://ropsten.etherscan.io/tx/" + res + "> Success, Check the Transaction Result </a>"}});
    });

    function checkIfHasEnded(){
        if(hasEnded == "true"){
            document.getElementById('distributeFunds').disabled = false;
            document.getElementById('forTeamFunds').disabled = false;
            document.getElementById('forEcosystemFunds').disabled = false;
            document.getElementById('forBoundAndAirdropFunds').disabled = false;

            $("#distributeFunds").on('click', function(){
                var forTeamFunds = $("#forTeamFunds").val();
                var forEcosystemFunds = $("#forEcosystemFunds").val();
                var forBoundAndAirdropFunds = $("#forBoundAndAirdropFunds").val();
                //console.log(forTeamFunds);
                //console.log(forEcosystemFunds);
                //console.log(forBoundAndAirdropFunds);
                token.finish(forTeamFunds,forEcosystemFunds,forBoundAndAirdropFunds, transactionPrice, function(err,res){if(!err){document.getElementById("distributeFundsResult").innerHTML = "<a href=https://ropsten.etherscan.io/tx/" + res + "> Success, Check the Transaction Result for distributed funds!!!</a>"}})
                isFundsAreDistributed = true;
            });
        }else{
            document.getElementById('distributeFunds').disabled = true;
            document.getElementById('forTeamFunds').disabled = true;
            document.getElementById('forEcosystemFunds').disabled = true;
            document.getElementById('forBoundAndAirdropFunds').disabled = true;
            // $("#distributeFunds").addClass("disabled");
            // $("#forTeamFunds").attr("disabled","");
            // $("#forEcosystemFunds").attr("disabled","");
            // $("#forBoundAndAirdropFunds").attr("disabled","");

        };
    };
    setTimeout(checkIfHasEnded, 1000);
    
    
    //transfer the ownership
    $("#newOwnershipButton").on('click', function(){
        var newOwnership = $("#newOwnership").val();
        // console.log(newOwnership)
        token.transferOwnership(newOwnership, transactionPrice, function(err, res){
            if(!err){
                document.getElementById("newOwnershipResult").innerHTML = "<a href=https://ropsten.etherscan.io/tx/" + res + "> Success, Check the Transaction Result </a>"
            }else{
                console.log(err)
            }
        });
    });


    $("#extendEndTimeButton").on('click', function(){
        var extendEndTime = $("#extendEndTime").val();
        var endDate = new Date(extendEndTime);
        var newEndTime = endDate.getTime() / 1000;
        token.extendEndTime(newEndTime, transactionPrice, function(err, res){
            if(!err){
               document.getElementById("extendEndTimeResult").innerHTML = "<a href=https://ropsten.etherscan.io/tx/" + res + "> Success, Check the Transaction Result </a>"
                
            }
        })
    });




