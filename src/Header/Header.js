import viewHeadlineIcon from './images/view-headline.svg'

function createHeader() {
    const header = document.createElement('div');
    header.classList.add('header-container')

    const dashIcon = new Image();
    dashIcon.src = viewHeadlineIcon;
    dashIcon.classList.add('header-icon')

    header.appendChild(dashIcon);


    return header;
}

export default createHeader;