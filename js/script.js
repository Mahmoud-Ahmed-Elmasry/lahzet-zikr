function count(card, limit) {
    let numElement = card.querySelector('.num');
    let current = parseInt(numElement.innerText);
    if (current < limit) {
        current++;
        numElement.innerText = current;
        if (current === limit) {
            card.classList.add('finished');
        }
    }
}

function reset(event, icon) {
    event.stopPropagation();
    let card = icon.closest('.counter-card');
    let numElement = card.querySelector('.num');
    numElement.innerText = 0;
    card.classList.remove('finished');
    card.classList.add('reset-flash');
    setTimeout(() => {
        card.classList.remove('reset-flash');
    }, 250);
}