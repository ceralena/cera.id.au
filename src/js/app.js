import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';

import $ from 'jquery';

$(document).ready(() => {
  addStyling();
});

// hugo's syntax for adding attributes to elements generated from markdown is unfortunately quite awkward.
//
// This is a little workaround.
function addStyling() {
  // add the bootstrap blockquote class to all blockquote elements
  $('blockquote').addClass('blockquote');
}
