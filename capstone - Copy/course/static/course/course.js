
document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#course').addEventListener('click', function(event) {
        document.querySelector('#about_course').style.display = 'block';
        document.querySelector('#about_me').style.display = 'none';
        document.querySelector('#about_faq').style.display = 'none';
        document.querySelector('#about_reviews').style.display = 'none';
        document.querySelector('#about_contact').style.display = 'none';
    });
    
    document.querySelector('#dong').addEventListener('click', function(event) {
        document.querySelector('#about_course').style.display = 'none';
        document.querySelector('#about_me').style.display = 'block';
        document.querySelector('#about_faq').style.display = 'none';
        document.querySelector('#about_reviews').style.display = 'none';
        document.querySelector('#about_contact').style.display = 'none';
    });
    
    document.querySelector('#faq').addEventListener('click', function(event) {
        document.querySelector('#about_course').style.display = 'none';
        document.querySelector('#about_me').style.display = 'none';
        document.querySelector('#about_faq').style.display = 'block';
        document.querySelector('#about_reviews').style.display = 'none';
        document.querySelector('#about_contact').style.display = 'none';
    });
    
    document.querySelector('#reviews').addEventListener('click', function(event) {
        document.querySelector('#about_course').style.display = 'none';
        document.querySelector('#about_me').style.display = 'none';
        document.querySelector('#about_faq').style.display = 'none';
        document.querySelector('#about_reviews').style.display = 'block';
        document.querySelector('#about_contact').style.display = 'none';
    });
    
    document.querySelector('#contact').addEventListener('click', function(event) {
        document.querySelector('#about_course').style.display = 'none';
        document.querySelector('#about_me').style.display = 'none';
        document.querySelector('#about_faq').style.display = 'none';
        document.querySelector('#about_reviews').style.display = 'none';
        document.querySelector('#about_contact').style.display = 'block';
    });    
   
})



let demoProgress = 0; 
const demoProgressBar = document.getElementById('demo-progress-bar');

function updateDemoProgress() {
    if (demoProgress < 100) {
        demoProgress += 6.6666666667; 
    } else {
        demoProgress = 0; 
    }
    demoProgressBar.style.width = demoProgress + '%'; 
    demoProgressBar.innerText = Math.round(demoProgress) + '%'; 
}

setInterval(updateDemoProgress, 1000);

document.querySelector('#strumming').addEventListener('click', function(event) {
    document.querySelector('.message-box').style.display = 'none';
    document.querySelector('#home').style.display = 'none';
    document.querySelector('#strumming_view').style.display = 'block';
    document.querySelector('#plucking_view').style.display = 'none';
    document.querySelector('#fingerstyle_view').style.display = 'none';
    document.querySelector('#tips_view').style.display = 'none';
    document.querySelector('#completed_view').style.display = 'none';

    let currentLesson = 'lesson1';
    updateLessonDisplay(currentLesson);

    for (let i = 1; i <= 5; i++) {
        document.querySelector(`#lesson${i}`).addEventListener('click', function() {
            showLesson(`lesson${i}`);
        });
    }

    function attachVideoEndListener(videoId) {
        const videoElement = document.getElementById(videoId);

        if (videoElement) {
            videoElement.onended = function() {
            };
            videoElement.addEventListener('timeupdate', function() {
                const progress = (videoElement.currentTime / videoElement.duration) * 100;
            });
            videoElement.addEventListener('ended', function() {
                onVideoEnd(videoId);
            });
        } else {
            console.error('no video')
        }
    }
    attachVideoEndListener('lesson1_video')

});

document.querySelector('#plucking').addEventListener('click', function(event) {
    document.querySelector('.message-box').style.display = 'none';
    document.querySelector('#home').style.display = 'none';
    document.querySelector('#strumming_view').style.display = 'none';
    document.querySelector('#plucking_view').style.display = 'block';
    document.querySelector('#fingerstyle_view').style.display = 'none';
    document.querySelector('#tips_view').style.display = 'none';
    document.querySelector('#completed_view').style.display = 'none';

    let currentLesson = 'lsesson1';
    const totalLessons = 5;
    updateLessonDisplay(currentLesson);

    for (let i = 1; i <= 5; i++) {
        document.querySelector(`#lsesson${i}`).addEventListener('click', function() {
            showLesson(`lsesson${i}`);
        });
    }

});

