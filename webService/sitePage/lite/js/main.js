
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
        token.rate(function(e,r){
            if(!e){
                document.getElementById('rate').innerHTML =  '1 ETH  =  '+ r.toNumber() +' VPN'
            };
        });

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
                // $("#progressbar").attr("aria-valuenow",_progressBar(r.toNumber() / 10**18));
                currentWei = r.toNumber() / 10**18;

                // $("#progressbar").attr("aria-valuenow","36");
                // document.getElementById("progress-val").innterText = _progressBar(r.toNumber() / 10**18);
            }else{
                console.log(e)
            }
        });

        // is Goal Reached
        token.goalReached(function(error, result){
            if(error){
                console.log(error)
            }else{
                document.getElementById("goalReachedBtn").innerHTML = result.toString();
                $("#goalReachedBtn").removeClass("btn-danger");
                $("#goalReachedBtn").addClass("btn-success");
                goalReached = result.toString();
            }
        });

        // crowdsale has ended?
        token.hasEnded(function(error, result){
            if(error){
                console.log(error)
            }else{
                document.getElementById("crowdSaleBtn").innerHTML = result.toString();
                hasEnded = result.toString();
                $("#crowdSaleBtn").removeClass("btn-danger");
                $("#crowdSaleBtn").addClass("btn-success");
            }
        });

        token.isFinalized(function(error, result){
            if(error){
                console.log(error)
            }else{
                document.getElementById("isFinalizedBtn").innerHTML = result.toString();
                isFinalized = result.toString();
                $("#isFinalizedBtn").removeClass("btn-danger");
                $("#isFinalizedBtn").addClass("btn-success");
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

   

    // $("#owner").on('click', function(){
    //     token.owner(function(err,res){if(!err){document.getElementById("ownerResult").innerText = res.toString()}})
    // });

    
    // $("#stage").on('click', function(){
    //     token.stage(function(error, result){
    //         if(error){
    //             console.log(error)
    //         }else{
                
    //             if(result.toNumber() == 0){
    //                 document.getElementById("stageResult").innerHTML = "Pre ICO";
    //             }else if(result.toNumber() == 1){
    //                 document.getElementById("stageResult").innerHTML = "Second Stage";
    //             }else if(result.toNumber() == 2){
    //                 document.getElementById("stageResult").innerHTML = "Third Stage";
    //             }else if(result.toNumber() == 3){
    //                 document.getElementById("stageResult").innerHTML = "Final Stage";
    //             }
    //         }
    //     });
    // });

    // $("#token").on('click', function(){
    //     token.token(function(error, result){
    //         if(error){console.log(error)}else{document.getElementById("tokenResult").innerHTML = result.toString()}
    //     });
    // });

    // $("#tokensForBountyAndAirDrop").on('click', function(){
    //     token.tokensForBountyAndAirDrop(function(error, result){
    //         if(error){console.log(error)}else{document.getElementById("tokensForBountyAndAirDropResult").innerHTML = result.toString()}
    //     });
    // });

    // $("#tokensForEcosystem").on('click', function(){
    //     token.tokensForEcosystem(function(error, result){
    //         if(error){console.log(error)}else{document.getElementById("tokensForEcosystemResult").innerHTML = result.toString()}
    //     });
    // });

    // $("#tokensForTeam").on('click', function(){
    //     token.tokensForTeam(function(error, result){
    //         if(error){console.log(error)}else{document.getElementById("tokensForTeamResult").innerHTML = result.toString()}
    //     });
    // });

    // $("#totalTokensForSale").on('click', function(){
    //     token.totalTokensForSale(function(error, result){
    //         if(error){console.log(error)}else{document.getElementById("totalTokensForSaleResult").innerHTML = result.toString()}
    //     });
    // });



    // $("#totalTokensForSaleDuringPreICO").on('click', function(){
    //     token.totalTokensForSaleDuringPreICO(function(error, result){
    //         if(error){console.log(error)}else{document.getElementById("totalTokensForSaleDuringPreICOResult").innerHTML = result.toString()}
    //     });
    // });

    // $("#wallet").on('click', function(){
    //     token.wallet(function(error, result){
    //         if(error){console.log(error)}else{document.getElementById("walletResult").innerHTML = result.toString()}
    //     });
    // });




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
    // var bar_value = $(this).attr('aria-valuenow') + '%';                
    $(this).animate({ width: _progressBar(currentWei) + "%" }, { duration: 3000, easing: 'easeOutCirc' });
    $(this).text(_progressBar(currentWei) + " %");
    
  });

};
setTimeout(testing, 1000);

//progress Bar function
function _progressBar(_value){
        //formula (value / hardcap) * 100
        return (_value / hardcap) * 100
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
                ['Team', forTeam],
                ['Company', forCompany],
                ['Airdrop', forAirdrop],
                ['Tokens for Sale', forSale],
               
                
                
            ]
        }]
    });
}
setTimeout(pieCharts, 1000)




