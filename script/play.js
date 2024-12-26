
const mainVideo = document.getElementById('main-video');
const nextVideos = document.querySelectorAll('.recommendations li');
const noteTextarea = document.getElementById('notes');


const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');


menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('expanded');
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mobileNav.classList.remove('expanded');
    }
});



let mainVideoCompleted = false;


nextVideos.forEach((thumbnail) => {
    thumbnail.style.pointerEvents = "none";
    thumbnail.style.opacity = "0.5";
});


mainVideo.addEventListener('load', () => {
    setTimeout(() => {
        mainVideoCompleted = true;

        
        nextVideos.forEach((thumbnail) => {
            thumbnail.style.pointerEvents = "auto";
            thumbnail.style.opacity = "1";
        });
    }, 5000); 
});


nextVideos.forEach((thumbnail) => {
    thumbnail.addEventListener('click', function () {
        if (!mainVideoCompleted) {
            alert('Please finish the main video first!');
        } else {
            const videoLink = this.getAttribute('data-link');
            mainVideo.src = videoLink;

           
            mainVideoCompleted = false;
            nextVideos.forEach((thumb) => {
                thumb.style.pointerEvents = "none";
                thumb.style.opacity = "0.5";
            });
        }
    });
});


function playVideo(link) {
    mainVideo.src = link;

    mainVideoCompleted = false;
    nextVideos.forEach((thumb) => {
        thumb.style.pointerEvents = "none";
        thumb.style.opacity = "0.5";
    });
}

noteTextarea.addEventListener('input', () => {
    localStorage.setItem('courseNotes', noteTextarea.value);
});


document.addEventListener('DOMContentLoaded', () => {
    const savedNotes = localStorage.getItem('courseNotes');
    if (savedNotes) {
        noteTextarea.value = savedNotes;
    }
});
