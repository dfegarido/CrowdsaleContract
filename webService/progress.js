const progress = {
			  "query":"query{getCrowdsale{hardcap,fund_raised}}"
			}



$.ajax({
    	url: "https://api.vpncash.org/query/",
    	headers: { 
    		'content-type': "application/json",
    	},
    	data:JSON.stringify(progress),
    	type:"post",
    	success: function(result,status, xhr){
					const getData = result.data.getCrowdsale
					console.log(getData);

			    },
		error: function(x, s, e){
					console.log(x.status, s)
				}

});