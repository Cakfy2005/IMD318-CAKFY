// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});

// Music Player (About Page)
const mySong = document.getElementById('myFavoriteSong');
const musicToggle = document.getElementById('musicToggle');
const mainPlayIcon = document.getElementById('mainPlayIcon');
const volFill = document.getElementById('volFill');
const volNum = document.getElementById('volNum');
const visualizerBars = document.getElementById('visualizer');

if (mySong) {
    mySong.volume = 0.5;

    musicToggle.addEventListener('click', function() {
        if (mySong.paused) {
            mySong.play();
            mainPlayIcon.classList.replace('fa-play', 'fa-pause');
            visualizerBars.classList.add('active');
        } else {
            mySong.pause();
            mainPlayIcon.classList.replace('fa-pause', 'fa-play');
            visualizerBars.classList.remove('active');
        }
    });

    window.adjustVolume = function(amount) {
        let currentVol = Math.round(mySong.volume * 100);
        let newVol = currentVol + amount;

        if (newVol > 100) newVol = 100;
        if (newVol < 0) newVol = 0;

        mySong.volume = newVol / 100;

        if (volFill) volFill.style.width = newVol + '%';
        if (volNum) volNum.textContent = newVol + '%';
    };
}

// Skills Animation (About Page)
function animateSkills() {
    const circles = document.querySelectorAll('.circle-progress');
    const totalCircumference = 377;

    circles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const offset = totalCircumference - (percent / 100) * totalCircumference;
        const progressBar = circle.querySelector('.progress-circle');
        
        const rect = circle.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            progressBar.style.strokeDashoffset = offset;
        }
    });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Toggle Details (Education Page)
function toggleDetails(button) {
    const expandable = button.nextElementSibling;
    
    if (expandable.classList.contains('show')) {
        expandable.classList.remove('show');
        button.querySelector('span').textContent = 'View More Details';
    } else {
        expandable.classList.add('show');
        button.querySelector('span').textContent = 'Hide Details';
    }
}

// Video Player (Beloved Page)
const video = document.getElementById('favouriteVideo');
const container = document.getElementById('videoContainer');
const overlay = document.getElementById('videoOverlay');
const playBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const seekSlider = document.getElementById('seekSlider');
const volSlider = document.getElementById('volumeSlider');
const fsBtn = document.getElementById('fullScreenBtn');
const speedSelect = document.getElementById('speedSelect');

if (video && overlay && playBtn) {
    function togglePlay() {
        if (video.paused || video.ended) {
            video.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    overlay.addEventListener('click', togglePlay);
    playBtn.addEventListener('click', togglePlay);

    video.addEventListener('timeupdate', () => {
        const val = (video.currentTime / video.duration) * 100;
        seekSlider.value = val || 0;
    });

    seekSlider.addEventListener('input', () => {
        video.currentTime = (seekSlider.value / 100) * video.duration;
    });

    volSlider.addEventListener('input', (e) => {
        const val = e.target.value / 100;
        video.volume = val;
        video.muted = (val === 0);
        updateVolumeIcon(val);
    });

    function updateVolumeIcon(val) {
        if (val === 0) muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        else if (val < 0.5) muteBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        else muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }

    fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.error('Error: ' + err.message);
            });
            fsBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            document.exitFullscreen();
            fsBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            fsBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });

    speedSelect.addEventListener('change', () => video.playbackRate = speedSelect.value);

    window.addEventListener('keydown', (e) => {
        if (e.key === "Enter" && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            togglePlay();
        }
    });
}

// Friends Section (Beloved Page)
const friendsData = [
    {
        name: "Kedah Friends",
        since: "Friends Since: 2024",
        bio: "This is my classmate from UiTM Kedah. After 1 semester at UiTM Sarawak, I had to transfer to UiTM Kedah because my parents moved from Sabah to Sarawak for work. Getting to know them is an unforgettable memory because we became friends from semester 2 to semester 5. Hope we still get in touch when we are graduates",
        image: "images/friend1.jpg"
    },
    {
        name: "Sarawak Friends",
        since: "Friends Since: 2024",
        bio: "Only for a moment, we all met when only for 1 semester before I transfer to UiTM Kedah. Meeting them is the greatest moment because it make me remember to my hometown which is Sandakan, Sabah. Until know, we still chatting to each other through our classroom group whatsapp",
        image: "images/friend2.jpg"
    },
    {
        name: "Sabah Friends",
        since: "Friends Since: 2019",
        bio: "We all met when we are still in highschool. Some of them haven't posted for a long time, it seems they have their own busy lives and I learned a lot about friendship from them. I hope you are all doing well and hope to see you again when I return to my homeland!",
        image: "images/friend3.jpg"
    }
];

