if (typeof web3 !== 'undefined') {
        // Mist, Metamask
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        console.log("not connected on Metamask");
        alert("need to install metamask https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en");
    }

    var myWallet = web3.eth.accounts[0];
    web3.eth.defaultAccount = myWallet;
    var contractAddress = "0xb490648c08ef0c742d50a1077e26d8fe0051daf5";

    var abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "beneficiary",
                "type": "address"
            }
        ],
        "name": "buyTokens",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "purchaser",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "beneficiary",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "TokenPurchase",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "text",
                "type": "string"
            }
        ],
        "name": "EthTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "text",
                "type": "string"
            }
        ],
        "name": "EthRefunded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "Finalized",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "claimRefund",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_endTime",
                "type": "uint256"
            }
        ],
        "name": "extendEndTime",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "finalize",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_teamFund",
                "type": "address"
            },
            {
                "name": "_ecosystemFund",
                "type": "address"
            },
            {
                "name": "_bountyFund",
                "type": "address"
            }
        ],
        "name": "finish",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "setCrowdsaleStage",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_rate",
                "type": "uint256"
            }
        ],
        "name": "setCurrentRate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [
            {
                "name": "_startTime",
                "type": "uint256"
            },
            {
                "name": "_endTime",
                "type": "uint256"
            },
            {
                "name": "_rate",
                "type": "uint256"
            },
            {
                "name": "_wallet",
                "type": "address"
            },
            {
                "name": "_goal",
                "type": "uint256"
            },
            {
                "name": "_cap",
                "type": "uint256"
            },
            {
                "name": "_maxTokens",
                "type": "uint256"
            },
            {
                "name": "_forDistribution",
                "type": "uint256[5]"
            },
            {
                "name": "_forBonus",
                "type": "uint256[4]"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "cap",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "endTime",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "goal",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "goalReached",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "hasEnded",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isFinalized",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "maxTokens",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "rate",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "stage",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "startTime",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "token",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "tokensForBountyAndAirDrop",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "tokensForEcosystem",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "tokensForTeam",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalTokensForSale",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalTokensForSaleDuringPreICO",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalWeiRaisedDuringPreICO",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "vault",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "wallet",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "weiRaised",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];


    var tokenContract = web3.eth.contract(abi);
    var token = tokenContract.at(contractAddress);

    var hasEnded = "false";
    var isFundsAreDistributed = false;
    var isFinalized;
    var goalReached;
    var rate;
    var transactionPrice = {from:web3.eth.accounts[0], gas:900000, gasPrice:web3.toWei("1","gwei")};
    var currentWei;
    var hardcap;
    var maxTokens;
    var forTeam;
    var forCompany;
    var forAirdrop;
    var forSale;
    var endTime;
    
  

    $(function(){

        token.endTime(function(error, result){
            if(error){console.log(error)}else{endTime = result.toNumber()}
        });

        document.getElementById("contractAddress").innerHTML = '<h4>Contract Address : <a href="https://ropsten.etherscan.io/address/' +contractAddress+  '">' +contractAddress+  '</a></h4><hr/>';

        // for current rate
        token.rate(function(e,r){if(!e){var res = r.toNumber();document.getElementById('rate').innerHTML =  '1 ETH  =  '+res+' VPN'}});

        // for current stage
        token.stage(function(error, result){
            if(error){
                console.log(error)
            }else{
                
                if(result.toNumber() == 0){
                    document.getElementById("stageResult").innerText = "Pre ICO";
                }else if(result.toNumber() == 1){
                    document.getElementById("stageResult").innerText = "Second Stage";
                }else if(result.toNumber() == 2){
                    document.getElementById("stageResult").innerText = "Third Stage";
                }else if(result.toNumber() == 3){
                    document.getElementById("stageResult").innerText = "Final Stage";
                }else if(result.toNumber() == 4){
                    document.getElementById("stageResult").innerText = "ICO";
                }
            }
        });

        token.cap(function(e, r){
            if(!e){
                document.getElementById("capresult").innerHTML = r.toNumber() / 10**18 + "  ETH";
                document.getElementById("progressCap").innerHTML = " Maximum Cap : " + r.toNumber() / 10**18 + "  ETH";
                hardcap = r.toNumber() / 10**18;
            }
        });

        token.goal(function(error, result){
            if(!error){
                document.getElementById("goalResult").innerHTML = result.toString()/10**18 + " ETH ";
                document.getElementById("progressGoal").innerHTML = "Goal : " + result.toString()/10**18 + " ETH ";
            }
        });


        token.weiRaised(function(e,r){
            if(!e){
                document.getElementById("currentWei").innerText = r.toNumber() / 10**18 + "  ETH";
                $("#progressbar").attr("aria-valuenow",_progressBar(r.toNumber() / 10**18));

                // $("#progressbar").attr("aria-valuenow","36");
                // document.getElementById("progress-val").innterText = _progressBar(r.toNumber() / 10**18);
            }
        });

        //progress Bar function
        function _progressBar(_value){
                //formula (value / hardcap) * 100
                return (_value / hardcap) * 100
        };

        // is Goal Reached
        token.goalReached(function(error, result){
            if(error){
                console.log(error)
            }else{
                document.getElementById("goalReachedBtn").innerHTML = result.toString();
                goalReached = result.toString();
            }
        });

        // crowdsale has ended?
        token.hasEnded(function(error, result){
            if(error){console.log(error)}else{
                document.getElementById("crowdSaleBtn").innerHTML = result.toString();
                hasEnded = result.toString();
            }
        });

        token.isFinalized(function(error, result){
            if(error){
                console.log(error)
            }else{
                document.getElementById("isFinalizedResult").innerHTML = result.toString();
                isFinalized = result.toString();
            }
        });

       
        token.maxTokens(function(error, result){
            if(!error){
                maxTokens = Math.round(result.toNumber() / 10**18)
            }
            if(maxTokens){
                token.tokensForTeam(function(e,r){
                    if(!e){
                        forTeam = ((r.toNumber() / 10**18) / maxTokens) * 100;
                    }
                });

                token.tokensForBountyAndAirDrop(function(e,r){
                    if(!e){
                        forAirdrop = ((r.toNumber() / 10**18) / maxTokens) * 100;
                    }
                });

                token.tokensForEcosystem(function(e,r){
                    if(!e){
                        forCompany = ((r.toNumber() / 10**18) / maxTokens) * 100;
                    }
                });

                token.totalTokensForSale(function(e,r){
                    if(!e){
                        forSale = ((r.toNumber() / 10**18) / maxTokens) * 100;
                    }
                });
            }
        }); 
    });

   

    $("#owner").on('click', function(){
        token.owner(function(err,res){if(!err){document.getElementById("ownerResult").innerText = res.toString()}})
    });

    $("#rate").on('click', function(){
        token.rate(function(error, result){
            if(error){
                console.log(error)
            }else{
                document.getElementById("rateResult").innerHTML = result.toNumber();
                rate = result.toNumber();
            }
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

    $("#token").on('click', function(){
        token.token(function(error, result){
            if(error){console.log(error)}else{document.getElementById("tokenResult").innerHTML = result.toString()}
        });
    });

    $("#tokensForBountyAndAirDrop").on('click', function(){
        token.tokensForBountyAndAirDrop(function(error, result){
            if(error){console.log(error)}else{document.getElementById("tokensForBountyAndAirDropResult").innerHTML = result.toString()}
        });
    });

    $("#tokensForEcosystem").on('click', function(){
        token.tokensForEcosystem(function(error, result){
            if(error){console.log(error)}else{document.getElementById("tokensForEcosystemResult").innerHTML = result.toString()}
        });
    });

    $("#tokensForTeam").on('click', function(){
        token.tokensForTeam(function(error, result){
            if(error){console.log(error)}else{document.getElementById("tokensForTeamResult").innerHTML = result.toString()}
        });
    });

    $("#totalTokensForSale").on('click', function(){
        token.totalTokensForSale(function(error, result){
            if(error){console.log(error)}else{document.getElementById("totalTokensForSaleResult").innerHTML = result.toString()}
        });
    });



    $("#totalTokensForSaleDuringPreICO").on('click', function(){
        token.totalTokensForSaleDuringPreICO(function(error, result){
            if(error){console.log(error)}else{document.getElementById("totalTokensForSaleDuringPreICOResult").innerHTML = result.toString()}
        });
    });

    $("#wallet").on('click', function(){
        token.wallet(function(error, result){
            if(error){console.log(error)}else{document.getElementById("walletResult").innerHTML = result.toString()}
        });
    });

    $("#weiRaised").on('click', function(){
        token.weiRaised(function(error, result){
            if(error){console.log(error)}else{document.getElementById("weiRaisedResult").innerHTML = result.toString()}
        });
    });

    $("#crowdsaleStageButton").on('click', function(){
        var selectedStage = $("#setCrowdsaleStage").val();
        //console.log(selectedStage)
        token.setCrowdsaleStage(selectedStage, transactionPrice, function(err, res){if(!err){document.getElementById("setCrowdsaleStageResult").innerHTML = "<a href=https://ropsten.etherscan.io/tx/" + res + "> Success, Check the Transaction Result </a>"}});
    });

    if(hasEnded == "true"){
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
        $("#distributeFunds").addClass("disabled");
        $("#forTeamFunds").attr("disabled","");
        $("#forEcosystemFunds").attr("disabled","");
        $("#forBoundAndAirdropFunds").attr("disabled","");

    };
    
    //transfer the ownership
    $("#newOwnershipButton").on('click', function(){
        var newOwnership = $("#newOwnership").val();
        //console.log(selectedStage)
        token.newOwner(newOwnership, transactionPrice, function(err, res){if(!err){document.getElementById("newOwnershipResult").innerHTML = "<a href=https://ropsten.etherscan.io/tx/" + res + "> Success, Check the Transaction Result </a>"}});
    });

    if(hasEnded == "true" && isFundsAreDistributed == true){
        $("#finalizedButton").on('click',function(){
            token.finalize(transactionPrice, function(err, res){if(!err){document.getElementById("finalizedResult").innerHTML = "<a href=https://ropsten.etherscan.io/tx/" + res + "> Success, Check the Transaction Result </a>"}});
        });
    }else{
        $("#finalizedButton").addClass("disabled");
    }
    
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



$(window).on("load", function(){
    function trigger(){
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
    setTimeout(trigger,1000)

})



// Skills Progress Bar
function testing() {
  $('.progress-bar').each(function() {
    var bar_value = $(this).attr('aria-valuenow') + '%';                
    $(this).animate({ width: bar_value }, { duration: 5000, easing: 'easeOutCirc' });
  });

};
setTimeout(testing, 1500);


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
                ['Team', forTeam],
                ['Company', forCompany],
                ['Airdrop', forAirdrop],
                ['Tokens for Sale', forSale],
               
                
                
            ]
        }]
    });
}
setTimeout(pieCharts, 1000)



