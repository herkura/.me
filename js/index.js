const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

//alert('For better experience view this on a desktop');


// // VARIABLES
// const magicalUnderlines = Array.from(document.querySelectorAll('.underline--magical'));



// // HELPER FUNCTIONS

// // 1. Get random number in range. Used to get random index from array.
// const randNumInRange = max => Math.floor(Math.random() * (max - 1));

// // 2. Merge two separate array values at the same index to 
// // be the same value in new array.
// const mergeArrays = (arrOne, arrTwo) => arrOne
//   .map((item, i) => `${item} ${arrTwo[i]}`)
//   .join(', ');

// // 3. Curried function to add a background to array of elms
// const addBackground = (elms) => (color) => {
//   elms.forEach(el => {
//     el.style.backgroundImage = color;
//   });
// }
// // 4. Function to get data from API
// const getData = async(url) => {
//   const response = await fetch(url);
//   const data = await response.json();
//   return data.data;
// }

// // 5. Partial Application of addBackground to always apply 
// // background to the magicalUnderlines constant
// const addBackgroundToUnderlines = addBackground(magicalUnderlines);

// // GRADIENT FUNCTIONS

// // 1. Build CSS formatted linear-gradient from API data
// const buildGradient = (obj) => `linear-gradient(${obj.direction}, ${mergeArrays(obj.colors, obj.positions)})`;

// // 2. Get single gradient from data pulled in array and
// // apply single gradient to a callback function
// const applyGradient = async(url, callback) => {
//   const data = await getData(url);
//   const gradient = buildGradient(data[randNumInRange(data.length)]);
//   callback(gradient);
// }

// // RESULT
// applyGradient(gradientAPI, addBackgroundToUnderlines);

// 


async function loadMediumPosts() {
    const feedUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@hershilpiplani";
    try {
      const response = await fetch(feedUrl);
      const data = await response.json();
      const container = document.getElementById("medium-posts");
  
      data.items.forEach(post => {
        // Parse the HTML in the description safely
        const parser = new DOMParser();
        const doc = parser.parseFromString(post.description, "text/html");
  
        // Try to get the first <img> tag in the HTML
        const imgTag = doc.querySelector("img");
        const imageUrl = imgTag ? imgTag.src : "https://via.placeholder.com/600x300?text=No+Image";
  
        // Extract short snippet
        const snippet = doc.body.textContent.slice(0, 150) + "...";
  
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
          <div class="article-card">
            <img src="${imageUrl}" alt="Post image" class="article-image" />
            <h3><a href="${post.link}" target="_blank">${post.title}</a></h3>
            <p>${snippet}</p>
            <a href="${post.link}" target="_blank" class="btn">Read more</a>
          </div>
        `;
        container.appendChild(slide);
      });
  
      new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });
  
    } catch (err) {
      console.error("Failed to load Medium posts", err);
    }
  }
  loadMediumPosts();
  