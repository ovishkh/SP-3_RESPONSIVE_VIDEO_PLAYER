// Select main video iframe and thumbnails
const mainVideo = document.getElementById('main-video');
const nextVideos = document.querySelectorAll('.recommendations li');
const noteTextarea = document.getElementById('notes');

// State to track main video completion
let mainVideoCompleted = false;

// Initially disable thumbnails' click functionality
nextVideos.forEach((thumbnail) => {
    thumbnail.style.pointerEvents = "none";
    thumbnail.style.opacity = "0.5";
});

// Simulate main video completion (for demo purposes)
// Replace this with a proper event listener if you have access to video duration/completion events.
mainVideo.addEventListener('load', () => {
    setTimeout(() => {
        mainVideoCompleted = true;

        // Enable thumbnail clicks
        nextVideos.forEach((thumbnail) => {
            thumbnail.style.pointerEvents = "auto";
            thumbnail.style.opacity = "1";
        });
    }, 5000); // Simulating completion after 5 seconds
});

// Play video from sidebar recommendations
nextVideos.forEach((thumbnail) => {
    thumbnail.addEventListener('click', function () {
        if (!mainVideoCompleted) {
            alert('Please finish the main video first!');
        } else {
            const videoLink = this.getAttribute('data-link');
            mainVideo.src = videoLink;

            // Reset state for the new video
            mainVideoCompleted = false;
            nextVideos.forEach((thumb) => {
                thumb.style.pointerEvents = "none";
                thumb.style.opacity = "0.5";
            });
        }
    });
});

// Play video from course card button
function playVideo(link) {
    mainVideo.src = link;

    // Optionally reset or disable other buttons if needed
    mainVideoCompleted = false;
    nextVideos.forEach((thumb) => {
        thumb.style.pointerEvents = "none";
        thumb.style.opacity = "0.5";
    });
}

// Save notes to local storage
noteTextarea.addEventListener('input', () => {
    localStorage.setItem('courseNotes', noteTextarea.value);
});

// Load saved notes on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedNotes = localStorage.getItem('courseNotes');
    if (savedNotes) {
        noteTextarea.value = savedNotes;
    }
});
