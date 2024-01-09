var contentSimpleSearchOption = '제목';
var navigationStatus = 'movie';
var contentReservationList = [];
const TMDB_API = config.APIKey;

async function getMovieByPage(page) {
    result = []
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: config.APIKey
        }
    };
    const movies = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=ko-kor&page=${page}`, options)
        .then(response => response.json())
        .then(response => response['results'])
        .catch(err => console.error(err));

    for (let index = 0; index < movies.length; index++) {
        let contentId = movies[index]['id'];
        let posterPath = 'https://image.tmdb.org/t/p/original/' + movies[index]['poster_path'];
        let title = movies[index]['title'];
        let originalTitle = movies[index]['original_title'];
        let releaseDate = new Date(String(movies[index]['release_date']));
        let overview = movies[index]['overview'].replace('\'', '');
        let voteAverage = movies[index]['vote_average'];

        result.push({
            'contentId': contentId, 'posterPath': posterPath, 'title': title, 'originalTitle': originalTitle,
            'releaseDate': releaseDate, 'voteAverage': voteAverage, 'overview': overview
        });
    }

    return result;
}

async function getTVByPage(page) {
    result = []
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: config.APIKey
        }
    };
    const TVSerises = await fetch(`https://api.themoviedb.org/3/discover/tv?language=ko-KR&page=${page}&sort_by=popularity.desc`, options)
        .then(response => response.json())
        .then(response => response['results'])
        .catch(err => console.error(err));

    for (let index = 0; index < TVSerises.length; index++) {
        let contentId = TVSerises[index]['id'];
        let posterPath = 'https://image.tmdb.org/t/p/original/' + TVSerises[index]['poster_path'];
        let title = TVSerises[index]['name'].replace('\'', '');
        let originalTitle = TVSerises[index]['original_name'];
        let releaseDate = new Date(String(TVSerises[index]['first_air_date']));
        let overview = TVSerises[index]['overview'];
        let voteAverage = TVSerises[index]['vote_average'];

        result.push({
            'contentId': contentId, 'posterPath': posterPath, 'title': title, 'originalTitle': originalTitle,
            'releaseDate': releaseDate, 'voteAverage': voteAverage, 'overview': overview
        });
    }

    return result;
}

async function getMovieById(id) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: config.APIKey
        }
    };
    // fetch('https://api.themoviedb.org/3/discover/tv?language=ko-KR&page=1&sort_by=popularity.desc', options) // 드라마
    const result = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

    let contentId = result['id'];
    let posterPath = 'https://image.tmdb.org/t/p/original/' + result['poster_path'];
    let title = result['title'];
    let originalTitle = result['original_title'];
    let releaseDate = new Date(String(result['release_date']));
    let overview = result['overview'].replaceAll('\'', '');
    let voteAverage = result['vote_average'];

    return {
        'contentId': contentId, 'posterPath': posterPath, 'title': title, 'originalTitle': originalTitle,
        'releaseDate': releaseDate, 'voteAverage': voteAverage, 'overview': overview,
    };
}

async function getTVById(id) { // 작동 안함
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: config.APIKey
        }
    };
    const result = await fetch(`https://api.themoviedb.org/3/TV/${id}?language=ko-KR`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

    console.log(response);

    let contentId = result['id'];
    let posterPath = 'https://image.tmdb.org/t/p/original/' + result['poster_path'];
    let title = result['title'];
    let originalTitle = result['original_title'];
    let releaseDate = new Date(String(result['release_date']));
    let overview = result['overview'];
    let voteAverage = result['vote_average'];



    return {
        'contentId': contentId, 'posterPath': posterPath, 'title': title, 'originalTitle': originalTitle,
        'releaseDate': releaseDate, 'overview': overview, 'voteAverage': voteAverage
    };
}

