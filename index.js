const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container');
let selectedCatagory = 1001;
let sortByView = false;
const errorElement = document.getElementById(`error-element`);
const sortButton = document.getElementById(`sort-btn`);
sortButton.addEventListener('click',() => {
    sortByView = true;
    fetchDataCatagories(selectedCatagory,sortByView);
})
const fetchCatagories = () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    fetch(url)
        .then(res => res.json())
        .then(({ data }) => {
            data.forEach((card) => {
                console.log(card);
                const newButton = document.createElement('button');
                newButton.innerText = card.category;
                newButton.classList = `category-btn btn btn-ghost bg-slate-700 text-white text-lg`;
                // console.log(newButton);
                newButton.addEventListener('click', () => {
                    fetchDataCatagories(card.category_id)
                    const allBtns = document.querySelectorAll('.category-btn');
                    for (const btn of allBtns) {
                        btn.classList.remove = ('bg-red-600');
                    }
                    newButton.classList.add('bg-red-600');
                })
                btnContainer.appendChild(newButton);
            })
        });
}
const fetchDataCatagories = (categoryId, sortByView) => {
    console.log(categoryId);
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(({ data }) => {
            cardContainer.textContent = ' ';
            if (sortByView) {
                data.sort((a, b) => {
                    const totalViewsStrFirst = a.others?.views;
                    const totalViewsStrSecond = b.others?.views;
                    const totalViewFirstNumber = parseFloat(totalViewsStrFirst.replace("K", '')) || 0;
                    const totalViewSecondNumber = parseFloat(totalViewsStrSecond.replace("K", '')) || 0;
                    return totalViewSecondNumber - totalViewFirstNumber;
                })
            }
            if (data.length == 0) {
                errorElement.classList.remove('hidden');
            }
            else {
                errorElement.classList.add('hidden');
            }
            data.forEach((video) => {
                console.log(video);
                let verifiedBadge = ' '
                if (video.authors[0].verified) {
                    verifiedBadge = `<img class="w-6 h-6" src="./images/verify.png" alt="">`
                }
                else {
                    verifiedBadge = `<img class="w-6 h-6" src="./images/non-verified.jpg" alt="">`
                }
                const newCard = document.createElement('div');
                newCard.innerHTML = `
                <div class="card w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden h-72">
                    <img class="w-full" src="${video.
                        thumbnail
                    }" alt="Shoes" />
                    <h6 class="absolute bottom-[40%] right-12" id="time-stamp">${millisecondsToHoursAndMinutes(video.others.posted_date)}</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="Shoes" />
                        </div>
                        <div>
                            <h2 class="card-title">${video.title}</h2>
                            <div class="flex mt-3">
                                <p class="">${video.authors[0].
                        profile_name}</p>
                               ${verifiedBadge}
                            </div>
                            <p class="mt-3">${video.others.views} Views</p>
                        </div>
                    </div>
                </div>
            </div>
                `
                cardContainer.appendChild(newCard);
            })
        });
}
// Milliseconds to hours and minutes
const timePlaceHolder = document.getElementById('time-stamp');
console.log(timePlaceHolder);
const millisecondsToHoursAndMinutes = (mili) => {
    const minutes = Math.floor(mili / (60 * 1000));
    const hours = Math.floor(minutes / 60);
    const hoursAndMinutes = hours % 60;
    return `${hours} hr and ${hoursAndMinutes} minute`;
}
// fetchDataCatagories();
fetchCatagories();
fetchDataCatagories(selectedCatagory, sortByView);