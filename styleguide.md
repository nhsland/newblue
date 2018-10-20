## Welcome

* OpenEyes (OE) UI v3.n. 
* SCSS (complied using Gulp)

## Browser support

* Targeting: Chrome > 60 and Edge > 15


## Commenting

* Double-slash (Sass) comments will be removed from all CSS.
* Slash-star (CSS) comments will not be removed in the expand CSS.
* Wrap comments after 84-ish chars.

## JS hooks

* If a CSS class is being added for JS only purposes (and not being used by CSS to style)
  prefix it with 'js-'. 
  
## CSS 'oe-' prefix

* Always use a prefix for main area classes. e.g.'oe-' or 'oes-' This will help avoid naming conflicts and allows
for coupling if required.
 
  
## Icons

* Event icons must be 76px x 76px, and must be named correctly. 
* Eyedraw icon (doodles) must be 32px x 32px, and must be named correctly.
* Gulp creates the PNG sprite sheets and scss positioning.
* SVGs are used in 2 ways, as a Sprite Sheet and as background-images in css

## SCSS Conventions

Conventions allow for code readability and maintainability. Try to follow
the following conventions if you want to make changes to the stylesheet.

* When in doubt, follow the conventions you see used in the foundation files.
* Tabs for indentation.
* Never use inline styles.
* Never use `!important` (unless you really must...)
* Never use ID's for styling. This avoids specificity issues (see also 'JS hooks' above)
* Separate rules with new lines, eg:

        .example {
            margin: 1rem;
            padding: 1rem;
        }

* Lower-case classnames, words separated by a hyphen. (eg `.button-dropdown`).
* Use an object orientated approach. Don't name your subclasses with
  a prefix of the class you're extending. For example, if you're adding a secondary
  button style, the class list will be: 'button secondary' and NOT 'button button-secondary'.
* Generally use semantic and descriptive classnames that describe the content.
* Use rgb() for colors where possible or 3 character hexadecimal notation (eg `#000`).
* Avoid qualifying class names with type selectors (eg, don't do this: `div.myclass`).
* Keep your selectors short! Try to keep your selectors shallow. 
* Always use double-quotes, (eg: `font-family: "Helvetica Neue"`).
* Always quote attribute values in attribute selectors, (eg: [type="submit"])

## Variables

* To avoid conlicts, we have to namespace our variables, thus you must prefix 
  the variable names with 'oe-'.

## Finally...

This is a bespoke web app for very specific uses and, as such, it would be limiting to try to 
squeeze it into a generic framework. The smallest acceptable running size is 1280px (default
monitor size) and we are actually only targeting 2 screen sizes and are optimizing for 
these: 1280px (default) and 1920px (pro-users). We are not concerned with mobile devices, 
as these will be served by a custom app in the future, but we would like it to work well on 
iPads and Surface Pro (touch devices), therefore all interaction is set up for touch with extra
mouse / trackpad functionality for those that have this.