async function getMovieTotalCount() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: config.APIKey
        }
    };

    const result = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=ko-kor&page=1`, options)
        .then(response => response.json())
        .then(response => response['total_results'])
        .catch(err => console.error(err));

    return result;
}

async function getMovieTotalPagesCount() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: config.APIKey
        }
    };

    const result = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=ko-kor&page=1`, options)
        .then(response => response.json())
        .then(response => response['total_pages'])
        .catch(err => console.error(err));

    return result;
}

async function getTVTotalPagesCount() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: config.APIKey
        }
    };

    const result = fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => response['total_pages'])
        .catch(err => console.error(err));

    return result;
}

document.addEventListener("DOMContentLoaded", function () {
    let url = "http://spartacodingclub.shop/sparta_api/weather/seoul";

    fetch(url).then(res => res.json()).then(data => {
        let temp = data['temp'];

        document.querySelector('#msg').textContent = temp;
    });

    getMovieByPage(1).then(result => {
        for (let index = 0; index < 10; index++) {
            makeCard(...Object.values(result[index]), index);
        }
    })
})

function isEqualDate(date1, date2) {
    strDate1 = date1.getFullYear() + date1.getMonth() + date1.getDate();
    strDate2 = date2.getFullYear() + date2.getMonth() + date2.getDate();

    return strDate1 === strDate2;
}

function makeCard(contentId, posterPath, title, originalTitle, releaseDate, voteAverage, overview, index) {
    const $card = document.querySelector('#card');
    let $overview;
    let newCard = `<div class="col" >
        <div class="card">
            <img src="${posterPath}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><b>제목 : </b>${title}</h5>
                    <h5 class="card-title"><b>원제 : </b>${originalTitle}</h5>
                    <p class="card-text"><b>출시일 : </b>${releaseDate.getFullYear()}년 ${releaseDate.getMonth() + 1}월
                        ${releaseDate.getDate()}일</p>
                    <p class="card-text"><b>평점 : </b>⭐${voteAverage}</p>
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-heading${index}">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapse${index}" aria-expanded="false"
                                    aria-controls="flush-collapse${index}">
                                    <b>요약</b>
                                </button>
                            </h2>
                            <div id="flush-collapse${index}" class="accordion-collapse collapse"
                                aria-labelledby="flush-heading${index}" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">${overview}</div>
                            </div>
                        </div>
                    </div>
                    `;
    if (navigationStatus !== '찜 목록') {
        newCard += `<button onclick="reserve(${contentId}, '${posterPath}', '${title}', '${originalTitle}', '${releaseDate}', ${voteAverage}, '${overview}')" id="button${contentId}" type="button" class="btn btn-danger">찜하기</button>
                </div>`;
    }

    $card.insertAdjacentHTML('beforeend', newCard);
}

function setSearch(option) {
    let $simpleSearchText = document.querySelector('#simple_search_text');

    switch (option) {
        case '제목':
            $simpleSearchText.placeholder = '제목으로 검색';
            contentSimpleSearchOption = '제목';
            break;
        case '원제':
            $simpleSearchText.placeholder = '원제로 검색';
            contentSimpleSearchOption = '원제';
            break;
        case '출시일':
            $simpleSearchText.placeholder = '출시일로 검색 (ex. 1997.01.01)';
            contentSimpleSearchOption = '출시일';
            break;
        case '평점':
            $simpleSearchText.placeholder = '평점으로 검색 (ex. 1.234)';
            contentSimpleSearchOption = '평점';
            break;
    }
}

function showSearch(flag) {
    let $detailedSearch = document.querySelector('#detailed_search');
    let $detailedSearchFlag = document.querySelector('#detailed_flag');

    if ($detailedSearchFlag.textContent === '상세 검색 켜기') {
        $detailedSearch.style.display = 'block';
        $detailedSearchFlag.textContent = '상세 검색 끄기'
    }
    else if ($detailedSearchFlag.textContent === '상세 검색 끄기') {
        $detailedSearch.style.display = 'none';
        $detailedSearchFlag.textContent = '상세 검색 켜기'
    }
}

