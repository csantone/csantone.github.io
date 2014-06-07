$(function() {
  // TODO(joe): Custom scrollbars don't seem to work in IE9 IFrames.
  if (!($.browser.msie)) {
    $(".main").mCustomScrollbar({});
  }
  $(".typekit-badge").remove();
});
