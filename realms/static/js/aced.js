function Aced(settings) {
  var id,
    options,
    editor,
    element,
    preview,
    previewWrapper,
    loadedThemes = {};

  settings = settings || {};

  options = {
    sanitize: true,
    preview: null,
    editor: null,
    theme: 'realms',
    themePath: '/static/js',
    mode: 'markdown',
    syncPreview: false,
    keyMaster: false,
    submit: function(data){ alert(data); },
    submitBtn: null,
    renderer: null
  };

  function toJquery(o) {
    return (typeof o == 'string') ? $("#" + o) : $(o);
  }

  function render(content) {
    return (options.renderer) ? options.renderer(content) : content;
  }

  function bindKeyboard() {
    // CMD+s TO SAVE DOC
    key('command+s, ctrl+s', function (e) {
      submit();
      e.preventDefault();
    });

    var saveCommand = {
      name: "save",
      bindKey: {
        mac: "Command-S",
        win: "Ctrl-S"
      },
      exec: function () {
        submit();
      }
    };
    editor.commands.addCommand(saveCommand);
  }

  function val(val) {
    // Alias func
    if (val) {
      editor.getSession().setValue(val);
    }
    return editor.getSession().getValue();
  }

  function submit() {
    options.submit(val());
  }

  function renderPreview() {
    if (!preview) {
      return;
    }
    preview.html(render(val()));
    $('pre code', preview).each(function(i, e) {
      hljs.highlightBlock(e)
    });
  }

  function getScrollHeight($prevFrame) {
    // Different browsers attach the scrollHeight of a document to different
    // elements, so handle that here.
    if ($prevFrame[0].scrollHeight !== undefined) {
      return $prevFrame[0].scrollHeight;
    } else if ($prevFrame.find('html')[0].scrollHeight !== undefined &&
      $prevFrame.find('html')[0].scrollHeight !== 0) {
      return $prevFrame.find('html')[0].scrollHeight;
    } else {
      return $prevFrame.find('body')[0].scrollHeight;
    }
  }

  function getPreviewWrapper(obj) {
    // Attempts to get the wrapper for preview based on overflow prop
    if (!obj) {
      return;
    }
    if (obj.css('overflow') == 'auto' || obj.css('overflow') == 'scroll') {
      return obj;
    } else {
      return getPreviewWrapper(obj.parent());
    }
  }

  function syncPreview() {

    var editorScrollRange = (editor.getSession().getLength());

    var previewScrollRange = (getScrollHeight(preview));

    // Find how far along the editor is (0 means it is scrolled to the top, 1
    // means it is at the bottom).
    var scrollFactor = editor.getFirstVisibleRow() / editorScrollRange;

    // Set the scroll position of the preview pane to match.  jQuery will
    // gracefully handle out-of-bounds values.

    previewWrapper.scrollTop(scrollFactor * previewScrollRange);
  }

  function asyncLoad(filename, cb) {
    (function (d, t) {

      var leScript = d.createElement(t)
        , scripts = d.getElementsByTagName(t)[0];

      leScript.async = 1;
      leScript.src = filename;
      scripts.parentNode.insertBefore(leScript, scripts);

      leScript.onload = function () {
        cb && cb();
      }

    }(document, 'script'));
  }

  function setTheme(theme) {
    var cb = function(theme) {
      editor.setTheme('ace/theme/'+theme);
    };

    if (loadedThemes[theme]) {
      cb(theme);
    } else {
      asyncLoad(options.themePath + "/theme-" + theme + ".js", function () {
        cb(theme);
        loadedThemes[theme] = true;
      });
    }
  }

  function initSyncPreview() {
    if (!preview || !options.syncPreview) return;
    previewWrapper = getPreviewWrapper(preview);
    window.onload = function () {
      /**
       * Bind synchronization of preview div to editor scroll and change
       * of editor cursor position.
       */
      editor.session.on('changeScrollTop', syncPreview);
      editor.session.selection.on('changeCursor', syncPreview);
    };
  }

  function initProps() {
    // Id of editor
    if (typeof settings == 'string') {
      settings = { editor: settings };
    }

    if (settings['preview'] && !settings.hasOwnProperty('syncPreview')) {
      settings['syncPreview'] = true;
    }

    $.extend(options, settings);

    if (options.editor) {
      element = toJquery(options.editor);
    }

    $.each(options, function(k, v){
      if (element.data(k.toLowerCase())) {
        options[k] = element.data(k.toLowerCase());
      }
    });

    if (options.submitBtn) {
      var submitBtn = toJquery(options.submitBtn);
      submitBtn.click(function(){
        submit();
      });
    }

    if (options.preview) {
      preview = toJquery(options.preview);

      // Enable sync unless set otherwise
      if (!settings.hasOwnProperty('syncPreview')) {
        options['syncPreview'] = true;
      }
    }

    if (!element.attr('id')) {
      // No id, make one!
      id = Math.random().toString(36).substring(7);
      element.attr('id', id);
    } else {
      id = element.attr('id')
    }
  }

  function initEditor() {
    editor = ace.edit(id);
    setTheme(options.theme);
    editor.getSession().setMode('ace/mode/' + options.mode);
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setTabSize(4);
    editor.getSession().setUseSoftTabs(true);
    editor.setShowPrintMargin(false);
    editor.renderer.setShowInvisibles(false);
    editor.renderer.setShowGutter(false);

    if (options.keyMaster) {
      bindKeyboard();
    }

    if (preview) {
      editor.getSession().on('change', function (e) {
        renderPreview();
      });
      renderPreview();
    }

    $(this).trigger('ready');
  }

  function init() {
    initProps();
    initEditor();
    initSyncPreview();
  }

  init();

  return {
    editor: editor,
    submit: submit,
    val: val
  };
}