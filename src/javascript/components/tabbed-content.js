// Import jQuery
import $ from '../globals';

class tabbedContent {
    constructor() {
        // Set element vars 
        this.$content = $('.content');
        this.$sidebarItem = $('.sidebar__item');
        this.$contentItem = $('.content__item');

        // Set class vars
        this.sidebarItemActiveClass = 'sidebar__item--active';
        this.contentItemActiveClass = 'content__item--active';

        // Set int vars
        this.breakpoint = 700;

        // Run event listeners
        this.bindEvents();
    }

    /*
        Match the correct content item based on clicked
        button, update UI and position content item
    */
    processInteraction(e) {
        let item = $(e.target);
        let itemId = item.data('button');
        let matchedContent = $('[data-content="'+ itemId +'"]');

        // Update UI state
        this.$sidebarItem.removeClass(this.sidebarItemActiveClass);
        this.$contentItem.removeClass(this.contentItemActiveClass);
        this.$sidebarItem.attr('aria-selected', 'false');
        this.$contentItem.attr('aria-hidden', 'true');

        // Update active button
        item.addClass(this.sidebarItemActiveClass);
        item.attr('aria-selected', 'true');

        // Update active content
        matchedContent.addClass(this.contentItemActiveClass);
        matchedContent.attr('aria-hidden', 'false');

        // Position content item
        this.positionContent(item, matchedContent);
    }

    /*
        Update content position on load/resize 
    */
    processWindowEvent() {
        let item = $('.sidebar__item--active');
        let itemId = item.data('button');
        let matchedContent = $('[data-content="'+ itemId +'"]');

        // Position content item
        this.positionContent(item, matchedContent);
    }

    /*
        Move content item in DOM based on device
        width
    */
    positionContent(item, matchedContent) {
        if ($(window).width() < this.breakpoint) {
            matchedContent.insertAfter(item);
        } else {
            this.$contentItem.appendTo(this.$content);
        }
    }

    /*
        Run appropriate function on event change
    */
    bindEvents() {
        $(window).on('load resize', () => this.processWindowEvent());
        this.$sidebarItem.on('click', e => this.processInteraction(e));
    }
}

new tabbedContent();
