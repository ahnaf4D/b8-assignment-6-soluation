const btnContainer = document.getElementById('btn-container');
const fetchCatagories = () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    fetch(url)
        .then(res => res.json())
        .then(({ data }) => {
            data.forEach((card) => {
                console.log(card);
                const newButton = document.createElement('button');
                newButton.innerText = card.category;
                newButton.classList = `btn btn-ghost bg-slate-700 text-white text-lg`;
                // console.log(newButton);
                newButton.addEventListener('click', () => fetchDataCatagories(card.category_id))
                btnContainer.appendChild(newButton);
            })
        });
}
const fetchDataCatagories = (categoryId) => {
    console.log(categoryId);
}
fetchDataCatagories();
fetchCatagories();