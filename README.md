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

* intro video for the main page (creativity is combinatorial -> let computers help you combine)
* init page - populate with examples (from a JSON file?)
* click on any one card rotates only it and leaves the rest as they are
* design
* human biases x technologies, 12 archetypes --> plot generator, human needs x brands... etc.
* explanation / video
* fork me on github on the main page or may be to footer for all
* button to go back to main from live
* redirect to 404 if table id not found
* BUG: when navigating away from Live component doesn't get unmounted or setInterval stopped, resulting in an error

## DONE

* first prototype
* links to render as links and open in new tabs
* markdown links to open in new tabs
* in Live update doc.title with the spreadsheet name
