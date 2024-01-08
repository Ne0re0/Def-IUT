
const search = document.querySelector('.input-group input');
const table_rows = document.querySelectorAll('tbody tr');
const table_headings = document.querySelectorAll('thead th');


table_headings.forEach((head, i) => {
    console.log(i);
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;
        if (i !== 2 ){
            sortTable(i, sort_asc);
        } else {
            sortDifficulty(i,sort_asc)
        }
        
    }
})


function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

function sortDifficulty(column, sort_asc) {
    const difficultyOrder = {
        'débutant': 0,
        'facile': 1,
        'moyen': 2,
        'difficile': 3,
        'très difficile': 4
    };

    let tableRows = Array.from(document.querySelectorAll('tbody tr'));

    tableRows.sort((a, b) => {
        let firstRowText = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            secondRowText = b.querySelectorAll('td')[column].textContent.toLowerCase();

        let firstRowValue = difficultyOrder[firstRowText],
            secondRowValue = difficultyOrder[secondRowText];

        if (firstRowValue === undefined) firstRowValue = Infinity;
        if (secondRowValue === undefined) secondRowValue = Infinity;

        return sort_asc ? (firstRowValue - secondRowValue) : (secondRowValue - firstRowValue);
    }).forEach(sortedRow => document.querySelector('tbody').appendChild(sortedRow));
}

// Search engine
search.addEventListener('input', searchTable);

function searchTable() {
    console.log("Test")
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}