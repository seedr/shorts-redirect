// ==UserScript==
// @name        Redirect from shorts page
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 26/6/2022, 1:22:39 AM
// ==/UserScript==

let oldHref = document.location.href;

let redirectShorts = () =>
{
    let currentUrl = window.location.href;

    if(currentUrl.includes('shorts/'))
    {
        let newUrl = currentUrl.replace('shorts/', 'watch?v=');

        window.location.replace(newUrl);
    }
};

let injectStyle = () =>
{
    const styleData = `a.ytp-next-button { display: none!important; }`;

    let existingStylesheet = document.querySelector('style#custom_user_script');

    if(!existingStylesheet)
    {
        let customStyle = document.createElement('style');
        
        customStyle.setAttribute('id', 'custom_user_script');
        customStyle.textContent = styleData;

        document.querySelector('head').append(customStyle);
    }
};

window.onload = function()
{
    redirectShorts();

    let bodyList = document.querySelector('body')

    let observer = new MutationObserver((mutations) =>
    {
        mutations.forEach(() => {
            if(oldHref != document.location.href)
            {
                oldHref = document.location.href;

                redirectShorts();
            }
        });
    });

    let config = {
        childList: true,
        subtree: true
    };

    observer.observe(bodyList, config);

    injectStyle();
};
