let movies =[];
let priorities =[];


function addMovie(){
    const movieInput = document.getElementById('movie');
    const priorityInput = document.getElementById('priority');
    const movieList = document.getElementById('movieList');

    let movie = movieInput.value.trim();
    let priority = Number(priorityInput.value.trim());

    if(movie!=='' && !isNaN(priority) && priority>=1 && priority<=3){
        movies.push(movie);
        priorities.push(priority);

        const li = document.createElement('li');
        li.textContent = movie;

        switch(priority){
            case 1:
                li.classList.add('priority-high');
                break;
            case 2:
                li.classList.add('priority-medium');
                break;
            case 3:
                li.classList.add('priority-low');
                break;    
        }
        const completeButton = document.createElement('button');
        completeButton.textContent = ' Watched';
        completeButton.onclick = function(){
            li.classList.toggle('watched');
        };
        li.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';

        editButton.onclick= function(){
            const newTask = prompt('Edit movie:',movie);
            if(newMovie!==null && newMovie.trim()!==''){
                const movieIndex = movies.indexOf(movie);
                movies[movieIndex] = newMovie; 
                li.firstChild.textContent = newMovie; 
                movie = newMovie; 
            }
        };
        li.appendChild(editButton);

        const removeButton = document.createElement('button');removeButton.textContent = ' Remove';

        removeButton.onclick = function(){
            movieList.removeChild(li);
            const movieIndex =movies.indexOf(movie);
            movies.splice(movieIndex,1);
            priorities.splice(movieIndex,1);
        }
        li.appendChild(removeButton);
        movieList.appendChild(li);
        movieInput.value ='';

        priorityInput.value ='';
    }else {
        alert('please enter a valid movie and priority between 1 and 3');
    }
}
