const slider = document.querySelector(".slider");

function sliceCityName(city) {
    const middle = Math.floor(city.length / 2);
    return{
        left: city.slice(0, middle),
        right: city.slice(middle)
    }
}

fetch("http://localhost:6700/api/tours")
    .then((response) => response.json())
    .then((tours) => {

        console.log("Tours received from backend:");
        console.log(tours);

        tours.forEach((tour, index) => {

            const slide = document.createElement("div");

            slide.classList.add("slide");
            if(index === 0){
                slide.classList.add("active");
            }

            const cityParts = sliceCityName(tour.city);
            slide.innerHTML = `
                <img src="${tour.image_url}" alt="" class="background-img">

                <div class="left-info">

                    <div class="penetrte-blur">
                        <h1>${cityParts.left}</h1>
                    </div>

                    <div class="content">
                        <h3>${tour.title}</h3>

                        <p>${tour.description}</p>

                        <a href="#" class="btn">More Details</a>
                    </div>

                </div>

                <div class="right-info">
                    <h1>${cityParts.right}</h1>
                    <h3>City</h3>
                </div>
            `;

            slider.appendChild(slide);
        });
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        const slides = document.querySelectorAll('.slide');
        const numberOfSlides = slides.length;

        let slideNumber = 0;


        nextBtn.onclick = () => {
            console.time("slide change");

            slides.forEach((slide) => {
                slide.classList.remove('active');
            });

            slideNumber++;

            if (slideNumber > numberOfSlides - 1) {
                slideNumber = 0;
            }

            slides[slideNumber].classList.add('active');

            console.timeEnd("slide change");
        };


        prevBtn.onclick = () => {

            slides.forEach((slide) => {
                slide.classList.remove('active');
            });

            slideNumber--;

            if (slideNumber < 0) {
                slideNumber = numberOfSlides - 1;
            }

            slides[slideNumber].classList.add('active');
        };

    })
    .catch((error) => {
        console.error("Error fetching tours:", error);
    });
