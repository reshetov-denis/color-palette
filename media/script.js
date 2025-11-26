const start_menu = document.querySelector(".start-menu");
const box_parent = document.querySelector(".color-blocks-zone");
let color_value = document.querySelector(".color-text");
const color_symols = ['0','1','2','3','4',
							 '5','6','7','8','9',
							 'A','B','C','D','E','F',
							 'a','b','c','d','e','f']

// Количество квадратов
let num_of_boxes;


let colorMode = 1;
//1=>Color Mode
//2=>Gradient Mode
//3=>Simple Color Mode


// Изменение цвета при нажатии Enter
$('.start-menu').keydown(function(e) {
	if(e.keyCode === 13) {
		// можете делать все что угодно со значением текстового поля console.log($(this).val());
		createBoxes(1);
	}
});


// "Начало"
function change_pages() {
	start_menu.style.left = "-100%";
	start_menu.style["boxShadow"] = "none";

	createBoxes(1);
}


// Функция создания кубов
function createBoxes(mode) {

	// Удалим прошлые цвета
	while (box_parent.firstChild) {
		box_parent.removeChild(box_parent.firstChild);
	}

	if(mode == 1) {
		colorMode = 1;

		$('.mode').removeClass("active-mode");
		$('.a' + mode).addClass("active-mode");
		$('.past_color').css("display", "none");
		$('.restart-btn').css("display", "none");
		$('.create-btn').css("display", "flex");

		num_of_boxes = 198;
		for (let i = 0; i < num_of_boxes; i++) {
			const box = document.createElement('div');
			box.classList.add("box");

			// Цвет фона боксов
			let color1 = "#";

			for (let j = 0; j < 6; j++) {
				color1 += rndInArray(color_symols);
			}
			box.style.background = color1;

			// Копирование значения цвета
			box.addEventListener("click", function() {
				navigator.clipboard.writeText(color1);
			});

			box_parent.appendChild(box);
		}
	}
	else if (mode == 2) {
		colorMode = 2;

		$('.mode').removeClass("active-mode");
		$('.a' + mode).addClass("active-mode");
		$('.past_color').css("display", "none");
		$('.restart-btn').css("display", "none");
		$('.create-btn').css("display", "flex");

		num_of_boxes = 198;
		for (let i = 0; i < num_of_boxes; i++) {
			const box = document.createElement('div');
			box.classList.add("box");

			// Цвет фона боксов
			let color1 = "#";
			let color2 = "#";

			for (let j = 0; j < 6; j++) {
				color1 += rndInArray(color_symols);
				color2 += rndInArray(color_symols);
			}
			box.style.background = "linear-gradient(" + rnd(0,360) + "deg," + color1 + "," + color2 + ")";

			// Копирование значения цвета
			box.addEventListener("click", function() {
				navigator.clipboard.writeText(box.style.background);
			});

			box_parent.appendChild(box);
		}
	}
	else if (mode == 3) {
		colorMode = 3;
		let placeholder_txt = ['#F281E3','#918289',
									  '#AABBCC','#a8F3e4',
									  '#FEF341','#ABB82E',
									  '#F07CeA','#0d40FC',
									  '#1F1A4e','#2Fe4f5']

		$('.mode').removeClass("active-mode");
		$('.a' + mode).addClass("active-mode");
		$('.past_color').css("display", "block");
		$('.create-btn').css("display", "none");
		$('.restart-btn').css("display", "none");
		document.getElementsByName("placeholder_ex")[0].placeholder = rndInArray(placeholder_txt);

		$('.color-text').on("click", function(){
			let color_text = document.querySelector('.color-text');
			if(color_text.value == "") {
				color_text.value = "#";
			}
		})

		$('.color-text').keydown(function(e) {
			if(e.keyCode === 13) {
				let banned_symbs = 0;
				let OK_symbs = 0;

				if(color_value.value.length == 4 || color_value.value.length == 7) {
					for(let i=1; i<color_value.value.length; i++) {
						for(let j=0; j<color_symols.length; j++) {
							if(color_value.value[i] == color_symols[j]) {
								OK_symbs++;
							}
						}
					}

					banned_symbs = (color_value.value.length-1) - OK_symbs;
					
					if(banned_symbs > 0) {
						$('.incorrect-text').text("Incorrect HEX color!");
						document.querySelector(".incorrect-text").style.top = '-15px';
						document.querySelector(".incorrect-text").animate([
							{transform: 'translateX(2px)'},
							{transform: 'translateX(-2px)'},
							{transform: 'translateX(2px)'},
						], 150)
					}
					else {
						document.querySelector(".incorrect-text").style.top = '15px';
						$('.restart-btn').css("display", "flex");

						createSameColor(color_value.value);
					}
				}
				else {
					$('.incorrect-text').text("Write enough symbols!");
					document.querySelector(".incorrect-text").style.top = '-15px';
					document.querySelector(".incorrect-text").animate([
						{transform: 'translateX(2px)'},
						{transform: 'translateX(-2px)'},
						{transform: 'translateX(2px)'},
					], 150)
				}
			}
		});
	}
}

function createSameColor(color) {
	$('.past_color').css("display", "none");
	$('.create-btn').css("display", "none");

	// Удалим прошлые цвета
	while (box_parent.firstChild) {
		box_parent.removeChild(box_parent.firstChild);
	}
	
	let rgb = parseColor(color);
	let r = rgb.r;
	let b = rgb.b;
	let g = rgb.g;

	let main_color = Math.max(r,b,g);

	num_of_boxes = 18;
	for (let i = 0; i < num_of_boxes; i++) {
		const box = document.createElement('div');
		box.classList.add("box");

		// Цвет фона боксов
		if(main_color == r) {
			new_color = "rgb(" + (main_color+rnd(-100,100)) + "," + (g+rnd(-50,50)) + "," + (b+rnd(-50,50)) + ")";
		}
		if(main_color == g) {
			new_color = "rgb(" + (r+rnd(-50,50)) + "," + (main_color+rnd(-100,100)) + "," + (b+rnd(-50,50)) + ")";
		}
		if(main_color == b) {
			new_color = "rgb(" + (r+rnd(-50,50)) + "," + (g+rnd(-50,50)) + "," + (main_color+rnd(-100,100)) + ")";
		}

		box.style.background = new_color;

		// Копирование значения цвета
		box.addEventListener("click", function() {
			navigator.clipboard.writeText(rgbToHex(box.style.background));
		});

		box_parent.appendChild(box);
	}
}




function parseColor(c) {
	var match;

	if (match = c.match(/^#(..)(..)(..)$/) /* assignment */) {
		match = match.map(function (x) { return +('0x'+x) })
	} else if (match = c.match(/^#(.)(.)(.)$/) /* assignment */) {
		match = match.map(function (x) { return +('0x'+x+x) })
	}

	if (match) {
		return { r: match[1], g: match[2], b: match[3] };
	}
}

function componentFromStr(numStr, percent) {
	var num = Math.max(0, parseInt(numStr, 10));
	return percent ?
		Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}
function rgbToHex(rgb) {
	var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
	var result, r, g, b, hex = "";
	if ( (result = rgbRegex.exec(rgb)) ) {
		r = componentFromStr(result[1], result[2]);
		g = componentFromStr(result[3], result[4]);
		b = componentFromStr(result[5], result[6]);

		hex = "" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
	return hex;
}



// Рандом

function rnd(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function rndInArray(arr) {
	var randIndex = Math.floor(Math.random() * arr.length);
	return arr[randIndex];
}