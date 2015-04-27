$(function() {

  $('article').each(function() {

    $(this).readingTime({
      readingTimeTarget: $(this).find('.eta'),
      remotePath: $(this).attr('data-file-path'),
      remoteTarget: $(this).attr('data-target-element'),
      prependTimeString: 'Reading time: '
    });

  });

});

function addColumnsForArticleSummary(){
  $( '.article-summary' ).children().addClass("col-xs-12");
};

function underlineCurrentPage() {
  $(".nav a.active").parent().addClass("underline");
};

$( document ).ready(function() {
  addColumnsForArticleSummary();
  underlineCurrentPage();
});
