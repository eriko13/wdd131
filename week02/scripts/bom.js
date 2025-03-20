// Declare three variables that hold references to the input, button, and list elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Add click event listener to the Add Chapter button
button.addEventListener('click', () => {
    // Check if the input is not empty
    if (input.value.trim() !== '') {
        // Create a new li element
        const li = document.createElement('li');
        
        // Create a delete button
        const deleteButton = document.createElement('button');
        
        // Populate the li element's textContent with the input value
        li.textContent = input.value;
        
        // Populate the button textContent with a ❌
        deleteButton.textContent = '❌';
        
        // Append the delete button to the li element
        li.append(deleteButton);
        
        // Append the li element to the unordered list
        list.append(li);
        
        // Add event listener to the delete button
        deleteButton.addEventListener('click', () => {
            // Remove the li element when delete button is clicked
            list.removeChild(li);
        });
        
        // Clear the input field
        input.value = '';
        
        // Set focus back to the input field
        input.focus();
    }
}); 