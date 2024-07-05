function applyInitialBlur(element) {
  // Hide the element initially
  element.style.visibility = 'hidden';
  element.style.filter = 'blur(8px)';
}

function applyBlurWithTransition(element) {
  // Show the element and apply transition for blur effect on hover
  element.style.visibility = 'visible';
  element.style.transition = 'filter 0.3s ease';
  element.addEventListener('mouseover', function() {
    element.style.filter = 'blur(0)';
  });
  element.addEventListener('mouseout', function() {
    element.style.filter = 'blur(8px)';
  });
}

function observeAndApplyBlur(selector) {
  const observer = new MutationObserver((mutations, obs) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length) {
      elements.forEach(element => {
        applyInitialBlur(element); // Apply initial blur and hide element
        // Force reflow to ensure the transition is applied after initial blur
        void element.offsetWidth;
        applyBlurWithTransition(element); // Apply blur with transition on hover
      });
      obs.disconnect(); // Stop observing once we found the elements
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
}

// Blur ratings on filmweb.pl
observeAndApplyBlur('.filmCoverSection__ratings');

// Blur ratings on imdb.com
observeAndApplyBlur('.sc-3a4309f8-1.dggvUg');

// Blur ratings on letterboxd.com
observeAndApplyBlur('.section.ratings-histogram-chart');
