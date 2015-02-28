define("ace/theme/realms",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-realms";
exports.cssText = "\
.ace-realms .ace_gutter {\
background: #e8e8e8;\
color: #AAA;\
}\
.ace-realms {\
background: #fff;\
color: #000;\
line-height: 1.5em;\
}\
.ace-realms .ace_heading{\
font-weight: bold;\
}\
.ace-realms .ace_markup.ace_1, \
.ace-realms .ace_markup.ace_2, \
.ace-realms .ace_markup.ace_3, \
.ace-realms .ace_markup.ace_4, \
.ace-realms .ace_markup.ace_5, \
.ace-realms .ace_markup.ace_6, \
.ace-realms .ace_markup.ace_list {\
color: #ccc;\
}\
.ace-realms .ace_blockquote {\
color: #999;\
}\
.ace-realms .ace_emphasis {\
font-style: italic;\
}\
.ace-realms .ace_strong {\
font-weight: bold;\
}\
.ace-realms .ace_variable.ace_instance {\
color: teal;\
}\
.ace-realms .ace_constant.ace_language {\
font-weight: bold;\
}\
.ace-realms .ace_cursor {\
color: black;\
}\
.ace-realms .ace_marker-layer .ace_active-line {\
background: rgb(255, 255, 204);\
}\
.ace-realms .ace_marker-layer .ace_selection {\
background: rgb(181, 213, 255);\
}\
.ace-github.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px white;\
border-radius: 2px;\
}\
.ace-github.ace_nobold .ace_line > span {\
font-weight: normal !important;\
}\
.ace-realms .ace_marker-layer .ace_step {\
background: rgb(252, 255, 0);\
}\
.ace-realms .ace_marker-layer .ace_stack {\
background: rgb(164, 229, 101);\
}\
.ace-realms .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
}\
.ace-realms .ace_gutter-active-line {\
background-color : rgba(0, 0, 0, 0.07);\
}\
.ace-realms .ace_marker-layer .ace_selected-word {\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
}\
.ace-realms .ace_print-margin {\
width: 1px;\
background: #e8e8e8;\
}\
.ace-realms .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
}";

    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});