let activities=[];
let intensityLevel=[];

function addActivity(){
    const activityInput = document.getElementById('activity');
    const intensityInput = document.getElementById('intensitylevel');
    const activityList = document.getElementById('activityList');

    let activity = activityInput.value.trim();
    let intensitylevel = parseFloat(intensityInput.value.trim());
    if(activity!==''&&!isNaN(intensitylevel) && intensitylevel>=1 && intensitylevel<=3){
   
    activities.push(activity);
    intensityLevel.push(intensitylevel);
    }
    const li = document.createElement('li');
        li.textContent = activity;
        activityList.appendChild(li)
        switch(intensitylevel){
            case 1:
                li.classList.add('low');
                break;
            case 2:
                li.classList.add('medium');
                break;
            case 3:
                li.classList.add('high');
                break;    
        }
        
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = function(){
            li.classList.toggle('completed');
        };
        li.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';

        editButton.onclick= function(){
            const newActivity= prompt('Edit activity:',activity);
            if(newActivity!==null && newActivity.trim()!==''){
                const activityIndex = activities.indexOf(activity);
                activities[activityIndex] = newActivity; 
                li.firstChild.textContent = newActivity; 
                activity = newActivity; 
            }
        };
        li.appendChild(editButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        const activityIndex = activities.indexOf(activity);
        removeButton.onclick = function(){
        activityList.removeChild(li);
        const activityIndex =activities.indexOf(activity);
        activities.splice(activityIndex,1);
        intensityLevel.splice(activityIndex,1);
        }
        li.appendChild(removeButton);
        activityList.appendChild(li);
        activityInput.value ='';

        intensityInput.value ='';

}




