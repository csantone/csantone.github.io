// Hi!  I'm a comment, because I start on a line with two slashes

// The "$(function() { ... })" nonsense tells jQuery to not do this
// until it the page is already loaded
$(function() {
  // fadetime is in milliseconds (so 1/2 second fade in/out)
  var fadetime = 500;

  var out = false;
  var hidePortfolio = function(then) {
    var after = function() {
      $('.panel-wrapper').hide();
      if (typeof then === 'function') { then(); }
    };
    out = false;
    $('#portfolio').removeClass('on');
    $('.panel-wrapper').animate({ top: '-100%', }, 1000, after);
  };
  var showPortfolio = function(then) {
    if (typeof then !== 'function') { then = function() {}; }
    out = true;
    $('#portfolio').addClass('on');
    $('.panel-wrapper').animate({ top: '0%', }, 1000, then);
    $('.panel-wrapper').show();
  };
  $('#portfolio').click(function(e) {
    if (!out) { showPortfolio(); } else { hidePortfolio(); }
    e.preventDefault();
    return false;
  });

  // This is the little link at the bottom of portfolio-frame
  $('#hide-portfolio').click(hidePortfolio);

  var makeFader = function(link, elt) {
    var sticky = false;
    link.click(function(e) {
      sticky = !sticky;
      var hide = out ? hidePortfolio : function(f) { f(); };
      var fade = sticky ? function() { elt.fadeIn(fadetime); }
                        : function() {
        elt.fadeOut(fadetime);
        link.removeClass('on');
      }
      if (sticky) { link.addClass('on'); }
      out = false;
      hide(fade);
      e.preventDefault();
      return false;
    });
  };

  makeFader($('#about'), $('#about-blurb'));
  makeFader($('#about'), $('#about-blurb-bubble'));
  makeFader($('#links'), $('#links-blurb'));

  var container = $('#portfolio-container');
  var displays = {};
  var current = $('#urban-nurture-thumbnail');

  var getDisplay = function(thumb) {
    var maybeDisplay = displays[thumb.attr('id')];
    if (maybeDisplay) { return maybeDisplay; }
    else {
      var display = $('<iframe></iframe>');
      display.attr('src', thumb.attr("data-url"));
      // TODO(joe): Custom scrollbars don't seem to work in IE9 IFrames.
      var scrolling = $.browser.msie ? 'auto' : 'no';
      display.attr('scrolling', scrolling);
      display.css({'display': 'none'});
      display.addClass('portfolio-frame');
      container.prepend(display);
      displays[thumb.attr('id')] = display;
      return display;
    }
  };

  var makeThumbPreview = function(thumb) {
    thumb.click(function() {
      current.removeClass('sticky');
      thumb.addClass('sticky');
      console.log(thumb);
      getDisplay(current).css({display: 'none'});
      current = thumb;
//      getDisplay(thumb).css({display: 'block'});
      getDisplay(thumb).fadeIn(500);
    });
  };

  makeThumbPreview($('#urban-nurture-thumbnail'));
  makeThumbPreview($('#rimosa-thumbnail'));
  makeThumbPreview($('#picturing-space-thumbnail'));
  makeThumbPreview($('#dinner-thumbnail'));
  makeThumbPreview($('#candleholders-thumbnail'));
  makeThumbPreview($('#renderings-thumbnail'));
  makeThumbPreview($('#mask-thumbnail'));
  makeThumbPreview($('#apartment-thumbnail'));
  makeThumbPreview($('#master-drawing-thumbnail'));
  makeThumbPreview($('#exhibit-thumbnail'));
  makeThumbPreview($('#grasshopper-thumbnail'));
  makeThumbPreview($('#anthro-thumbnail'));
  makeThumbPreview($('#workshops-thumbnail'));

  current.addClass('sticky');
  getDisplay(current).css({display: 'block'});

});

