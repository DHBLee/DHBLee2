
if (!localStorage.getItem('counter')) {
    localStorage.setItem('counter', 0);
}

function count() {
    let counter = localStorage.getItem('counter');
    counter++;
    document.querySelector('#bilang').innerHTML = counter;
    localStorage.setItem('counter', counter);

    if (counter % 10 === 0) {
        alert(`Count is now ${counter}`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#bilang').innerHTML = localStorage.getItem('counter'); 
    document.querySelector('#count').onclick = count;
 
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').onsubmit = function() {
       const name =  document.querySelector('#name').value;
       alert(`Hello, ${name}`);
    };
});

//
//  document.addEventListener('DOMContentLoaded', () => {
//        document.querySelectorAll('button').forEach(button => {
//            button.onclick = function (){
//                document.querySelector('#hello').style.color = button.dataset.color;
//            }
//        });
//    });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('select').onchange = function() {
       document.querySelector('#hello').style.color = this.value;
    };
});

// for tasks.html
document.addEventListener('DOMContentLoaded', function() {

    // By default, submit button is disabled
    document.querySelector('#submit').disabled = true;

    document.querySelector('#task').onkeyup = () => {
        if (document.querySelector('#task').value.length > 0) {
            document.querySelector('#submit').disabled = false;
        } else {
            document.querySelector('#submit').disabled = true;
        }
        
    }
    document.querySelector('form').onsubmit = () => {
        const task = document.querySelector('#task').value;
        
        const li = document.createElement('li');
        li.innerHTML = task;

        document.querySelector('#tasks').append(li);

        document.querySelector('#task').value = '';

        document.querySelector('#submit').disabled = true;

        // Stop form from submitting
        return false;
    }
})