function reserve(contentId, posterPath, title, originalTitle, releaseDate, voteAverage, overview) {
    let content = { 'contentId': contentId, 'posterPath': posterPath, 'title': title, 'originalTitle': originalTitle, 'releaseDate': new Date(releaseDate), 'voteAverage': voteAverage, 'overview': overview };

    for (let i = 0; i < contentReservationList.length; i++) {
        if (contentReservationList[i]['contentId'] === content['contentId']) {
            alert(`${title}(${contentId})가 이미 찜목록에 있습니다.`);
            return;
        }
    }
    contentReservationList.push(content);
    alert(`${title}(${contentId})가 찜목록에 추가되었습니다.`);
}

function clearCards() {
    const $card = document.querySelector('#card');

    while ($card.firstChild) {
        $card.removeChild($card.firstChild);
    }
}

function checkSearchKeyword(isSimpleSearch, option, keyword) {
    if (isSimpleSearch) {
        console.log('간단 검색어 체크 시작');
        console.log('option', option);
        if (keyword === '') {
            alert(`검색할 ${option}을(를) 입력하세요.`);
            return false;
        }

        else if (option === '출시일') {
            console.log(option, '검색어  필터링');
            let regex = RegExp(/^\d{4}.(0[1-9]|1[012]).(0[1-9]|[12][0-9]|3[01])$/);
            if (!regex.test(keyword)) {
                alert('입력한 출시일이 올바른 형식이 아닙니다.');
                return false;
            }
        }

        else if (option === '평점') {
            console.log(option, '검색어  필터링');
            let regex = RegExp(/^[1-9]{1}\.{1}[0-9]{3}$/);
            if (!regex.test(keyword)) {
                alert('입력한 평점이 올바른 형식이 아닙니다.');
                return false;
            }
        }
    }
    else {
        console.log('상세 검색어 체크 시작');
        let releaseDateRegex = RegExp(/^\d{4}.(0[1-9]|1[012]).(0[1-9]|[12][0-9]|3[01])$/);
        let voteAverageRregex = RegExp(/^[1-9]{1}\.{1}[0-9]{3}$/);

        if (keyword['title'] === '' || keyword['originalTitle'] === '' || keyword['releaseDate'] === '' || keyword['voteAverage'] === '') {
            alert('검색할 내용 중 빈칸이 있습니다.');
            return false;
        }

        else if (!releaseDateRegex.test(keyword['releaseDate'])) {
            alert('입력한 출시일이 올바른 형식이 아닙니다.');
            return false;
        }

        else if (!voteAverageRregex.test(keyword['voteAverage'])) {
            alert('입력한 평점이 올바른 형식이 아닙니다.');
            return false;
        }
    }
    return true;
}

