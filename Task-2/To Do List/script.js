
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list__container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value.trim();
        
        // Append "X" button
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
        
        listContainer.appendChild(li);
        inputBox.value = ''; // Clear the input box after adding the task
        
        // Attach event listener to remove task on "X" click
        span.addEventListener("click", function() {
            li.remove();
            saveData();
        });
        
        saveData(); // Save data immediately after adding a task
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    let storedData = localStorage.getItem("data");
    if (storedData) {
        listContainer.innerHTML = storedData;
        
        // Attach event listeners to "X" buttons after loading tasks
        let deleteButtons = document.querySelectorAll("#list__container li span");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function() {
                button.parentElement.remove();
                saveData();
            });
        });
    }
}

// Call showTask on page load to display stored tasks
showTask();
