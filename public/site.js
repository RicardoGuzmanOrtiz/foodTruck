(async () => {

	const button = document.querySelector('button')
	const input = document.querySelector('input')
	const ul = document.querySelector('ul')

	const getTodos = async () => {
		const response = await fetch('/api/todos')
		const todos = await response.json()
		return todos
	}

    const displayEvents = todos => {
		ul.innerHTML = ''
		todos.forEach(({ id, name }) => {
			const li = document.createElement('li')
			ul.appendChild(li)
	
			const span = document.createElement('span');
			span.textContent = name
			li.appendChild(span)
	
			const button = document.createElement('button')
			button.textContent = 'See Details'
			button.addEventListener('click', async () => { 
				
                displayEventDetails(id); 
			});
			li.appendChild(button);

            const modifyButton = document.createElement('button');
            modifyButton.textContent = 'Modify';
            modifyButton.addEventListener('click', async () => {
              
                const modifyEventDiv = document.querySelector('.Modify-Event');
                modifyEventDiv.style.display = 'block';
            
                
                const event = await fetchEventDetails(id)
                document.getElementById('name').value = event.name;
                document.getElementById('location').value = event.location;
                document.getElementById('dates').value = event.dates;
                document.getElementById('hours').value = event.hours;
            
                
                const form = document.getElementById('ModifyEventForm');
                form.onsubmit = async (formEvent) => {
                    formEvent.preventDefault();
            

                    const newName = document.getElementById("name").value;
                    const newLocation = document.getElementById("location").value;
                    const newDate = document.getElementById("dates").value;
                    const newTime = document.getElementById("hours").value;
                
                    const eventData = {
                        name: newName,
                        location: newLocation,
                        dates: newDate,
                        hours: newTime
                    };


                    const response = await fetch(`/api/todos/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(eventData)
                    });
                    
                        document.getElementById("ModifyEventForm").reset();
                        displayEvents(await getTodos());
                        modifyEventDiv.style.display = 'none';
                };
            });
            li.appendChild(modifyButton);

            //delete buton

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                const confirmDelete = confirm('Are you sure you want to delete this event?');
                if (confirmDelete) {
                            const response = await fetch(`/api/events/${id}`, {
                            method: 'DELETE'
                        });
                          displayEvents(await getTodos()); 
                                   }
            });
            li.appendChild(deleteButton);
  
		})
	}


	displayEvents(await getTodos())
 
})() 

const modifyEvent = async (id, updates) => {
    const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        throw new Error('Failed to update the event');
    }
    return await response.json();
};



 async function fetchEventDetails(id) {
		const response = await fetch(`/api/todos/${id}`)
		const event = await response.json()
		return event
}


async function displayEventDetails(id) {
	const event = await fetchEventDetails(id)
		const eventDetailsDiv = document.getElementById('event-details')
		eventDetailsDiv.innerHTML = `
			<p><strong>Name:</strong> ${event.name}</p>
			<p><strong>Location:</strong> ${event.location}</p>
			<p><strong>Dates:</strong> ${event.dates}</p>
			<p><strong>Hours:</strong> ${event.hours}</p>
		`
	
}

document.getElementById("eventForm").addEventListener("submit", async function(event) {
    
    const eventName = document.getElementById("name").value;
    const eventLocation = document.getElementById("location").value;
    const eventDates = document.getElementById("dates").value;
    const eventHours = document.getElementById("hours").value;

    const eventData = {
        name: eventName,
        location: eventLocation,
        dates: eventDates,
        hours: eventHours
    };

    const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            
        },
        body: JSON.stringify(eventData)
        
    });

    if (response.ok) {
        alert("Event saved successfully!");
		document.getElementById("eventForm").reset();
       
    } else {
        alert("Failed to save event.");
    }
});


async function fetchEvents() {
    
alert.apply("entro aqui")
    const response = await fetch('/api/events');
    const events = await response.json();
    return events;
}

