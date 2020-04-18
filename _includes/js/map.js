var height = $(window).height();

function loadStormChaseStats(e) {
    e.preventDefault();
    console.log("called load storm chase stats...");

    $("#flyout-map").animate({"left":"0"}, "slow");
	$("#flyout-map-area").height(height - 82);

	window.removeEventListener('scroll', noScroll);
}

$("#flyout-map-close").click(function(e) {
	e.preventDefault();

	$("#flyout-map").animate({"left":"-1903"}, "slow");

	window.addEventListener('scroll', noScroll);
})
