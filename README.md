# Creative Collider

[http://tttools.org/creativecollider/](http://tttools.org/creativecollider/). 

Simpler, better brainstorms with combinatorial prompts

## Idea

Creativity is combinatorial + Computers are good at combinatorial tasks = we can prompt numan creativity by using computers to combine inspiration in unpredictable ways

## How it works

1. Create a google spreadsheet and populate it with one more columns of inspiration that you want to mix & match. For example two columns: 'technologies' and 'brands'.
2. Publish this spreadsheet, so that the data can be retrieved by our application (go to file -> publish to the web)
3. Go to [http://tttools.org/creativecollider/](http://tttools.org/creativecollider/), paste the sharing link for your spreadsheet and click start
4. A slideshow of random combinations will start playing

*Pro Tip*:

You can use links to youtube and vimeo and even limited markdown populate your spreadsheet of inputs:

* `https://vimeo.com/226201181` - this will render a video
* `https://i.ytimg.com/vi/6_bMNSSa5V4/maxresdefault.jpg` - this will show a picture
* `![Holo Lens](http://pop.h-cdn.co/assets/15/18/1430494526-topppp.gif "Holo Lens")` - this will show a picture (png, jpg, gif) with a name
* `[telescopic text](http://telescopictext.com)`  -this will show a clickable link (opens in a new tab)

## Requirements

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com/): `npm install -g gulp`

For local development:

* install node, gulp, clone repo
* `npm -i`;
* `gulp`; (this starts dev server as well, but no livereload)
* [http://localhost:8000/creativecollider](http://localhost:8000/creativecollider)

## TODO

* click on any one card rotates only it and leaves the rest as they are
* design
* example data sets
* explanation / video

## DONE

* first prototype
* links to render as links and open in new tabs
* markdown links to open in new tabs
