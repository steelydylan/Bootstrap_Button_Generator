var from = "#ff9125";
var to = "#ffab58";
$("#dl-btn").click(function(){
    var btnName = $("#btn-name").val();
    var text = 
    "."+ btnName + "{ \n" +
    "color: #ffffff; \n" +
    "background-color:"+ from +"; \n" +
    "border-color:" + from +"; \n" +
    "} \n" +
    ".btn-warning:hover, \n" +
    ".btn-warning:focus, \n" +
    ".btn-warning:active, \n" +
    ".btn-warning.active, \n" +
    ".open .dropdown-toggle.btn-warning { \n" +
    "color: #ffffff; \n" +
    "background-color:"+to+"; \n" +
    "border-color: "+to+"; \n" +
    "} \n" +
    ".btn-warning:active, \n" +
    ".btn-warning.active, \n" +
    ".open .dropdown-toggle.btn-warning { \n" +
    "background-image: none; \n" +
    "} \n";
    $("#cssarea").val(text);
    $("#modalWindow").modal("show");
});
$("#focus").click(function () {
    $("#cssarea").select();
});
function ascendingSort(a, b){ return a - b; }
$('#color').keyup(function(e){
	var grad = -10;
	var temp = $(this).val();
	if(temp.length == 7){
	from = temp;
	var hexR=(parseInt(from.substring(1,3),16));
	var hexG=(parseInt(from.substring(3,5),16));
	var hexB=(parseInt(from.substring(5,7),16));
	var colArray = new Array(hexR,hexG,hexB);
	colArray.sort(ascendingSort);
	var maxC = colArray[2];
	var midC = colArray[1];
	var minC = colArray[0];
	
	var maxAdjus = Math.round((255/100)*grad);
	if(maxC+maxAdjus > 255){maxAdjus = 255-maxC;}
	midAdjus = maxAdjus / (maxC / midC);
	minAdjus = maxAdjus / (maxC / minC);
	
	if(grad < 0){//darkC
		if(midAdjus < -20 && midAdjus > -235){midAdjus=Math.round(midAdjus);}else{midAdjus=Math.round(midAdjus)-1;}
		if(minAdjus < -20 && minAdjus > -235){minAdjus=Math.round(minAdjus);}else{minAdjus=Math.round(minAdjus)-1;}
	}else{
		if(midAdjus > 20 && midAdjus < 235){midAdjus=Math.round(midAdjus);}else{midAdjus=Math.round(midAdjus)-1;}
		if(minAdjus > 20 && minAdjus < 235){minAdjus=Math.round(minAdjus);}else{minAdjus=Math.round(minAdjus)-1;}
	}
	
	maxCfix = maxC+maxAdjus;
	midCfix = midC+midAdjus;
	minCfix = minC+minAdjus;
	
	if(maxCfix < 0){maxCfix=0;}if(maxCfix > 255){maxCfix=255;}
	if(midCfix < 0){midCfix=0;}if(midCfix > 255){midCfix=255;}
	if(minCfix < 0){minCfix=0;}if(minCfix > 255){minCfix=255;}
	
	//status = "max="+maxC+"/mid="+midC+"/min="+minC+"  Ad="+maxAdjus+"/"+midAdjus+"/"+minAdjus+"  fix="+maxCfix+"/"+midCfix+"/"+minCfix;
	//
	if (hexR==maxC) {
		tenR = maxCfix;
		if (hexG==minC) {
			tenG = minCfix;
			tenB = midCfix;
		}else{
			tenG =midCfix;
			tenB =minCfix;
		}
	}else{
		if (hexG==maxC) {
			tenG = maxCfix;
			if (hexR==minC) {
				tenR =minCfix;
				tenB =midCfix;
			}else{
				tenR =midCfix;
				tenB =minCfix;
			}
		}else{
			if (hexB==maxC) {
				tenB = maxCfix;
				if (hexR==minC) {
					tenR =minCfix;
					tenG =midCfix;
				}else{
					tenR =midCfix;
					tenG =minCfix;
				}
			}
		}
	}
	tenRv=tenR.toString(16);
	tenGv=tenG.toString(16);
	tenBv=tenB.toString(16);
	if (tenR<=15) {tenRv="0"+tenRv;}
	if (tenG<=15) {tenGv="0"+tenGv;}
	if (tenB<=15) {tenBv="0"+tenBv;}
	to = "#"+tenRv+tenGv+tenBv;
	$("#dl-btn").css("background-color",from);
	$("#dl-btn").css("border-color",from);
	$("#dl-btn").hover(
	function(){
	    $(this).css("background-color",to);
	    $(this).css("border-color",to);
	},
	function(){
	    $(this).css("background-color",from);
	    $(this).css("border-color",from);
	});
    }  
});