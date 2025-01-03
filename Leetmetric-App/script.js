document.addEventListener("DOMContentLoaded", function() {

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector('.medium-progress');
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.querySelector("#easy-label");
    const mediumLable = document.getElementById("medium-label");
    const hardLable = document.getElementById('hard-label');
    const cardStatsContainer = document.querySelector('.stats-cards');

    function validateUsername(username){
        if(username.trim() === ''){
            alert("Username should not be empty")
        }
        const regex = /^[a-zA-Z0_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert('Username Invalid');
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            searchButton.textContent = 'Searching...'
            searchButton.disabled = true;
            statsContainer.style.display = 'none'; // Hide while fetching
            const response = await fetch(url);
            if(!response.ok){
                throw new Error('Unable to fetch the user details');
            }
            const parseData = await response.json();
            console.log("Logging data", parseData);

            displayUserData(parseData);
            statsContainer.style.display = 'block';// here showing data
        }
        catch(error){
            statsContainer.innerHTML = `<p>${error}</p>`
            statsContainer.style.display = 'block'; // Showing error message
        }
        finally{
            searchButton.textContent = 'Search';
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parseData){
        const totalQues = parseData.totalQuestions;
        const totalEasyQues = parseData.totalEasy;
        const totaMediumlQues = parseData.totalMedium;
        const totalHardQues = parseData.totalHard;

        const solvedTotalQues = parseData.totalSolved;
        const solvedEasy = parseData.easySolved;
        const solvedMedium = parseData.mediumSolved;
        const solvedHard = parseData.hardSolved;

        updateProgress(solvedEasy, totalEasyQues, easyLabel, easyProgressCircle);

        updateProgress(solvedMedium, totaMediumlQues, mediumLable, mediumProgressCircle);

        updateProgress(solvedHard, totalHardQues, hardLable, hardProgressCircle);

        const cardData = [
            {label: "Overall Submissions:", value:parseData.totalSolved},
            {label: "Overall Questions:", value:parseData.totalQuestions},
            {label: "Ranking:", value:parseData.ranking},
            {label: "Acceptance-Rate:", value:parseData.acceptanceRate},
        ];

        console.log("card's data", cardData);

        cardStatsContainer.innerHTML = cardData.map(data =>  `
            <div class = "card">
            <h4>${data.label}</h4>
            <p>${data.value}</p>
            </div>`
        ).join('')

    }

    searchButton.addEventListener('click', function() {
        const username = usernameInput.value;
        console.log('login', username)
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    } )

})