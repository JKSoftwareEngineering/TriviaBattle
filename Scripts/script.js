document.querySelector("#info").style.display = "none";
        let skillMultiplyer = 1;
        function hideElements(value)
        {
            // initial selection
            if(value == 0)
            {
                document.querySelector("#sceneZero").style.display = "block";
                document.querySelector("#sceneOne").style.display = "none";
                document.querySelector("#scenetwo").style.display = "none";
            }
            // game playing
            if(value == 1)
            {
                if(document.querySelector("#skill").value == "easy")
                {
                    skillMultiplyer = 1;
                } 
                if(document.querySelector("#skill").value == "medium")
                {
                    skillMultiplyer = 2;
                } 
                if(document.querySelector("#skill").value == "hard")
                {
                    skillMultiplyer = 3;
                }  
                document.querySelector("#sceneZero").style.display = "none";
                document.querySelector("#sceneOne").style.display = "block";
                document.querySelector("#scenetwo").style.display = "none";
            }
            // game end
            if(value == 2)
            {
                document.querySelector("#sceneZero").style.display = "none";
                document.querySelector("#sceneOne").style.display = "none";
                document.querySelector("#scenetwo").style.display = "block";
            }
        }
        // global health
        let playerHp = 100;
        let enemyHp = 100;
        // reset the health condition
        function resetGame()
        {
            document.querySelector("#blueFighter").src = "Images/BlueIdle.png";
            document.querySelector("#redFighter").src = "Images/RedIdle.png";
            playerHp = 100;
            enemyHp = 100;
        }
        function changeHealth()
        {
            let ans1 = document.querySelector("#radio_answer0").checked;
            let ans2 = document.querySelector("#radio_answer1").checked;
            let ans3 = document.querySelector("#radio_answer2").checked;
            let ans4 = document.querySelector("#radio_answer3").checked;
            // if they clicked anything
            if(ans1 || ans2 || ans3 || ans4)
            {
                // was it right
                if(document.querySelector("#info").innerHTML == "incorrect")
                {
                    document.querySelector("#blueFighter").src = "Images/BlueSad.png";
                    document.querySelector("#redFighter").src = "Images/RedIdle.png";
                    enemyHp += (10 * skillMultiplyer);
                    if(enemyHp >= 100)
                    {
                        enemyHp = 100;
                    }
                    playerHp -= (10 * skillMultiplyer);
                    {
                        if(playerHp <= 0)
                        {
                            // set the game over condition
                            hideElements(2);
                            document.querySelector("#gameCondition").innerHTML = "Game Over";
                        }
                    }
                }
                else
                {
                    document.querySelector("#blueFighter").src = "Images/BlueIdle.png";
                    document.querySelector("#redFighter").src = "Images/RedSad.png";
                    playerHp += (10 * skillMultiplyer);
                    if(playerHp >= 100)
                    {
                        playerHp = 100;
                    }
                    enemyHp -= (10 * skillMultiplyer);
                    {
                        if(enemyHp <= 0)
                        {
                            // set the game over condition
                            hideElements(2);
                            document.querySelector("#gameCondition").innerHTML = "You Win";
                        }
                    }
                }
                document.querySelector("#playerHp").innerHTML = "Player health:  " + playerHp;
                document.querySelector("#enemyHp").innerHTML = "Enemy health:  " + enemyHp;
                document.querySelector("#info").innerHTML = "";
                getData(getNewURL())
            }
        }
        // category strings to compare with what is typed
        let categorys = 
        [
            "Any Category",
            "General Knowledge",
            "Entertainment: Books",
            "Entertainment: Film",
            "Entertainment: Music",
            "Entertainment: Musicals & Theatres",
            "Entertainment: Television",
            "Entertainment: Video Games",
            "Entertainment: Board Games",
            "Science & Nature",
            "Science: Computers",
            "Science: Mathematics",
            "Mythology",
            "Sports",
            "Geography",
            "History",
            "Politics",
            "Art",
            "Celebrities",
            "Animals",
            "Vehicles",
            "Entertainment: Comics",
            "Science: Gadgets",
            "Entertainment: Japanese Anime & Manga",
            "Entertainment: Cartoon & Animations"
        ]
        // the category links that are used in url construction
        let categoryLinks = 
        [
            "",
            "&category=9",
            "&category=10",
            "&category=11",
            "&category=12",
            "&category=13",
            "&category=14",
            "&category=15",
            "&category=16",
            "&category=17",
            "&category=18",
            "&category=19",
            "&category=20",
            "&category=21",
            "&category=22",
            "&category=23",
            "&category=24",
            "&category=25",
            "&category=26",
            "&category=27",
            "&category=28",
            "&category=29",
            "&category=30",
            "&category=31",
            "&category=32"
        ]
        // connection to the api
        function getNewURL()
        {
            // check to see if what was entered is one of the options
            let localFound = false;
            // indexer
            let localI = 0
            // what did the user enter
            let localInput = document.querySelector("#genre").value;
            // search for what they entered
            for(; localI < categorys.length; localI++)
            {
                if(categorys[localI] == localInput)
                {
                    localFound = true;
                    break;
                }
            }
            // if what they entered was not in the list then the genre is anything
            if(!localFound)
            {
                localI = 0;
            }
            // always one question at a time and always assume that it wiil be of type multiple choice
            let coreURL = "https://opentdb.com/api.php?amount=1";
            // just omit parts that are of type any
            //example:  https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple
            coreURL = coreURL + categoryLinks[localI];//document.querySelector("#genre").value;
            coreURL = coreURL + document.querySelector("#difficultyInit").value;
            coreURL = coreURL + "&type=multiple";
            document.querySelector("#playerHp").innerHTML = "Player health:  " + playerHp;
            document.querySelector("#enemyHp").innerHTML = "Enemy health:  " + enemyHp;
            return coreURL;
        }
        function getData(url)
        {
            let xhr = new XMLHttpRequest();
            xhr.onload = dataLoaded;
            xhr.open("Get", url);
            xhr.send();
        }
        function dataLoaded(e)
        {
            let xhr = e.target;
            let result = JSON.parse(xhr.responseText);
            let correctCompair = "" + result.results[0].correct_answer;
            let temp1 = "" + result.results[0].incorrect_answers[0];
            let temp2 = "" + result.results[0].incorrect_answers[1];
            let temp3 = "" + result.results[0].incorrect_answers[2];
            let answersIn = [];
            answersIn[0] = correctCompair;
            answersIn[1] = temp1;
            answersIn[2] = temp2;
            answersIn[3] = temp3;
            //shuffle algorithm fisher yates
            for(let i = 0; i < 4; i++)
            {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = answersIn[i];
                answersIn[i] = answersIn[j];
                answersIn[j] = temp;
            }
            // check to see if the value is correct instead checking 4 different values that comes from the api
            for(let i = 0; i < 4; i++)
            {
                if(answersIn[i] == correctCompair)
                {
                    document.querySelector("#radio_answer" + i).value = "correct";
                }
                else
                {
                    document.querySelector("#radio_answer" + i).value = "incorrect";
                }
            }
            // set the inner html of the question and answer elelments
            document.querySelector("#question").innerHTML = result.results[0].question;
            document.querySelector("#answer0").innerHTML = answersIn[0];
            document.querySelector("#answer1").innerHTML = answersIn[1];
            document.querySelector("#answer2").innerHTML = answersIn[2];
            document.querySelector("#answer3").innerHTML = answersIn[3];
            // remove any selection data
            document.querySelector("#radio_answer0").checked = false;
            document.querySelector("#radio_answer1").checked = false;
            document.querySelector("#radio_answer2").checked = false;
            document.querySelector("#radio_answer3").checked  = false;
        }
        
        let answers = document.querySelectorAll("input[name='answer']")
        for(let a of answers)
        {
            a.addEventListener("click", clicked);
        }
        function clicked(event)
        {
	        let answerIn = event.target.value;
	        document.querySelector("#info").innerHTML = answerIn;
        }
        // set the inital state to 0
        hideElements(0);
        // this takes the input field and the array being tested against
        function autocomplete(inp, arr) 
        {
            // when theres an update to the search field
            inp.addEventListener("input", function(e) 
            {
                let divBeingMade = this.value;
                let divBeingClicked = this.value;
                let divbeingChecked = this.value;
                let valueOfDiv = this.value;
                // start with closing anything that has been opened in the search list in the event that they change the topic
                closeAllLists();
                // there is no div to click available
                if (!valueOfDiv) 
                { 
                    return false;
                }
                // create a search list, the first term becomes the main container
                divBeingMade = document.createElement("div");
                divBeingMade.setAttribute("id", this.id + "search-list");
                divBeingMade.setAttribute("class", "search-items");
                // add the main container as the child of the input field
                this.parentNode.appendChild(divBeingMade);
                for (divbeingChecked = 0; divbeingChecked < arr.length; divbeingChecked++) 
                {
                    // see if what was entered starts with the search term
                    if (arr[divbeingChecked].substr(0, valueOfDiv.length).toUpperCase() == valueOfDiv.toUpperCase()) 
                    {
                        // make an element to hold the search term
                        divBeingClicked = document.createElement("div");
                        divBeingClicked.style.textAlign = "center";
                        // populate the list
                        divBeingClicked.innerHTML = arr[divbeingChecked];
                        // fill the search bar with the thing that was clicked
                        divBeingClicked.innerHTML += "<input type='hidden' value='" + arr[divbeingChecked] + "'>";
                        // this is where the search term sugestion is sent to the search bar
                        divBeingClicked.addEventListener("click", function(e) {
                            inp.value = this.getElementsByTagName("input")[0].value;
                            // remove any sugested search terms that are still open
                            closeAllLists();
                        });
                        divBeingMade.appendChild(divBeingClicked);
                    }
                }
            });
            function closeAllLists(element) 
            {
                // find all of the classes that are of the type search item
                let arr = document.getElementsByClassName("search-items");
                
                for (let i = 0; i < arr.length; i++) 
                {
                    // if the elemet is not contained in the array being checked and does not contain what has been entered so far
                    if (element != arr[i] && element != inp) 
                    {
                        // remove it from the potential list
                        arr[i].parentNode.removeChild(arr[i]);
                    }
                }
            }
            // clear all search terms if you click a div
            document.addEventListener("click", function (e) {
                closeAllLists(e.target);
            });
        }
        // call the actual auto complete
        autocomplete(document.querySelector("#genre"), categorys);