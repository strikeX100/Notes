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
	$(menu).append(button, mylist);
	$(note).append(title, text, menu);
	$("#notes").append(note);
	var notesBorder = [0, $('header').height(), window.innerWidth - $(note).width() - 20,];
	$(note).draggable({containment:notesBorder, zIndex:2});
	$("input").val("").focus().parent().removeClass('is-dirty');
	$("textarea").val("").parent().removeClass('is-dirty');
	componentHandler.upgradeElements(note.get(0));
  	//componentHandler.upgradeAllRegistered();
}
$(document).ready(function() {
	var k = 0;
	var border = [-window.innerWidth/2+$('.input').width()/2+10, $('header').height(), window.innerWidth/2- $('.input').width()/2-10,];
	$("#PinkiePie").click(function() {
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
	$('#notes').on('click', 'ul li:last-child', function() {
		$(this).closest('.note').remove();
	});
	$('.input').draggable({containment:border});
});
