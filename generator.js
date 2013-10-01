var from = "#ff9125";
var to = "#ffab58";
$('#color').colorpicker({
      format: 'hex'
});
function changeColor(color){
    var grad = 10;
    ascendingSort = function(a, b){ return a - b; };
	if(color.length == 7){
	from = color;
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
	$("#dl-btn").css("background-image","-webkit-gradient(linear, 0 0, 0 100%,from("+to+"),to("+from+")");
    $("#dl-btn").css("background-image","-moz-linear-gradient(top,"+to+","+ from+")");
    $("#dl-btn").css("background-image","-webkit-linear-gradient(top,"+to+","+ from+")");
    $("#dl-btn").css("background-image","-o-linear-gradient(top,"+to+","+ from+")");
    $("#dl-btn").css("background-image","linear-gradient(top,"+to+","+ from+")");  
    } 
};
$('#color').keyup(function(e){
    var color = $(this).val();
    changeColor(color);
});
$('#color').colorpicker().on('changeColor', function(ev){  
    var color = ev.color.toHex();
    $(this).val(color);
    changeColor(color);    
});
$("#dl-btn").click(function(){
    var btnName = $("#btn-name").val();
    var text = 
    "."+ btnName + "{ \n" +
    "color: #ffffff; \n" + 
    "background-color: "+from+"; \n" +
    "background-image: -moz-linear-gradient(top, "+to+","+ from + "); \n" +
    "background-image: -ms-linear-gradient(top, "+to+","+ from + "); \n" +
    "background-image: -webkit-gradient(linear, 0 0, 0 100%, from("+to+"), to("+from+")); \n" +
    "background-image: -webkit-linear-gradient(top, "+to+","+ from + "); \n" +
    "background-image: -o-linear-gradient(top, "+to+","+ from + "); \n" +
    "background-image: linear-gradient(top, "+to+","+ from + "); \n" +
    "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='"+to+"', endColorstr='"+from+"', GradientType=0); \n" +
    "} \n" +
    ".btn-warning:hover, .btn-warning:focus, .btn-warning:active, .btn-warning.active, .btn-warning.disabled, .btn-warning[disabled]{ \n" +
    "background-color: "+from+"; \n" +
    "} \n";
    $("#cssarea").val(text);
    $("#modalWindow").modal("show");
});
$("#focus").click(function () {
    $("#cssarea").select();
});