async function search(isSimpleSearch) {
    let $simpleSearchText;
    let $detailedSearchTitle;
    let $detailedSearchOriginalTitle;
    let $detailedSearchReleaseDate;
    let $detailedSearchVoteAverage;

    const $resultTitle = document.querySelector('#result_title');
    let keyword;
    let option = contentSimpleSearchOption;
    let contentList = []
    let moviePageCount;
    let TVPageCount;
    let currentPages = 0;

    console.log('검색 버튼 클릭');
    if (isSimpleSearch) {
        $simpleSearchText = document.querySelector('#simple_search_text');
        keyword = $simpleSearchText.value;
        console.log('단순 검색 버튼 클릭');
    }
    else {
        $detailedSearchTitle = document.querySelector('#detailed_title');
        $detailedSearchOriginalTitle = document.querySelector('#detailed_original_title');
        $detailedSearchReleaseDate = document.querySelector('#detailed_release_date');
        $detailedSearchVoteAverage = document.querySelector('#detailed_vote_average');

        keyword = {};
        keyword['title'] = $detailedSearchTitle.value;
        keyword['originalTitle'] = $detailedSearchOriginalTitle.value;
        keyword['releaseDate'] = $detailedSearchReleaseDate.value;
        keyword['voteAverage'] = $detailedSearchVoteAverage.value;
        console.log('상세 검색 버튼 클릭');
    }

    if (!checkSearchKeyword(isSimpleSearch, option, keyword)) {
        console.log('검색어 체크 실패');
        return;
    }
    console.log('검색어 체크 성공');
    return; // 임시
    if (navigationStatus === 'movie') {
        moviePageCount = await getMovieTotalPagesCount();
        console.log('page 개수', moviePageCount);

        let pages = []

        for (let i = 1; i <= moviePageCount; i++) {
            pages.push(i);
        }

        await Promise.allSettled(
            pages.map(async item => {
                contentList = contentList.concat(await getMovieByPage(item));
                console.log(item);
                currentPages++;
                $resultTitle.textContent = `데이터 가져오는 중 (${currentPages}/${moviePageCount})`;
            }));
    } else {
        TVPageCount = await getTVTotalPagesCount();
        console.log('page 개수', TVPageCount);

        let pages = []

        for (let i = 1; i <= TVPageCount; i++) {
            pages.push(i);
        }

        await Promise.allSettled(
            pages.map(async item => {
                contentList = contentList.concat(await getTVByPage(item));
                console.log(item);
                currentPages++;
                $resultTitle.textContent = `데이터 가져오는 중 (${currentPages}/${moviePageCount})`;
            }));
    }
    if (isSimpleSearch) {
        switch (option) {
            case '제목':
                contentList = contentList.filter(content => content['title'].toUpperCase().includes(keyword.toUpperCase()));
                break;
            case '원제':
                contentList = contentList.filter(content => content['originalTitle'].toUpperCase().includes(keyword.toUpperCase()));
                break;
            case '출시일':
                contentList = contentList.filter(content => isEqualDate(content['releaseDate'], new Date(keyword)));
                break;
            case '평점':
                contentList = contentList.filter(content => content['voteAverage'] === Number(keyword));
                break;
        }
    }
    else {
        contentList = contentList.filter(content => content['voteAverage'] === Number(keyword))
            .filter(content => isEqualDate(content['releaseDate'], new Date(keyword)))
            .filter(content => content['title'].toUpperCase().includes(keyword.toUpperCase()))
            .filter(content => content['originalTitle'].toUpperCase().includes(keyword.toUpperCase()));
    }

    clearCards();
    for (let index = 0; index < contentSearchResult.length; index++)
        makeCard(...Object.values(contentSearchResult[index]), index);
    contentList = [];
    $resultTitle.textContent = `${contentSimpleSearchOption} 검색 결과 (${currentPages}/${moviePageCount})`;
}

function home() {
    const $resultTitle = document.querySelector('#result_title');

    navigationStatus = 'movie';
    clearCards();

    getMovieByPage(1).then(result => {
        for (let index = 0; index < 10; index++) {
            makeCard(...Object.values(result[index]), index);
        }
    })
    $resultTitle.textContent = '인기 영화 10위';
}

function TV() {
    const $resultTitle = document.querySelector('#result_title');

    navigationStatus = 'TV';
    clearCards();
    getTVByPage(1).then(result => {
        for (let index = 0; index < 10; index++) {
            makeCard(...Object.values(result[index]), index);
        }
    })
    $resultTitle.textContent = '인기 TV 시리즈 10위';
}

async function myReservations() {
    const $resultTitle = document.querySelector('#result_title');
    navigationStatus = '찜 목록';

    if (contentReservationList.length === 0) {
        $resultTitle.textContent = '내가 찜한 콘텐츠가 없습니다.';
        clearCards();
    } else {

        clearCards();

        for (let index = 0; index < contentReservationList.length; index++)
            makeCard(...Object.values(contentReservationList[index]), index);

        contentReservationList = [];
        $resultTitle.textContent = '내가 찜한 콘텐츠들';
    }
}