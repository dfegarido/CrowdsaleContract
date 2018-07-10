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
				console.log(getData);
				document.getElementById("contractAddress").innerText = getData.wallet;
				
				document.getElementById("tokenAddress").innerText = getData.token_address;

				document.getElementById("tokenRate").innerText = "Rate : 1 ETH = " + getData.rate + " VPN";
				
		    },
	error: function(x, s, e){
				console.log(x.status, s)
			}
});
