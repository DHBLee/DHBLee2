document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#following').addEventListener('click', function() {
        following(1);
    });
    document.querySelector('#profile').addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target.closest('a');
        const username = target.getAttribute('data-username');

        your_profile(username, 1);
    });
    document.querySelector('#new_post').addEventListener('click', new_post);
    document.querySelector('#your_posts').addEventListener('click', your_posts);

  
    document.querySelector('#your_posts').addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target.closest('a[id="user"]');
        if (target) {
            const username = target.getAttribute('data-username');
            your_profile(username, 1);
        }
    });

    document.querySelector('#your_following').addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target.closest('a[id="user"]');
        if (target) {
            const username = target.getAttribute('data-username');
            your_profile(username, 1);
        }
    });

    document.querySelector('#your_posts').addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target.closest('button[id="like"]');
        if (target) {
            const postId= target.getAttribute('data-post-id');
            likes(postId, 'your_posts');
        } else {
            console.log('didnn work')
        }
    });

    document.querySelector('#your_following').addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target.closest('button[id="like"]');
        if (target) {
            const postId= target.getAttribute('data-post-id');
            likes(postId, 'your_following');
        } else {
            console.log('didnn work')
        }
    });

    document.querySelector('#your_posts').addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target.closest('a[id="edit"]');
        if (target) {
            const edits = target.getAttribute('data-content');
            const content = target.closest('div');
            edit(edits, content);
        } else {
            console.log('didnn work')
        }
    });

    document.querySelector('#your_profile').addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target.closest('a[id="edit"]');
        if (target) {
            const edits = target.getAttribute('data-content');
            const content = target.closest('div');
            edit(edits, content);
        } else {
            console.log('didnn work')
        }
    });

    document.querySelector('#your_profile').addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target.closest('button[id="like"]');
        if (target) {
            const postId= target.getAttribute('data-post-id');
            likes(postId, 'your_profile');
        } else {
            console.log('didnn work')
        }
    });

    new_post();
    // By default, load the inbox
  });



