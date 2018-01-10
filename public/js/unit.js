function collapseCard(element) {
  $(element).addClass("collapsed");
  $(element)
    .next()
    .children()
    .last()
    .collapse("hide");
}

$(document).ready(() => {
  $(".weapon-pop").popover();

  $(".popover-dismiss").popover();

  $("#medals img").hover(
    function() {
      let index = $.inArray($(this).parent()[0], $("#medals").children());
      if (index > 3) {
        $("#medals")
          .children()
          .eq(index - 1)
          .children()
          .addClass("firstAdj");
        $("#medals")
          .children()
          .eq(index - 2)
          .children()
          .addClass("secondAdj");
        $("#medals")
          .children()
          .eq(index - 3)
          .children()
          .addClass("thirdAdj");
      }
      $("#medals")
        .children()
        .eq(index + 1)
        .children()
        .addClass("firstAdj");
      $("#medals")
        .children()
        .eq(index + 2)
        .children()
        .addClass("secondAdj");
      $("#medals")
        .children()
        .eq(index + 3)
        .children()
        .addClass("thirdAdj");
    },
    function() {
      let index = $.inArray($(this).parent()[0], $("#medals").children());
      if (index > 3) {
        $("#medals")
          .children()
          .eq(index - 1)
          .children()
          .removeClass("firstAdj");
        $("#medals")
          .children()
          .eq(index - 2)
          .children()
          .removeClass("secondAdj");
        $("#medals")
          .children()
          .eq(index - 3)
          .children()
          .removeClass("thirdAdj");
      }
      $("#medals")
        .children()
        .eq(index + 1)
        .children()
        .removeClass("firstAdj");
      $("#medals")
        .children()
        .eq(index + 2)
        .children()
        .removeClass("secondAdj");
      $("#medals")
        .children()
        .eq(index + 3)
        .children()
        .removeClass("thirdAdj");
    }
  );

  $("#operations-cards a").blur(function() {
    setTimeout(collapseCard, 300, this);
  });
});