function showFriendInfo(index) {
    const friendName = document.getElementById('friendName');
    const friendSince = document.getElementById('friendSince');
    const friendBio = document.getElementById('friendBio');
    const mainFriendImg = document.getElementById('mainFriendImg');
    
    if (friendName && friendSince && friendBio && mainFriendImg) {
        const friend = friendsData[index];
        
        friendName.textContent = friend.name;
        friendSince.textContent = friend.since;
        friendBio.textContent = friend.bio;
        mainFriendImg.src = friend.image;
        
        document.querySelectorAll('.friend-btn').forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

// Gallery Album (Gallery Page)
const albumData = [
    { src: 'images/photo1.jpg', title: 'Beloved One', desc: 'A moment before long distance relationship' },
    { src: 'images/photo2.jpg', title: 'Menara Condong', desc: 'Historical monument' },
    { src: 'images/photo3.jpg', title: 'Museum Sarawak', desc: 'One of the greatest museum in Malaysia' },
    { src: 'images/photo4.jpg', title: 'Menara Berkembar', desc: 'Once the tallest building in Malaysia' },
    { src: 'images/photo5.jpg', title: 'Padang Besar', desc: 'A place where money well spent' },
    { src: 'images/photo6.jpg', title: 'Time Square', desc: 'One of the best indoor funfair ever' },
    { src: 'images/photo7.jpg', title: 'The Third Accident', desc: 'Happen because own fault' },
    { src: 'images/photo8.jpg', title: 'Korean Dish', desc: 'Unique taste that hard to be forgotten' },
    { src: 'images/photo9.jpg', title: 'Ulu Lenggong', desc: 'Activity that to be done every semester' }
];

let currentAlbumIndex = 0;

function openAlbumLightbox(index) {
    currentAlbumIndex = index;
    updateLightbox();
    const lightbox = document.getElementById('albumLightbox');
    if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAlbumLightbox() {
    const lightbox = document.getElementById('albumLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function changeAlbumPhoto(direction) {
    currentAlbumIndex += direction;
    
    if (currentAlbumIndex < 0) {
        currentAlbumIndex = albumData.length - 1;
    } else if (currentAlbumIndex >= albumData.length) {
        currentAlbumIndex = 0;
    }
    
    updateLightbox();
}

function updateLightbox() {
    const img = document.getElementById('albumLightboxImg');
    const title = document.getElementById('albumTitle');
    const desc = document.getElementById('albumDescription');
    const counter = document.getElementById('albumCounter');
    
    if (img && title && desc && counter) {
        img.src = albumData[currentAlbumIndex].src;
        title.textContent = albumData[currentAlbumIndex].title;
        desc.textContent = albumData[currentAlbumIndex].desc;
        counter.textContent = (currentAlbumIndex + 1) + ' / ' + albumData.length;
    }
}

const albumLightbox = document.getElementById('albumLightbox');
if (albumLightbox) {
    albumLightbox.addEventListener('click', function(e) {
        if (e.target === this) closeAlbumLightbox();
    });
}

document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('albumLightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeAlbumLightbox();
        if (e.key === 'ArrowLeft') changeAlbumPhoto(-1);
        if (e.key === 'ArrowRight') changeAlbumPhoto(1);
    }
});

/* =========================================
   UPDATED CONTACT FORM WITH SUCCESS POPUP
   ========================================= */

const contactFormModern = document.getElementById('contactFormModern');
const contactMessage = document.getElementById('contactMessage');
const charCounter = document.getElementById('charCounter');

// Modal Elements
const successModal = document.getElementById('successModal');
const modalOkBtn = document.getElementById('modalOkBtn');

// 1. Character Counter Logic
if (contactMessage) {
    contactMessage.addEventListener('input', function() {
        const length = this.value.length;
        charCounter.textContent = `${length} / 500 characters`;

        if (length > 500) {
            charCounter.style.color = 'var(--error)';
        } else {
            charCounter.style.color = 'var(--text-light)';
        }
    });
}

// 2. Modal Close Logic
if (modalOkBtn) {
    modalOkBtn.addEventListener('click', function() {
        successModal.classList.remove('show');
    });
}

// 3. Form Submission Logic
if (contactFormModern) {
    contactFormModern.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error-msg').forEach(error => {
            error.textContent = '';
        });

        let isValid = true;

        // Validation: Name
        const name = document.getElementById('contactName').value.trim();
        if (name.length < 2) {
            document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }

        // Validation: Phone
        const phone = document.getElementById('contactPhone').value.trim();
        const phoneRegex = /^[+]?[\d\s-]{10,}$/;
        if (!phoneRegex.test(phone)) {
            document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
            isValid = false;
        }

        // Validation: Email
        const email = document.getElementById('contactEmail').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }

        // Validation: Message
        const message = contactMessage.value.trim();
        if (message.length < 10) {
            document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
            isValid = false;
        } else if (message.length > 500) {
            document.getElementById('messageError').textContent = 'Message must not exceed 500 characters';
            isValid = false;
        }

        // If form is valid, proceed
        if (isValid) {
            const submitBtn = contactFormModern.querySelector('.submit-btn-modern');
            const btnText = submitBtn.querySelector('.btn-text');

            // Show loading state
            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call (2 seconds delay)
            setTimeout(() => {
                // Reset button
                btnText.textContent = 'Send Message';
                submitBtn.disabled = false;

                // Reset Form
                contactFormModern.reset();
                charCounter.textContent = '0 / 500 characters';

                // TRIGGER THE MODAL
                if (successModal) {
                    successModal.classList.add('show');
                }

            }, 2000);
        }
    });
}

