let expenses=[];
let descriptions=[];
let amounts=[];
let categories =[];


function addExpense(){
    const expenseInput = document.getElementById('expense');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const expenseList = document.getElementById('expenseList');


    let expense = expenseInput.value.trim();
    let description = descriptionInput.value.trim();
    let amount= parseFloat(amountInput.value.trim());
    let category = Number(categoryInput.value.trim());

    if(expense!=='' && description !== ''  && !isNaN(amount) && amount > 0 && !isNaN(category) && category>=1 && category<=3){
        expenses.push(expense);
        descriptions.push(description);
        amounts.push(amount);
        categories.push(category);

        const li = document.createElement('li');
        li.textContent = `${description} - $${amount.toFixed(2)}`;

        switch(category){
            case 1:
                li.classList.add('food');
                break;
            case 2:
                li.classList.add('transport');
                break;
            case 3:
                li.classList.add('entertainment');
                break;    
        }
        const completeButton = document.createElement('button');
        completeButton.textContent = ' Complete';
        completeButton.onclick = function(){
            li.classList.toggle('completed');
        };
        li.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';

        editButton.onclick= function(){
            const newDescription= prompt('Edit description:',description);
            if(newDescription!==null && newDescription.trim()!==''){
                const descriptionIndex = descriptions.indexOf(description);
                descriptions[descriptionIndex] = newDescription; 
                li.firstChild.textContent = newDescription; 
                // li.textContent = `${newDescription} - $${amount.toFixed(2)}`;
                // li.appendChild(completeButton);
                // li.appendChild(editButton);
                // li.appendChild(removeButton);
            }
        };
        li.appendChild(editButton);

        const removeButton = document.createElement('button');removeButton.textContent = ' Remove';

        removeButton.onclick = function(){
            expenseList.removeChild(li);
            const expenseIndex =expenses.indexOf(expense);
            expenses.splice(expenseIndex,1);
            descriptions.splice(expenseIndex,1);
            amounts.splice(expenseIndex,1);
            categories.splice(expenseIndex,1);
        }
        li.appendChild(removeButton);
        expenseList.appendChild(li);

        expenseInput.value ='';
        descriptionInput.value ='';
        amountInput.value ='';
        categoryInput.value ='';
    }else {
        alert('please fill all fields accordingly');
    }
}
