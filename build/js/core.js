$(function() {
	var width = $('.content').width(),
		photoInfo = $('.photo-info');

	$('.photo-info').css("left", width);

	$.getJSON('http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=?', function(data) {
		var list = $('.items'),
			items = data.items;
		$('.item').removeClass('hidden');
		$.each(items, function(i, item) {
			var itemHTML = $('.item').first().clone();

			var authorlink = item.link.substring(0, item.link.length - 12);
			authorlink = authorlink.replace('/photos/', '/people/')
			var published = new Date(item.published);

			itemHTML.find('h3 a').text(item.title).attr('href', '#' + i)
			.click(function() {
				openDetails(item, authorlink, published);
			});
			itemHTML.find('time').text(published.toUTCString());
			itemHTML.find('a.author').attr('href', authorlink).text(item.author);
			itemHTML.find('.image').attr('href', '#' + i).click(function() {
				openDetails(item, authorlink, published);
			});
			itemHTML.find('img').attr('src', item.media.m);
			itemHTML.find('.view').attr('href', item.link);
			list.append(itemHTML);
		});
		$('.item').first().remove();
	});

	var openDetails = function(item, authorlink, published) {
		photoInfo.find('h2 a').text(item.title).attr('href', item.link);
		photoInfo.find('.author').text(item.author).attr('href', authorlink);
		photoInfo.find('time').text(published.toUTCString());
		photoInfo.find('.image').attr('href', item.link);
		photoInfo.find('img').attr('src', item.media.m);
		photoInfo.find('.info div').html('').prepend(item.description);

		var tags = item.tags.split(' ');
		$.each(tags, function(key, value) {
			photoInfo.find('.tags').append('<li><a href="http://www.flickr.com/photos/tags/' + value + '">' + value + '</a></li>');
		});

		$('.items').animate({left: "-" + width, right: width}, 400, function() {
			$('.items').hide();
		});
		photoInfo.animate({left: "0"}, 400, function() {
			$('.content').addClass('opened');
		});
	};

	$('.photo-info .btn-back').click(function() {
		$('.items').show().animate({left: "0", right: "0"});
		$('.photo-info').animate({left: width});
		$('.content').removeClass('opened');
	});

	$(window).resize(function() {
		width = $('.content').width();
		if (!$('.content').hasClass('opened')) {
			photoInfo.css("left", width);
		}

	});

});