// Welcome Modal
function showWelcomeModal() {
    const modal = document.createElement('div');
    modal.className = 'welcome-modal-overlay';
    modal.innerHTML = '<div class="welcome-modal"><div class="welcome-icon"><i class="fas fa-hand-paper"></i></div><h2>Welcome to My Personal Website!</h2><p>Hope you enjoy exploring my portfolio and getting to know more about me.</p><p>Feel free to browse through all the sections!</p><button class="modal-ok-btn" id="welcomeOkBtn"><span>Let\'s Explore</span><i class="fas fa-arrow-right"></i></button></div>';
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(function() {
        modal.classList.add('show');
    }, 100);

    document.getElementById('welcomeOkBtn').addEventListener('click', function() {
        closeWelcomeModal();
    });
}

function closeWelcomeModal() {
    const modal = document.querySelector('.welcome-modal-overlay');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(function() {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Allow closing welcome modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const welcomeModal = document.querySelector('.welcome-modal-overlay');
        if (welcomeModal) {
            closeWelcomeModal();
        }
    }
});

// Allow closing welcome modal by clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('welcome-modal-overlay')) {
        closeWelcomeModal();
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.bento-box, .preview-card, .experience-card, .timeline-card, .cert-modern-card, .flip-card, .album-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = 'position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; border-radius: 50%; background: var(--primary-color); color: white; border: none; font-size: 1.5rem; cursor: pointer; opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; z-index: 1000; box-shadow: 0 5px 20px rgba(45, 80, 22, 0.3);';
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
}

createBackToTopButton();

/* =========================================
   PAGE LOAD: ONLY SHOW WELCOME ON INDEX.HTML ONCE
   ========================================= */

window.addEventListener('load', function() {
    // 1. Fade in the body content for all pages
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
        
        // 2. CHECK: Only show modal if the user is on 'index.html' or root '/'
        const path = window.location.pathname;
        
        // Check location
        if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) {
            
            // 3. SESSION STORAGE CHECK: Has the user seen it this session?
            const hasSeenWelcome = sessionStorage.getItem('welcomeShown');
            
            if (!hasSeenWelcome) {
                // If they haven't seen it, show it and set the flag
                setTimeout(function() {
                    showWelcomeModal();
                    sessionStorage.setItem('welcomeShown', 'true');
                }, 800);
            }
        }
        
    }, 100);
});

console.log('🌿 CAKFY Website loaded successfully! 🌿');