document.querySelector('#fingerstyle').addEventListener('click', function(event) {
    document.querySelector('.message-box').style.display = 'none';
    document.querySelector('#home').style.display = 'none';
    document.querySelector('#strumming_view').style.display = 'none';
    document.querySelector('#plucking_view').style.display = 'none';
    document.querySelector('#fingerstyle_view').style.display = 'block';
    document.querySelector('#tips_view').style.display = 'none';
    document.querySelector('#completed_view').style.display = 'none';

    let currentLesson = 'lssesson1';
    updateLessonDisplay(currentLesson);

    for (let i = 1; i <= 5; i++) {
        document.querySelector(`#lssesson${i}`).addEventListener('click', function() {
            showLesson(`lssesson${i}`);
        });
    }


});

document.querySelector('#tips').addEventListener('click', function(event) {

    if (progress < 80) {
        event.preventDefault();
        alert("You need to reach 80% progress to access this section.");
        return;
    }
    document.querySelector('.message-box').style.display = 'none';
    document.querySelector('#home').style.display = 'none';
    document.querySelector('#strumming_view').style.display = 'none';
    document.querySelector('#plucking_view').style.display = 'none';
    document.querySelector('#fingerstyle_view').style.display = 'none';
    document.querySelector('#tips_view').style.display = 'block';
    document.querySelector('#completed_view').style.display = 'none';

    let currentLesson = 'lsssesson1';
    updateLessonDisplay(currentLesson);

    for (let i = 1; i <= 5; i++) {
        document.querySelector(`#lsssesson${i}`).addEventListener('click', function() {
            showLesson(`lsssesson${i}`);
        });
    }

});

document.querySelector('#completed').addEventListener('click', function(event) {
    document.querySelector('.message-box').style.display = 'none';
    document.querySelector('#home').style.display = 'none';
    document.querySelector('#strumming_view').style.display = 'none';
    document.querySelector('#plucking_view').style.display = 'none';
    document.querySelector('#fingerstyle_view').style.display = 'none';
    document.querySelector('#tips_view').style.display = 'none';
    document.querySelector('#completed_view').style.display = 'block';
});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    let elements = document.getElementsByClassName("main");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.marginLeft = "250px";
    }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    let elements = document.getElementsByClassName("main");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.marginLeft = "0";
    }
}




function toggleAnswer(questionElement) {
    const answerElement = questionElement.nextElementSibling;
    answerElement.classList.toggle('open');
}


function showLesson(lessonId) {
    currentLesson = lessonId;
    updateLessonDisplay(currentLesson);
}



function updateLessonDisplay(currentLesson) {
    const videos = document.querySelectorAll('.video');
    videos.forEach(video => {
        video.style.display = 'none';
    });


    const currentVideo = document.getElementById(`${currentLesson}_video`);
    if (currentVideo) {
        currentVideo.style.display = 'block'; 
    }
}

const progressBar = document.getElementById('progress-bar');
let progress = 0
const tips_link = document.getElementById('tips');
tips_link.href = "javascript:void(0)";
tips_link.pointerEvents = "none";
tips_link.style.color = "gray";

fetch('/get_progress', {
    method: 'GET'
})
.then(response => response.json())
.then(data => {
    progress = data.progress;  
    data.videos.forEach(video => {
        if (video.completed) {
            const buttonId = video.video_name.replace("_video", "");
            const button = document.getElementById(buttonId);
            if (button) {
                button.style.backgroundColor = 'grey';
            } else {
            }
        }

    if (data.progress >= 80) {
        tips_link.pointerEvents = "auto";
        tips_link.style.color = "";
    }
    if (data.progress_completed) {
        document.querySelector('#completed').style.display = 'block';
    }
    })
    progressBar.style.width = progress + '%';
    progressBar.innerText = Math.round(progress) + '%';
})
.catch((error) => {
    console.error('Error fetching progress:', error);
});

function onVideoEnd(video_name) {
    const data = {
        video_name: video_name,
        progress: progress,
        completed: true
    }

    fetch('/update_progress', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.progress === 'error') {
            console.log('error')
      
        } else {
            if (data.progress_completed) {
                document.querySelector('#completed').style.display = 'block';
            }
            updateProgress(data.progress)
            const buttonId = video_name.replace('_video', '');
            const button = document.getElementById(buttonId);
            if (button) {
                button.style.backgroundColor = 'grey';
            } else {
                console.log('Not Grey');
            }
        }
        
    })
    .catch((error) => {
        console.error('Nagkamali ka boI!')
    });
}

function updateProgress(increment) {
    increment = Math.round(parseFloat(increment))
    if (increment >= 80) {
        tips_link.style.pointerEvents = "auto";
        tips_link.style.color = "";
    }
    if (increment <= 100) {
        progress = increment 
        progressBar.style.width = progress + '%'; 
        progressBar.innerText = progress + '%';
    } 
}


