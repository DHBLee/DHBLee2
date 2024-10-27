
document.addEventListener('DOMContentLoaded', function() {

    function switchSection(showClass, activeButton) {
        const sections = ['.home', '.tic-tac-toe', '.calculator'];
        const buttons = ['#home', '#tic_tac_toe', '#calculator'];

        sections.forEach(section => document.querySelector(section).style.display = section === showClass ? 'block' : 'none');
        buttons.forEach(button => document.querySelector(button).style.backgroundColor = button === activeButton ? 'green' : '');
    }

    document.querySelector('#home').addEventListener('click', () => switchSection('.home', '#home'));
    document.querySelector('#tic_tac_toe').addEventListener('click', () => switchSection('.tic-tac-toe', '#tic_tac_toe'));
    document.querySelector('#calculator').addEventListener('click', () => switchSection('.calculator', '#calculator'));

    function appendInput(value) {
        document.querySelector('#input').innerHTML += value;
    }
    
    document.querySelector('#one').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += '1';
    })

    document.querySelector('#two').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += '2';
    })

    document.querySelector('#three').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += '3';
    })

    document.querySelector('#four').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += '4';
    })

    document.querySelector('#five').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += '5';
    })

    document.querySelector('#six').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += '6';
    })

    document.querySelector('#seven').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += '7';
    })

    document.querySelector('#eight').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += '8';
    })

    document.querySelector('#nine').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += '9';
    })

    document.querySelector('#zero').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += '0';
    })

    document.querySelector('#parenthesis').addEventListener('click', function(event) {
        let input = document.querySelector('#input');
        if (input.innerHTML.endsWith('(') || (input.innerHTML.match(/\(/g) || []).length > (input.innerHTML.match(/\)/g) || []).length) {
            input.innerHTML += ')';
        } else {
            input.innerHTML += '(';
        }
    })

    document.querySelector('#percent').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += '%';
    })

    document.querySelector('#decimal').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += '.';
    })

    document.querySelector('#remove').addEventListener('click', function(event) {
        let current_value = document.querySelector('#input').innerHTML;
        document.querySelector('#input').innerHTML = current_value.slice(0, -1);
    })

    document.querySelector('#clear').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML = '';
    })

    document.querySelector('#multiply').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += ' x ';
    })

    document.querySelector('#divide').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += ' / ';
    })

    document.querySelector('#minus').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += ' - ';
    })

    document.querySelector('#plus').addEventListener('click', function(event) {
        document.querySelector('#input').innerHTML += ' + ';
    })

    document.querySelector('#equal').addEventListener('click', function(event) {
        try {
            let value = document.querySelector('#input').innerHTML;
            value = value.replace(/x/g, '*');
            value = value.replace(/%/g, '/100');
            let result = eval(value); 
            document.querySelector('#input').innerHTML = result;
        } catch (error) {
            document.querySelector('#input').innerHTML = 'SyntaxError';
        }
    })


    const cells = document.querySelectorAll('.cell');
    let current_player = 'X';
    let game_over = false;

    function check() {
        const conditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        for (const condition of conditions) {
            const [a,b,c] = condition;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                alert(`${cells[a].textContent} wins!`);
                game_over = true;
                return;
            }
        }
    }
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.textContent === '' && !game_over) {
                cell.textContent = current_player;
                current_player = current_player === 'X' ? 'O' : 'X';
                check();
            }
            const all_filled = Array.from(cells).every(cell => cell.textContent !== '');
            
            if (game_over) {
                let restart =  document.querySelector('#restart')
                restart.style.display = 'block';
                restart.addEventListener('click', () => {
                    restart.style.display = 'none';
                    cells.forEach(cell => cell.textContent = '');
                    game_over = false;
                    switchSection('.tic-tac-toe', '#tic_tac_toe');
                })
            } else if (all_filled) {
                alert("It's a tie")
                let restart =  document.querySelector('#restart')
                restart.style.display = 'block';
                restart.addEventListener('click', () => {
                    cells.forEach(cell => cell.textContent = '');
                    game_over = false;
                    switchSection('.tic-tac-toe', '#tic_tac_toe');
                })
            } 
        })
    })
})






