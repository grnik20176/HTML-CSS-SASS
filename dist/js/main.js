$(document).ready(function(){
	initSlideTabs();
	customScroll();
	/*$('table').table_scroll();*/

	$('.js-select').select2();
	$('.js-slider').slick({
	  infinite: false,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><svg class="svg_icon  arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use></svg></button>',
	  nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><svg class="svg_icon arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg></button>',
	  dots: true,
	  responsive: [
		  {
			breakpoint: 1367,
			settings: {
			  arrows: false,
			}
		  }
		]
	});
	$('.js-cards-slider').slick({
	  infinite: false,
	  slidesToShow: 3,
	  slidesToScroll: 3,
	  arrows: false,
	  dots: true,
	  responsive: [
		  {
			breakpoint: 901,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 2,
			}
		  },
		  {
			breakpoint: 551,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			}
		  }
		]
	});
	$('.js-popap').magnificPopup({
		type: 'inline',
		midClick: true
	});
	//$(".dark-table-holder").nanoScroller();
	//$('.table-responsive').responsiveTable();

});

$(window).load(function() {
	toggleTableMenu();
	checkTableEl( ".dark-table-holder" );
	
	checkResize();
	showColumn();
});

function showColumn() {
	$('.dropdown-menu li').on('click', function() {
		var $this = $(this);
		var $columnAttr = $this.attr('data-column');
		var parent = document.querySelector('table');
		var elements = parent.querySelectorAll("[data-column='" + $columnAttr + "']");
		var column = parent.querySelectorAll("th");
		//var columnCount = column.length;
		var totalArray = [];
		if ($($this).hasClass( "hidden-column" )) {
			$($this).removeClass('hidden-column');
			for (var i = 0; i < elements.length; i++) {
				elements[i].style.display = "table-cell";
			}
		}
		else {
			$($this).addClass('hidden-column');
			for (var i = 0; i < elements.length; i++) {
				elements[i].style.display = "none";
			}
		}
		var listParent = this.parentNode;
		var listElements = listParent.children;
		console.log(listElements);
		var columnCount = 0;
		for (var i = 0; i < listElements.length; i++) {
			if (!$(listElements[i]).hasClass( "hidden-column" )) {
				columnCount++;
				var columnElMarker = $(listElements[i]).attr('data-column');
				totalArray.push(parent.querySelectorAll("[data-column='" + columnElMarker + "']"));
				console.log(totalArray);
			}
		}
		//console.log(listElements.length, columnCount, window.innerWidth);
		if ((listElements.length > columnCount) && (window.innerWidth < 1153)) {
			console.log("test");
			var defaultWidth = 0;
			setWidthTableColumn( columnCount, totalArray, defaultWidth );
		}
		else if (window.innerWidth < 1153) {
			var defaultWidth = 0;
			setWidthTableColumn( columnCount, totalArray, defaultWidth );
		}
		else {
			var defaultWidth = 1;
			setWidthTableColumn( columnCount, totalArray, defaultWidth );
		}
		//setWidthTableColumn( columnCount, totalArray, defaultWidth );
	});
}
function initSlideTabs() {
	$('.js-show-block').on('click', function() {
		var $this = $(this);
		var $parent = $this.parent();
		var $openedEl = $parent.find(".js-show-block.open");
		var $toggleBlock = '';
		if ($openedEl) {
			$($openedEl).removeClass('open');
			$toggleBlock = $('#' + ($openedEl).attr('data-block'));
			if (($openedEl).attr('data-head')) {
				$toggleHead = $('#' + ($openedEl).attr('data-head'));
				$($toggleHead).slideUp();
				$($toggleHead).removeAttr('data-opened');
			}
			$($toggleBlock).slideUp();
			$($toggleBlock).removeAttr('data-opened');
			if (document.querySelector(".nano")) {
				$(".nano").nanoScroller({ stop: true });
			}
			customScroll();
		}
		$toggleBlock = $('#' + $this.attr('data-block'));
		if ($this.attr('data-head')) {
			$toggleHead = $('#' + $this.attr('data-head'));
			$toggleHead.attr("data-opened", true);
			$toggleHead.slideDown();
		}
		if ($toggleBlock.is(":hidden")) {
			$this.addClass('open');
		}
		if ($this.hasClass('open')) {
			$toggleBlock.attr("data-opened", true);
			$toggleBlock.slideDown();
			customScroll();
		}
		return false;
	});

	/*$('.js-show-tab').on('click', function() {
		$('.js-show-tab').removeClass('open');
		var $this = $(this);
		var $toggleBlock = $('#' + $this.attr('data-block'));
		console.log($toggleBlock.parentNode);
		if ($toggleBlock.is(":hidden")) {
			$this.addClass('open');
		}
		$("[data-opened2]").slideUp();
		$("[data-opened2]").removeAttr('data-opened2');
		if ($this.hasClass('open')) {
			$toggleBlock.attr("data-opened2", true);
			$toggleBlock.slideDown();
		}
		return false;
	});*/
}
function customScroll() {
	if (document.querySelector(".nano")) {
		$(".nano").nanoScroller();
	}
}
function checkTableEl( tableParent) {
	var table = document.querySelector(tableParent);
	if (table) {
		var heads = [];
		var columns = [];
		var totalArray = [];
		var listParent = table.querySelector(".dropdown-menu");
		heads.push(table.querySelectorAll("th"));
		columns.push(table.querySelectorAll("td"));
		var childElm = listParent.children;
		var columnCount = 0;
		if (childElm.length === 0) {
			for (var i = 0; i < heads[0].length; i++ ) {
				var newLi = document.createElement("li");
				newLi.innerHTML = heads[0][i].textContent;
				newLi.setAttribute('data-column', "col-"+i);
				if ($(heads[0][i]).css('display') ==="none") {
					$(newLi).addClass('hidden-column');
				}
				else {
					columnCount++;
					totalArray.push(table.querySelectorAll("." + heads[0][i].className));
				}
				listParent.appendChild(newLi);
			}
			if (window.innerWidth < 1153) {
				var defaultWidth = 0;
				setWidthTableColumn( columnCount, totalArray, defaultWidth );
			}
		}
		else {
			for (var i = 0; i < childElm.length; i++ ) {
				if ($(heads[0][i]).css('display') ==="none") {
					$(childElm[i]).addClass('hidden-column');
				}
				else {
					$(childElm[i]).removeClass('hidden-column');
					columnCount++;
					totalArray.push(table.querySelectorAll("." + heads[0][i].className));
				}
			}
			if (window.innerWidth < 1153) {
				var defaultWidth = 0;
				setWidthTableColumn( columnCount, totalArray, defaultWidth );
			}
			else {
				var defaultWidth = 1;
				setWidthTableColumn( columnCount, totalArray, defaultWidth );
			}
		}
	}
}
function setWidthTableColumn( columnCount, totalArray, defaultWidth ) {
	var widthColumn = (100 / columnCount).toFixed(3);
	for (var i = 0; i < totalArray.length; i++) {
		for (var j = 0; j < totalArray[i].length; j++) {
			if ( defaultWidth === 0) {
				totalArray[i][j].style.width = widthColumn + "%";
			}
			else {
				$(totalArray[i][j]).removeAttr('style');
			}
		}
	}
}
function checkResize() {
	window.addEventListener("resize", resizeThrottler, false);
	var resizeTimeout;
	function resizeThrottler() {
		if ( !resizeTimeout ) {
				resizeTimeout = setTimeout(function() {
				resizeTimeout = null;
				actualResizeHandler();
			}, 300);
		}
	}
	function actualResizeHandler() {
		checkTableEl( ".dark-table-holder" );
	}
}
function toggleTableMenu() {
	$( ".dropdown-toggle" ).on( "click", function() {
		var $this = $(this);
		var $toggleBlock = document.querySelector(".dropdown-menu");
		if ($($toggleBlock).is(":hidden")) {
			$this.addClass('open');
			$($toggleBlock).slideDown();
		}
		else {
			$this.removeClass('open');
			$($toggleBlock).slideUp();
		}
	});
}