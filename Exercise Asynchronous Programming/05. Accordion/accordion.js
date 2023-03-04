async function solution() {
    let mainSection = document.getElementById('main');
    mainSection.innerHTML = '';

    let sectionsRes = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');

    let sectionsData = await sectionsRes.json();

    let mainSectionInner = '';

    for (const article of sectionsData) {
        let currentContentRes = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`)
        let currentContentData = await currentContentRes.json();
        
        let currentInner = `<div class="accordion">
                                <div class="head">
                                    <span>${article.title}</span>
                                    <button class="button" id="${article._id}">More</button>
                                </div>
                                <div class="extra">
                                    <p>${currentContentData.content}</p>
                                </div>
                            </div>`;
                            
        mainSectionInner += currentInner;
    }
    mainSection.innerHTML = mainSectionInner;

    for (const button of Array.from(document.querySelectorAll('button'))) {
        button.addEventListener('click', onClick);
    }

    function onClick(event){
        if(event.target.textContent == 'More'){
            let currentDiv = event.target.parentElement.parentElement.children[1];
            currentDiv.style.display = 'block';
            event.target.textContent = 'Less';
        }else{
            let currentDiv = event.target.parentElement.parentElement.children[1];
            currentDiv.style.display = 'none';
            event.target.textContent = 'More';
        }
    }
}

solution();