// Find all section heading elements
var headings;
if(document.querySelectorAll)
    headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
else   // Otherwise, find the headings the hard way
    headings = findHeadings(document.getElementsByClassName('open-book'), []);

// Recursively traverse the document body looking for headings
function findHeadings(root, sects){
    for(var c = root.firstChild; c != null; c = c.nextSibling) {
        if (c.nodeType !== 1) continue;
        if (c.tagName.length == 2 && c.tagName.charAt(0) == "H")
            sects.push(c);
        else
            findHeadings(c, sects);
    }
    return sects;
}

// Initialize an array that keeps track of section numbers
var sectionNumbers = [0,0,0,0,0,0];

// Now loop through the section header elements we found
for(var h = 0; h < headings.length; h++){
    var heading = headings[h];


    // Figure out what level heading it is
    var level = parseInt(heading.tagName.charAt(1));
    if (isNaN(level) || level < 1 || level > 6) continue;

    // Increment the section number for this heading level
    // and reset all lower heading level numbers to zero
    sectionNumbers[level-1]++;
    for(var i = level; i < 6; i++) sectionNumbers[i] = 0;

    // Now combine section numbers for all heading levels to produce a section number like 2.3.1
    var sectionNumber = sectionNumbers.slice(0,level).join("_")
    heading.setAttribute("id", "toc"+sectionNumber);
}


// http://tscanlin.github.io/tocbot/
tocbot.init({
    // Where to render the table of contents.
    tocSelector: '.js-toc',
    // Where to grab the headings to build the table of contents.
    contentSelector: '.js-toc-content',
    // Which headings to grab inside of the contentSelector element.
    headingSelector: 'h1, h2, h3, h4, h5, h6',
    // Headings that match the ignoreSelector will be skipped.
    ignoreSelector: '.js-toc-ignore',
    // Main class to add to links.
    linkClass: 'toc-link',
    // Extra classes to add to links.
    extraLinkClasses: '',
    // Class to add to active links,
    // the link corresponding to the top most heading on the page.
    activeLinkClass: 'is-active-link',
    // Main class to add to lists.
    listClass: 'toc-list',
    // Extra classes to add to lists.
    extraListClasses: '',
    // Class that gets added when a list should be collapsed.
    isCollapsedClass: 'is-collapsed',
    // Class that gets added when a list should be able
    // to be collapsed but isn't necessarily collpased.
    collapsibleClass: 'is-collapsible',
    // Class to add to list items.
    listItemClass: 'toc-list-item',
    // How many heading levels should not be collpased.
    // For example, number 6 will show everything since
    // there are only 6 heading levels and number 0 will collpase them all.
    // The sections that are hidden will open
    // and close as you scroll to headings within them.
    collapseDepth: 6,
    // Smooth scrolling enabled.
    scrollSmooth: true,
    // Smooth scroll duration.
    scrollSmoothDuration: 100,
    // Callback for scroll end.
    scrollEndCallback: function (e) { },
    // Headings offset between the headings and the top of the document (this is meant for minor adjustments).
    headingsOffset: -80,
    // Timeout between events firing to make sure it's
    // not too rapid (for performance reasons).
    throttleTimeout: 50,
    // Element to add the positionFixedClass to.
    positionFixedSelector: null,
    // Fixed position class to add to make sidebar fixed after scrolling
    // down past the fixedSidebarOffset.
    positionFixedClass: 'is-position-fixed',
    // fixedSidebarOffset can be any number but by default is set
    // to auto which sets the fixedSidebarOffset to the sidebar
    // element's offsetTop from the top of the document on init.
    fixedSidebarOffset: 'auto',
    // includeHtml can be set to true to include the HTML markup from the
    // heading node instead of just including the textContent.
    includeHtml: false,
    // onclick function to apply to all links in toc. will be called with
    // the event as the first parameter, and this can be used to stop,
    // propagation, prevent default or perform action
    onClick: false,
    // orderedList can be set to false to generate unordered lists (ul)
    // instead of ordered lists (ol)
    orderedList: false
});

