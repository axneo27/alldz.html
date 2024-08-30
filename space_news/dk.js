function expanded(button){
    const article = button.parentElement;
    article.classList.toggle('expanded');

    if (article.classList.contains('expanded')) {
    button.style.backgroundColor = "#5e84c1"; 
    } else {
        button.style.backgroundColor = ""; 
    }
}
function sortArticles(order, collection) {
    const articlesContainer = document.querySelector(`.block.${collection}`); 
    const articles = Array.from(articlesContainer.getElementsByClassName(`${collection}A`)); 
    
    articles.sort((a, b) => {
        const dateA = new Date(a.querySelector('h5').textContent);
        const dateB = new Date(b.querySelector('h5').textContent);

        if (order === 'oldest') {
        return dateA - dateB; 
        } else if (order === 'latest') {
        return dateB - dateA;
        }
    });

    articles.forEach(article => articlesContainer.appendChild(article));
}

function addArticle(collection) {
    const input_text = document.getElementById(`article_text_${collection}`).value;
    const input_title = document.getElementById(`article_name_${collection}`).value;
    const input_date = document.getElementById(`article_date_${collection}`).value;

    const b = document.getElementById('readmore');
    const b2 = b.cloneNode(true);

    if (input_text.trim() !== '' && input_title.trim() !== '' && input_date.trim() !== '') {
        const newParagraph = document.createElement('p');
        newParagraph.textContent = input_text;
        newParagraph.style.color = '#030b18';
        const newTitle = document.createElement('h3');
        newTitle.textContent = input_title;
        const newDate = document.createElement('h5');
        newDate.textContent = input_date;
        newDate.style.color = '#030b18';

        const newDivImage = document.createElement('div');
        newDivImage.className = `newDivImage_${collection}`;

        const newArticleBlock = document.createElement('div');
        newArticleBlock.className = `${collection}A`;

        newArticleBlock.appendChild(b2);
        newArticleBlock.appendChild(newDate);
        newArticleBlock.appendChild(newDivImage);
        newArticleBlock.appendChild(newTitle);
        newArticleBlock.appendChild(newParagraph);

        const imageInput = document.querySelector(`#imageInput_${collection}`);

        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newimg = document.createElement('img');
                newimg.src = e.target.result;

                newDivImage.appendChild(newimg);
            };
            reader.readAsDataURL(imageInput.files[0]);
        }

        const articlesContainer = document.querySelector(`.block.${collection}`);
        articlesContainer.appendChild(newArticleBlock);
    } else {
        alert('Please enter some text.');
    }
}

function deleteLast(collection) {
    const articlesContainer = document.querySelector(`.block.${collection}`);

    const articles = Array.from(articlesContainer.getElementsByClassName(`${collection}A`));

    if (articles.length > 0) {
        const lastArticle = articles[articles.length - 1];
        lastArticle.parentNode.removeChild(lastArticle);
    }
}