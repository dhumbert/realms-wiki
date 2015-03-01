var $entry_markdown_header = $("#entry-markdown-header");
var $entry_preview_header = $("#entry-preview-header");
var $entry_markdown = $(".entry-markdown");
var $entry_preview = $(".entry-preview");
var $page_name = $("#page-name");
var $page_message = $("#page-message");

// Tabs
$entry_markdown_header.click(function(){
  $entry_markdown.addClass('active');
  $entry_preview.removeClass('active');
});

$entry_preview_header.click(function(){
  $entry_preview.addClass('active');
  $entry_markdown.removeClass('active');
});


function toggle_entry_preview() {
    $entry_preview.toggle();

    if ($entry_preview.is(':hidden')) {
        $entry_markdown.css('width', '100%');
    } else {
        $entry_markdown.css('width', '50%');
    }
}

$(function(){
  $("#delete-page-btn").click(function() {
    bootbox.alert("Not Done Yet! Sorry");
  });

  $("#preview-btn").click(function() {
      toggle_entry_preview();
  });
});

var aced = new Aced({
  editor: $('#entry-markdown-content').find('.editor').attr('id'),
  renderer: function(md) { return MDR.convert(md) },
  info: Commit.info,
  submit: function(content) {
    var data = {
      name: $page_name.val(),
      message: $page_message.val(),
      content: content
    };

    var path = Config['RELATIVE_PATH'] + '/' + data['name'];
    var type = (Commit.info['sha']) ? "PUT" : "POST";

    $.ajax({
      type: type,
      url: path,
      data: data,
      dataType: 'json'
    }).always(function(data, status, error) {
      var res = data['responseJSON'];
      if (res && res['error']) {
        $page_name.addClass('parsley-error');
        bootbox.alert("<h3>" + res['message'] + "</h3>");
      } else {
        location.href = path;
      }
    });
  }
});