function following (page = 1) {
   
    
    document.querySelector('#your_following').style.display = 'block';
    document.querySelector('#your_profile').style.display = 'none';
    document.querySelector('#new_post').style.display = 'none';
    document.querySelector('#your_posts').style.display = 'none';
    document.querySelector('#pagination').style.display = 'none';

    fetch(`/followings/?page=${page}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#your_following').innerHTML = '';
        data.posts.forEach(post => {
            const element = document.createElement('div');
            element.innerHTML = `
               <div style="border-style: ridge; padding: 10px; margin: 10px;">
                    <h2><a href="#" id="user" data-username="${post.user}">${post.user}</a></h2>
                    <h4>${post.content }</h4>
                    <h6>${post.timestamp }</h6>
                    <div style="display: flex;">
                        <button id="like" style="border-style: none;" data-post-id="${post.id }">
                            ${post.is_liking ? `Unlike ${post.likes_count}` : `Like ${post.likes_count}`}    
                        </button>
                        <a href="#" id="comment">Comment</a>
                    </div>

                </div>
            `;
            document.querySelector('#your_following').append(element);
        });

        const pagination = document.createElement('div');
        pagination.innerHTML = `
            <div class="pagination" id="pagination">
                <span class="step-links">
                    ${data.page_obj.has_previous ? `<a href="#" onclick="following(1)">&laquo; first</a>` : ''}
                    ${data.page_obj.has_previous ? `<a href="#" onclick="following(${data.page_obj.previous_page_number})">previous</a>` : ''}
            
                    <span class="current">
                        Page ${data.page_obj.number} of ${data.page_obj.paginator.num_pages}.
                    </span>
            
                    ${data.page_obj.has_next ? `<a href="#" onclick="following(${data.page_obj.next_page_number})">next</a>` : ''}
                    ${data.page_obj.has_next ? `<a href="#" onclick="following(${data.page_obj.paginator.num_pages})">last &raquo;</a>` : ''}
                </span>
            </div>
        `;
        document.querySelector('#your_following').append(pagination);
    })       
}

function your_profile (username, page = 1) {
    
    document.querySelector('#your_following').style.display = 'none';
    document.querySelector('#your_profile').style.display = 'block';
    document.querySelector('#new_post').style.display = 'none';
    document.querySelector('#your_posts').style.display = 'none';
    document.querySelector('#pagination').style.display = 'none';

    fetch(`/profile/${username}/?page=${page}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#your_profile').innerHTML = '';

        const profile_header = document.createElement('div');
        
        profile_header.innerHTML = `
            <div style="padding: 10px; margin: 10px; display: flex; justify-content: space-between; align-itmes: center; margin-bottom: 30px;">
                <div style="flex: 1;">
                    <h2>${data.username}</h2>
                    <h6>${data.email}</h6>
                    <button id="buttons" style="display: none;">${data.is_following ? 'Unfollow' : 'Follow'}</button>
                </div>

                <div style="display: flex; gap: 20px">
                    <div class="align_it">
                        <h6>Following</h6>
                        <h6>${data.following_count}</h6>
                    </div>

                    <div class="align_it">
                        <h6>Followers</h6>
                        <h6>${data.follower_count}</h6>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('#your_profile').append(profile_header);

        data.posts.forEach(post => {
            const element = document.createElement('div');
            element.innerHTML = `
               <div style="border-style: ridge; padding: 10px; margin: 10px;">
                    <h4>${post.content}</h4>
                    ${post.username === data.request_user ? `<a href="#" id="edit" data-content="${post.content}">Edit</a>` : ''}
                    <h6>${post.timestamp}</h6>
                    <div style="display: flex;">
                        <button id="like" style="border-style: none;" data-post-id="${post.id}">${post.is_liking ? 'Unlike' : 'Like'} ${post.likes}</button>
                        <a href="#" id="comment">Comment</a>
                    </div>
                </div>
            `;
            document.querySelector('#your_profile').append(element);
        });
        


        if (data.request_user !== data.username) {
            document.querySelector('#buttons').style.display = 'block';
            document.querySelector('#buttons').addEventListener('click', () => {
                follow(username);
            })

        }

        const pagination = document.createElement('div');
        pagination.innerHTML = `
            <div class="pagination" id="pagination">
                <span class="step-links">
                    ${data.page_obj.has_previous ? `<a href="#" onclick="your_profile('${username}', 1)">&laquo; first</a>` : ''}
                    ${data.page_obj.has_previous ? `<a href="#" onclick="your_profile('${username}', ${data.page_obj.previous_page_number})">previous</a>` : ''}
            
                    <span class="current">
                        Page ${data.page_obj.number} of ${data.page_obj.paginator.num_pages}.
                    </span>
            
                    ${data.page_obj.has_next ? `<a href="#" onclick="your_profile('${username}', ${data.page_obj.next_page_number})">next</a>` : ''}
                    ${data.page_obj.has_next ? `<a href="#" onclick="your_profile('${username}', ${data.page_obj.paginator.num_pages})">last &raquo;</a>` : ''}
                </span>
            </div>
        `;
        document.querySelector('#your_profile').append(pagination);
    });
}

function follow(username) {
    fetch(`/follow/${username}/`, {
        method: 'POST',
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'An unexpected error occured');
            });
        }
        return response.json();
    })
    .then(data => {
        your_profile(username, 1);
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
}

function new_post () {
    
    document.querySelector('#your_following').style.display = 'none';
    document.querySelector('#your_profile').style.display = 'none';
    document.querySelector('#new_post').style.display = 'block';
    document.querySelector('#your_posts').style.display = 'block';

    

    
}

function your_posts () {
    
    document.querySelector('#your_following').style.display = 'none';
    document.querySelector('#your_profile').style.display = 'none';
    document.querySelector('#new_post').style.display = 'block';
    document.querySelector('#your_posts').style.display = 'block';

}

function likes(postId, context) {

    fetch(`/likes/${postId}/`, {
        method: 'POST',
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'An unexpected error occured');
            });
        }
        return response.json();
    })
    .then(data => {
        if (context === 'your_profile') {
            your_profile(data.username);
        } else if (context === 'your_following') {
            following();
        } else {
            location.reload(); //reloads the whole page
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });

}

function edit(edits, content) {

    const current_content = content.querySelector('h4');
    const textarea = document.createElement('textarea');
    textarea.value = edits;
    current_content.replaceWith(textarea);

    const save = document.createElement('button');
    const cancel = document.createElement('button');
    save.textContent = 'save';
    cancel.textContent = 'cancel';
    content.appendChild(save);
    content.appendChild(cancel);

    cancel.addEventListener('click', function(event) {
        event.preventDefault
        location.reload();
    })

    save.addEventListener('click', function(event) {
        event.preventDefault
        const new_content = textarea.value;

        fetch('/edit', {
            method: 'POST',
            body: JSON.stringify({
                'new_content': new_content,
                'post_id': content.querySelector('button[data-post-id]').getAttribute('data-post-id')
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to save the post.');
            }
        })
        .then(data => {

            const updated_content = document.createElement('h4');
            updated_content.textContent = new_content;
            textarea.replaceWith(updated_content);
            save.remove();
        })
        .catch(error => {
            console.error('Error:', error);
        })
    })

}
