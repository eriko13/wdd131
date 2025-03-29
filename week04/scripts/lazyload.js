document.addEventListener('DOMContentLoaded', function() {
    // Get the current year and update the span with id 'currentyear'
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    // Get the last modified date of the document and update the span with id 'lastModified'
    const lastModifiedDate = document.lastModified;
    document.getElementById('lastModified').textContent = lastModifiedDate;
});
