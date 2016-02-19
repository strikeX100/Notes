function addNewNote(header, comment, index) {
	var note = $('<div/>', {class:'note mdl-card mdl-shadow--2dp'});
	var title = $('<div/>', {class:'mdl-card__title'});
	title.text(header);
	var text = $('<div/>', {class:'mdl-card__supporting-text'});
	text.text(comment);
	var menu = $('<div/>', {class:'menu'});
	var id = 'demo-menu-lower-right-' + index;
	var button = $('<button/>', {
		id: id,
		class: "mdl-button mdl-js-button mdl-button--icon"
	});
	var i = $('<i/>', {
		class: 'material-icons',
		text: 'more_vert'
	});
	$(button).append(i);
	var lang = ['Изменить', 'Поделиться', 'Удалить'];
	var mylist = $('<ul/>', {
		class: 'mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect',
		for: id
	});
	//Наполняем
	$.each(lang, function() {
    	$('<li/>',{text:this, class:'mdl-menu__item'}).appendTo(mylist);
	});
	//Временно
	mylist[0].childNodes[0].setAttribute('disabled', true);
	mylist[0].childNodes[1].setAttribute('disabled', true);

	$(menu).append(button, mylist);
	$(note).append(title, text, menu);
	$("#notes").append(note);
	var notesBorder = [0, $('header').height(), window.innerWidth - $(note).width() - 20,];
	$(note).draggable({containment:notesBorder, zIndex: 2});
	$("input").val("").focus().parent().removeClass('is-dirty');
	$("textarea").val("").parent().removeClass('is-dirty');
	componentHandler.upgradeElements(note.get(0));
}
$(document).ready(function() {
	var k = 0;
	var border = [-window.innerWidth/2+$('.input').width()/2+10, $('header').height(), window.innerWidth/2- $('.input').width()/2-10,];
	$("#addButton").click(function() {
		new_header = $("input").val();
		new_comment = $("textarea").val();
		if (new_header && new_comment) {
			k++;
			addNewNote(new_header, new_comment, k);
		}
	});
	$(document).keydown(function(key) {
		if (parseInt(key.which, 10) === 13) {
			new_header = $("input").val();
			new_comment = $("textarea").val();
			if (new_header && new_comment) {
				k++;
				addNewNote(new_header, new_comment, k);
			}
		}
	});	
	addNewNote('Заметка', 'Вы можете добавлять и удалять заметки, а также передвигать их по экрану.', 'test');
	$('#notes').on('click', 'ul li:last-child', function() {
		$(this).closest('.note').remove();
	});
	/*$('#notes').on('dragstart', '.note', function() {
		var zIndex = $(this).css('z-index');
		zIndex++;
		$(this).css({'z-index':zIndex});
		var inputZ = $('.input').css('z-index');
		inputZ++;
		$('.input').css({'z-index':inputZ});
		console.log(zIndex);
		console.log(inputZ);
	});*/
	$('.input').draggable({containment:border});
});
