/**
Set state based on CSS classes	
@return string
**/
clinic.setState = function( css ){
	var state; 
	switch(css){
		case 'next-step':	state = "ready";
		break;
		case 'orange': 		state = "active";
		break;
		case 'green': 
		case 'blue': 		state = "complete";
		break;		
		case 'dna':			state = "dna";
		break;
	}
	return state;
}