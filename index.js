const fetch = require('node-fetch');
const cheerio = require('cheerio');

const SUB_OF_THE_DAY_URL = 'http://www.subway.com/nb-no/menunutrition/menu/sub-of-the-day';

async function getSubOfTheDay() {
    const response = await fetch(SUB_OF_THE_DAY_URL);
    const html = await response.text();
    const $ = cheerio.load(html);

    const $menuItems = $('#main_0_centercolumn_0_panel_MenuCatControls > .menu-category-type > .menu-category-item')
    const $menuItemOfTheDay = $($menuItems[(new Date).getDay() - 1]);
    const $img = $menuItemOfTheDay.find('img');
    return $img.attr('alt');
}

module.exports = getSubOfTheDay;

getSubOfTheDay()
.then(console.log)
