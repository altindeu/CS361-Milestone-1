var uploadedImage;
var currentRecipe;

// Handle "Add" button click
document.getElementById('addButton').addEventListener('click', function() {
    // For now, we'll just add a new dummy recipe to the list
    var newRecipe = document.createElement('div');
    newRecipe.className = 'recipe-box';
    newRecipe.innerText = 'Add Your Recipe Name Here ';

    // Add a "Delete" button to the new recipe box
    var deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.innerText = 'Delete';
    newRecipe.appendChild(deleteButton);

    document.querySelector('.recipe-list').appendChild(newRecipe);

    // Set the newly created recipe as the current recipe
    currentRecipe = newRecipe;
});

// Handle "Delete" button clicks
// Since recipes can be added dynamically, we use event delegation
document.querySelector('.recipe-list').addEventListener('click', function(e) {
    if (e.target.className === 'deleteButton') {
        // If a delete button was clicked, remove the clicked recipe
        e.target.parentElement.remove();
    }
});

// Handle file upload
document.getElementById('imageUpload').addEventListener('change', function() {
    var reader = new FileReader();

    reader.onload = function(e) {
        // Set the uploaded image as the source of the recipeImage element
        uploadedImage = e.target.result;

        // If there is a current recipe, assign the uploaded image to it
        if (currentRecipe) {
            currentRecipe.dataset.image = uploadedImage;
        }
    }

    // Read the uploaded file
    reader.readAsDataURL(this.files[0]);
});

// Handle recipe box clicks
document.querySelector('.recipe-list').addEventListener('click', function(e) {
    if (e.target.className === 'recipe-box' || e.target.parentElement.className === 'recipe-box') {
        // If a recipe box (or a child of a recipe box) was clicked, update the recipe details
        var recipeBox = e.target.className === 'recipe-box' ? e.target : e.target.parentElement;

        // Update the text of the recipe name input and add an event listener to it
        var recipeNameInput = document.getElementById('recipeNameInput');
        recipeNameInput.value = recipeBox.childNodes[0].nodeValue.trim();
        recipeNameInput.oninput = function() {
            currentRecipe.childNodes[0].nodeValue = this.value + ' ';
        };

        document.getElementById('recipeImage').src = recipeBox.dataset.image || 'recipe-image-url';  // Retrieve the image from the data attribute
        document.getElementById('recipeIngredients').innerText = recipeBox.dataset.ingredients || 'New list of ingredients...';
        document.getElementById('recipeInstructions').innerText = recipeBox.dataset.instructions || 'New step-by-step instructions...';

        // Set the clicked recipe box as the current recipe
        currentRecipe = recipeBox;

        // Show the recipe detail
        document.querySelector('.recipe-detail').style.display = 'block';
    }
});

// Listen for input on the recipe name field
document.getElementById('recipeNameInput').addEventListener('input', function() {
    if (currentRecipe) {
        // If there is a current recipe, update its name
        currentRecipe.childNodes[0].nodeValue = this.value + ' ';
    }
});

// Listen for changes to the recipe ingredients
document.getElementById('recipeIngredients').addEventListener('input', function() {
    if (currentRecipe) {
        currentRecipe.dataset.ingredients = this.innerText;
    }
});

// Listen for changes to the recipe instructions
document.getElementById('recipeInstructions').addEventListener('input', function() {
    if (currentRecipe) {
        currentRecipe.dataset.instructions = this.innerText;
    }
});