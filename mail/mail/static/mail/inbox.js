document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);


  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  document.querySelector('#compose-form').onsubmit = function(event) {
    event.preventDefault();
    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-body').value;

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: recipients,
          subject: subject,
          body: body,
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
        load_mailbox('sent');
    });
  }

}



function view_email(email_id) {

  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {
    // Clear the emails-view to show the email details
    document.querySelector('#emails-view').innerHTML = `
      <h3>From: ${email.sender}</h3>
      <h3>To : ${email.recipients}</h3>
      <h4>Subject: ${email.subject}</h4>
      <p><b>Timestamp:</b> ${email.timestamp}</p>
      <p>${email.body}</p>
    `;

    fetch(`/emails/${email.id}`, {
      method: 'PUT',
      body: JSON.stringify({
          read: true
      })
    })

    const button_archive = document.createElement('button-archive');
    const button_read = document.createElement('button-read');
    console.log(email.archived)
    button_archive.innerHTML = email.archived ? "Unarchive" : "Archive";
    button_archive.className = email.archived ? "btn btn-success" : "btn btn-danger";
    button_read.innerHTML = "Reply";
    button_read.className = "btn btn-success";

    button_read.addEventListener('click', function(event) {
      event.preventDefault();
      compose_email();

      document.querySelector('#compose-recipients').value = email.sender;
      document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
      document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`;
    
    });

    button_archive.addEventListener('click', function(event) {
      event.preventDefault();
      email.archived = !email.archived;
      console.log(email.archived)
      
      fetch(`/emails/${email.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            archived: email.archived
        })
      })
      .then(() => { 
        if (email.archived) {
          load_mailbox('archive');
        } else {
          load_mailbox('inbox');
        }
      })
    });
    document.querySelector('#emails-view').append(button_archive);
    document.querySelector('#emails-view').append(button_read);
  });
}



function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').value = '';
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';


  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    console.log(emails);
      emails.forEach(email => {
          const element = document.createElement('div');
          if (email.read) {
            element.style.backgroundColor = 'grey';
            console.log("correct!")
          }
          element.innerHTML = `
              <div style="border-style: ridge; display: flex; justify-content: space-between; align-items: center; width: 100%;">
                  <div style="display: flex; gap: 10px; align-items: center;">
                    <a href="/emails/${email.id}" style='color:black;'"><b>${email.sender}</b></a>
                    <h6>${email.subject}</h6>
                  </div>
                  <h6>${email.timestamp}</h6>
              </div>
          `;
          element.querySelector('a').addEventListener('click', function(event) {
              event.preventDefault();
              view_email(email.id);
          });
          document.querySelector('#emails-view').append(element);
      })
  });
  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}


