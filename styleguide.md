## Browser support

* Chrome > 60"
* Edge > 15"

## JS hooks

* CSS classed used for JS hooks (i.e. not being used by CSS to style anything) should be prefixed with `js-`. 

## Opinionated SCSS guides

Basically, follow best practices...

* Never use `!important` (unless you really, really must...)
* Never use ID's for styling. This avoids specificity issues (although, some top level elements do - for historical reasons)
* Use lower-case for classnames, with words separated by a hyphen. (e.g. `.btn-dropdown`)
* Generally, try and use an object orientated approach. Don't name your subclasses with a prefix of the class you're extending. 
* Generally use semantic, descriptive classnames that hint at their function.
* Avoid qualifying class names with type selectors e.g. `div.myclass` (Unless you want the class to be bound to a specific DOM element).
* Keep your selectors short! And try to keep your selectors shallow. 

## Finally...

This is a bespoke web app designed for very specific uses and, as such, it would be limiting to try to 
squeeze it into a generic framework. The smallest acceptable running size is 1200px. The UI has been optimised 
to run on handheld tablets, as well as on super-wide displays. 

