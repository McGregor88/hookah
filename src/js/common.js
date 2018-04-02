$(window).on('load', function() {
	$('.preloader').delay(500).fadeOut('slow');
});

$(document).ready(function() {

  // Sandwich
  $('.nav-btn').click(function(){
    $('.header-menu').toggleClass('show');
    $('.nav-btn').toggleClass('toggle');
  });

  // Fancybox
  $.fancybox.defaults.animationEffect = "fade";

  $("[data-fancybox]").fancybox({
    autoFocus: false
  });

  // Mask
  $('input[type=tel]').mask('+7 (999) 999-9999');

  // Products
  $('.products').on('mouseover', '.product-layout', function(e){
    $(this).addClass('product--focused');
  });

  $('.products').on('mouseout', '.product-layout', function(e){
    $(this).removeClass('product--focused');
  });

  $('.products').on('click', '.product-layout button', function(e){
    e.preventDefault();
    // Delete on PRODUCTION !!!
    $('.alert.alert-success').addClass('show');
  });

  // Quantity input
  if ($(".quantity").length) {
    $('<div class="quantity-nav"><div class="quantity-button quantity-up"><span class="icon icon-up relative opacity-transition"></span></div><div class="quantity-button quantity-down"><span class="icon icon-down relative opacity-transition"></span></div></div>').insertAfter('.quantity .form-control');
    $('.quantity').each(function() {
      var spinner = $(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');
  
      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });
  
      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });
  
    });
    $(".quantity .form-control").on("keypress", function(e) {
      var keycode = e.charCode || e.keyCode;
      if (keycode == 46 || this.value.length==3) {
        return false;
      }
    });
    $(".quantity .form-control").keydown(function(e) {
      // Allow: backspace, delete, tab, escape, enter and .
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    });
  }

  // Select2
  if ($('.select').length) {
    $(".select").each(function(index, item){
      var ph = $(this).data('placeholder') || "";

      $(item).select2({
        width: '100%',
        placeholder: ph
      });
    });
  }

  // Password inputs
  $(".js-lock-field").each(function(index, item){
    var input = $(item).find("input");
    var lock_btn = $(item).find(".form-field__icon");
    var icon = $(item).find(".icon-lock");

    lock_btn.on('click', function() {
      if (icon.hasClass('unlocked')) {
        icon.removeClass('unlocked');
        input.attr('type','password');
      } else {
        icon.addClass('unlocked');
        input.attr('type','text');
      }
    });
  });

  // Ajax callback
  $('body').on('submit', '#callback_form', function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mail.php"
    }).done(function ( msg ) {
      $('#callback_form').trigger('reset');
      $.fancybox.close();
      $.fancybox.open({
        src: '#success',
        type: 'inline'
      });
      setTimeout(function() {
        $.fancybox.close();
      }, 5000);
    });
  });

  // Ajax quick-order
  $('body').on('submit', '#quick-order_form', function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mail.php"
    }).done(function ( msg ) {
      $('#quick-order_form').trigger('reset');
      $.fancybox.close();
      $.fancybox.open({
        src: '#success_quick-order',
        type: 'inline'
      });
      setTimeout(function() {
        $.fancybox.close();
      }, 5000);
    });
  });

  // Ajax reviews
  $('body').on('submit', '#reviews_form', function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mail.php"
    }).done(function ( msg ) {
      $('#reviews_form').trigger('reset');
      $.fancybox.close();
      $.fancybox.open({
        src: '#success_review',
        type: 'inline'
      });
      setTimeout(function() {
        $.fancybox.close();
      }, 5000);
    });
  });

  // Ajax ask question
  $('body').on('submit', '#ask-question_form', function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mail.php"
    }).done(function ( msg ) {
      $('#ask-question_form').trigger('reset');
      $.fancybox.close();
      $.fancybox.open({
        src: '#success_ask-question',
        type: 'inline'
      });
      setTimeout(function() {
        $.fancybox.close();
      }, 5000);
    });
  });

  // Ajax forgotten
  $('body').on('submit', '#forgotten_form', function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mail.php"
    }).done(function ( msg ) {
      $('#forgotten_form').trigger('reset');
      $.fancybox.close();
      $.fancybox.open({
        src: '#success_forgotten',
        type: 'inline'
      });
      setTimeout(function() {
        $.fancybox.close();
      }, 5000);
    });
  });

});