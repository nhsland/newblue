# OE CSS (newblue)

The "newblue" CSS repository allows for the development of OpenEyes UI(X) independently of other OpenEyes development work. This is achieved through iDG (a frontend UX prototyping site). ("newblue" started as a moniker for the major v3 UI development work and it just stuck.)

## Concept

* Create a clean, elegant UI(X) that is easy to use
* Minimise visual clutter without losing data clarity
* Present data in a consistent and efficient way to better assist clinical tasks.
* Reduce vertical scrolling as much as possible (clinical requirement)

## Please do not use inline styles for styling

Why not? Well, here are a few reasons why not:

1. Themes (any inline DOM styling could prove problematic)
2. Responsive layout (newblue UI responsiveness is highly bespoke)
3. UI consistency (Ophthalmologist are very, very visually precise)
4. Unnecessary (Somewhere in the OE UI is the UI solution all ready done)
5. Flagging issues with the CSS up to newblue helps improve the overall UI across the board

(To be clear, we are not talking about JS positional stuff, but this does include z stacking which does need considering globally)

## Theme naming

Originally conceived as "Pro" & "Classic" these are now respectively "Dark" & "Light". You may find usage of "pro-theme" in some of the older sass files.

## Iconography

* Event icons must be 76px x 76px, and named correctly. 
* Eyedraw icon (doodles) must be 32px x 32px, and named correctly.
* SVGs are used in a few different flavours, see source for examples.

## Styleguide

Please read the styleguide.md
