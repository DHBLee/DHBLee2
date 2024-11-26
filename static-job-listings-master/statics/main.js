document.addEventListener('DOMContentLoaded', function() {

    const jobs = document.querySelectorAll('.main_jobs');
    const filterTags = document.querySelectorAll('.main_languages');
    const clearFilters = document.querySelector('#filter_clear');
    const activeFilters = [];


    jobs.forEach(job => {
        const highlight = job.querySelector('.main_highlight');

        if (highlight) {
            const newTag = highlight.querySelector('.main_new');
            const featuredTag = highlight.querySelector('.main_featured');
    
            if (newTag && featuredTag) {
                job.classList.add('left_border');
            }
        }

    })

    clearFilters.addEventListener('click', function() {
        activeFilters.length = 0;

        document.querySelector('.filter').innerHTML = '';
        document.querySelector('.filter_wrapper').style.display = 'none';

        jobs.forEach(job => {
            job.style.display = 'flex';
        });
    });

    filterTags.forEach(tag => {
        tag.addEventListener('click', function () {
            const selectedFilter = this.textContent
            const filterLower = selectedFilter.toLowerCase();

            if (activeFilters.includes(filterLower)) {
                activeFilters.splice(activeFilters.indexOf(filterLower), 1);
            } else {
                activeFilters.push(filterLower);
                updateFilterOptions(selectedFilter, filterLower);
            }


            filterThis(activeFilters);
        })
    })

    function filterThis(activeFilters) {
        jobs.forEach(job => {

            let jobValues = [];
    
            const languagesData = job.dataset.languages;
            const roleData = job.dataset.role;
            const levelData = job.dataset.level;
            const toolsData = job.dataset.tools;
    
            const languages = languagesData ? languagesData.split(', ') : [];
            const tools = toolsData ? toolsData.split(', ') : [];

            jobValues.push(roleData);
            jobValues.push(levelData);
            jobValues.push(...languages);
            jobValues.push(...tools);
            


            const matchesAllFilters = activeFilters.every(active => jobValues.includes(active));

            if(matchesAllFilters) {
                job.style.display = 'flex';
            } else {
                job.style.display = 'none';
            }
        });

        if (document.querySelector('.filter').children.length === 0) {
            document.querySelector('.filter_wrapper').style.display = 'none';
        }
    }

    function updateFilterOptions(filterTag, filterValue) {
        const filterContainer = document.querySelector('.filter');

        const wrapperDiv = document.createElement('div');
        wrapperDiv.style.display = 'flex';

        wrapperDiv.innerHTML = `
                    <span class="filter_languages lang_filter">${filterTag}</span>
        <img class="filter_remove" src="./images/icon-remove.svg" alt="remove">
        `;

        const removeButton = wrapperDiv.querySelector('.filter_remove');
        removeButton.addEventListener('click', function() {
            wrapperDiv.remove();
            activeFilters.splice(activeFilters.indexOf(filterValue), 1);
            filterThis(activeFilters);
        });

        document.querySelector('.filter_wrapper').style.display = 'flex';

        filterContainer.appendChild(wrapperDiv);
    }
});