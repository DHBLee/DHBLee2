let activitiesData = [];

fetch('data.json')
.then(response => response.json())
.then(data=> {
    activitiesData = data;
    console.log(activitiesData)    
})


const links = document.querySelectorAll('.grid_two a');

links.forEach(link => {
    link.addEventListener('click', () => {

        links.forEach(link => link.classList.remove('active'));
        link.classList.add('active');

        if(link.id === 'daily') {
            updateValues('daily');
        } else if(link.id === 'weekly') {
            updateValues('weekly');
        } else if(link.id === 'monthly') {
            updateValues('monthly');
        } else {
            console.log('error');
        };

    })
})


function updateValues(value) {
    let time;
    let date;

    activitiesData.forEach(activity => {
        const activityElement = document.querySelector(`#${activity.title.toLowerCase()}`);

        if(activityElement) {
            const currentData = activity.timeframes[value];

            const mainSubtitle = activityElement.querySelector('.main_subtitle');
            const mainSubsubtitle = activityElement.querySelector('.main_subsubtitle');
            console.log(activityElement);

            if (value === 'monthly' || value === 'weekly') {
                date = value.slice(0, -2);
                time = capitalize(date);
            } else {
                time = 'Day';
            }

            if(mainSubtitle && mainSubsubtitle) {
                mainSubtitle.textContent = `${currentData.current}hrs`;
                mainSubsubtitle.textContent = `Last ${time} - ${currentData.previous}hrs`
            }
        }
    });
    

}


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


